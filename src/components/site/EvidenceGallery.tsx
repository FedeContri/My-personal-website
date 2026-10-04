import { useState } from "react";
import { Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EvidenceImage } from "@/lib/profile";

type Props = {
  title: string;
  images: EvidenceImage[];
};

const EvidenceGallery = ({ title, images }: Props) => {
  const [selected, setSelected] = useState<EvidenceImage>();
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-evidence`;

  return (
    <section aria-labelledby={headingId} className="pt-2">
      <div className="border-b border-border pb-3">
        <p className="eyebrow">Field evidence / {String(images.length).padStart(2, "0")}</p>
        <h4 id={headingId} className="mt-2 text-base font-semibold">
          Build and troubleshooting log
        </h4>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Original photographs from the lab, ordered from the kernel build to the final driver
          diagnosis. Select any frame to inspect it at full size.
        </p>
      </div>

      <ol className="mt-5 grid gap-x-5 gap-y-8 sm:grid-cols-2">
        {images.map((image, index) => (
          <li key={image.src} className="min-w-0">
            <figure>
              <Button
                type="button"
                variant="ghost"
                className="group relative h-auto w-full overflow-hidden rounded-sm border border-border bg-muted/30 p-0 focus-visible:ring-offset-4"
                onClick={() => setSelected(image)}
                aria-label={`Open full-size evidence ${index + 1}: ${image.title}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="eager"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sm border border-border bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </Button>
              <figcaption className="mt-3">
                <div className="flex items-baseline gap-3">
                  <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm font-medium text-foreground">{image.title}</p>
                </div>
                <p className="mt-1 pl-8 text-[13px] leading-relaxed text-muted-foreground">
                  {image.caption}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(undefined)}>
        {selected && (
          <DialogContent className="flex max-h-[92dvh] w-[calc(100vw-2rem)] max-w-5xl flex-col gap-3 overflow-hidden p-3 sm:p-4 [&>button]:hidden">
            <div className="flex items-start justify-between gap-4 px-1">
              <div>
                <DialogTitle className="text-base">{selected.title}</DialogTitle>
                <DialogDescription className="mt-1 max-w-3xl leading-relaxed">
                  {selected.caption}
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Close full-size image">
                  <X aria-hidden="true" />
                </Button>
              </DialogClose>
            </div>
            <div className="min-h-0 flex-1 overflow-auto rounded-sm bg-muted/30">
              <img
                src={selected.src}
                alt={selected.alt}
                width={selected.width}
                height={selected.height}
                className="mx-auto max-h-[76dvh] w-auto max-w-full object-contain"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default EvidenceGallery;