"use client";

import { useEffect, useState } from "react";

export function TOC({ headings }: { headings: { id: string; label: string }[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.5, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="border-3 border-black bg-white p-4 font-mono text-xs shadow-[4px_4px_0px_#000]"
    >
      <p className="border-b-2 border-black pb-2 font-black uppercase text-black">
        INDEX // CONTENTS
      </p>
      <ul className="mt-3 space-y-2">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block transition-all ${
                activeId === h.id
                  ? "border-2 border-black bg-[#ffe600] px-2 py-1 font-black text-black shadow-[2px_2px_0px_#000]"
                  : "px-2 py-1 font-bold text-black/70 hover:text-black hover:underline"
              }`}
            >
              # {h.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
