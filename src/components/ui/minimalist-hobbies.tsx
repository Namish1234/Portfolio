"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

// ============================================================================
// 👇 👉 EDIT YOUR HOBBIES AND INTERESTS DATA HERE 👈 👇
// ============================================================================
const hobbiesData = [
    {
        title: "Marathons",
        description: "Endurance training is my ultimate physical outlet. The strict discipline and mental stamina required for running directly translate to architecting long-term software projects.",
        link: "https://strava.com",
        linkText: "View activity"
    },
    {
        title: "YouTube",
        description: "I actively document my programming journey and share tech insights. Content creation is my way of giving back while cementing my own understanding.",
        link: "https://www.youtube.com/@aniway5658",
        linkText: "Watch videos"
    },
    {
        title: "Learning",
        description: "I am constantly expanding my horizons beyond my immediate tech stack. Whether exploring new algorithms, frameworks, or architectural optimizations.",
        link: "https://github.com/Namish1234?tab=repositories",
        linkText: "Explore repositories"
    },
    {
        title: "Competitive\nCode",
        description: "I spend downtime optimizing code to execute in absolute milliseconds. Exploring intricate data structures and competing in algorithmic challenges is my kind of puzzle.",
        link: "https://codeforces.com/profile/Zaratsu",
        linkText: "See rankings"
    }
];

const SYMBOLS = ["+", "×", "-", "·", "✦", "✛", "※", "⍿", "≈", "∑", "∞", "∆", "◊", "★"];

function PatternBackground() {
    const [grid, setGrid] = useState<string>("");

    useEffect(() => {
        const generateGrid = () => {
            let res = "";
            for (let i = 0; i < 600; i++) {
                res += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            }
            return res;
        };
        setGrid(generateGrid());

        const interval = setInterval(() => {
            setGrid(prev => {
                if (!prev) return prev;
                let chars = prev.split('');
                // Shimmering effect by swapping a small number of random characters continuously
                for (let i = 0; i < 40; i++) {
                    let idx = Math.floor(Math.random() * chars.length);
                    chars[idx] = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                }
                return chars.join('');
            });
        }, 120);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute inset-0 w-full h-full overflow-hidden text-muted-foreground/30 font-mono text-[10px] md:text-sm tracking-[0.6em] leading-[1.8em] select-none break-all p-4 lg:p-6 pointer-events-none"
        >
            {grid}
        </div>
    );
}

export function MinimalistHobbies() {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-10 items-center py-6 md:py-8">

            {/* Left Side: Headings 1, 2, 3, 4 */}
            <div className="w-full md:w-5/12 flex flex-col gap-4 md:gap-5 pt-2">
                {hobbiesData.map((hobby, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                            "group text-left transition-all duration-500 flex items-start gap-3 md:gap-4",
                            activeIndex === index
                                ? "opacity-100"
                                : "opacity-30 hover:opacity-70"
                        )}
                    >
                        <span className="text-lg md:text-xl font-mono tracking-tighter text-muted-foreground pt-1 hidden sm:block">
                            {(index + 1).toString().padStart(2, '0')}
                        </span>

                        <span className={cn(
                            "text-2xl md:text-3xl lg:text-4xl font-black tracking-tight transition-colors duration-500 whitespace-pre-line leading-[1.1]",
                            activeIndex === index ? "text-primary" : "text-foreground"
                        )}>
                            {hobby.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Right Side: Description Area with L-Shaped Image Cutout! */}
            <div className="w-full md:w-7/12 h-[260px] md:h-[320px] relative mt-8 md:mt-0">

                {/* 1) The L-shape base (the animated pattern that wraps the bottom and right) */}
                <div className="absolute inset-0 w-full h-full rounded-[1.5rem] overflow-hidden bg-muted/5 border border-border/20">
                    <PatternBackground />
                </div>

                {/* 2) The Top-Left Text Cutout (Matches body background perfectly)
                    Hides the top-left portion of the underlying image, leaving only the right/bottom parts to form an 'L'. */}
                <div className="absolute top-0 left-0 w-[70%] h-[70%] bg-background z-10 flex flex-col justify-end pr-6 pb-6 rounded-br-[3rem]">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            <p className="text-base md:text-lg text-foreground font-medium leading-[1.4] tracking-tight">
                                {hobbiesData[activeIndex].description}
                            </p>

                            {hobbiesData[activeIndex].link && (
                                <a
                                    href={hobbiesData[activeIndex].link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center gap-2 text-xs md:text-sm font-bold text-primary w-fit uppercase tracking-wider"
                                >
                                    <span>{hobbiesData[activeIndex].linkText || "Explore"}</span>
                                    <ArrowRight size={14} className="group-hover:opacity-70 transition-opacity" />
                                </a>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 3) Inner curve smoothing trick using an absolute pseudoelement circle to sculpt the inner elbow of the 'L' cleanly  */}
                <div className="absolute top-[70%] left-[70%] w-10 h-10 bg-transparent rounded-tl-[2rem] shadow-[-16px_-16px_0_0_var(--color-background)] -translate-x-full -translate-y-full z-10 pointer-events-none" />
            </div>

        </div>
    );
}
