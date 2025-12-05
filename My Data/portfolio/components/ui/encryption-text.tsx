"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

interface EncryptionTextProps {
    text: string
    className?: string
    interval?: number // Kept for compatibility, but duration is derived
}

export function EncryptionText({ text, className }: EncryptionTextProps) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const displayText = useTransform(rounded, (latest) => {
        return text
            .split("")
            .map((letter, index) => {
                if (index < latest) {
                    return text[index]
                }
                return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
    })

    useEffect(() => {
        const controls = animate(count, text.length, {
            duration: 3, // Adjust duration as needed
            ease: "easeInOut",
            onUpdate: (latest) => {
                // Force re-render of random characters for unrevealed part
                // This is tricky with MotionValue. 
                // Actually, the transform runs on every frame if 'count' changes.
                // But we want random chars to change even if 'count' stays same? 
                // No, count changes every frame.
            }
        })
        return controls.stop
    }, [count, text.length])

    return (
        <motion.span className={className}>
            {displayText}
        </motion.span>
    )
}
