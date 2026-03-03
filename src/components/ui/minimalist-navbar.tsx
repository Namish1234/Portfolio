"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: 'Home', url: '/' },
    { name: 'Journey', url: '/#journey' },
    { name: 'Gallery', url: '/gallery' },
    { name: 'Contact', url: '/#contact' }
];

export function MinimalistNavbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold tracking-tighter text-lg">
                    Namish.
                </Link>

                <nav className="flex items-center gap-6">
                    <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.url}
                                    className="transition-colors text-muted-foreground hover:text-primary"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    )}

                    {/* Mobile Menu Toggle button */}
                    <button
                        className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
                    >
                        <ul className="flex flex-col py-4 px-6 gap-2 text-sm font-medium">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.url}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-3 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
