"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MenuItem {
    name: string;
    image: string;
}

const defaultItems: MenuItem[] = [
    { name: "C++", image: "/logos/c++.png" },
    { name: "Figma", image: "/logos/figma.png" },
    { name: "League of Legends", image: "/logos/league-of-legends.png" },
    { name: "Medium Writer", image: "/logos/medium.png" },
    { name: "Node.js", image: "/logos/nodejs.png" },
    { name: "Python", image: "/logos/python.png" },
    { name: "PyTorch", image: "/logos/pytorch.png" },
    { name: "React", image: "/logos/react.png" },
    { name: "TensorFlow", image: "/logos/tensorflow.png" },
];

export const ActivitiesStack = ({
    items = defaultItems,
    className
}: { items?: MenuItem[]; className?: string }) => {

    const innerRing = items.slice(0, 4);
    const outerRing = items.slice(4);

    return (
        <div className={cn("relative flex h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full flex-col items-center justify-center overflow-visible bg-transparent group/orbit z-10", className)}>

            {/* Scale wrapper for responsiveness */}
            <div className="absolute inset-0 flex items-center justify-center scale-[0.55] sm:scale-75 md:scale-90 lg:scale-95 xl:scale-100">

                {/* Central element */}
                <div className="absolute w-32 h-32 rounded-full bg-primary/20 blur-[40px] pointer-events-none" />
                <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center backdrop-blur-md z-10 shadow-xl">
                    <span className="text-3xl lg:text-4xl font-black tracking-tighter text-zinc-800 dark:text-zinc-200">N.</span>
                </div>

                {/* Inner Ring */}
                <OrbitRing radius={140} duration={30} items={innerRing} reverse={false} />

                {/* Outer Ring */}
                <OrbitRing radius={260} duration={45} items={outerRing} reverse={true} />

            </div>

            <style>{`
                @keyframes orbit {
                    0% { transform: translate(-50%, -50%) rotate(0deg) translateX(var(--radius)) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg) translateX(var(--radius)) rotate(-360deg); }
                }
                @keyframes orbit-reverse {
                    0% { transform: translate(-50%, -50%) rotate(360deg) translateX(var(--radius)) rotate(-360deg); }
                    100% { transform: translate(-50%, -50%) rotate(0deg) translateX(var(--radius)) rotate(0deg); }
                }
                .animate-orbit {
                    animation: orbit var(--duration) linear infinite;
                }
                .animate-orbit-reverse {
                    animation: orbit-reverse var(--duration) linear infinite;
                }
                .group\\/orbit:hover .animate-orbit, 
                .group\\/orbit:hover .animate-orbit-reverse {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

const OrbitRing = ({ radius, duration, items, reverse }: { radius: number, duration: number, items: MenuItem[], reverse: boolean }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* The dashed orbital path */}
            <div
                style={{ width: radius * 2, height: radius * 2 }}
                className="absolute flex items-center justify-center rounded-full border border-dashed border-zinc-300 dark:border-zinc-500/50"
            />

            {items.map((item, i) => {
                const progress = i / items.length;
                return (
                    <div
                        key={item.name}
                        className={cn(
                            "absolute top-1/2 left-1/2 z-20 pointer-events-auto cursor-pointer",
                            reverse ? "animate-orbit-reverse" : "animate-orbit"
                        )}
                        style={{
                            '--radius': `${radius}px`,
                            '--duration': `${duration}s`,
                            animationDelay: `calc(${duration}s * -1 * ${progress})`
                        } as React.CSSProperties}
                        title={item.name}
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md p-3 md:p-4 group/item hover:scale-110 hover:shadow-xl hover:border-black/30 dark:hover:border-white/30 transition-all duration-300">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain filter grayscale opacity-70 transition-all duration-300 group-hover/item:grayscale-0 group-hover/item:opacity-100 dark:invert dark:group-hover/item:invert-0"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

