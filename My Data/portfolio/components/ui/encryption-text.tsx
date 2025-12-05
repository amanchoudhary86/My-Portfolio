"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

interface EncryptionTextProps {
    text: string
    className?: string
    interval?: number
}

export function EncryptionText({ text, className, interval = 50 }: EncryptionTextProps) {
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
        let iteration = 0
        const timer = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index]
                        }
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("")
            )

            if (iteration >= text.length) {
                clearInterval(timer)
            }

            iteration += 1 / 3
        }, interval)

        return () => clearInterval(timer)
    }, [text, interval])

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.span>
    )
}
