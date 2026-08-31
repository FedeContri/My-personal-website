import Section from "@/components/site/Section";
import EntryItem from "@/components/site/EntryItem";
import { work } from "@/lib/profile";

const Work = () => (
  <Section id="work" eyebrow="01 / Work" title="Selected Work">
    <div className="space-y-2">
      {work.map((entry, i) => (
        <EntryItem key={entry.id} entry={entry} index={i} />
      ))}
    </div>
  </Section>
);

export default Work;
