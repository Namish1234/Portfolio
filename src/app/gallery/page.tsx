"use client";
import { Cursor } from "@/components/ui/inverted-cursor";
import { WordRotate } from "@/components/ui/word-rotate";
import { MusicVisualizer } from "@/components/ui/music-visualizer";
import { useState } from "react";

export default function GalleryPage() {
    const [cursorActive, setCursorActive] = useState(false);

    return (
        <div className="relative z-10 w-full min-h-screen bg-background text-foreground pt-32 pb-20 overflow-hidden">
            <Cursor size={80} active={cursorActive} />

            {/* Background mesh — same as hero */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)] pointer-events-none" />

            <main className="flex flex-col items-center justify-center w-full">
                {/* Header text zone — cursor-none + hero-matched typography */}
                <div
                    onMouseEnter={() => setCursorActive(true)}
                    onMouseLeave={() => setCursorActive(false)}
                    className="container mx-auto px-4 md:px-10 max-w-7xl flex flex-col items-center justify-center text-center cursor-none select-none"
                >
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight md:leading-[1.1]">
                            <span className="text-foreground block mb-[5px]">A space for</span>
                            <div className="h-[2em] relative flex justify-center items-start w-full">
                                <WordRotate
                                    className="text-primary"
                                    words={["Visual Stories", "Exploration", "Moments", "Architecture", "Art & Code"]}
                                />
                            </div>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-4">
                            A collection of concepts, coded architectures, and domains of expertise.
                            Move your mouse to <span className="text-primary">explore the contrast.</span>
                        </p>
                    </div>
                </div>

                {/* Music visualizer section */}
                <MusicVisualizer
                    src="/audio/track.mp3"
                    title="Melody#01"
                    artist="Namish"
                />
            </main>
        </div>
    );
}
