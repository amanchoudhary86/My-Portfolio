"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, GraduationCap } from "lucide-react"
import { MouseEvent } from "react"

function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative"
        >
            {children}
        </motion.div>
    )
}

export function About() {
    return (
        <section id="about" className="py-16 md:py-24 space-y-24 w-full max-w-[90%] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="flex flex-col items-center space-y-8">
                        <div className="flex items-center gap-4">
                            <User className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight text-primary">System Identity</h2>
                        </div>
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_20px_rgba(0,255,0,0.5)] mx-auto md:mx-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/profile.png"
                                alt="Aman Choudhary"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                        </div>
                    </div>

                    <Card className="border-primary/50 bg-card/50 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary/80">User Profile: Aman Choudhary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                <span className="font-bold text-foreground">Core Function:</span> AI/ML Enthusiast
                            </p>
                            <p>
                                <span className="font-bold text-foreground">Current Status:</span> Final Year B.Tech (CSE) @ Amity University Rajasthan
                            </p>
                            <p>
                                <span className="font-bold text-foreground">Role:</span> Management Head @ RAIoT (Robotics, Automation and Internet of Things) Club
                            </p>
                            <p>
                                <span className="font-bold text-foreground">Directives:</span> Passionate about exploring future technologies, with a primary focus on advancing AI/ML. Dedicated to creating value-driven solutions that impact real life. I thrive on engineering systems that scale with ambition and solve problems that actually matter.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

        </section>
    )
}
