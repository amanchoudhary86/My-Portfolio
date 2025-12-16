"use client"

import { useState } from "react"

import { EncryptionText } from "@/components/ui/encryption-text"
import { GlitchText } from "@/components/ui/glitch-text"
import { MatrixRain } from "@/components/ui/matrix-rain"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Download, Mail } from "lucide-react"
import Link from "next/link"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { GridScan } from "@/components/ui/grid-scan"
import { Certifications } from "@/components/sections/certifications"
import { Footer } from "@/components/sections/footer"
import { Loader } from "@/components/ui/loader"
import { TrialButton } from "@/components/ui/trial-button"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="flex flex-col items-center w-full relative">
      <Loader onLoadingComplete={() => setIsLoaded(true)} />
      <div className="fixed inset-0 z-0">
        {}
      </div>
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 text-center w-full py-12 md:py-24 pointer-events-none">
        <MatrixRain />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 z-10 pointer-events-auto"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-primary">
              <GlitchText text="Aman Choudhary" />
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {isLoaded && (
              <EncryptionText
                text="AI/ML Enthusiast | Tech Explorer"
                interval={30}
                className="text-foreground/80"
              />
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 z-10 pointer-events-auto"
        >
          <Link href="#contact">
            <TrialButton>
              Contact Me <Mail className="w-4 h-4" />
            </TrialButton>
          </Link>
          <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
            <Link href="/My_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <Download className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

      </section>

      <div className="w-full space-y-24 text-left pointer-events-none relative z-10">
        <ScrollReveal className="pointer-events-auto w-full">
          <About />
        </ScrollReveal>
        <ScrollReveal className="pointer-events-auto w-full">
          <Experience />
        </ScrollReveal>
        <ScrollReveal className="pointer-events-auto container max-w-screen-xl px-4 mx-auto">
          <Skills />
        </ScrollReveal>
        <ScrollReveal className="pointer-events-auto w-full max-w-[90%] mx-auto">
          <Projects />
        </ScrollReveal>
        <ScrollReveal className="pointer-events-auto w-full max-w-[90%] mx-auto">
          <Certifications />
        </ScrollReveal>
        <ScrollReveal className="pointer-events-auto container max-w-screen-xl px-4 mx-auto">
          <Contact />
        </ScrollReveal>
      </div>
      <ScrollReveal className="pointer-events-auto w-full relative z-10">
        <Footer />
      </ScrollReveal>
    </div >
  )
}
