import Link from "next/link";

export function CanvasTeaser() {
  return (
    <section
      id="canvas-teaser"
      className="relative border-t-4 border-black bg-[#faf8f5] py-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Frame Treatment */}
      <div className="pointer-events-none absolute inset-0 bg-pattern-grid opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute right-8 top-8 font-mono text-[10px] font-black uppercase text-black/20 select-none hidden sm:block">
        STAGE_TWO // EXPERIMENTAL_CANVAS
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-6 inline-block -rotate-1">
          <span className="border-2 border-black bg-[#a6ff00] px-3.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000]">
            ALTERNATIVE WORKSPACE
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
          Oh, and this page is the boring half.
        </h2>

        <div className="mt-6 space-y-4 font-sans text-base sm:text-lg text-black/85 leading-relaxed font-medium">
          <p>
            The main portfolio is finished. This one is a little less serious. There&apos;s a canvas, beautiful cards, a few games, lofi, and probably more than there needs to be.
          </p>
          <p className="text-black/75">
            Some of it keeps score. Try not to take that personally.
          </p>
          <p className="font-mono text-xs sm:text-sm text-black/60 italic">
            There are things here that aren&apos;t meant to be obvious. If you find one, you find one.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/canvas?card=arcade"
            data-cursor="CANVAS"
            className="group inline-flex items-center justify-center gap-3 rounded-xl border-3 border-black bg-[#ffe600] px-7 py-3.5 font-mono text-sm sm:text-base font-black uppercase text-black shadow-[5px_5px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000]"
          >
            <span>Open the canvas &rarr;</span>
          </Link>

          <span className="font-mono text-xs font-bold text-black/60 uppercase tracking-wider">
            Only Desktops supported. This place has a lot going on.
          </span>
        </div>
      </div>
    </section>
  );
}
