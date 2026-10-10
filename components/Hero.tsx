import Link from "next/link";
import { profile } from "@/content/profile";
import { ReactiveGrid } from "@/components/ReactiveGrid";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden px-6 py-16 sm:px-12 lg:px-20"
    >
      {/* Animated Interactive Diagonal Grid Background (drifts toward top-left, reacts to mouse) */}
      <ReactiveGrid />

      <div className="relative z-10 max-w-5xl">
        {/* Location header with horizontal rule */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <span className="font-mono text-xs font-black tracking-widest text-black/60 uppercase">
            {profile.base.split(",")[0] || "DURGAPUR"}, INDIA
          </span>
          <div className="h-[1.5px] w-28 sm:w-64 bg-black/25" />
        </div>

        {/* Massive Clean Stacked Typography */}
        <h1 className="font-display text-[clamp(4.2rem,13.5vw,11.5rem)] font-black uppercase leading-[0.84] tracking-tight text-black select-none">
          <span className="block">ANKIT</span>
          <span className="block">MAHADANI</span>
        </h1>

        {/* Punchy Subtitle / Tagline */}
        <p className="mt-8 sm:mt-10 max-w-[34ch] text-[clamp(1.5rem,3.2vw,2.65rem)] font-extrabold leading-[1.14] text-black tracking-tight">
          Full-stack &amp; ML engineer building AI retrieval and agent systems that hold up in production.
        </p>

        {/* Action Buttons Row */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
          {/* Primary Pill Button with Yellow Circle Arrow */}
          <a
            href="#work"
            data-cursor="VIEW"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-black bg-white px-5 py-2.5 font-mono text-xs sm:text-sm font-black uppercase text-black shadow-[3px_3px_0px_#000] transition-all hover:bg-[#ffe600] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span>See the work</span>
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-[#ffe600] font-black text-xs text-black transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </a>

          {/* Secondary Dashed Pill Badge */}
          <Link
            href="/work/neuva-lang"
            data-cursor="NEUVA"
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-dashed border-black/40 bg-white/70 px-4 py-2 font-mono text-xs font-bold text-black shadow-[1px_1px_0px_#000] transition-all hover:border-black hover:bg-white hover:shadow-[3px_3px_0px_#000]"
          >
            <span className="h-2 w-2 rounded-full border border-black bg-[#ffe600]" aria-hidden="true" />
            <span className="text-black/85">There&apos;s a far more fun version of this</span>
            <span className="rounded-full border border-black bg-[#ffe600] px-2 py-0.5 text-[10px] font-black uppercase text-black shadow-[1px_1px_0px_#000]">
              highly recommended
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
