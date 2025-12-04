"use client"

import { EncryptionText } from "@/components/ui/encryption-text"
import { GlitchText } from "@/components/ui/glitch-text"
import { MatrixRain } from "@/components/ui/matrix-rain"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 text-center w-full py-12 md:py-24">
        <MatrixRain />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 z-10"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-primary">
              <GlitchText text="Aman Choudhary" />
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            <EncryptionText
              text="AI/ML Enthusiast | Tech Explorer"
              interval={30}
              className="text-foreground/80"
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 z-10"
        >
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#contact">
              Contact Me <Mail className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
            <Link href="/My_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <Download className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex gap-6 text-muted-foreground z-10"
        >
          <Link href="https://github.com/amanchoudhary86" target="_blank" className="hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </motion.div>
      </section>

      <div className="w-full space-y-24 pb-24 text-left container max-w-screen-xl px-4">
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>
    </div>
  )
}
