import Section from "@/components/site/Section";
import { distroJourney } from "@/lib/profile";

const DistroSwapping = () => (
  <Section id="distros" eyebrow="04 / Distros" title="Distro Swapping">
    <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
      I've swapped operating systems a lot. Some runs lasted a year, some two
      weeks — each one taught me something about how a system actually fits
      together.
    </p>

    <ol className="stagger mt-10 max-w-2xl">
      {distroJourney.map((step, i) => (
        <li key={step.os} className="reveal-item flex items-start gap-4">
          <span className="index-num mt-0.5 w-6">{String(i + 1).padStart(2, "0")}</span>
          <div className="flex flex-col items-center">
            <span
              className={
                step.state === "current"
                  ? "mt-1.5 h-1.5 w-1.5 rounded-full bg-accent"
                  : step.state === "planned"
                    ? "mt-1.5 h-1.5 w-1.5 rounded-full border border-accent bg-transparent"
                    : "mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
              }
            />
            {i < distroJourney.length - 1 && <span className="h-16 w-px bg-border" />}
          </div>
          <div className="pb-8">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-[15px] font-semibold">{step.os}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {step.status}
              </span>
            </div>
            <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default DistroSwapping;
