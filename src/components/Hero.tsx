import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/profile";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
};

const Hero = () => (
  <header className="wrap pt-32 pb-20 sm:pt-40 sm:pb-28">
    <p className="eyebrow">Portfolio — {new Date().getFullYear()}</p>

    <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
      {profile.name}
    </h1>

    <p className="mt-4 font-mono text-sm text-accent sm:text-[15px]">{profile.role}</p>

    <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
      {profile.intro}
    </p>
    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
      {profile.intro2}
    </p>

    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
      <button
        type="button"
        onClick={() => scrollTo("work")}
        className="rounded-sm bg-primary px-5 py-2.5 font-mono text-[12.5px] text-primary-foreground transition-opacity hover:opacity-85"
      >
        Projects
      </button>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline font-mono text-[12.5px]"
      >
        GitHub <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
      {profile.cvUrl && (
        <a
          href={profile.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono text-[12.5px]"
        >
          CV <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  </header>
);

export default Hero;
