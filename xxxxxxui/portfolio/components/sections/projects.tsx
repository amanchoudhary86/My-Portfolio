"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Github, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
    {
        title: "Email Ham/Spam Classifier",
        description: "A machine learning model to classify emails as ham or spam.",
        link: "https://github.com/amanchoudhary86/Upflairs_Internship_Projects/tree/main/email_classification_model",
        tags: ["Python", "ML", "Scikit-learn"],
        image: "/project-email-classifier.jpg"
    },
    {
        title: "Email Automation using n8n",
        description: "Automated email workflows using n8n workflow automation tool.",
        link: "https://github.com/amanchoudhary86/n8n-Email-Automation",
        tags: ["n8n", "Automation", "Email"],
        image: "/project-n8n.jpg"
    },
    {
        title: "Inventory Manager Bot",
        description: "A WhatsApp bot for managing inventory.",
        link: "https://github.com/amanchoudhary86/whatsapp-inventory-bot",
        tags: ["Python", "WhatsApp API", "Bot"],
        image: "/project-inventory-bot.jpg"
    },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
}

export function Projects() {
    return (
        <section id="projects" className="py-16 md:py-24">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Projects</h2>
                </div>

                <motion.div variants={container} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <motion.div key={project.title} variants={item}>
                            <Card className="border-primary/50 bg-card/50 backdrop-blur flex flex-col justify-between overflow-hidden group h-full">
                                <div className="relative h-48 w-full overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                                    <CardDescription className="text-foreground/60">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" /> View Code
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
