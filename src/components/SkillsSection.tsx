import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, exploring } from "@/data/portfolio";

export function SkillsSection() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-s='reveal']").forEach((el) => {
        gsap.from(el.children, { y: 50, opacity: 0, stagger: 0.07, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.from("[data-s='word']", {
        opacity: 0.08, stagger: 0.3, ease: "none",
        scrollTrigger: { trigger: "[data-s='phil']", start: "top 80%", end: "bottom 50%", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={root} className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">07 / Skills & Interests</p>
        <h2 className="font-display mt-4 text-[clamp(3rem,8vw,8rem)]">
          Code is my medium.<br /><span className="text-stroke">Curiosity</span> <span className="text-primary">is my engine.</span>
        </h2>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-3">
          {skills.map((g, i) => (
            <div key={g.title} className="bg-background p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-lg font-extrabold uppercase tracking-wide">{g.title}</h3>
                <span className="text-xs text-primary">0{i + 1}</span>
              </div>
              <ul data-s="reveal" className="mt-8 space-y-1">
                {g.items.map((it) => (
                  <li key={it} className="font-display group flex cursor-default items-center gap-3 text-4xl text-muted-foreground transition-colors hover:text-foreground">
                    <span className="h-px w-0 bg-primary transition-all duration-500 group-hover:w-6" />{it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-28 grid gap-16 md:grid-cols-2">
          <div data-s="phil" className="font-display text-[clamp(4rem,10vw,9rem)]">
            {["Learn.", "Build.", "Break.", "Improve."].map((w, i) => (
              <span key={w} data-s="word" className={`block ${i === 2 ? "text-primary" : ""}`}>{w}</span>
            ))}
          </div>
          <div className="self-end">
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Currently exploring
            </p>
            <ul data-s="reveal" className="divide-y border-y">
              {exploring.map((e, i) => (
                <li key={e} className="flex items-center justify-between py-4 font-heading text-xl">
                  {e}<span className="text-xs text-muted-foreground">/{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
