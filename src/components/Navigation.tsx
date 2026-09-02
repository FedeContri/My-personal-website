import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";

const links = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Labs", id: "labs" },
  { label: "Skills", id: "skills" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 64,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-border bg-background backdrop-blur-md md:bg-background/90"
          : "bg-background md:bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex h-11 items-center font-mono text-[13px] tracking-tight"
        >
          {profile.name}
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          <span className="h-4 w-px bg-border" />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          {profile.cvUrl && (
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              CV
            </a>
          )}
        </div>

        <button
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain border-t border-border bg-background md:hidden">
          <div className="wrap flex flex-col py-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="min-h-[52px] border-b border-border py-4 text-left text-lg font-medium"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="min-h-[52px] border-b border-border py-4 text-left text-lg font-medium"
            >
              Contact
            </button>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 font-mono text-[12.5px] text-muted-foreground [&>a]:inline-flex [&>a]:min-h-[44px] [&>a]:items-center">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>Email</a>
              {profile.cvUrl && (
                <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
                  CV
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
