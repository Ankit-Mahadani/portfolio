import { skillGroups } from "@/content/skills";
import { TechIcon } from "@/components/TechIcons";
import { Marquee } from "@/components/Marquee";

export function Manifest() {
  const allItems = skillGroups.flatMap((g) => g.items);

  return (
    <section
      id="manifest"
      className="relative border-t-4 border-black py-20 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#faf8f5]"
    >
      {/* Subtle Background Terminal Watermark */}
      <div className="pointer-events-none absolute right-8 top-8 font-mono text-[10px] font-black uppercase text-black/20 select-none hidden sm:block">
        RUNTIME_TOOLBOX // SYS.CONFIG
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Toolbox Header matching reference spec */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">
              TOOLBOX
            </span>
            <div className="h-[1px] w-28 sm:w-44 bg-black/25" />
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight">
            What I build with
          </h2>
        </div>

        {/* Categories Divided Rows */}
        <div className="border-t border-black/15">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="flex flex-col sm:flex-row sm:items-center border-b border-black/15 py-5 sm:py-6 gap-3 sm:gap-8"
            >
              {/* Category Label */}
              <div className="w-full sm:w-44 shrink-0 font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-black/60">
                {group.category}
              </div>

              {/* Skills Badges Pill Row */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-black/15 bg-white px-3.5 py-1.5 shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-all duration-150 hover:-translate-y-0.5 hover:border-black hover:shadow-[3px_3px_0px_#000] cursor-default"
                  >
                    <TechIcon name={item} />
                    <span className="font-mono text-xs sm:text-[13px] font-semibold text-black">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker along the bottom */}
      <div className="relative z-10 mt-16 -mx-4 sm:-mx-8 lg:-mx-16">
        <Marquee items={allItems} />
      </div>
    </section>
  );
}
