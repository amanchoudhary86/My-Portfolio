"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
    year: string
    title: string
    subtitle: string
    description?: string
    index: number
}

function TimelineItem({ year, title, subtitle, description, index }: TimelineItemProps) {
    // Even index (0, 2...) -> Content on Left
    // Odd index (1, 3...) -> Content on Right (md:flex-row-reverse)

    const isReverse = index % 2 !== 0
    const initialX = isReverse ? 50 : -50

    return (
        <motion.div
            initial={{ opacity: 0, x: initialX }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row gap-4 md:gap-8 items-center ${isReverse ? "md:flex-row-reverse" : ""
                }`}
        >
            <div className="flex-1 w-full md:w-auto text-center md:text-left">
                <div className={`p-6 rounded-lg border border-primary/20 bg-card/30 backdrop-blur hover:border-primary/50 transition-colors ${isReverse ? "md:text-right" : "md:text-left"
                    }`}>
                    <span className="text-primary font-mono text-sm mb-2 block">{year}</span>
                    <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
                    <p className="text-muted-foreground font-medium mb-2">{subtitle}</p>
                    {description && <p className="text-sm text-muted-foreground/80">{description}</p>}
                </div>
            </div>

            <div className="relative flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_#0f0]" />
                <div className="absolute top-4 bottom-[-100%] w-0.5 bg-primary/20 -z-10 last:hidden" />
            </div>

            <div className="flex-1 w-full md:w-auto hidden md:block" />
        </motion.div>
    )
}

export function Timeline() {
    const education = [
        {
            year: "2022 — Present",
            title: "Bachelor of Technology (CSE)",
            subtitle: "Amity University Rajasthan",
            description: "Final Year Student. Specializing in AI/ML."
        },
        {
            year: "2022",
            title: "Secondary Education",
            subtitle: "Swami Keshwanand Convent School",
            description: "Completed with focus on Science and Mathematics."
        },
        {
            year: "2020",
            title: "Primary Education",
            subtitle: "Daffodils World School",
            description: "Foundation years."
        }
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block" />
            {education.map((item, index) => (
                <TimelineItem key={index} {...item} index={index} />
            ))}
        </div>
    )
}
