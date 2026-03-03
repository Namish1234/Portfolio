"use client";
import React, { useEffect, useRef } from "react";

interface CursorProps {
    size?: number;
    active?: boolean;
}

export const Cursor: React.FC<CursorProps> = ({ size = 60, active = false }) => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX - size / 2}px, ${e.clientY - size / 2}px)`;
            }
        };
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [size]);

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-50 shadow-xl"
            style={{
                width: size,
                height: size,
                opacity: active ? 1 : 0,
                top: 0,
                left: 0,
                transition: "opacity 0.2s ease",
            }}
            aria-hidden="true"
        />
    );
};
