import React from "react";

export const metadata = {
    title: "Full Timeline | Namish.",
    description: "A comprehensive history of all projects and activities.",
};

const DEDICATED_TIMELINE_DATA = [
    {
        year: "2025",
        events: [
            { title: "Great Indian BUDGET", description: "Launched a comprehensive AI/ML platform for budget analysis.", url: "https://budget.greatindian.com" },
            { title: "VERO Prototype", description: "Began development of the VERO trust platform.", url: "https://vero.network" }
        ]
    },
    {
        year: "2024",
        events: [
            { title: "Sectograph Windows", description: "Architected and launched the Windows Widget.", url: "https://github.com/namish/sectograph" },
            { title: "Cardinal V3", description: "Entirely revamped the hybrid React + Three.js interface." }
        ]
    },
    {
        year: "2023",
        events: [
            { title: "CutieMeter", description: "Built the application balancing complex algorithms with UI." },
            { title: "Design Systems", description: "Deep dive into minimalist UI/UX paradigms." }
        ]
    },
    {
        year: "2022",
        events: [
            { title: "C++ & Algorithms", description: "Started competitive programming and low-level dev." },
            { title: "System Design basics", description: "Learned how distributed systems are architected." }
        ]
    }
];

export default function TimelinePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-24 px-4 sm:px-6 md:px-10">
            <div className="max-w-4xl w-full">

                <div className="mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        The Full <span className="text-primary border-b-4 border-primary">Archive</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        A detailed catalog of every project, experiment, and milestone along the journey. Not restricted by rigid structures, just the pure timeline of execution.
                    </p>
                </div>

                <div className="flex flex-col gap-16 md:gap-24 relative">
                    <div className="absolute left-[7px] md:left-[11px] top-4 bottom-0 w-[2px] bg-border z-0" />

                    {DEDICATED_TIMELINE_DATA.map((group, i) => (
                        <div key={i} className="flex flex-col gap-8 relative z-10 w-full pl-8 md:pl-16">
                            <h2 className="text-3xl font-black text-foreground relative flex items-center">
                                <span className="absolute -left-[32px] md:-left-[64px] w-4 h-4 rounded-full bg-background border-4 border-primary" />
                                {group.year}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 w-full mt-4">
                                {group.events.map((event, j) => (
                                    <div key={j} className="flex flex-col gap-2 group">
                                        {event.url ? (
                                            <a href={event.url} target="_blank" rel="noopener noreferrer" className="w-fit">
                                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 cursor-pointer">{event.title}</h3>
                                            </a>
                                        ) : (
                                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary/70">{event.title}</h3>
                                        )}
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
