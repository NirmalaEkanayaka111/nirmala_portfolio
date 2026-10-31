import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CreativeSection } from "@/components/CreativeSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { RobotSection } from "@/components/RobotSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection, CuriositySection } from "@/components/ContactSection";
import { setLenis } from "@/lib/scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nirmala — ICT Undergraduate & Developer Portfolio" },
      { name: "description", content: "Portfolio of Nirmala, an ICT undergraduate at the University of Kelaniya exploring software, networking and cybersecurity." },
      { property: "og:title", content: "Nirmala — ICT Undergraduate & Developer Portfolio" },
      { property: "og:description", content: "Software development, computer networking and cybersecurity — a cinematic developer portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: import("lenis").default | null = null;
    const raf = (t: number) => lenis?.raf(t * 1000);
    import("lenis").then(({ default: Lenis }) => {
      const l = new Lenis({ lerp: 0.1 });
      lenis = l;
      setLenis(l);
      l.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    });
    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <main className="grain relative">
      <Navbar />
      <Hero />
      <CreativeSection />
      <AboutSection />
      <ProjectsSection />
      <RobotSection />
      <SkillsSection />
      <CuriositySection />
      <ContactSection />
    </main>
  );
}
