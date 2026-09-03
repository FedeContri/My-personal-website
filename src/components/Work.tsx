import Section from "@/components/site/Section";
import EntryItem from "@/components/site/EntryItem";
import { work } from "@/lib/profile";

const Work = () => (
  <Section id="work" eyebrow="02 / Work" title="Selected Work" band>
    <div className="stagger space-y-4">
      {work.map((entry, i) => (
        <EntryItem key={entry.id} entry={entry} index={i} />
      ))}
    </div>
  </Section>
);

export default Work;
