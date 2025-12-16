"use client"

import { useEffect, useState } from "react"
import { motion, animate } from "framer-motion"

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

interface EncryptionTextProps {
    text: string
    className?: string
    interval?: number
}

export function EncryptionText({ text, className }: EncryptionTextProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [revealProgress, setRevealProgress] = useState(0)

    useEffect(() => {
        setIsMounted(true)
        const controls = animate(0, text.length, {
            duration: 2.5,
            ease: "easeInOut",
            onUpdate: (latest) => {
                setRevealProgress(latest)
            }
        })
        return controls.stop
    }, [text.length])

    if (!isMounted) {
        return <span className={className}> </span>
    }

    const currentIndex = Math.floor(revealProgress)
    const isComplete = currentIndex >= text.length

    return (
        <span className={className}>
            {}
            {text.slice(0, currentIndex)}

            {}
            {!isComplete && (
                <span className="bg-[#39ff14] text-black inline-block w-[1ch] align-middle h-[1.2em] relative -top-[0.1em] leading-none animate-pulse">
                    {chars[Math.floor(Math.random() * chars.length)]}
                </span>
            )}

            {}
            <span className="opacity-50">
                {text
                    .slice(currentIndex + 1)
                    .split("")
                    .map(() => chars[Math.floor(Math.random() * chars.length)])
                    .join("")}
            </span>
        </span>
    )
}
