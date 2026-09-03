import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Entry } from "@/lib/profile";

const EntryItem = ({ entry, index }: { entry: Entry; index: number }) => {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const panelId = `entry-${entry.id}`;

  return (
    <article className="reveal-item card card-hover group p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="index-num text-accent">{num}</span>
        <span aria-hidden className="h-px w-5 bg-border" />
        <span className="tag uppercase tracking-[0.14em]">{entry.label}</span>
        {entry.period && (
          <span className="ml-auto font-mono text-[11.5px] text-muted-foreground">
            {entry.period}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-2xl">
        {entry.title}
      </h3>
      <p className="mt-3 max-w-2xl text-[15.5px] leading-[1.7] text-muted-foreground">
        {entry.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {entry.stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="link-underline font-mono text-[12.5px]"
        >
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {open ? "Close" : `View ${entry.kind.toLowerCase()}`}
        </button>

        {entry.links?.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-[12.5px]"
          >
            {l.label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>

      {open && (
        <div id={panelId} className="mt-6 animate-fade-in space-y-7">
          {entry.diagram && (
            <pre className="terminal whitespace-pre text-muted-foreground">{entry.diagram}</pre>
          )}

          {entry.narrative?.map((block) => {
            const isResult = block.heading.toLowerCase().startsWith("result");
            return (
              <div
                key={block.heading}
                className={
                  isResult
                    ? "rounded-sm border-l-2 border-accent bg-accent/5 py-3 pl-4 pr-3"
                    : "border-l border-border pl-4"
                }
              >
                <p className={`eyebrow ${isResult ? "text-accent" : ""}`}>{block.heading}</p>
                <p className="mt-2 max-w-2xl text-[15.5px] leading-[1.75] text-muted-foreground">
                  {block.body}
                </p>
              </div>
            );
          })}

          {entry.detail?.map((block) => (
            <div key={block.heading} className="border-l border-border pl-4">
              <p className="eyebrow">{block.heading}</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {block.items.map((it) => (
                  <li key={it} className="chip">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {entry.notes && (
            <ul className="space-y-2 border-l border-border pl-4">
              {entry.notes.map((n) => (
                <li key={n} className="text-sm leading-relaxed text-muted-foreground">
                  — {n}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
};

export default EntryItem;
