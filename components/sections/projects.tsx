"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Github, ExternalLink, Bot, Mail, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { MouseEvent } from "react"

function HolographicCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

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
            className={`relative group ${className}`}
        >
            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute inset-4 rounded-xl bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors duration-500 pointer-events-none"
            />
            <div
                style={{ transform: "translateZ(80px)" }}
                className="relative h-full bg-black/80 backdrop-blur-xl border border-primary/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(57,255,20,0.1)] group-hover:border-primary/80 transition-colors duration-300 transform-gpu"
            >
                {}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ mixBlendMode: 'overlay' }} />

                {children}
            </div>
        </motion.div>
    )
}

export function Projects() {
    const projects = [
        {
            title: "Email Ham/Spam Classifier",
            description: "A machine learning model designed to classify emails as ham (legitimate) or spam, enhancing email security and organization.",
            link: "https://github.com/amanchoudhary86/Upflairs_Internship_Projects/tree/main/email_classification_model",
            tech: ["Python", "ML", "Scikit-learn"],
            image: "/projects/email-classifier.jpg",
            icon: <Mail className="h-10 w-10 text-primary mb-4" />
        },
        {
            title: "Email Automation using n8n",
            description: "An email automation system that detects opportunity-based messages and delivers instant alerts to students.",
            link: "https://github.com/amanchoudhary86/n8n-Email-Automation",
            tech: ["n8n", "Automation", "Workflow"],
            image: "/projects/n8n-automation.jpg",
            icon: <Database className="h-10 w-10 text-primary mb-4" />
        },
        {
            title: "Inventory Manager Bot",
            description: "A WhatsApp bot for managing inventory, allowing users to track stock levels and updates via a chat interface.",
            link: "https://github.com/amanchoudhary86/whatsapp-inventory-bot",
            tech: ["Python", "WhatsApp API", "Bot"],
            image: "/projects/inventory-bot.jpg",
            icon: <Bot className="h-10 w-10 text-primary mb-4" />
        }
    ]

    return (
        <section id="projects" className="py-24 space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Project Database</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    A collection of deployed systems.
                </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <HolographicCard key={index} className="h-full">
                        <div className="flex flex-col h-full">
                            {}
                            <div className="h-48 w-full relative overflow-hidden border-b border-primary/20 bg-black/50">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>

                            {}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors mt-auto"
                                >
                                    <Github className="h-4 w-4" /> View Source <ExternalLink className="h-3 w-3" />
                                </Link>
                            </div>
                        </div>
                    </HolographicCard>
                ))}
            </div>
        </section >
    )
}
