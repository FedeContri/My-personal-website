import Section from "@/components/site/Section";
import { skills } from "@/lib/profile";

const Skills = () => (
  <Section id="skills" eyebrow="04 / Skills" title="Skills">
    <div className="space-y-8">
      {skills.map((group) => (
        <div key={group.group} className="border-t border-border pt-6 first:border-t-0 first:pt-0">
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="text-[15px] font-semibold">{group.group}</h3>
            {group.note && (
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {group.note}
              </span>
            )}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {group.items.map((item) => (
              <li key={item} className="font-mono text-[12.5px] text-muted-foreground">
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
