"use client"

import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full py-8 border-t border-primary/20 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col items-center gap-4">
                <div className="flex gap-6 text-muted-foreground z-10">
                    <Link
                        href="https://github.com/amanchoudhary86"
                        target="_blank"
                        className="hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    >
                        <Github className="h-6 w-6" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/aman-choudhary-57116a266/?skipRedirect=true"
                        target="_blank"
                        className="hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    >
                        <Linkedin className="h-6 w-6" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                    © {new Date().getFullYear()} Aman Choudhary. All systems operational.
                </p>
            </div>
        </footer>
    )
}
