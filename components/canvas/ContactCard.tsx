"use client";

import { useState } from "react";

export function ContactCard() {
  const [copied, setCopied] = useState(false);
  const email = "ankitmahadani@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-4 font-sans text-xs">
      <div>
        <span className="font-mono text-[10px] font-black uppercase text-black/50">Direct Line</span>
        <h3 className="font-display text-lg font-black text-black mt-0.5">One message away</h3>
        <p className="font-mono text-xs text-black/80 mt-1">{email}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
        <button
          onClick={handleCopy}
          className="rounded border-2 border-black bg-[#ffe600] px-3 py-1 font-mono text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] hover:bg-yellow-400 active:translate-y-0.5"
        >
          {copied ? "✓ Copied!" : "📋 Copy Email"}
        </button>
        <a
          href={`mailto:${email}`}
          className="rounded border border-black bg-white px-3 py-1 font-mono text-[10px] font-black uppercase text-black hover:bg-black/5"
        >
          Open Mail App &rarr;
        </a>
      </div>

      <div className="flex items-center gap-3 pt-1 text-[11px] font-mono font-bold text-black/60">
        <a
          href="https://github.com/Ankit-Mahadani"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black underline"
        >
          GitHub
        </a>
        <span>•</span>
        <a
          href="https://linkedin.com/in/ankitmahadani"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black underline"
        >
          LinkedIn
        </a>
        <span>•</span>
        <span className="text-emerald-700">Open to Internships</span>
      </div>
    </div>
  );
}
