import Section from "@/components/site/Section";
import EntryItem from "@/components/site/EntryItem";
import { labs } from "@/lib/profile";

const Labs = () => (
  <Section id="labs" eyebrow="03 / Labs" title="Labs & Experiments">
    <p className="section-lead">
      Personal experiments run on my own hardware. Some of them worked, some of them didn't — the
      process and the troubleshooting are the point.
    </p>
    <div className="stagger mt-10 space-y-4">
      {labs.map((entry, i) => (
        <EntryItem key={entry.id} entry={entry} index={i} />
      ))}
    </div>
  </Section>
);

export default Labs;
