"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// 👇 EDIT YOUR CHATBOT FAQ DATA HERE
// Add as many entries as you like. The chatbot uses keyword
// matching — if the user's message contains any of the keywords,
// it returns the paired answer.
// ============================================================
const FAQ: { id: string; label: string; keywords: string[]; answer: string }[] = [
    {
        id: "hire",
        label: "Are you available for hire?",
        keywords: ["hire", "work", "job", "available", "freelance", "project", "collaborate"],
        answer:
            "I'm selectively open to freelance projects and full-time roles. I'm especially interested in AI/ML systems, trust infrastructure, and high-performance web apps. Drop me an email at namishshukla2@gmail.com and let's talk.",
    },
    {
        id: "vero",
        label: "What is VERO?",
        keywords: ["vero", "startup", "founder", "trust"],
        answer:
            "VERO is a platform I'm building to help people verify the authenticity of what they see online. It combines cryptographic attestation with a clean UX layer. Still early-stage, but shaping up quickly.",
    },
    {
        id: "budget",
        label: "Tell me about Great Indian BUDGET",
        keywords: ["budget", "great indian", "ai", "ml", "machine learning"],
        answer:
            "Great Indian BUDGET is an AI/ML platform launched in January 2025 for comprehensive budget analysis. It uses NLP to parse policy documents and surfaces insights in a digestible format.",
    },
    {
        id: "sectograph",
        label: "Sectograph & Cardinal V3?",
        keywords: ["sectograph", "windows", "widget", "cardinal"],
        answer:
            "Sectograph Windows is a productivity widget I architected for Windows. I also shipped Cardinal V3 — a full revamp of the hybrid React + Three.js interface. Find it on my GitHub.",
    },
    {
        id: "stack",
        label: "What's your tech stack?",
        keywords: ["react", "node", "python", "pytorch", "tensorflow", "stack", "tech"],
        answer:
            "My core stack: React, Node.js, Python, PyTorch, TensorFlow. Low-level C++ for competitive programming. Figma for design. I thrive at the intersection of performance and aesthetics.",
    },
    {
        id: "cp",
        label: "Competitive programming?",
        keywords: ["cp", "competitive", "programming", "codeforces", "leetcode"],
        answer:
            "CP is one of my oldest hobbies. I've been deep in C++ algorithms and problem-solving patterns since 2022. It's the mental gym that keeps everything else sharp.",
    },
    {
        id: "writing",
        label: "Where do you write?",
        keywords: ["medium", "write", "writing", "blog", "article", "youtube", "channel"],
        answer:
            "I write on Medium (@namishshukla2) about tech, building, and systems thinking. I also have a YouTube channel where I document my builds. Both linked in the footer.",
    },
    {
        id: "contact",
        label: "Best way to reach you?",
        keywords: ["email", "contact", "reach", "message", "talk", "instagram", "linkedin", "github", "social"],
        answer:
            "Best way → namishshukla2@gmail.com. I respond within 24–48h. For casual things, Instagram DMs (@zaratsu_ez) or LinkedIn both work.",
    },
];

const FALLBACK =
    "I don't have a direct answer for that — but email Namish at namishshukla2@gmail.com and he'll get back to you personally.";

function getAnswer(input: string): string {
    const lower = input.toLowerCase();
    for (const entry of FAQ) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
            return entry.answer;
        }
    }
    return FALLBACK;
}

interface Message {
    role: "user" | "bot" | "typing";
    text: string;
}

export function ContactChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "bot",
            text: "Hi! I'm Namish's assistant. Ask me anything — projects, skills, availability, or how to reach him.",
        },
    ]);
    const [input, setInput] = useState("");
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
    const [suggestions, setSuggestions] = useState<typeof FAQ>(FAQ.slice(0, 4));
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleAnswer = (userText: string, matchedId?: string) => {
        const answer = getAnswer(userText);

        // Add user message + typing indicator
        setMessages((prev) => [
            ...prev,
            { role: "user", text: userText },
            { role: "typing", text: "" },
        ]);

        // After typing delay, replace indicator with real answer
        const delay = 900 + Math.random() * 600;
        setTimeout(() => {
            setMessages((prev) => {
                const withoutTyping = prev.filter((m) => m.role !== "typing");
                return [...withoutTyping, { role: "bot", text: answer }];
            });

            // After another pause, surface follow-up suggestions
            setTimeout(() => {
                const newUsed = new Set(usedIds);
                if (matchedId) newUsed.add(matchedId);
                setUsedIds(newUsed);

                const remaining = FAQ.filter((f) => !newUsed.has(f.id)).slice(0, 3);
                setSuggestions(remaining);
            }, 1200);
        }, delay);
    };

    const send = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        // Find matching FAQ id for suggestion tracking
        const lower = trimmed.toLowerCase();
        const matched = FAQ.find((f) => f.keywords.some((kw) => lower.includes(kw)));
        handleAnswer(trimmed, matched?.id);
        setInput("");
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    const isTypingActive = messages.some((m) => m.role === "typing");

    return (
        <div className="flex flex-col h-full w-full min-h-0 md:min-h-[360px] md:max-h-[480px]">
            {/* Messages */}
            <div ref={containerRef} className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-3 pr-1 pb-2">
                {messages.map((msg, i) => (
                    <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                        {msg.role === "typing" ? (
                            <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                            </div>
                        ) : (
                            <div
                                className={cn(
                                    "max-w-[82%] text-sm leading-relaxed px-4 py-2.5 rounded-2xl whitespace-pre-line",
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-sm"
                                        : "bg-muted text-foreground rounded-bl-sm"
                                )}
                            >
                                {msg.text}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Follow-up suggestions */}
            {!isTypingActive && suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 py-2">
                    {suggestions.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => handleAnswer(s.label, s.id)}
                            className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/60 hover:text-primary text-muted-foreground transition-colors"
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="flex gap-2 pt-3 border-t border-border">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={isTypingActive}
                    placeholder={isTypingActive ? "Namish is typing..." : "Ask something..."}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50 disabled:opacity-50"
                />
                <button
                    onClick={send}
                    disabled={!input.trim() || isTypingActive}
                    className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-30 transition-opacity hover:opacity-90"
                >
                    <Send size={14} />
                </button>
            </div>
        </div>
    );
}
