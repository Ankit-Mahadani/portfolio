"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RevealImage } from "@/components/RevealImage";

export type GalleryResolvedItem = {
  src?: string;
  alt: string;
  caption?: string;
  span: "full" | "half" | "bleed";
  kind: "screenshot" | "diagram" | "photo" | "ui";
  aspect?: string;
  fit?: "cover" | "contain";
  exists: boolean;
  expectedPath: string;
};

export function Gallery({ items }: { items: GalleryResolvedItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <figure
            key={i}
            className={`border-3 border-black bg-white p-3 shadow-[5px_5px_0px_#000] ${
              item.span === "half" ? "" : "sm:col-span-2"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              data-cursor="OPEN"
              className="block w-full text-left"
              aria-label={`Open image ${i + 1} of ${items.length}: ${item.alt}`}
            >
              <RevealImage
                src={item.src}
                alt={item.alt}
                exists={item.exists}
                expectedPath={item.expectedPath}
                kind={item.kind}
                aspect={item.aspect ?? (item.span === "half" ? "4 / 3" : "16 / 9")}
                fit={item.fit ?? (item.kind === "screenshot" || item.kind === "ui" ? "contain" : "cover")}
              />
            </button>
            {item.caption && (
              <figcaption className="mt-2.5 font-mono text-xs font-bold text-black/70">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryResolvedItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onIndexChange]);

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf8f5]/95 p-4 sm:p-10 border-4 border-black"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-full w-full max-w-5xl flex-1 items-center justify-center border-3 border-black bg-white p-4 shadow-[8px_8px_0px_#000]">
        {item.exists && item.src ? (
          <div className="relative h-full max-h-[75vh] w-full">
            <Image src={item.src} alt={item.alt} fill sizes="90vw" style={{ objectFit: "contain" }} />
          </div>
        ) : (
          <div className="border-2 border-dashed border-black p-10 text-center font-mono text-xs font-bold text-black">
            [ ASSET PENDING — {item.expectedPath} ]
          </div>
        )}
      </div>

      {item.caption && (
        <p className="mt-4 max-w-2xl text-center font-mono text-xs font-bold text-black">{item.caption}</p>
      )}

      <div className="mt-6 flex items-center gap-3 font-mono text-xs font-bold">
        <button
          type="button"
          data-cursor="OPEN"
          onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
          className="border-2 border-black bg-white px-3 py-1 font-mono uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-[#ffe600]"
        >
          &larr; PREV
        </button>
        <span className="border-2 border-black bg-[#ffe600] px-3 py-1 font-mono font-black uppercase text-black shadow-[2px_2px_0px_#000]">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          data-cursor="OPEN"
          onClick={() => onIndexChange((index + 1) % items.length)}
          className="border-2 border-black bg-white px-3 py-1 font-mono uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-[#ffe600]"
        >
          NEXT &rarr;
        </button>
        <button
          type="button"
          data-cursor="OPEN"
          onClick={onClose}
          className="border-2 border-black bg-[#ff5964] px-3 py-1 font-mono font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-white"
        >
          ESC / CLOSE
        </button>
      </div>
    </div>
  );
}
