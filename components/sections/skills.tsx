"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Skill {
    name: string
    level: string
    percentage: number
}

interface SkillCategory {
    title: string
    skills: Skill[]
}

const skillCategories: SkillCategory[] = [
    {
        title: "Languages",
        skills: [
            { name: "Python", level: "Intermediate", percentage: 65 },
            { name: "JAVA", level: "Fundamental", percentage: 40 },
        ]
    },
    {
        title: "Core Domains",
        skills: [
            { name: "AI/ML", level: "Intermediate", percentage: 60 },
            { name: "Web Development", level: "Fundamental", percentage: 40 },
            { name: "Cloud Computing", level: "Fundamental", percentage: 30 },
            { name: "IoT", level: "Fundamental", percentage: 35 },
        ]
    },
    {
        title: "Tools & Frameworks",
        skills: [
            { name: "GIT/GitHub", level: "Advanced", percentage: 75 },
            { name: "n8n", level: "Fundamental", percentage: 30 },
            { name: "Django", level: "Fundamental", percentage: 35 },
        ]
    }
]

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {}
            <div className="relative h-full bg-black/40 border border-primary/20 p-4 rounded-lg backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]">

                {}
                <div className="relative z-10 flex flex-col h-full space-y-3">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors font-mono">
                            {skill.name}
                        </h4>
                        <span className="text-xs text-primary/60 font-mono">
                            {skill.percentage}%
                        </span>
                    </div>

                    <div className="mt-auto space-y-1">
                        <div className="text-[10px] font-mono text-gray-400">
                            <span>Status:</span>
                            <span className="text-primary ml-2">{skill.level}</span>
                        </div>

                        {}
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                            <motion.div
                                className="h-full bg-primary shadow-[0_0_8px_#39ff14]"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percentage}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                            />
                        </div>
                    </div>
                </div>

                {}
                {isHovered && (
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
                )}
            </div>
        </motion.div>
    )
}

export function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {}
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

                </motion.div>

                <div className="space-y-12">
                    {skillCategories.map((category, catIndex) => (
                        <div key={category.title} className="space-y-6">
                            <motion.h3
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: catIndex * 0.2 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold text-white text-center mb-6"
                            >
                                {category.title}
                            </motion.h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.skills.map((skill, index) => (
                                    <SkillCard key={index} skill={skill} index={index} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
