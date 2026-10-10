"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { RevealText } from "@/components/RevealText";

type Channel = {
  key: string;
  label: string;
  value: string;
  href?: string;
  copy?: string;
};

const channels: Channel[] = [
  { key: "email", label: "EMAIL", value: site.contact.email, copy: site.contact.email, href: `mailto:${site.contact.email}` },
  { key: "phone", label: "PHONE", value: site.contact.phone, copy: site.contact.phone, href: `tel:${site.contact.phone}` },
  { key: "github", label: "GITHUB", value: "Ankit-Mahadani", href: site.socials.github },
  { key: "linkedin", label: "LINKEDIN", value: "ankitmahadani", href: site.socials.linkedin },
  { key: "leetcode", label: "LEETCODE", value: "AnkitMAHADANI", href: site.socials.leetcode },
  { key: "gfg", label: "GEEKSFORGEEKS", value: "ankitmahadani", href: site.socials.gfg },
  { key: "codeforces", label: "CODEFORCES", value: "ankitmahadani181", href: site.socials.codeforces },
];

export function Contact() {
  const [toast, setToast] = useState<string | null>(null);

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(key);
      window.setTimeout(() => setToast(null), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative border-t-4 border-black px-4 py-20 sm:px-6 lg:px-10 overflow-hidden bg-white/50">
      {/* Background Frame Treatment: Circuit Grid & Postal Corner Brackets */}
      <div className="pointer-events-none absolute inset-0 bg-pattern-circuit opacity-75" aria-hidden="true" />
      <div className="pointer-events-none absolute left-6 top-8 font-mono text-2xl font-black text-black/20 select-none">
        ⌜
      </div>
      <div className="pointer-events-none absolute right-6 top-8 font-mono text-2xl font-black text-black/20 select-none">
        ⌝
      </div>
      <div className="pointer-events-none absolute right-16 bottom-8 select-none font-mono text-8xl font-black uppercase text-black/[0.03]">
        ENDPOINT.TX
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-block -rotate-2">
          <span className="border-2 border-black bg-[#ffe600] px-3.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000]">
            06 // ENDPOINT & INQUIRIES
          </span>
        </div>

        <RevealText
          as="h2"
          lines={["Endpoint"]}
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight text-black"
        />
        <p className="mt-2 max-w-[52ch] font-mono text-xs font-bold uppercase tracking-wider text-black/70">
          Based in {site.contact.location} · ping me on any active handle
        </p>
      </div>

      <div className="mt-10 max-w-2xl border-3 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
        <div className="space-y-3">
          {channels.map((c) => (
            <div
              key={c.key}
              className="border-2 border-black bg-[#faf8f5] p-3 sm:p-3.5 shadow-[3px_3px_0px_#000] flex items-center justify-between gap-3 transition-colors hover:bg-[#ffe600]"
            >
              <span className="font-mono text-xs font-black text-black">
                {c.label}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={c.href}
                  target={c.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="font-mono text-xs sm:text-sm font-bold text-black underline decoration-black/40 hover:decoration-black"
                >
                  {c.value}
                </a>
                {c.copy && (
                  <button
                    type="button"
                    data-cursor="COPY"
                    onClick={() => copy(c.key, c.copy!)}
                    aria-label={`Copy ${c.label}`}
                    className="border-2 border-black bg-white px-2.5 py-1 font-mono text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-black hover:text-white transition-colors"
                  >
                    {toast === c.key ? "✓ COPIED" : "COPY"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-4">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
            className="border-3 border-black bg-[#ff66c4] px-6 py-3 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none inline-flex items-center gap-2"
          >
            <span>Download Résumé</span>
            <span aria-hidden="true">&nearr;</span>
          </a>

          <span className="font-mono text-xs font-bold text-black/60">
            Open for 2025/2026 roles
          </span>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {toast ? "Copied" : ""}
      </div>
    </section>
  );
}
