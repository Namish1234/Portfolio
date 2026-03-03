"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const words = ["Namish.", "Zaratsu."];
const TYPING_SPEED = 150;
const DELETING_SPEED = 100;
const PAUSE_DURATION = 3000;

export function TypewriterFooter({ className }: { className?: string }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const word = words[currentWordIndex];

        if (isDeleting) {
            if (currentText === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                timer = setTimeout(() => { }, 500); // small pause before typing next
            } else {
                timer = setTimeout(() => {
                    setCurrentText((prev) => prev.slice(0, -1));
                }, DELETING_SPEED);
            }
        } else {
            if (currentText === word) {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, PAUSE_DURATION);
            } else {
                timer = setTimeout(() => {
                    setCurrentText(word.slice(0, currentText.length + 1));
                }, TYPING_SPEED);
            }
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex]);

    return (
        <div className={cn("flex flex-col items-center justify-center mb-6 h-8", className)}>
            <h3 className="text-2xl font-bold flex items-center justify-center text-center">
                {currentText}
                <span className="inline-block animate-pulse font-normal ml-[2px] text-primary">|</span>
            </h3>
        </div>
    );
}
