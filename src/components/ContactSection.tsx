import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile, navLinks, contact } from "@/data/portfolio";
import { scrollToId, scrollToTop } from "@/lib/scroll";
import { Robot } from "./Robot";

export function CuriositySection() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-2">
        <Robot className="order-2 h-[55vh] w-full md:order-1" scale={0.8} />
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">08 / Still curious</p>
          <h2 className="font-display mt-4 text-[clamp(3rem,7vw,7rem)]">
            Always looking
            <br />
            <span className="text-stroke">for the next thing.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            There's always another layer to understand.
          </p>
        </div>
      </div>
    </section>
  );
}

const socials = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, value: profile.email },
  {
    label: "GitHub",
    href: profile.github,
    icon: Github,
    value: profile.github.replace("https://", ""),
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: Linkedin,
    value: profile.linkedin.replace("https://", ""),
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-deep pt-32">
      <div className="contact-glow absolute -bottom-1/2 left-1/2 h-[120vh] w-[120vh] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="contact-layout grid items-center gap-14 py-8 md:grid-cols-[1.15fr_0.85fr] md:gap-20">
          <div className="contact-copy">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">09 / Contact</p>
            <h2 className="font-display mt-5 text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.98]">
              Let&apos;s build
              <br />
              <span className="text-primary">something</span>
              <br />
              great.
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground">{contact.text}</p>
          </div>

          <div className="contact-links divide-y divide-primary/15 border-y border-primary/15">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label === "Email" ? undefined : "_blank"}
                rel={s.label === "Email" ? undefined : "noreferrer"}
                className="contact-link group flex items-center gap-4 py-6 transition-colors duration-300 hover:text-foreground"
              >
                <span className="contact-link-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:shadow-[0_0_24px_-8px_var(--primary)]">
                  <s.icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="mt-1 block break-all text-sm text-foreground sm:text-base">
                    {s.value}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-20 border-t pb-10 pt-12">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="font-heading text-2xl font-extrabold">
                <span className="text-primary">&lt;/&gt;</span> {profile.name}
              </p>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">{profile.tagline}</p>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Explore
              </p>
              <ul className="space-y-2 text-sm">
                {[{ id: "work", label: "Home" }, ...navLinks.filter((l) => l.id !== "work")].map(
                  (l) => (
                    <li key={l.id}>
                      <button onClick={() => scrollToId(l.id)} className="link-underline">
                        {l.label}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Connect
              </p>
              <ul className="space-y-2 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="link-underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-14 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 uppercase tracking-[0.25em] hover:text-foreground"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-500 group-hover:-translate-y-1 group-hover:border-primary">
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
