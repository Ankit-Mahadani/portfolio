import { skillGroups } from "@/content/skills";
import { TechIcon } from "@/components/TechIcons";

export function ToolboxCard() {
  return (
    <div className="p-4 sm:p-5 flex flex-col gap-3.5 font-sans text-xs max-h-[380px] overflow-y-auto">
      <div className="border-b border-black/10 pb-2">
        <span className="font-mono text-[10px] font-black uppercase text-black/60">
          Core Languages, Frameworks &amp; Systems
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {skillGroups.map((group) => (
          <div key={group.category} className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] font-bold text-black/50 uppercase">
              {group.category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 rounded border border-black/15 bg-white px-2 py-1 font-mono text-[11px] font-semibold text-black shadow-[1px_1px_0px_rgba(0,0,0,0.06)] hover:border-black"
                >
                  <TechIcon name={item} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
