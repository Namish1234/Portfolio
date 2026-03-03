"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";

const FFT_SIZE = 256;
const WAVE_SAMPLES = 128;

interface MusicVisualizerProps {
    src: string;
    title?: string;
    artist?: string;
}

// ── Work In Progress Graphic ─────────────────────────────────
const WIP_SYMBOLS = ["⚙", "⎈", "⌘", "❖", "✧", "⟁", "⌬", "⎊", "◬", "✥", "✇", "✺"];

function WorkInProgressTool({ playing }: { playing: boolean }) {
    const symIndex = 0;

    return (
        <div className="relative w-full h-full flex flex-col justify-center pl-8 md:pl-16 select-none" style={{ minHeight: 140 }}>
            <div className="flex items-center gap-6">
                {/* Rotating symbol tool */}
                <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
                    {/* Outer dashed rotating ring */}
                    <div className="absolute inset-[-4px] rounded-full border-[1.5px] border-dashed border-primary/50"
                        style={{
                            animation: playing ? "spin 4s linear infinite" : "spin 12s linear infinite"
                        }} />
                    {/* Inner rotating ring */}
                    <div className="absolute inset-1 rounded-full border border-primary/20"
                        style={{
                            animation: playing ? "spin 3s linear infinite reverse" : "spin 10s linear infinite reverse"
                        }} />
                    {/* Constantly changing symbol */}
                    <span className="text-3xl text-primary drop-shadow-[0_0_8px_rgba(236,78,2,0.8)] font-mono leading-none pb-0.5"
                        style={{
                            animation: playing ? "spin 6s linear infinite reverse" : "none"
                        }}>
                        {WIP_SYMBOLS[symIndex]}
                    </span>
                </div>

                {/* Text block */}
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-xl md:text-2xl font-bold tracking-[0.2em] text-foreground/80 uppercase">
                        Work In <span className="text-primary">Progress</span>
                    </span>
                    <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground/60 uppercase mt-0.5">
                        [Sys: {playing ? "Active" : "Standby"}]
                    </span>
                    <div className="w-full h-px bg-gradient-to-r from-primary/30 to-transparent mt-2" />
                </div>
            </div>
        </div>
    );
}

