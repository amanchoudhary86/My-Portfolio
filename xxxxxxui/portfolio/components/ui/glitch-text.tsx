"use client"

import { motion } from "framer-motion"

interface GlitchTextProps {
    text: string
    className?: string
}

export function GlitchText({ text, className }: GlitchTextProps) {
    return (
        <div className={`relative inline-block ${className}`}>
            <motion.span
                className="relative z-10"
                initial={{ x: 0 }}
                animate={{ x: [0, -2, 2, -1, 1, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    times: [0, 0.1, 0.2, 0.3, 0.4, 1],
                }}
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 -z-10 text-red-500 opacity-70"
                initial={{ x: 0 }}
                animate={{ x: [0, 2, -2, 1, -1, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    times: [0, 0.1, 0.2, 0.3, 0.4, 1],
                }}
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 -z-10 text-blue-500 opacity-70"
                initial={{ x: 0 }}
                animate={{ x: [0, -2, 2, -1, 1, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    times: [0, 0.1, 0.2, 0.3, 0.4, 1],
                }}
            >
                {text}
            </motion.span>
        </div>
    )
}
