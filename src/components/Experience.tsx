import Section from "@/components/site/Section";
import { experience } from "@/lib/profile";

const Experience = () => (
  <Section id="experience" eyebrow="05 / Experience" title="Experience">
    <div className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold tracking-tight">{experience.role}</h3>
        <span className="chip chip-accent">{experience.period}</span>
      </div>
      <p className="mt-4 max-w-2xl text-[15.5px] leading-[1.75] text-muted-foreground">
        {experience.body}
      </p>
      <p className="eyebrow mt-6">Worked / studied with</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {experience.items.map((i) => (
          <li key={i} className="chip">
            {i}
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

export default Experience;
