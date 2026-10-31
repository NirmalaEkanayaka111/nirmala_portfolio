import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, X, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { resumeSmoothScroll, stopSmoothScroll } from "@/lib/scroll";

export function ProjectsSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const projectTrigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const scrollPosition = useRef<number | null>(null);
  const resumeFrame = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${dist()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-p='card']").forEach((card) => {
        gsap.to(card, {
          ease: "none",
          keyframes: { scale: [0.88, 1, 0.88], rotateY: [18, 0, -18] },
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    });
    return () => {
      mm.revert();
      if (resumeFrame.current !== null) cancelAnimationFrame(resumeFrame.current);
      if (scrollPosition.current !== null) {
        resumeSmoothScroll(scrollPosition.current);
        scrollPosition.current = null;
      }
    };
  }, []);

  return (
    <Dialog
      open={Boolean(open)}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          if (resumeFrame.current !== null) cancelAnimationFrame(resumeFrame.current);
          resumeFrame.current = null;
          scrollPosition.current = stopSmoothScroll();
          return;
        }

        setOpen(null);
        const position = scrollPosition.current;
        resumeFrame.current = requestAnimationFrame(() => {
          resumeFrame.current = requestAnimationFrame(() => {
            resumeFrame.current = null;
            resumeSmoothScroll(position);
            scrollPosition.current = null;
            ScrollTrigger.update();
          });
        });
      }}
    >
      <section id="projects" ref={root} className="relative overflow-hidden bg-ink md:h-svh">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div
          ref={track}
          className="relative flex flex-col gap-10 px-6 py-24 md:h-full md:w-max md:flex-row md:items-center md:gap-16 md:px-[8vw] md:py-0 [perspective:1600px]"
        >
          <div className="md:w-[34vw] md:shrink-0">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">05 / Selected</p>
            <h2 className="font-display mt-4 text-[clamp(3.5rem,9vw,9rem)]">
              Selected
              <br />
              <span className="text-stroke">Projects</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              A selection of networking, cybersecurity, and IoT project concepts. Scroll to travel
              through the gallery.
            </p>
          </div>
          {projects.map((p, i) => (
            <article
              key={p.id}
              data-p="card"
              className="group md:w-[56vw] md:shrink-0 [transform-style:preserve-3d]"
            >
              <DialogTrigger asChild>
                <button
                  onClick={(event) => {
                    projectTrigger.current = event.currentTarget;
                    setOpen(p);
                  }}
                  className="block w-full text-left"
                  aria-label={`Open ${p.name}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={1536}
                      height={960}
                      className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                    <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground">
                      Concept
                    </span>
                    <span className="font-display absolute right-6 top-4 text-7xl text-foreground/20">
                      0{i + 1}
                    </span>
                    <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                      <div>
                        <p
                          className="text-xs uppercase tracking-[0.25em]"
                          style={{ color: p.accent }}
                        >
                          {p.category}
                        </p>
                        <h3 className="font-display mt-2 text-5xl text-foreground md:text-6xl">
                          {p.name}
                        </h3>
                      </div>
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight />
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <p className="line-clamp-3 max-w-md text-sm text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </DialogTrigger>
            </article>
          ))}
        </div>

        {open && (
          <DialogContent
            animation="fade"
            overlayClassName="z-[110] bg-ink/85 backdrop-blur-md"
            showCloseButton={false}
            data-lenis-prevent
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              projectTrigger.current?.focus({ preventScroll: true });
            }}
            aria-describedby={`project-description-${open.id}`}
            className="z-[120] flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-2xl flex-col gap-0 overflow-y-auto overscroll-contain rounded-2xl border border-primary/20 bg-background p-0 text-foreground shadow-[0_24px_80px_-32px_oklch(0.546_0.215_263_/_0.55)] duration-200 sm:w-[calc(100vw-3rem)]"
          >
            <div className="relative aspect-[16/9] max-h-56 shrink-0 overflow-hidden rounded-t-2xl bg-ink">
              <img
                src={open.image}
                alt={`${open.name} project preview`}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <DialogClose asChild>
                <button
                  aria-label="Close project"
                  className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/75 text-white backdrop-blur-sm transition-colors duration-200 hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X size={18} />
                </button>
              </DialogClose>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <DialogTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">
                {open.name}
              </DialogTitle>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{open.category}</p>
              <DialogDescription
                id={`project-description-${open.id}`}
                className="line-clamp-3 text-sm leading-relaxed text-muted-foreground"
              >
                {open.description}
              </DialogDescription>
              {open.tech.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {open.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {(open.github && open.github !== "#") || (open.live && open.live !== "#") ? (
                <div className="flex flex-wrap gap-4 border-t border-white/10 pt-4">
                  {open.github && open.github !== "#" && (
                    <a
                      href={open.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {open.live && open.live !== "#" && (
                    <a
                      href={open.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          </DialogContent>
        )}
      </section>
    </Dialog>
  );
}
