import { useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { profile, about } from "@/data/portfolio";

type Key = "who" | "what" | "how";

const panels: { key: Key; num: string; title: string; theme: string }[] = [
  {
    key: "who",
    num: "01",
    title: "Who I Am",
    theme: "bg-cream text-cream-foreground border border-primary/20",
  },
  {
    key: "what",
    num: "02",
    title: "What I Do",
    theme:
      "bg-gradient-to-br from-primary/80 via-burgundy to-deep text-foreground border border-primary/30",
  },
  {
    key: "how",
    num: "03",
    title: "How I Think",
    theme: "bg-ink text-foreground border border-border",
  },
];

const doing = about.what;

function PanelBody({ k, expanded }: { k: Key; expanded: boolean }) {
  if (k === "who")
    return (
      <div className={`grid gap-6 ${expanded ? "md:grid-cols-[1fr_1.3fr]" : ""}`}>
        <img
          src={profile.portrait}
          alt=""
          loading="lazy"
          className={`w-full rounded-lg bg-gradient-to-b from-deep to-burgundy object-contain object-bottom ${expanded ? "h-[50vh]" : "h-56"}`}
        />
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="font-heading text-lg font-semibold">
            ICT undergraduate, {profile.university}.
          </p>
          {expanded && (
            <>
              <p>
                {profile.degree}
                <br />
                {profile.faculty}
              </p>
              <p className="opacity-75">{about.who}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.interests.map((i) => (
                  <span key={i} className="rounded-full border border-current/20 px-3 py-1 text-xs">
                    {i}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  if (k === "what")
    return (
      <div className="space-y-4">
        <ul className="space-y-2">
          {doing.slice(0, expanded ? doing.length : 3).map((d, i) => (
            <li
              key={d}
              className="flex items-baseline gap-3 border-b border-foreground/15 pb-2 font-heading text-lg"
            >
              <span className="text-xs text-primary">0{i + 1}</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    );
  return (
    <div className="space-y-6">
      <p className="font-display text-4xl leading-none md:text-5xl">
        {about.philosophy.map((w, i) => (
          <span key={w}>
            {i > 0 && <span className="text-primary"> → </span>}
            {w}
          </span>
        ))}
      </p>
      {expanded && (
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {about.philosophyText}
        </p>
      )}
    </div>
  );
}

export function AboutSection() {
  const [open, setOpen] = useState<Key | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const active = panels.find((p) => p.key === open);

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="font-display text-[clamp(3.5rem,10vw,9rem)]">
            About <span className="text-primary">Me</span>
          </h2>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
            04 / Click a panel
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {panels.map((p) => (
            <button
              key={p.key}
              onClick={() => setOpen(p.key)}
              className={`group relative min-h-[460px] overflow-hidden rounded-[2rem] p-7 text-left transition-transform duration-500 hover:-translate-y-2 ${p.theme}`}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.3em] opacity-70">
                  Card {p.num}
                </span>
                <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <h3 className="font-display mb-6 text-5xl">{p.title}</h3>
              <PanelBody k={p.key} expanded={false} />
            </button>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-500 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(null)}
        role="dialog"
        aria-modal="true"
        aria-hidden={!active}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
        {active && (
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className={`relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] p-8 md:p-12 animate-in zoom-in-95 fade-in duration-500 ${active.theme}`}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:rotate-90"
            >
              <X />
            </button>
            <span className="font-heading text-xs uppercase tracking-[0.3em] opacity-70">
              Card {active.num}
            </span>
            <h3 className="font-display mb-8 mt-2 text-6xl md:text-8xl">{active.title}</h3>
            <PanelBody k={active.key} expanded />
          </div>
        )}
      </div>
    </section>
  );
}
