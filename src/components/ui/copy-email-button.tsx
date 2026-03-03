"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2 group relative"
        >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                {copied ? <Check strokeWidth={1.5} size={20} className="text-green-500 transition-all duration-300 scale-110 md:w-6 md:h-6" /> : <Mail strokeWidth={1.5} size={20} className="transition-all duration-300 md:w-6 md:h-6" />}
            </div>
            <span className="text-[10px] md:text-xs font-semibold">{copied ? "Copied!" : "Email"}</span>

            {/* Tooltip */}
            <div className={cn(
                "absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-3 py-1.5 rounded-md whitespace-nowrap pointer-events-none transition-all duration-300 shadow-xl",
                copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}>
                Copied email to clipboard
                {/* Pointer Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
            </div>
        </button>
    );
}
