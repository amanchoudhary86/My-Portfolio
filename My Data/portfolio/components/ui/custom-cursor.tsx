"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    // Calculate offsets to center the circles
    // Inner circle is 10px (w-2.5), so offset is -5
    // Outer circle is 20px (w-5), so offset is -10
    const cursorXInner = useTransform(cursorXSpring, (x) => x - 5)
    const cursorYInner = useTransform(cursorYSpring, (y) => y - 5)
    const cursorXOuter = useTransform(cursorXSpring, (x) => x - 10)
    const cursorYOuter = useTransform(cursorYSpring, (y) => y - 10)

    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Track the raw mouse position (center)
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [cursorX, cursorY])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorXInner,
                    translateY: cursorYInner,
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-5 h-5 border border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    translateX: cursorXOuter,
                    translateY: cursorYOuter,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                }}
            />
        </>
    )
}
