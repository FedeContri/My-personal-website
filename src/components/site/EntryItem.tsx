import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Entry } from "@/lib/profile";

const EntryItem = ({ entry, index }: { entry: Entry; index: number }) => {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const panelId = `entry-${entry.id}`;

  return (
    <article className="reveal-item group border-t border-border py-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="index-num transition-colors duration-300 group-hover:text-accent">{num}</span>
        <span className="tag uppercase tracking-[0.14em]">{entry.label}</span>
      </div>

      <h3 className="mt-3 text-2xl font-semibold transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-3xl">
        {entry.title}
      </h3>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        {entry.summary}
      </p>


      <p className="mt-4 font-mono text-[11.5px] text-muted-foreground">
        {entry.stack.join(" · ")}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
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
        <div id={panelId} className="mt-6 space-y-6 border-l border-border pl-5">
          {entry.diagram && (
            <pre className="terminal whitespace-pre text-muted-foreground">{entry.diagram}</pre>
          )}

          {entry.narrative?.map((block) => (
            <div key={block.heading} className="max-w-2xl">
              <p className="eyebrow">{block.heading}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {block.body}
              </p>
            </div>
          ))}

          {entry.detail?.map((block) => (
            <div key={block.heading}>
              <p className="eyebrow">{block.heading}</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {block.items.map((it) => (
                  <li key={it} className="font-mono text-[12.5px] text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}


          {entry.notes && (
            <ul className="space-y-2">
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
