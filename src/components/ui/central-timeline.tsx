"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface TimelineProject {
    title: string;
    description: string;
    date: string;
    url?: string;
}

export const CentralTimeline = ({ data }: { data: TimelineProject[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yOne = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const yTwo = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const yThree = useTransform(scrollYProgress, [0, 1], [0, 400]);

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className="relative w-full py-10 md:py-20 overflow-hidden flex flex-col items-center">

            {/* Abstract Pixel/Dot Grid Background pattern */}
            <motion.div
                style={{ y: yOne, opacity }}
                className="absolute left-[5%] md:left-[10%] top-[10%] w-32 h-32 md:w-56 md:h-56 opacity-10 pointer-events-none select-none"
            >
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_2px,transparent_2px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
            </motion.div>

            <motion.div
                style={{ y: yTwo, opacity }}
                className="absolute right-[2%] md:right-[8%] top-[40%] w-40 h-40 md:w-64 md:h-64 opacity-10 pointer-events-none select-none"
            >
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_2px,transparent_2px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            </motion.div>

            <motion.div
                style={{ y: yThree, opacity }}
                className="absolute left-[15%] md:left-[20%] top-[70%] w-24 h-24 md:w-48 md:h-48 opacity-10 pointer-events-none select-none"
            >
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_2px,transparent_2px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
            </motion.div>

            {/* Main Content */}
            <div className="relative max-w-5xl mx-auto w-full px-4 flex flex-col items-center">

                {/* Central Line */}
                <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2 z-0" />

                <div className="flex flex-col gap-12 md:gap-16 w-full z-10 relative">
                    {data.map((item, index) => (
                        <div key={index} className="flex relative items-center justify-center w-full">
                            {/* Marker */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary z-20 shadow-[0_0_0_4px_var(--background)] ring-1 ring-border" />

                            {/* Left Side */}
                            <div className={`w-[48%] md:w-[45%] pr-6 md:pr-16 text-right ${index % 2 !== 0 ? 'opacity-0 invisible' : ''}`}>
                                {index % 2 === 0 && (
                                    <ProjectCard item={item} />
                                )}
                            </div>

                            {/* Separator block for middle line */}
                            <div className="w-[4%] md:w-[10%]" />

                            {/* Right Side */}
                            <div className={`w-[48%] md:w-[45%] pl-6 md:pl-16 text-left ${index % 2 === 0 ? 'opacity-0 invisible' : ''}`}>
                                {index % 2 !== 0 && (
                                    <ProjectCard item={item} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Fixed/Sticky Button */}
                <div className="mt-20 md:mt-32 w-full flex justify-end md:pr-4">
                    <Link href="/timeline" className="group flex items-center gap-3 px-4 py-2 text-lg font-bold tracking-tight text-muted-foreground hover:text-primary transition-colors duration-500 relative z-30">
                        <span>Explore Full Timeline</span>
                        <ArrowRight size={20} className="transition-transform duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

const ProjectCard = ({ item }: { item: TimelineProject }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-2"
        >
            <span className="text-xs font-mono text-primary/80">{item.date}</span>
            <h3 className="text-lg md:text-2xl font-bold tracking-tight text-foreground">{item.title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </motion.div>
    );
};
