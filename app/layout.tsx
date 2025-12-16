import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { MorphingNavigation } from "@/components/ui/morphing-navigation";
import { Terminal, User, Code, Mail, FileText, Briefcase, Award } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Choudhary | Portfolio",
  description: "Portfolio of Aman Choudhary - AI/ML Enthusiast",
};

import { CustomCursor } from "@/components/ui/custom-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-mono text-foreground`}
      >
        <CustomCursor />
        <MorphingNavigation
          links={[
            { id: "home", label: "Home", href: "/", icon: <Terminal className="w-4 h-4" /> },
            { id: "about", label: "About", href: "#about", icon: <User className="w-4 h-4" /> },
            { id: "experience", label: "Experience", href: "#experience", icon: <Briefcase className="w-4 h-4" /> },
            { id: "skills", label: "Skills", href: "#skills", icon: <Code className="w-4 h-4" /> },
            { id: "projects", label: "Projects", href: "#projects", icon: <FileText className="w-4 h-4" /> },
            { id: "certifications", label: "Certifications", href: "#certifications", icon: <Award className="w-4 h-4" /> },

          ]}
        />
        <main className="container mx-auto px-4 pt-8 pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
