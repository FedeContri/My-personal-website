import Section from "@/components/site/Section";
import { skills } from "@/lib/profile";

const Skills = () => (
  <Section id="skills" eyebrow="04 / Skills" title="Skills" band>
    <div className="grid gap-3 sm:grid-cols-2">
      {skills.map((group) => (
        <div key={group.group} className="card card-hover reveal-item p-5">
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="text-[15px] font-semibold tracking-tight">{group.group}</h3>
            {group.note && (
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {group.note}
              </span>
            )}
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
