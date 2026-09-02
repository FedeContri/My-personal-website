import { ArrowUpRight } from "lucide-react";
import { profile, heroTerminal } from "@/lib/profile";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
};

const Hero = () => (
  <header className="wrap pt-28 pb-16 sm:pt-40 sm:pb-28">
    <p className="eyebrow enter" style={{ animationDelay: "40ms" }}>{profile.kicker}</p>

    <h1
      className="enter mt-6 text-[2rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl"
      style={{ animationDelay: "120ms" }}
    >

      {profile.name} — {profile.role}
    </h1>

    <p className="enter mt-4 max-w-xl font-mono text-[13px] text-muted-foreground" style={{ animationDelay: "190ms" }}>{profile.tagline}</p>

    <div className="enter" style={{ animationDelay: "250ms" }}>
      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {profile.intro}
      </p>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {profile.intro2}
      </p>
    </div>

    <p className="enter mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-foreground sm:text-base" style={{ animationDelay: "310ms" }}>
      Currently open to collaboration —{" "}
      <a href="#contact" className="link-underline">
        get in touch
      </a>
      .
    </p>

    <div className="enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ animationDelay: "370ms" }}>
      <button
        type="button"
        onClick={() => scrollTo("work")}
        className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-primary px-5 py-2.5 font-mono text-[12.5px] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
      >
        Projects
      </button>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline font-mono text-[12.5px]"
        aria-label="FD on GitHub"
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
    <pre className="terminal enter mt-12 max-w-xl overflow-x-auto whitespace-pre text-muted-foreground" style={{ animationDelay: "440ms" }} aria-hidden="true">{heroTerminal}</pre>

  </header>
);

export default Hero;
