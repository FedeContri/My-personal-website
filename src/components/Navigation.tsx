import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";

const links = [
  { label: "Work", id: "work" },
  { label: "Labs", id: "labs" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        scrolled ? "border-b border-border bg-background/85 backdrop-blur" : ""
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-[13px] tracking-tight"
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
          className="-mr-2 p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-40 border-t border-border bg-background md:hidden">
          <div className="wrap flex flex-col py-4">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="border-b border-border py-4 text-left text-lg font-medium"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="border-b border-border py-4 text-left text-lg font-medium"
            >
              Contact
            </button>
            <div className="flex flex-wrap gap-6 pt-6 font-mono text-[12.5px] text-muted-foreground">
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
