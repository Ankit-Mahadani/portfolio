import { experience } from "@/content/experience";
import { RevealText } from "@/components/RevealText";
import { Reveal } from "@/components/Reveal";
import { getExtent, monthIndexOf } from "@/lib/timeline";

export function Experience() {
  const { min, max } = getExtent(experience);
  const span = max - min;

  return (
    <section id="experience" className="relative border-t-4 border-black px-4 py-20 sm:px-6 lg:px-10 overflow-hidden bg-white/40">
      {/* Background Frame Treatment: Process Columns & Gantt Lanes */}
      <div className="pointer-events-none absolute inset-0 bg-pattern-columns opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute right-8 top-8 font-mono text-[10px] font-black uppercase text-black/25 select-none hidden sm:block">
        THREAD_TRACE // 2024 — NOW
      </div>
      <div className="pointer-events-none absolute -bottom-10 left-12 select-none font-mono text-8xl font-black uppercase text-black/[0.03]">
        PROCESS.LOG
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-block -rotate-2">
          <span className="border-2 border-black bg-[#a6ff00] px-3.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000]">
            04 // EXPERIENCE
          </span>
        </div>
        <RevealText
          as="h2"
          lines={["Experience"]}
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight text-black"
        />
        <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-black/70">
          Industry roles, shipping cadences & impact
        </p>
      </div>

      <div className="mt-12 space-y-10">
        {experience.map((role) => {
          const s = monthIndexOf(role.start);
          const e = monthIndexOf(role.end);
          const leftPct = ((s - min) / span) * 100;
          const widthPct = Math.max(((e - s) / span) * 100, 6);
          const isNow = role.end === "now";

          return (
            <div
              key={role.org}
              className="border-3 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#000]"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span
                    className={`inline-block border-2 border-black px-2.5 py-0.5 font-mono text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000] ${
                      isNow ? "bg-[#a6ff00] rotate-2" : "bg-[#00f0ff] -rotate-1"
                    }`}
                  >
                    ● {isNow ? "CURRENTLY ACTIVE" : "COMPLETED"}
                  </span>

                  <h3 className="font-display mt-3 text-2xl sm:text-3xl font-black uppercase text-black">
                    {role.role}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-bold text-black/70 uppercase">
                    @ {role.org}
                  </p>

                  <div className="relative mt-5 h-3 w-full border-2 border-black bg-white shadow-[2px_2px_0px_#000]">
                    <div
                      className={`absolute top-0 h-full border-r border-black ${
                        isNow ? "bg-[#a6ff00]" : "bg-[#ffe600]"
                      }`}
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold text-black/60">
                    {role.start} &rarr; {role.end === "now" ? "PRESENT" : role.end}
                  </p>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between">
                  <ul className="space-y-3 font-medium text-black/90">
                    {role.bullets.map((b, i) => (
                      <Reveal
                        key={i}
                        as="li"
                        delay={i * 80}
                        className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed"
                      >
                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 border border-black bg-black" />
                        <span>{b}</span>
                      </Reveal>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t-2 border-black/10">
                    {role.stack.map((s) => (
                      <span
                        key={s}
                        className="border-2 border-black bg-[#faf8f5] px-2.5 py-0.5 font-mono text-[11px] font-bold text-black shadow-[2px_2px_0px_#000] hover:bg-[#ffe600] transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
