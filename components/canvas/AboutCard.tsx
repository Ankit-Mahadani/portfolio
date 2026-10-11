import Image from "next/image";

export function AboutCard() {
  return (
    <div className="p-4 sm:p-5 flex flex-col gap-4 text-xs font-sans text-black">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
          <Image
            src="/ankit.jpg"
            alt="Ankit Mahadani"
            width={80}
            height={80}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-display text-base font-black uppercase text-black">Ankit Mahadani</h3>
          <span className="font-mono text-[10px] font-bold text-black/60">VIT Bhopal &apos;28 // CS &amp; ML</span>
          <span className="mt-1 font-mono text-[10px] font-semibold text-emerald-700">● Available for Internships</span>
        </div>
      </div>

      <p className="font-sans text-xs text-black/85 leading-relaxed">
        I build AI stuff and anything else I find interesting, RAG pipelines, multi-agent systems, Full Stack apps, and generally anything that looks shiny at 2AM in the morning :)
      </p>

      <p className="font-mono text-[11px] text-black/70 leading-relaxed border-t border-black/10 pt-3">
        Computer Engineering at VIT Bhopal, developing production AI agents and open-source ML libraries like Neuva.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <a
          href="mailto:ankitmahadani@gmail.com"
          className="rounded border-2 border-black bg-[#ffe600] px-3 py-1 font-mono text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] hover:bg-yellow-400"
        >
          Email Me &rarr;
        </a>
        <a
          href="https://github.com/Ankit-Mahadani"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-black/30 bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-black hover:bg-black/5"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
