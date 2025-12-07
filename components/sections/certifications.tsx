"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, CheckCircle2, Download } from "lucide-react"
import Link from "next/link"

// ... (imports remain the same)

const certifications = [
    {
        title: "Neo4j Certified Professional",
        issuer: "Neo4j",
        date: "July 13, 2025",
        url: "https://graphacademy.neo4j.com/c/87cbe9c3-869a-401d-8782-e2821292a556/",
        tags: ["Graph Database", "NoSQL", "Neo4j"],
    },
    {
        title: "OCI Generative AI Professional",
        issuer: "Oracle",
        date: "October 24, 2025",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=A2B24D44DDBD000904669BB8D30C719E0C2E67FD302C92308BEF1C8752A6CD40",
        tags: ["Generative AI", "Oracle Cloud", "LLMs"],
        pdf: "/certificates/oci-gen-ai-professional.pdf"
    },
    {
        title: "Oracle AI Vector Search Certified Professional",
        issuer: "Oracle",
        date: "October 24, 2025",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=A67EF37418B028B1C40B110829FE85FB0029F14C66227B5ECD7C9CC04D0A5949",
        tags: ["AI", "Vector Search", "RAG"],
        pdf: "/certificates/oracle-vector-ai-professional.pdf"
    },
    {
        title: "OCI AI Foundations Associate",
        issuer: "Oracle",
        date: "October 4, 2025",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0D744D1808EB47C40F739C349360F6689EE866A63D49AA43CDE695F31D7C328B",
        tags: ["AI", "Machine Learning", "Cloud"],
        pdf: "/certificates/oci-ai-foundations-associate.pdf"
    },
    {
        title: "OCI Foundations Associate",
        issuer: "Oracle",
        date: "October 31, 2025",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=84E2B6091C028A9E62330949146FC34F033DDE7BB6B036DE8342D0AE3B811330",
        tags: ["Cloud Infrastructure", "OCI", "Basics"],
        pdf: "/certificates/oci-foundations-associate.pdf"
    },
    // ... (rest of certifications remain the same)
    {
        title: "Cypher Fundamentals",
        issuer: "Neo4j",
        date: "July 6, 2025",
        url: "https://graphacademy.neo4j.com/c/89718e5c-13c8-4943-854e-43104208448f/",
        tags: ["Cypher", "Query Language", "Graph"],
    },
    {
        title: "Neo4j Graph Data Modeling Fundamentals",
        issuer: "Neo4j",
        date: "July 8, 2025",
        url: "https://graphacademy.neo4j.com/c/27624456-e0d5-4691-b496-128d4b85ffa9/",
        tags: ["Data Modeling", "Graph Theory", "Database"],
    },
    {
        title: "Neo4j Importing Data Fundamentals",
        issuer: "Neo4j",
        date: "July 8, 2025",
        url: "https://graphacademy.neo4j.com/c/6036edec-3210-437d-8ac4-778fe6e5a714/",
        tags: ["ETL", "Data Import", "Neo4j"],
    },
    {
        title: "Neo4j Fundamentals",
        issuer: "Neo4j",
        date: "July 6, 2025",
        url: "https://graphacademy.neo4j.com/c/3d15c575-307a-4813-a1c5-18d77c50eeb8/",
        tags: ["Graph DB", "Basics", "Neo4j"],
    },
    {
        title: "Gen AI Academy Completion Certificate",
        issuer: "Hack2Skill",
        date: "April 2025",
        url: "https://certificate.hack2skill.com/user/genai5/2025H2S04GENAI-A500063",
        tags: ["Generative AI", "Hackathon", "Skills"],
    },
]

export function Certifications() {
    return (
        <section id="certifications" className="w-full py-12 md:py-24 lg:py-32">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                        Certifications
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Professional credentials and technical achievements.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors group flex flex-col">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-primary" />
                                    <span className="text-sm text-muted-foreground">{cert.date}</span>
                                </div>
                                <Badge variant="outline" className="border-primary/50 text-primary group-hover:bg-primary/10 transition-colors">
                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-grow flex flex-col">
                                <div>
                                    <CardTitle className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                        {cert.title}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Issued by {cert.issuer}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {cert.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:text-primary transition-colors">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 flex gap-2">
                                    <Button variant="ghost" className="flex-1 justify-between group/btn hover:bg-primary/10" asChild>
                                        <Link href={cert.url} target="_blank">
                                            View Badge
                                            <ExternalLink className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                                        </Link>
                                    </Button>
                                    {/* Conditionally render download button if PDF exists */}
                                    {cert.pdf && (
                                        <Button variant="outline" className="flex-shrink-0 border-primary/20 text-primary hover:bg-primary/10" asChild>
                                            <a href={cert.pdf} download>
                                                <Download className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
