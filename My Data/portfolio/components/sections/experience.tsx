"use client"

import { ScrollTimeline, TimelineEvent } from "@/components/ui/scroll-timeline"
import { GraduationCap, Trophy, Users, Code } from "lucide-react"

export function Experience() {
    const events: TimelineEvent[] = [
        {
            year: "2024 — Present",
            title: "Management Head",
            subtitle: "RAIoT Club (Robotics, Automation and IoT)",
            description: "Leading the core panel, organizing hackathons, and managing club activities and workshops.",
            icon: <Users className="h-4 w-4 mr-2 text-primary" />,
        },
        {
            year: "2022 — Present",
            title: "Bachelor of Technology (CSE)",
            subtitle: "Amity University Rajasthan",
            description: "Final-year B.Tech (CSE) student with a strong interest in emerging technologies.",
            icon: <GraduationCap className="h-4 w-4 mr-2 text-primary" />,
        },
        {
            year: "2022 — 2024",
            title: "Senior Developer",
            subtitle: "RAIoT Club",
            description: "Contributed to technical projects, mentored juniors, and developed IoT solutions.",
            icon: <Code className="h-4 w-4 mr-2 text-primary" />,
        },
        {
            year: "2022",
            title: "Secondary Education",
            subtitle: "Swami Keshwanand Convent School",
            description: "Completed secondary education with a science and mathematics background.",
            icon: <GraduationCap className="h-4 w-4 mr-2 text-primary" />,
        },
        {
            year: "2020",
            title: "Primary Education",
            subtitle: "Daffodils World School",
            description: "Completed foundational education.",
            icon: <GraduationCap className="h-4 w-4 mr-2 text-primary" />,
        },
    ]

    return (
        <section id="experience" className="w-full py-12 md:py-24 bg-background">
            <ScrollTimeline
                events={events}
                title="My Journey"
                subtitle="Education & Experience"
                animationOrder="staggered"
                cardAlignment="alternating"
                cardEffect="glow"
                connectorStyle="dashed"
                progressIndicator={true}
            />
        </section>
    )
}
