import Section from "@/components/site/Section";
import { timeline } from "@/lib/profile";

const About = () => (
  <Section id="about" eyebrow="01 / About" title="About">
    {/* Lead paragraph is deliberately larger: it sets the reading entry point */}
    <p className="max-w-2xl text-lg leading-[1.65] text-foreground sm:text-xl">
      I'm FD, a DevOps Intern interested in Linux, infrastructure, networking and Kubernetes.
    </p>

    <div className="mt-5 grid max-w-3xl gap-5 sm:grid-cols-2">
      <p className="section-lead">
        Alongside my DevOps path, I've always been interested in cybersecurity and understanding
        how systems work from the inside.
      </p>
      <p className="section-lead">
        I like learning through hands-on experimentation: building infrastructure, configuring
        Linux systems, working with Kubernetes and experimenting with Android devices, wireless
        hardware and personal labs.
      </p>
    </div>

    <div className="card mt-10 p-5 sm:p-6">
      <p className="eyebrow">Path</p>
      <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
        {timeline.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="chip">
              <span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </span>
            {i < timeline.length - 1 && (
              <span aria-hidden className="h-px w-3 bg-border" />
            )}
          </li>
        ))}
      </ol>
    </div>
  </Section>
);

export default About;
