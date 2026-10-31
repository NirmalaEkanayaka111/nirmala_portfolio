import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Robot } from "./Robot";
import { mindPanels, mind } from "@/data/portfolio";

export function RobotSection() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-r='p0']",
        { y: 200, z: -300, rotateY: 25, opacity: 0 },
        {
          y: -120,
          z: 0,
          rotateY: -10,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom top", scrub: 1 },
        },
      );
      gsap.fromTo(
        "[data-r='p1']",
        { y: 320, z: -400, rotateY: -25, opacity: 0 },
        {
          y: -60,
          z: 0,
          rotateY: 10,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom top", scrub: 1 },
        },
      );
      gsap.from("[data-r='head'] > span", {
        opacity: 0.1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "[data-r='head']",
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden md:min-h-[130vh] bg-background py-24">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="bg-ember-glow absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">06 / The Mind</p>
        <h2
          data-r="head"
          className="font-display relative z-10 mt-4 text-[clamp(2.75rem,7vw,7rem)]"
        >
          {mind.heading.map((l, i) => (
            <span key={l} className={`block ${i === 1 ? "text-primary" : ""}`}>
              {l}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-md text-sm text-muted-foreground">{mind.text}</p>
      </div>
      <Robot className="relative mx-auto mt-4 h-[50vh] w-full max-w-3xl md:-mt-24 md:h-[70vh]" />
      <div className="relative mx-auto mt-6 flex md:pointer-events-none md:absolute md:inset-x-0 md:bottom-32 md:mt-0 max-w-7xl flex-col gap-6 px-6 md:flex-row md:justify-between [perspective:1200px]">
        {mindPanels.map((p, i) => (
          <div
            key={p.title}
            data-r={`p${i}`}
            className="glass w-full md:pointer-events-auto rounded-3xl p-6 md:w-80"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Panel 0{i + 1}</p>
            <h3 className="font-heading mt-2 text-xl font-extrabold">{p.title}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {p.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
