"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, Code, Mail, Award, X } from "lucide-react"

export interface MorphingNavigationLink {
    id: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
}

export interface MorphingNavigationProps {
    links: MorphingNavigationLink[];
    scrollThreshold?: number;
    enablePageBlur?: boolean;
    theme?: "dark" | "light" | "glass" | "custom";
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    initialTop?: number;
    compactTop?: number;
    animationDuration?: number;
    className?: string;
    onLinkClick?: (link: MorphingNavigationLink) => void;
    onMenuToggle?: (isOpen: boolean) => void;
    enableSmoothTransitions?: boolean;
    customHamburgerIcon?: React.ReactNode;
    disableAutoMorph?: boolean;
}

export const MorphingNavigation: React.FC<MorphingNavigationProps> = ({
    links,
    scrollThreshold = 100,
    enablePageBlur = true,
    theme = "glass",
    backgroundColor,
    textColor,
    borderColor,
    initialTop = 30,
    compactTop = 20,
    animationDuration = 0.5,
    className,
    onLinkClick,
    onMenuToggle,
    enableSmoothTransitions = true,
    customHamburgerIcon,
    disableAutoMorph = false,
}) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getThemeStyles = useCallback(() => {
        switch (theme) {
            case "dark":
                return {
                    nav: "bg-black/90 border-gray-800",
                    text: "text-white",
                    button: "bg-black/50 border-gray-700",
                };
            case "light":
                return {
                    nav: "bg-white/90 border-gray-200",
                    text: "text-gray-900",
                    button: "bg-white/50 border-gray-300",
                };
            case "custom":
                return {
                    nav: backgroundColor ? "" : "bg-white/5 border-white/10",
                    text: textColor ? "" : "text-white",
                    button: "bg-black/30 border-white/10",
                };
            case "glass":
            default:
                return {
                    nav: "bg-black/80 backdrop-blur-xl border-primary/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]",
                    text: "text-primary",
                    button: "bg-black/40 border-primary/20",
                };
        }
    }, [theme, backgroundColor, textColor]);

    const themeStyles = getThemeStyles();

    useEffect(() => {
        
        if (isMenuOpen) return;

        if (disableAutoMorph && !isMobile) return;
        const handleScroll = () => {
            if (isMobile) {
                setIsSticky(true);
            } else {
                setIsSticky(window.scrollY >= scrollThreshold);
            }
        };
        
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollThreshold, disableAutoMorph, isMobile, isMenuOpen]);

    const handleMenuToggle = () => {
        const open = !isMenuOpen;
        setIsMenuOpen(open);
        onMenuToggle?.(open);
    };

    const handleLinkClick = (link: MorphingNavigationLink, e: React.MouseEvent) => {
        e.preventDefault();
        setIsMenuOpen(false);
        onLinkClick?.(link);

        setTimeout(() => {
            if (link.href === "/" || link.href === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            if (link.href.startsWith("#")) {
                const target = document.querySelector(link.href);
                if (target) {
                    const navOffset = 85;
                    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - navOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                } else {
                    window.location.href = link.href;
                }
            } else {
                window.location.href = link.href;
            }
        }, 100);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node) && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    const customStyles = {
        backgroundColor: theme === "custom" ? backgroundColor : undefined,
        color: theme === "custom" ? textColor : undefined,
        borderColor: theme === "custom" ? borderColor : undefined,
    };

    
    const isDesktopNormal = !isMobile && !isSticky && !isMenuOpen;
    const isCompact = (isMobile || isSticky) && !isMenuOpen;
    const isOpen = isMenuOpen; 

    return (
        <>
            <AnimatePresence>
                {enablePageBlur && isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>

            <motion.header
                className={cn("fixed z-50 w-full pointer-events-none", className)}
                initial={false}
                animate={{
                    top: isOpen ? "50%" : (isMobile ? compactTop : isSticky ? compactTop : initialTop),
                    y: isOpen ? "-50%" : 0,
                }}
                transition={{ duration: animationDuration, ease: "easeInOut" }}
            >
                <div className="relative w-full flex justify-center">
                    <motion.nav
                        ref={navRef}
                        className={cn(
                            "flex items-center backdrop-blur-md border pointer-events-auto overflow-hidden relative",
                            themeStyles.nav,
                            themeStyles.text,
                            {
                                "justify-between": isOpen,
                                "justify-center": !isOpen,
                            }
                        )}
                        style={customStyles}
                        initial={false}
                        animate={{
                            width: isOpen
                                ? "350px"
                                : (isCompact ? 60 : 800),
                            height: isOpen
                                ? "auto"
                                : 60,
                            borderRadius: isOpen ? 24 : 9999,
                        }}
                        transition={{
                            
                            
                            width: { duration: animationDuration, ease: "easeInOut", delay: isOpen ? 0 : 0 }, 
                            height: { duration: animationDuration, ease: "easeInOut", delay: isOpen ? animationDuration * 0.5 : 0 }, 
                            borderRadius: { duration: animationDuration },
                        }}
                    >
                        {}
                        <AnimatePresence mode="popLayout">
                            {isDesktopNormal && (
                                <motion.div
                                    className="flex items-center gap-2 px-6"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {links.map((link, i) => (
                                        <a
                                            key={link.id}
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(link, e)}
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-bold lowercase tracking-wide hover:text-[#39ff14] transition-colors whitespace-nowrap"
                                        >
                                            {link.icon && <span className="inline-block">{link.icon}</span>}
                                            {link.label}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {}
                        <AnimatePresence>
                            {(isCompact || isOpen) && (
                                <motion.div
                                    className={cn(
                                        "absolute top-0 right-0 p-1",
                                        isOpen ? "w-full flex justify-end pr-4 pt-4" : "w-full h-full flex items-center justify-center"
                                    )}
                                >
                                    <button
                                        onClick={handleMenuToggle}
                                        className={cn(
                                            "rounded-full outline-none flex items-center justify-center hover:bg-white/10 transition-colors z-50",
                                            isOpen ? "w-10 h-10" : "w-[50px] h-[50px]"
                                        )}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1.5">
                                            <span
                                                className={cn(
                                                    "block h-0.5 bg-current transition-all duration-300",
                                                    isOpen ? "w-5 rotate-45 translate-y-2" : "w-5"
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "block h-0.5 bg-current transition-all duration-300",
                                                    isOpen ? "w-5 opacity-0" : "w-5"
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "block h-0.5 bg-current transition-all duration-300",
                                                    isOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"
                                                )}
                                            />
                                        </div>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    className="w-full flex flex-col items-center py-12 px-6 space-y-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                >
                                    {links.map((link) => (
                                        <a
                                            key={link.id}
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(link, e)}
                                            className="flex items-center gap-4 text-xl font-bold lowercase tracking-wide hover:text-[#39ff14] hover:scale-105 transition-all w-full justify-center p-2 rounded-lg hover:bg-white/5"
                                        >
                                            {link.icon && <span className="inline-block scale-125">{link.icon}</span>}
                                            {link.label}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.nav>
                </div >
            </motion.header >
        </>
    );
};

export default MorphingNavigation;
