import Section from "@/components/site/Section";
import { timeline } from "@/lib/profile";

const About = () => (
  <Section id="about" eyebrow="07 / About" title="About">
    <div className="max-w-xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
      <p>
        I'm Federico, a DevOps Intern interested in Linux, infrastructure, networking and
        Kubernetes.
      </p>
      <p>
        Alongside my DevOps path, I've always been interested in cybersecurity and understanding
        how systems work from the inside.
      </p>
      <p>
        I like learning through hands-on experimentation: building infrastructure, configuring
        Linux systems, working with Kubernetes and experimenting with Android devices, wireless
        hardware and personal labs.
      </p>
    </div>

    <p className="eyebrow mt-10">Path</p>
    <ol className="mt-4 max-w-md">
      {timeline.map((step, i) => (
        <li key={step} className="flex items-start gap-4">
          <span className="index-num mt-0.5 w-6">{String(i + 1).padStart(2, "0")}</span>
          <div className="flex flex-col items-center">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
            {i < timeline.length - 1 && <span className="h-8 w-px bg-border" />}
          </div>
          <span className="pb-1 text-[15px]">{step}</span>
        </li>
      ))}
    </ol>
  </Section>
);

export default About;
