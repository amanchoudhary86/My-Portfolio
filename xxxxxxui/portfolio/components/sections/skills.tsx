"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Award, Database, Cloud, Cpu } from "lucide-react"

const skills = [
    "Python (Proficient)",
    "AI/ML (Proficient)",
    "JAVA (Fundamental Awareness)",
    "Web Development (Fundamental Awareness)",
    "Cloud Computing (Novice)",
    "n8n (Novice)",
    "GIT/GitHub (Advanced)",
    "Flask & Django (Novice)",
    "IoT (Fundamental Awareness)",
]

const certifications = {
    "AI & Machine Learning": [
        { name: "OCI AI Foundations Associate", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0D744D1808EB47C40F739C349360F6689EE866A63D49AA43CDE695F31D7C328B", pdf: "/cert-oci-ai-foundations.pdf" },
        { name: "OCI Generative AI Professional", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=A2B24D44DDBD000904669BB8D30C719E0C2E67FD302C92308BEF1C8752A6CD40", pdf: "/cert-oci-gen-ai.pdf" },
        { name: "Oracle AI Vector Search Certified Professional", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=A67EF37418B028B1C40B110829FE85FB0029F14C66227B5ECD7C9CC04D0A5949", pdf: "/cert-oracle-vector-ai.pdf" },
        { name: "Gen AI Academy Completion Certificate", link: "https://certificate.hack2skill.com/user/genai5/2025H2S04GENAI-A500063" },
    ],
    "Cloud Computing": [
        { name: "OCI Foundations Associate", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=84E2B6091C028A9E62330949146FC34F033DDE7BB6B036DE8342D0AE3B811330", pdf: "/cert-oci-foundations.pdf" },
    ],
    "Graph Databases (Neo4j)": [
        { name: "Neo4j Certified Professional", link: "https://graphacademy.neo4j.com/c/87cbe9c3-869a-401d-8782-e2821292a556/" },
        { name: "Neo4j Fundamentals", link: "https://graphacademy.neo4j.com/c/3d15c575-307a-4813-a1c5-18d77c50eeb8/" },
        { name: "Neo4j Importing Data Fundamentals", link: "https://graphacademy.neo4j.com/c/6036edec-3210-437d-8ac4-778fe6e5a714/" },
        { name: "Neo4j Graph Data Modeling Fundamentals", link: "https://graphacademy.neo4j.com/c/27624456-e0d5-4691-b496-128d4b85ffa9/" },
        { name: "Cypher Fundamentals", link: "https://graphacademy.neo4j.com/c/89718e5c-13c8-4943-854e-43104208448f/" },
    ]
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export function Skills() {
    return (
        <section id="skills" className="py-16 md:py-24">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
                className="space-y-12"
            >
                <motion.div variants={item} className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Code className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-primary">Technical Arsenal</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="border-primary text-primary hover:bg-primary/10 text-sm py-1 px-3">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={item} className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Award className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-primary">Certifications</h2>
                    </div>

                    <div className="grid gap-8">
                        {Object.entries(certifications).map(([category, certs]) => (
                            <div key={category} className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary/80 flex items-center gap-2">
                                    {category === "AI & Machine Learning" && <Cpu className="h-5 w-5" />}
                                    {category === "Cloud Computing" && <Cloud className="h-5 w-5" />}
                                    {category === "Graph Databases (Neo4j)" && <Database className="h-5 w-5" />}
                                    {category}
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {certs.map((cert) => (
                                        <Card key={cert.name} className="border-primary/30 bg-card/30 hover:bg-card/50 transition-colors group">
                                            <CardContent className="p-4 flex flex-col gap-2">
                                                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">{cert.name}</span>
                                                <div className="flex gap-4 text-xs">
                                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                        View Badge
                                                    </a>
                                                    {'pdf' in cert && (
                                                        <a href={(cert as any).pdf} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                            View Certificate
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
