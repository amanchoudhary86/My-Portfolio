"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface Skill {
    name: string
    level: string
    percentage: number
    category: string
}

const skills: Skill[] = [
    { name: "Python", level: "Intermediate", percentage: 65, category: "Language" },
    { name: "AI/ML", level: "Intermediate", percentage: 60, category: "Core" },
    { name: "GIT/GitHub", level: "Above Intermediate", percentage: 75, category: "Tool" },
    { name: "JAVA", level: "Familiar + Basics", percentage: 40, category: "Language" },
    { name: "Web Dev", level: "Basics + Familiarity", percentage: 40, category: "Web" },
    { name: "Flask & Django", level: "Basics", percentage: 35, category: "Framework" },
    { name: "Cloud Computing", level: "Basics", percentage: 30, category: "Infra" },
    { name: "n8n", level: "Basics", percentage: 30, category: "Automation" },
    { name: "IoT", level: "Familiarity + Basics", percentage: 35, category: "Hardware" },
]

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cyber Card Container */}
            <div className="relative h-full bg-black/40 border border-primary/30 p-6 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]">

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(57,255,20,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors font-mono">
                            {skill.name}
                        </h3>
                        <span className="text-xs text-primary/60 border border-primary/30 px-2 py-1 rounded font-mono">
                            {skill.category}
                        </span>
                    </div>

                    <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                            <span>Proficiency</span>
                            <span className="text-primary">{skill.level}</span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                            <motion.div
                                className="h-full bg-primary shadow-[0_0_10px_#39ff14]"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Glitch Overlay on Hover */}
                {isHovered && (
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none animate-pulse" />
                )}
            </div>
        </motion.div>
    )
}

export function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary tracking-tighter glitch-text" data-text="Technical Arsenal">
                        Technical Arsenal
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm md:text-base">
                        // SYSTEM.SCAN_COMPLETE: DETECTED_CAPABILITIES
                        <br />
                        // LOADING_MODULES...
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
