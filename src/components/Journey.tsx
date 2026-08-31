import Section from "@/components/site/Section";
import { currently, journey } from "@/lib/profile";

const Journey = () => (
  <Section id="journey" eyebrow="03 / Journey" title="DevOps Journey">
    <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
      An ongoing path, not a finished one. Each step is something I've worked with, and some of
      them I'm still learning right now.
    </p>

    <ol className="mt-8 max-w-md">
      {journey.map((step, i) => {
        const learning = currently.learning.includes(step);
        return (
          <li key={step} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`mt-1.5 h-1.5 w-1.5 rounded-full ${
                  learning ? "bg-accent" : "bg-muted-foreground/50"
                }`}
              />
              {i < journey.length - 1 && <span className="h-10 w-px bg-border" />}
            </div>
            <div className="pb-2">
              <span className="text-[15px]">{step}</span>
              {learning && (
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  learning
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>

    <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
      <div>
        <p className="eyebrow">Working as</p>
        <p className="mt-2 text-[15px]">{currently.workingAs}</p>
      </div>
      <div>
        <p className="eyebrow">Learning</p>
        <p className="mt-2 font-mono text-[12.5px] text-muted-foreground">
          {currently.learning.join(" · ")}
        </p>
      </div>
      <div>
        <p className="eyebrow">Exploring</p>
        <p className="mt-2 font-mono text-[12.5px] text-muted-foreground">
          {currently.exploring.join(" · ")}
        </p>
      </div>
    </div>
  </Section>
);

export default Journey;
