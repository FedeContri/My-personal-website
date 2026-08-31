import Section from "@/components/site/Section";
import { experience } from "@/lib/profile";

const Experience = () => (
  <Section id="experience" eyebrow="07 / Experience" title="Experience">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="text-xl font-semibold">{experience.role}</h3>
      <span className="font-mono text-[12.5px] text-muted-foreground">{experience.period}</span>
    </div>
    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
      {experience.body}
    </p>
    <p className="eyebrow mt-6">Worked / studied with</p>
    <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
      {experience.items.map((i) => (
        <li key={i} className="font-mono text-[12.5px] text-muted-foreground">
          {i}
        </li>
      ))}
    </ul>
  </Section>
);

export default Experience;
