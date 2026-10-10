import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative border-t-4 border-black bg-[#ffe600] px-4 py-12 sm:px-6 lg:px-10 text-black overflow-hidden">
      {/* Background Frame Treatment: Industrial Caution Stripes & Watermark */}
      <div className="pointer-events-none absolute inset-0 bg-pattern-caution opacity-80" aria-hidden="true" />
      <div className="pointer-events-none absolute right-4 -bottom-6 select-none font-mono text-9xl font-black uppercase text-black/[0.04]">
        TERMINUS
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
        <div>
          <span className="border-2 border-black bg-white px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
            END OF TRANSMISSION
          </span>
          <p className="font-display mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
            {site.wordmark}
          </p>
          <p className="mt-2 max-w-[42ch] font-bold text-black/80 text-sm sm:text-base">
            AI & Automation Engineer. Building the systems that keep running unattended.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-2.5 sm:justify-end">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t-2 border-black/20 pt-6 font-mono text-xs font-bold text-black sm:flex-row sm:items-center sm:justify-between">
        <span>
          &copy; {new Date().getFullYear() <= 2026 ? 2026 : new Date().getFullYear()} Ankit Mahadani. All rights reserved.
        </span>
        <span className="border border-black bg-white px-2 py-0.5 shadow-[1px_1px_0px_#000]">
          Crafted in Neobrutalism • Next.js + GSAP
        </span>
      </div>
    </footer>
  );
}
