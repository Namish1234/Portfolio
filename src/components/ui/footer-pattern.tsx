"use client";

import { useEffect, useState } from "react";

const SYMBOLS = [
    "∞", "◈", "⟨⟩", "//", "∂", "λ", "∑", "⊗", "≡", "∇",
    "01", "⊕", "⌘", "∫", "≈", "π", "Δ", "⌥", "⊂", "ψ",
    "{}", "[]", "→", "⇒", "∈", "∀", "¬", "⊥", "⊤", "⌛",
];

const POSITIONS = [
    { top: "12%", left: "8%" },
    { top: "25%", left: "18%" },
    { top: "60%", left: "12%" },
    { top: "75%", left: "5%" },
    { top: "10%", left: "40%" },
    { top: "50%", left: "35%" },
    { top: "80%", left: "45%" },
    { top: "15%", left: "62%" },
    { top: "45%", left: "72%" },
    { top: "70%", left: "65%" },
    { top: "20%", left: "85%" },
    { top: "55%", left: "90%" },
    { top: "85%", left: "80%" },
];

function SymbolNode({ position, initialIndex }: { position: { top: string; left: string }; initialIndex: number }) {
    const [symbol, setSymbol] = useState(SYMBOLS[initialIndex]);
    const [opacity, setOpacity] = useState(0.06);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setOpacity(0.08 + Math.random() * 0.1);

        const randomDelay = Math.random() * 4000;
        const randomInterval = 3000 + Math.random() * 5000;

        const start = setTimeout(() => {
            const interval = setInterval(() => {
                setSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
                setOpacity(0.08 + Math.random() * 0.1);
            }, randomInterval);
            return () => clearInterval(interval);
        }, randomDelay);

        return () => clearTimeout(start);
    }, []);

    if (!mounted) return null;

    return (
        <span
            className="absolute select-none pointer-events-none font-mono text-foreground transition-all duration-[2000ms] ease-in-out text-xs md:text-sm"
            style={{ top: position.top, left: position.left, opacity }}
        >
            {symbol}
        </span>
    );
}

export function FooterPattern() {
    return (
        <div className="absolute -top-[200px] left-0 right-0 h-[calc(100%+200px)] overflow-visible pointer-events-none -z-0" aria-hidden="true">
            {/* Grid mesh: wide oval fade — broader band, more diffuse */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.06]"
                style={{
                    maskImage: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 25%, black 52%, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 25%, black 52%, transparent 78%)',
                }}
            />

            {POSITIONS.map((pos, i) => (
                <SymbolNode key={i} position={pos} initialIndex={i % SYMBOLS.length} />
            ))}
        </div>
    );
}
