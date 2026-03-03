"use client";

import React, { useState, Suspense, lazy, Component, ErrorInfo, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ContactChatbot } from "./contact-chatbot"
import { Mail, ArrowLeft, Copy, Check } from "lucide-react"

class ShaderErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode, fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_: Error) { return { hasError: true }; }
    componentDidCatch(error: Error, _: ErrorInfo) { console.warn("Shader error caught:", error); }
    render() {
        if (this.state.hasError) return <>{this.props.fallback}</>;
        return <>{this.props.children}</>;
    }
}

const Dithering = lazy(() =>
    import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

function EmailPanel({ onBack }: { onBack: () => void }) {
    const [copied, setCopied] = useState(false);
    const email = "namishshukla2@gmail.com";

    const copy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-start justify-center h-full px-8 py-10 gap-6">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft size={14} /> Back
            </button>

            <div>
                <p className="text-xs font-mono text-primary/80 uppercase tracking-widest mb-3">Send an email</p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                    Let's talk<br />directly.
                </h3>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                I check my inbox regularly and typically respond within 24–48 hours. Serious inquiries only.
            </p>

            <div className="flex flex-col gap-3 w-full">
                <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors w-fit"
                >
                    <Mail size={15} />
                    Open in mail app
                </a>
                <button
                    onClick={copy}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors text-sm w-fit"
                >
                    {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                    {copied ? "Copied!" : email}
                </button>
            </div>
        </div>
    );
}

export function HeroDitheringCard() {
    const [isHovered, setIsHovered] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [mobileTab, setMobileTab] = useState<"email" | "bot">("email")

    return (
        <section className="pt-4 pb-8 w-full flex justify-center items-center px-4 md:px-6">
            <div
                className="w-full max-w-7xl relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative overflow-hidden rounded-[48px] border border-border bg-card shadow-sm min-h-[520px] md:min-h-[560px]">

                    {/* Shader Background — always present */}
                    <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
                            <ShaderErrorBoundary fallback={<div className="absolute inset-0 bg-muted/10" />}>
                                <Dithering
                                    colorBack="#00000000"
                                    colorFront="#EC4E02"
                                    shape="warp"
                                    type="4x4"
                                    speed={isHovered ? 0.6 : 0.2}
                                    className="size-full"
                                    minPixelRatio={1}
                                />
                            </ShaderErrorBoundary>
                        </div>
                    </Suspense>

                    {/* Default Hero State */}
                    <AnimatePresence>
                        {!isExpanded && (
                            <motion.div
                                key="hero"
                                className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                            >
                                <div className="max-w-xl mx-auto flex flex-col items-center">
                                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        Looking for a top tier developer?
                                    </div>

                                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground mb-6 leading-[1.05]">
                                        Let's build, <br />
                                        <span className="text-foreground/80">something great.</span>
                                    </h2>

                                    <p className="text-muted-foreground text-base md:text-lg max-w-md mb-10 leading-relaxed">
                                        Reach out and let's craft an unparalleled web or desktop experience together.
                                    </p>

                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-primary/20"
                                    >
                                        <span className="relative z-10">Get in touch</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Expanded Split State */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                key="expanded"
                                className="absolute inset-0 z-10 flex flex-col md:flex-row bg-background/30 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                            >
                                {/* Mobile Toggle */}
                                <div className="md:hidden flex justify-center pt-6 pb-2 w-full z-20 shrink-0">
                                    <div className="flex bg-muted/50 p-1 rounded-full border border-border/50">
                                        <button
                                            onClick={() => setMobileTab("email")}
                                            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${mobileTab === "email" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            Email
                                        </button>
                                        <button
                                            onClick={() => setMobileTab("bot")}
                                            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${mobileTab === "bot" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            Chatbot
                                        </button>
                                    </div>
                                </div>

                                {/* Left: Email Panel */}
                                <motion.div
                                    className={`flex-1 ${mobileTab === "email" ? "flex" : "hidden"} md:flex border-b md:border-b-0 md:border-r border-border/40 md:bg-background/50 md:backdrop-blur-md min-h-0`}
                                    initial={{ x: -40, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
                                >
                                    <EmailPanel onBack={() => setIsExpanded(false)} />
                                </motion.div>

                                {/* Right: Chatbot Panel */}
                                <motion.div
                                    className={`flex-1 ${mobileTab === "bot" ? "flex" : "hidden"} md:flex flex-col px-6 md:px-8 pb-6 pt-2 md:py-10 gap-3 md:bg-background/30 md:backdrop-blur-md min-h-0`}
                                    initial={{ x: 40, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
                                >
                                    <p className="hidden md:block text-xs font-mono text-primary/80 uppercase tracking-widest">Ask the bot</p>
                                    <p className="hidden md:block text-sm text-muted-foreground mb-1">Have a question? I'll answer for Namish.</p>
                                    <ContactChatbot />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
