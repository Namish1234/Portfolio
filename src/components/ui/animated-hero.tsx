"use client";

import { WordRotate } from "./word-rotate";

function Hero() {

    return (
        <div className="w-full relative z-10 flex min-h-screen items-center justify-center pt-24 md:pt-32 pb-16 overflow-hidden">
            {/* Subtle background mesh disappearing towards the center */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-10 max-w-7xl flex flex-col items-center justify-center text-center">

                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight md:leading-[1.1]">
                        <span className="text-foreground block mb-[5px]">Hey! I am Namish, a</span>
                        <div className="h-[2em] relative flex justify-center items-start w-full">
                            <WordRotate
                                className="text-primary"
                                words={["CP Addict", "Vibe Developer", "Gym Freak", "Vero's Founder"]}
                            />
                        </div>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-4">
                        I am building VERO, a platform that helps you trust what you see. Other than that, I just love finding adventure. My Moto? <span className="text-primary">"Just Do It"</span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export { Hero };
