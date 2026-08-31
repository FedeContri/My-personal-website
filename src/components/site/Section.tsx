import { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow: string;
  title?: string;
  children: ReactNode;
};

const Section = ({ id, eyebrow, title, children }: Props) => (
  <section id={id} className="section scroll-mt-16">
    <div className="wrap">
      <div className="grid gap-8 md:grid-cols-[180px_1fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          {title && (
            <h2 className="mt-2 text-lg font-semibold md:sticky md:top-24">{title}</h2>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  </section>
);

export default Section;
