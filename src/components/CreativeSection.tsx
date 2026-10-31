import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/portfolio";
const portrait = profile.transitionPortrait;

const labels = [
  { t: "Networking", c: "left-[55%] top-[18%]" },
  { t: "Cybersecurity", c: "right-[8%] top-[10%]" },
  { t: "AI", c: "left-[42%] top-[6%]" },
  { t: "Software", c: "right-[35%] bottom-[-3.5rem]" },
  { t: "Systems", c: "right-[5%] bottom-[24%]" },
  { t: "Web", c: "right-[30%] bottom-[8%]" },
  { t: "Automation", c: "left-[28%] bottom-[-3.5rem]" },
  { t: "Cloud", c: "right-[8%] bottom-[-3.5rem]" },
];

const shards = Array.from({ length: 12 }, (_, i) => ({
  clip: [
    "polygon(0 0,40% 0,25% 45%,0 30%)",
    "polygon(40% 0,75% 0,55% 40%,25% 45%)",
    "polygon(75% 0,100% 0,100% 35%,55% 40%)",
    "polygon(0 30%,25% 45%,15% 70%,0 65%)",
    "polygon(25% 45%,55% 40%,60% 70%,15% 70%)",
    "polygon(55% 40%,100% 35%,100% 65%,60% 70%)",
    "polygon(0 65%,15% 70%,10% 100%,0 100%)",
    "polygon(15% 70%,60% 70%,45% 100%,10% 100%)",
    "polygon(60% 70%,100% 65%,100% 100%,45% 100%)",
    "polygon(40% 0,55% 0,48% 20%)",
    "polygon(85% 50%,100% 45%,100% 55%)",
    "polygon(5% 85%,20% 80%,15% 95%)",
  ][i],
}));

export function CreativeSection() {
  const root = useRef<HTMLDivElement>(null);
  const manifesto = useRef<HTMLElement>(null);
  const [revealedTags, setRevealedTags] = useState(0);

  useEffect(() => {
    const section = manifesto.current;
    if (!section) return;

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setRevealedTags(labels.length);
          return;
        }

        timers = labels.map((_, index) =>
          window.setTimeout(() => setRevealedTags(index + 1), index * 1000),
        );
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-c='line']", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-c='head']",
          start: "top 85%",
          end: "center 55%",
          scrub: 1,
        },
      });
      gsap.to("[data-c='line']:nth-child(2)", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-c='head']",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      // Fragmentation transition
      const pieces = gsap.utils.toArray<HTMLElement>("[data-c='shard']");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-c='transition']",
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        },
      });
      pieces.forEach((p, i) => {
        tl.to(
          p,
          {
            x: gsap.utils.random(-500, 500),
            y: gsap.utils.random(-400, 400),
            z: gsap.utils.random(-200, 400),
            rotate: gsap.utils.random(-90, 90),
            rotateX: gsap.utils.random(-60, 60),
            opacity: 0,
            ease: "power2.in",
          },
          i * 0.02,
        );
      });
      tl.from("[data-c='reveal']", { scale: 0.7, opacity: 0, ease: "power2.out" }, 0.2);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section ref={manifesto} className="relative overflow-hidden py-32 md:py-48">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-border" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-10 flex justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span>02 / Manifesto</span>
            <span>[ sys.online ]</span>
          </div>
          <h2 data-c="head" className="font-display relative z-10 text-[clamp(3rem,11vw,11rem)]">
            <span className="block overflow-hidden">
              <span data-c="line" className="block text-foreground">
                Where
              </span>
            </span>
            <span className="block overflow-hidden whitespace-nowrap">
              <span data-c="line" className="block">
                <span className="text-primary">Technology</span>{" "}
                <span className="text-stroke">meets</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-c="line" className="block text-primary-glow">
                Creativity
              </span>
            </span>
          </h2>
          {labels.map((l, i) => (
            <span
              key={l.t}
              data-c="label"
              className={`manifesto-tag glass absolute z-20 hidden rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:inline-block ${i < revealedTags ? "is-revealed" : ""} ${l.c}`}
            >
              <span className="mr-2 text-ember">0{i + 1}</span>
              {l.t}
            </span>
          ))}
        </div>
      </section>

      <section
        data-c="transition"
        className="relative h-svh overflow-hidden bg-deep [perspective:1200px]"
        aria-label="Transition"
      >
        <div
          data-c="reveal"
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary">03 / Entering</p>
          <p className="font-display mt-4 text-[clamp(3rem,10vw,9rem)] text-foreground">
            The Person
          </p>
          <p className="font-display text-[clamp(3rem,10vw,9rem)] text-stroke">Behind the Code</p>
        </div>
        {shards.map((s, i) => (
          <div
            key={i}
            data-c="shard"
            className="absolute inset-0 bg-gradient-to-b from-burgundy to-deep [transform-style:preserve-3d]"
            style={{ clipPath: s.clip }}
          >
            <img
              src={portrait}
              alt=""
              className="transition-portrait h-full w-full"
              loading="eager"
              decoding="async"
            />
            <div
              className="transition-portrait-light pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_var(--ember)] opacity-40" />
          </div>
        ))}
      </section>
    </div>
  );
}
