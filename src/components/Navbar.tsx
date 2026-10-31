import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { scrollToId } from "@/lib/scroll";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };
  return (
    <header data-intro="nav" className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className="hero-nav mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2 backdrop-blur-md md:px-5"
        aria-label="Main"
      >
        <Button
          variant="ghost"
          onClick={() => go("work")}
          className="brand-mark rounded-full font-heading text-2xl font-black tracking-tight text-foreground"
          aria-label="Home"
          title="Home"
        >
          <span className="brand-bracket">&lt;</span>
          <span>N</span>
          <span className="brand-bracket">&gt;</span>
        </Button>
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Button
                variant="ghost"
                onClick={() => go(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={`nav-link rounded-full px-4 ${active === link.id ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => go("contact")}
          className="hero-primary hidden rounded-full px-5 md:inline-flex"
        >
          Let's Talk
          <ArrowUpRight />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && (
        <div
          id="mobile-navigation"
          className="hero-mobile-nav mt-3 rounded-lg border border-border bg-background/95 p-3 backdrop-blur-md md:hidden"
        >
          {navLinks.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              onClick={() => go(link.id)}
              className={`flex h-12 w-full justify-start ${active === link.id ? "text-ember" : "text-foreground"}`}
            >
              {link.label}
            </Button>
          ))}
          <Button onClick={() => go("contact")} className="mt-2 h-12 w-full">
            Let's Talk
            <ArrowUpRight />
          </Button>
        </div>
      )}
    </header>
  );
}
