import { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow: string;
  title?: string;
  /** Tinted background band — used to alternate sections and give the page rhythm */
  band?: boolean;
  children: ReactNode;
};

const Section = ({ id, eyebrow, title, band = false, children }: Props) => {
  const [num, ...rest] = eyebrow.split("/");
  const label = rest.join("/").trim();

  return (
    <section id={id} className={`section scroll-mt-16 ${band ? "section-band" : ""}`}>
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <div className="md:sticky md:top-24 md:self-start">
            <p className="eyebrow flex items-center gap-2">
              <span className="text-accent">{num.trim()}</span>
              <span aria-hidden className="h-px w-6 bg-border" />
              <span>{label}</span>
            </p>
            {title && <h2 className="section-title">{title}</h2>}
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Section;