// ── Compact music player ─────────────────────────────────────────
export function MusicVisualizer({ src, title = "Track", artist = "Namish" }: MusicVisualizerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const rafRef = useRef<number>(0);
    const freqRef = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(FFT_SIZE / 2) as Uint8Array<ArrayBuffer>);
    const waveRef = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(WAVE_SAMPLES) as Uint8Array<ArrayBuffer>);

    const [isPlaying, setIsPlaying] = useState(false);

    const setupAudio = useCallback(() => {
        if (audioCtxRef.current) return;
        const audio = audioRef.current!;
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = FFT_SIZE;          // 256 — valid power of 2
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        analyserRef.current = analyser;
        audioCtxRef.current = ctx;
        freqRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
        waveRef.current = new Uint8Array(analyser.fftSize) as Uint8Array<ArrayBuffer>;
    }, []);

    const drawWaveform = useCallback((playing: boolean) => {
        const canvas = canvasRef.current;
        const analyser = analyserRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // Gradient stroke
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, "rgba(236,78,2,0.3)");
        grad.addColorStop(0.5, "rgba(236,78,2,0.9)");
        grad.addColorStop(1, "rgba(236,78,2,0.3)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        if (!playing || !analyser) {
            // Flat idle line
            ctx.beginPath();
            ctx.moveTo(0, H / 2);
            ctx.lineTo(W, H / 2);
            ctx.globalAlpha = 0.25;
            ctx.stroke();
            ctx.globalAlpha = 1;
            return;
        }

        analyser.getByteTimeDomainData(waveRef.current);
        const data = waveRef.current;
        const sliceW = W / data.length;
        ctx.beginPath();
        for (let i = 0; i < data.length; i++) {
            const v = data[i] / 128.0;
            const y = (v * H) / 2;
            if (i === 0) ctx.moveTo(0, y);
            else ctx.lineTo(i * sliceW, y);
        }
        ctx.shadowColor = "rgba(236,78,2,0.6)";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }, []);

    const animate = useCallback(() => {
        const analyser = analyserRef.current;
        if (!analyser) return;
        // Frequency for beat detection
        analyser.getByteFrequencyData(freqRef.current);
        drawWaveform(true);
        rafRef.current = requestAnimationFrame(animate);
    }, [drawWaveform]);

    const togglePlay = async () => {
        const audio = audioRef.current!;
        if (!audioCtxRef.current) setupAudio();
        if (audioCtxRef.current?.state === "suspended") await audioCtxRef.current.resume();
        if (isPlaying) {
            audio.pause();
            cancelAnimationFrame(rafRef.current);
            setIsPlaying(false);
        } else {
            await audio.play();
            rafRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => () => { cancelAnimationFrame(rafRef.current); audioCtxRef.current?.close(); }, []);

    // Draw idle flat line on mount/pause
    useEffect(() => { if (!isPlaying) drawWaveform(false); }, [isPlaying, drawWaveform]);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 mt-16">
            <div className="flex flex-col md:flex-row items-center gap-8">

                {/* ── Left: compact player ── */}
                <div className="relative w-full md:w-60 flex-shrink-0">
                    <audio
                        ref={audioRef}
                        src={src}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => { setIsPlaying(false); cancelAnimationFrame(rafRef.current); }}
                    />


                    <div className="relative rounded-3xl border border-border bg-card overflow-hidden flex flex-col">

                        {/* Glow blob when playing */}
                        {isPlaying && (
                            <div className="absolute inset-0 pointer-events-none z-0"
                                style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(236,78,2,0.12) 0%, transparent 70%)" }} />
                        )}

                        {/* Vinyl disc */}
                        <div className="relative z-10 flex justify-center pt-8 pb-4">
                            <div className="relative" style={{ width: 120, height: 120 }}>
                                {/* Outer rings */}
                                {[48, 40, 32, 24, 16].map((r, i) => (
                                    <div key={i} className="absolute rounded-full border"
                                        style={{
                                            width: r * 2, height: r * 2,
                                            top: 60 - r, left: 60 - r,
                                            borderColor: i === 0 ? "rgba(236,78,2,0.5)" : `rgba(236,78,2,${0.12 - i * 0.02})`,
                                            animation: isPlaying ? `spin ${6 + i * 2}s linear infinite` : "none",
                                        }} />
                                ))}
                                {/* Center dot */}
                                <div className="absolute rounded-full bg-primary"
                                    style={{ width: 10, height: 10, top: 55, left: 55, boxShadow: "0 0 10px rgba(236,78,2,0.8)" }} />
                                {/* Symbol ring — static */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-mono text-primary/30 text-xs select-none"
                                        style={{ animation: isPlaying ? "spin 12s linear infinite reverse" : "none", display: "block" }}>
                                        ∫ λ ∞ ∂ ψ
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Track info */}
                        <div className="relative z-10 px-6 pb-3 text-center">
                            <p className="font-mono text-base font-bold tracking-widest uppercase text-primary"
                                style={{ letterSpacing: "0.15em" }}>{title}</p>
                            <p className="text-xs text-muted-foreground tracking-widest mt-0.5">{artist}</p>
                        </div>

                        {/* Waveform canvas */}
                        <div className="relative z-10 px-5 pb-4">
                            <canvas
                                ref={canvasRef}
                                width={200}
                                height={44}
                                className="w-full rounded-xl bg-muted/40"
                            />
                        </div>

                        {/* Play/Pause */}
                        <div className="relative z-10 flex justify-center pb-7">
                            <div className="relative">
                                {isPlaying && (
                                    <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: "1.4s" }} />
                                )}
                                <button onClick={togglePlay}
                                    className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90">
                                    {isPlaying
                                        ? <Pause size={18} className="text-primary-foreground" fill="currentColor" />
                                        : <Play size={18} className="text-primary-foreground translate-x-0.5" fill="currentColor" />}
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

                {/* ── Right: Work In Progress ── */}
                <div className="flex-1">
                    <WorkInProgressTool playing={isPlaying} />
                </div>

            </div>
        </div>
    );
}
