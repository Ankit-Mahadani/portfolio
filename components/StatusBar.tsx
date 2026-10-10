"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#manifest" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export function StatusBar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "manifest", "work", "experience", "signals", "contact"];
    const els = sections.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b-2 border-black bg-[#FAF8F5]/90 px-4 sm:px-8 backdrop-blur-md">
      {/* Brand Badge */}
      <Link
        href="/#hero"
        data-cursor="TOP"
        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#ffe600] font-display text-sm font-black text-black shadow-[2px_2px_0px_#000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
      >
        AM
      </Link>

      {/* Navigation links & Actions */}
      <div className="flex items-center gap-3 sm:gap-6">
        <nav className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => {
            const isCurrent = active === link.href.replace("/#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`font-mono text-xs font-bold transition-colors hover:text-black ${
                  isCurrent
                    ? "border-b-2 border-black pb-0.5 text-black"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Live indicator / Sun icon */}
        <span
          title="Online // Ready"
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white font-mono text-sm text-black shadow-[2px_2px_0px_#000]"
        >
          ☼
        </span>

        {/* Résumé PDF pill button */}
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="PDF"
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-4 py-1.5 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] transition-all hover:bg-[#ffe600] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <span>Résumé PDF</span>
          <span aria-hidden="true">&darr;</span>
        </a>
      </div>
    </header>
  );
}
