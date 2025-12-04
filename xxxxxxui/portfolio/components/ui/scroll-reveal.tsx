"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"],
    })

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1])

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
