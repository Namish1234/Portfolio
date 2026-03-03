"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Namish."];
const TYPING_SPEED = 120;
const DELETING_SPEED = 80;
const PAUSE_DURATION = 600;

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [sequenceComplete, setSequenceComplete] = useState(false);

    // Initial check to see if we've already shown the loader this session
    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("portfolio_loaded");
        if (hasLoaded) {
            setIsLoading(false);
        }
    }, []);

    // Main typing effect logic
    useEffect(() => {
        if (!isLoading || sequenceComplete) return;

        let timer: NodeJS.Timeout;
        const word = words[currentWordIndex];

        if (isDeleting) {
            if (currentText === "") {
                setIsDeleting(false);
                if (currentWordIndex === words.length - 1) {
                    // Reached the end of the sequence
                    setSequenceComplete(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        sessionStorage.setItem("portfolio_loaded", "true");
                    }, 500);
                } else {
                    // Move to next word
                    setCurrentWordIndex((prev) => prev + 1);
                    timer = setTimeout(() => { }, 300);
                }
            } else {
                timer = setTimeout(() => {
                    setCurrentText((prev) => prev.slice(0, -1));
                }, DELETING_SPEED);
            }
        } else {
            if (currentText === word) {
                // Pause at the end of typing a word
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, PAUSE_DURATION);
            } else {
                // Continue typing
                timer = setTimeout(() => {
                    setCurrentText(word.slice(0, currentText.length + 1));
                }, TYPING_SPEED);
            }
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, isLoading, sequenceComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
                >
                    <div className="flex flex-col items-center justify-center h-8">
                        <h3 className="text-2xl font-bold flex items-center justify-center text-center text-foreground">
                            {currentText}
                            <span className="inline-block animate-pulse font-normal ml-[2px] text-primary">|</span>
                        </h3>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
