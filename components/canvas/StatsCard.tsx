export function StatsCard() {
  return (
    <div className="p-4 sm:p-5 flex flex-col gap-3.5 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-black/10 pb-2">
        <span className="font-mono text-[10px] font-black uppercase text-black/60">
          Telemetry &amp; Activity
        </span>
        <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          ONLINE
        </span>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="flex flex-col">
          <span className="font-display text-2xl font-black text-black">1,750</span>
          <span className="font-mono text-[10px] text-black/50">people have explored this canvas</span>
        </div>
        <span className="rounded-full border border-black bg-[#ffe600] px-2 py-0.5 font-mono text-[9px] font-black">
          +42 TODAY
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-black/10 text-center">
        <div className="rounded border border-black/10 bg-[#faf8f5] p-1.5">
          <span className="font-mono text-xs font-black block text-black">26</span>
          <span className="font-mono text-[8px] text-black/50 uppercase">Towns</span>
        </div>
        <div className="rounded border border-black/10 bg-[#faf8f5] p-1.5">
          <span className="font-mono text-xs font-black block text-black">2,501</span>
          <span className="font-mono text-[8px] text-black/50 uppercase">Clicks</span>
        </div>
        <div className="rounded border border-black/10 bg-[#faf8f5] p-1.5">
          <span className="font-mono text-xs font-black block text-black">1.5s</span>
          <span className="font-mono text-[8px] text-black/50 uppercase">TTFB</span>
        </div>
        <div className="rounded border border-black/10 bg-[#faf8f5] p-1.5">
          <span className="font-mono text-xs font-black block text-black">99%</span>
          <span className="font-mono text-[8px] text-black/50 uppercase">Uptime</span>
        </div>
      </div>
    </div>
  );
}
