import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { profile } from "@/data/portfolio";
import heroBackground from "@/assets/hero back.jpg";
import heroPortrait from "@/assets/hero 1.png";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .from(".hero-reference-portrait", { opacity: 0, duration: 1.1 })
        .from(
          [".hero-reference-name", ".hero-reference-copy"],
          { opacity: 0, y: 10, duration: 0.65, stagger: 0.12 },
          0.3,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="hero-section relative isolate overflow-hidden">
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-background pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="hero-reference-atmosphere pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="hero-reference-glow pointer-events-none absolute" aria-hidden="true" />
      <div className="hero-reference-portrait pointer-events-none absolute" aria-hidden="true">
        <div className="hero-reference-float absolute inset-0">
          <img
            src={heroPortrait}
            alt={`Portrait of ${profile.name}`}
            width={1366}
            height={768}
            fetchPriority="high"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="hero-reference-content pointer-events-none absolute inset-0">
        <h1 className="hero-reference-name font-display">{profile.name.toUpperCase()}</h1>
        <div className="hero-reference-copy">
          <p className="hero-reference-kicker">Curious by nature</p>
          <p className="hero-reference-role">Software Developer</p>
          <ul className="hero-reference-tags" aria-label="Areas of interest">
            <li>Ideas</li>
            <li>Interfaces</li>
            <li>Code</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
