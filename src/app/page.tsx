import { Hero } from "@/components/ui/animated-hero";
import { CentralTimeline } from "@/components/ui/central-timeline";
import { MinimalistHobbies } from "@/components/ui/minimalist-hobbies";
import { HeroDitheringCard as ContactSection } from "@/components/ui/hero-dithering-card";
import { ActivitiesStack } from "@/components/ui/connoisseur-stack-interactor";
import { TypewriterFooter } from "@/components/ui/typewriter-footer";
import { Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { FooterPattern } from "@/components/ui/footer-pattern";

export default function Home() {
  const timelineData = [
    {
      title: "Great Indian BUDGET",
      description: "Launched a comprehensive AI/ML platform. Constantly pushing boundaries and building the future of Web Applications.",
      date: "January 2025 - Present",
      url: "https://budget.greatindian.com" // You can change this to the real project link
    },
    {
      title: "Sectograph Windows",
      description: "Architected the Sectograph Windows widget and launched Cardinal V3, entirely revamping the hybrid React + Three.js interface.",
      date: "November 2024",
      url: "https://github.com/namish/sectograph"
    },
    {
      title: "CutieMeter",
      description: "Built the application to merge complex algorithms with user-friendly interfaces, blending AI with beautiful minimalist design.",
      date: "August 2023",
      url: "https://cutiemeter.com"
    },
    {
      title: "Core Fundamentals",
      description: "Started my journey into competitive programming and low-level C++. Dove deep into algorithms and system design.",
      date: "February 2022",
      url: "https://github.com/namish"
    },
  ];



  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full relative">
        <Hero />
      </section>

      {/* Activities Stack */}
      <section className="w-full relative overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 xl:gap-32">

          {/* Left Side: Revolving Circles */}
          <div className="w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1 relative z-10 mt-8 lg:mt-0">
            <ActivitiesStack />
          </div>

          {/* Right Side: Setup & Activities Text */}
          {/* 👇 👉 YOU CAN EDIT YOUR TEXT AND ACTIVITIES HERE 👈 👇 */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 lg:order-2 z-10">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight md:leading-[1.1] mb-6">
              My Setup & <br className="hidden lg:block" /> <span className="text-primary">Activities</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-4">
              Some things I love doing, and tools that I have learned. Some hobbies and interests.
            </p>
            {/* 👇 👉 EDIT YOUR HASHTAGS HERE 👈 👇 */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start mt-4">
              {["Development", "Design", "Machine Learning", "Writing", "Gaming"].map((tag) => (
                <span key={tag} className="text-base font-medium text-muted-foreground hover:text-primary transition-colors cursor-default">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Timeline Journey */}
      <section id="journey" className="w-full mt-24 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center text-center w-full mb-4">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight md:leading-[1.1]">
              History of <span className="text-primary">Execution</span>
            </h1>
          </div>
        </div>
        <CentralTimeline data={timelineData} />
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="w-full relative py-20 px-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center text-center w-full mb-12">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight md:leading-[1.1]">
              Beyond <span className="text-primary">the Code</span>
            </h1>
          </div>
        </div>
        <MinimalistHobbies />
      </section>

      {/* Testimonials (Hidden for now until component is restored) */}
      {/* 
      <section className="w-full py-24 bg-card/40">
        <div className="max-w-7xl mx-auto px-4 flex justify-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-center">What People Say</h1>
        </div>
        <TestimonialsEditorial />
      </section>
      */}

      {/* Contact CTA */}
      <section id="contact" className="w-full py-20 px-4 flex justify-center">
        <ContactSection />
      </section>

      <footer className="w-full py-16 mt-10 bg-card relative">
        <FooterPattern />
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative z-10">

          {/* Left Side: Sitemap */}
          <div className="flex flex-col items-center md:items-start gap-4 flex-1">
            <h4 className="text-lg font-bold text-foreground mb-2">Navigation</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground text-center md:text-left">
              <Link href="/" className="hover:text-primary transition-colors w-fit mx-auto md:mx-0">Home</Link>
              <a href="#journey" className="hover:text-primary transition-colors w-fit mx-auto md:mx-0">Journey</a>
              <a href="#hobbies" className="hover:text-primary transition-colors w-fit mx-auto md:mx-0">Beyond Code</a>
              <Link href="/timeline" className="hover:text-primary transition-colors w-fit mx-auto md:mx-0">Detailed Timeline</Link>
              <a href="/gallery" className="hover:text-primary transition-colors w-fit mx-auto md:mx-0">Gallery</a>
              <a href="#contact" className="hover:text-primary transition-colors w-fit mx-auto md:mx-0">Hire Me</a>
            </div>
          </div>

          {/* Center: Brand / Typewriter */}
          <div className="flex flex-col items-center justify-center md:pt-4 flex-1">
            <TypewriterFooter className="mb-0" />
          </div>

          {/* Right Side: Social links */}
          <div className="flex flex-col items-center md:items-end gap-4 flex-1">
            <h4 className="text-lg font-bold text-foreground mb-2">Connect</h4>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end max-w-[320px]">
              <a href="https://github.com/Namish1234" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary/10">
                  <Github strokeWidth={1.5} size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] md:text-xs font-semibold">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/namish-shukla-a919a03a2/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary/10">
                  <Linkedin strokeWidth={1.5} size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] md:text-xs font-semibold">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/zaratsu_ez/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary/10">
                  <Instagram strokeWidth={1.5} size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] md:text-xs font-semibold">Instagram</span>
              </a>
              <CopyEmailButton email="namishshukla2@gmail.com" />
              <a href="https://medium.com/@namishshukla2" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary/10">
                  <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.16-.53 5.72-1.17 5.72-.64 0-1.17-2.56-1.17-5.72s.53-5.72 1.17-5.72C23.47 6.28 24 8.84 24 12" />
                  </svg>
                </div>
                <span className="text-[10px] md:text-xs font-semibold">Medium</span>
              </a>
            </div>

            <p className="text-xs text-foreground/50 mt-6 text-center md:text-right max-w-[320px]">
              © {new Date().getFullYear()} Namish. All rights reserved. Designed with precision and minimalism.
            </p>
          </div>
        </div>
      </footer>
    </div >
  );
}
