import Section from "@/components/site/Section";
import { hardware } from "@/lib/profile";

const Hardware = () => (
  <Section id="hardware" eyebrow="06 / Hardware" title="Hardware & Labs">
    <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
      The physical devices I actually experiment on.
    </p>
    <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
      {hardware.map((h) => (
        <div key={h.group} className="bg-background p-5">
          <p className="eyebrow">{h.group}</p>
          <ul className="mt-3 space-y-1.5">
            {h.items.map((i) => (
              <li key={i} className="font-mono text-[12.5px] text-muted-foreground">
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default Hardware;
