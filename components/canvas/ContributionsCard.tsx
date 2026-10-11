"use client";

import { useMemo } from "react";

export function ContributionsCard() {
  // Generate mock realistic GitHub commit activity for 52 weeks x 7 days
  const grid = useMemo(() => {
    const weeks = [];
    for (let w = 0; w < 32; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const rand = Math.random();
        const level =
          rand > 0.85 ? 4 : rand > 0.65 ? 3 : rand > 0.4 ? 2 : rand > 0.2 ? 1 : 0;
        days.push(level);
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const getCellBg = (lvl: number) => {
    switch (lvl) {
      case 4:
        return "bg-[#216e39]";
      case 3:
        return "bg-[#30a14e]";
      case 2:
        return "bg-[#40c463]";
      case 1:
        return "bg-[#9be9a8]";
      default:
        return "bg-[#ebedf0]";
    }
  };

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-3 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-black/10 pb-2">
        <div>
          <span className="font-display text-sm font-black text-black">
            3,121 contributions in the last year
          </span>
          <p className="font-mono text-[10px] text-black/50">
            Commits, agent workflows &amp; pull requests
          </p>
        </div>
        <span className="rounded border border-black bg-[#a6ff00] px-2 py-0.5 font-mono text-[9px] font-black uppercase text-black">
          ACTIVE
        </span>
      </div>

      <div className="overflow-x-auto py-2">
        <div className="flex gap-1 min-w-[320px]">
          {grid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  title={`Level ${level} activity`}
                  className={`h-2.5 w-2.5 rounded-[2px] transition-transform hover:scale-125 ${getCellBg(
                    level
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-black/60 pt-1">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-[2px] bg-[#ebedf0]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#9be9a8]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#40c463]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#30a14e]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#216e39]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
