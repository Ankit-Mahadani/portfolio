"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getGsap } from "@/lib/gsap";
import { reducedMotionNow, usePrefersReducedMotion } from "@/lib/motion";
import { startViewTransition } from "@/lib/view-transition";
import { monthIndexOf, getExtent, yearOfIndex } from "@/lib/timeline";
import { Counter } from "@/components/Counter";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import { RevealImage } from "@/components/RevealImage";

export type RailProject = {
  slug: string;
  title: string;
  kicker: string;
  status: "live" | "shipped" | "archived";
  start: string;
  end: string;
  metrics: { value: string; unit: string; label: string }[];
  coverSrc: string;
  coverAlt: string;
  coverExists: boolean;
  coverFocal: string;
  stack?: string[];
  summary?: string;
  links?: { live?: string; repo?: string; demo?: string };
};

const STATUS_LABEL: Record<RailProject["status"], string> = {
  live: "LIVE",
  shipped: "SHIPPED",
  archived: "ARCHIVED",
};

const STATUS_BG: Record<RailProject["status"], string> = {
  live: "bg-[#a6ff00]",
  shipped: "bg-[#00f0ff]",
  archived: "bg-[#ffe600]",
};

export function RunRail({ projects }: { projects: RailProject[] }) {
  const { min, max } = useMemo(
    () => getExtent(projects.map((p) => ({ start: p.start, end: p.end }))),
    [projects]
  );
  const span = max - min;

  const bars = useMemo(
    () =>
      projects.map((p) => {
        const s = monthIndexOf(p.start);
        const e = monthIndexOf(p.end);
        return {
          ...p,
          leftPct: ((s - min) / span) * 100,
          widthPct: Math.max(((e - s) / span) * 100, 4),
        };
      }),
    [projects, min, span]
  );

  const years = useMemo(() => {
    const startYear = yearOfIndex(min);
    const endYear = yearOfIndex(max);
    const list: number[] = [];
    for (let y = startYear; y <= endYear; y++) list.push(y);
    return list;
  }, [min, max]);

  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(bars.length - 1);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (reducedMotionNow()) return;
    const pin = pinRef.current;
    const axis = axisRef.current;
    const playhead = playheadRef.current;
    if (!pin || !axis || !playhead) return;

    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * bars.length * 0.9}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const monthPos = min + self.progress * span;
          gsap.set(playhead, { left: `${self.progress * 100}%` });

          let nearest = 0;
          let best = Infinity;
          bars.forEach((b, i) => {
            const s = monthIndexOf(b.start);
            const e = monthIndexOf(b.end);
            const dist = monthPos < s ? s - monthPos : monthPos > e ? monthPos - e : 0;
            if (dist < best) {
              best = dist;
              nearest = i;
            }
          });
          setActiveIndex(nearest);
        },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, [bars, min, span]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 1024) return;
      const centerY = window.innerHeight / 2;
      let nearest = 0;
      let best = Infinity;
      barRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - centerY);
        if (dist < best) {
          best = dist;
          nearest = i;
        }
      });
      setActiveIndex(nearest);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = bars[activeIndex]!;
  const router = useRouter();

  const openProject = (slug: string) => {
    const nav = () => router.push(`/work/${slug}`);
    if (reduced) nav();
    else startViewTransition(nav);
  };

  const moveFocus = (delta: number) => {
    const next = Math.max(0, Math.min(bars.length - 1, (focusIndex ?? activeIndex) + delta));
    setFocusIndex(next);
    setActiveIndex(next);
    barRefs.current[next]?.focus();
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Project run history"
      className="border-t-4 border-black"
    >
      {/* Desktop pinned rail */}
      <div ref={pinRef} className="relative hidden h-[calc(100svh-2rem)] lg:block bg-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-pattern-blueprint opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute right-8 bottom-6 select-none font-mono text-9xl font-black uppercase text-black/[0.02]">
          CAD_LOG
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10 xl:px-10">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-block -rotate-2">
                    <span className="border-2 border-black bg-[#00f0ff] px-3.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000]">
                      03 // WORK — {activeIndex + 1} OF {bars.length}
                    </span>
                  </div>
                  <span className="border-2 border-black bg-white px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000]">
                    {active.start} &rarr; {active.end === "now" ? "PRESENT" : active.end}
                  </span>
                </div>

                <h2 className="font-display mt-3 text-[clamp(2.5rem,4.5vw,4.5rem)] font-black uppercase leading-none text-black tracking-tight">
                  {active.title}
                </h2>
                <p className="mt-2 max-w-[54ch] text-base font-bold text-black/85">{active.kicker}</p>

                {active.stack && active.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 max-w-xl">
                    {active.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-black bg-[#faf8f5] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[1px_1px_0px_#000]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 w-full max-w-xl border-3 border-black shadow-[6px_6px_0px_#000] bg-white">
                <RevealImage
                  key={active.slug}
                  src={active.coverExists ? `/work/${active.slug}/${active.coverSrc}` : undefined}
                  alt={active.coverAlt}
                  exists={active.coverExists}
                  expectedPath={`public/work/${active.slug}/${active.coverSrc}`}
                  focal={active.coverFocal}
                  aspect="16 / 9"
                  priority
                  transitionName={`cover-${active.slug}`}
                />
              </div>
            </div>

            <div className="col-span-5 flex flex-col items-end justify-between text-right">
              <div className="flex items-center gap-2">
                {active.links?.live && (
                  <a
                    href={active.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-black bg-[#ffe600] px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-[#00f0ff] transition-colors"
                  >
                    Playground &nearr;
                  </a>
                )}
                <span
                  className={`rotate-2 border-2 border-black ${STATUS_BG[active.status]} px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000]`}
                >
                  ● {STATUS_LABEL[active.status]}
                </span>
              </div>

              <div className="my-4 space-y-2.5 w-full max-w-sm">
                {active.metrics.map((m) => (
                  <div
                    key={`${active.slug}-${m.label}`}
                    className="border-2 border-black bg-[#faf8f5] p-2.5 text-right shadow-[3px_3px_0px_#000]"
                  >
                    <div className="font-display text-2xl font-black text-black">
                      <Counter key={`${active.slug}-${m.label}-${m.value}`} value={m.value} active />
                      <span className="ml-1.5 font-mono text-xs font-bold text-black/60">{m.unit}</span>
                    </div>
                    <div className="font-mono text-[10px] font-bold uppercase text-black/70">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 w-full">
                <ViewTransitionLink
                  href={`/work/${active.slug}`}
                  data-cursor="OPEN"
                  className="border-3 border-black bg-[#ff66c4] px-6 py-3 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none inline-flex items-center gap-2"
                >
                  <span>Open case study</span>
                  <span aria-hidden="true">&rarr;</span>
                </ViewTransitionLink>
              </div>
            </div>
          </div>

          {/* Timeline axis */}
          <div className="relative mt-8 border-t-2 border-black/10 pt-4">
            <div className="mb-2 flex justify-between font-mono text-xs font-bold text-black/70">
              {years.map((y, i) => (
                <span key={y}>
                  {y}
                  {i === years.length - 1 ? " — PRESENT" : ""}
                </span>
              ))}
            </div>
            <div ref={axisRef} className="relative h-2 w-full border-2 border-black bg-black">
              <div
                ref={playheadRef}
                className="absolute top-1/2 h-8 w-4 -translate-y-1/2 border-2 border-black bg-[#ffe600] shadow-[2px_2px_0px_#000]"
                aria-hidden="true"
                style={{ left: "0%" }}
              />
            </div>
            <div className="relative mt-4 h-20">
              {bars.map((bar, i) => (
                <button
                  key={bar.slug}
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  type="button"
                  onFocus={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => openProject(bar.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      moveFocus(1);
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      moveFocus(-1);
                    }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      openProject(bar.slug);
                    }
                  }}
                  aria-current={i === activeIndex}
                  aria-label={`${bar.title}, ${STATUS_LABEL[bar.status]}, ${bar.start} to ${bar.end}`}
                  data-cursor="OPEN"
                  className="absolute top-0 flex flex-col items-start gap-1.5 text-left transition-all"
                  style={{
                    left: `${bar.leftPct}%`,
                    width: `${bar.widthPct}%`,
                    opacity: reduced ? 1 : i === activeIndex ? 1 : 0.4,
                  }}
                >
                  <span
                    className={`block w-full border-2 border-black transition-all ${
                      i === activeIndex
                        ? "h-8 bg-[#ffe600] shadow-[3px_3px_0px_#000]"
                        : "h-5 bg-white shadow-[2px_2px_0px_#000]"
                    }`}
                  />
                  <span className="truncate font-mono text-[10px] font-bold uppercase text-black">
                    {bar.slug}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked vertical cards */}
      <div className="relative overflow-hidden bg-white/60 lg:hidden px-4 py-14 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-pattern-blueprint opacity-60" aria-hidden="true" />
        <div className="relative z-10">
          <div className="mb-4 inline-block -rotate-2">
          <span className="border-2 border-black bg-[#00f0ff] px-3.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000]">
            03 // WORK HISTORY
          </span>
        </div>
        <h2 className="font-display text-[clamp(2.5rem,8vw,3.5rem)] font-black uppercase text-black">
          Projects
        </h2>

        <div className="mt-8 space-y-8">
          {bars.map((bar, i) => (
            <div
              key={bar.slug}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className="border-3 border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_#000]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-black/70">
                  {bar.start} — {bar.end === "now" ? "now" : bar.end}
                </span>
                <span
                  className={`border-2 border-black ${STATUS_BG[bar.status]} px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[1px_1px_0px_#000]`}
                >
                  {STATUS_LABEL[bar.status]}
                </span>
              </div>

              <h3 className="font-display text-2xl font-black uppercase text-black">{bar.title}</h3>
              <p className="mt-2 text-sm font-bold text-black/80">{bar.kicker}</p>

              {bar.stack && bar.stack.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {bar.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-black bg-[#faf8f5] px-1.5 py-0.5 font-mono text-[9px] font-black uppercase text-black"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 border-2 border-black shadow-[3px_3px_0px_#000]">
                <RevealImage
                  src={bar.coverExists ? `/work/${bar.slug}/${bar.coverSrc}` : undefined}
                  alt={bar.coverAlt}
                  exists={bar.coverExists}
                  expectedPath={`public/work/${bar.slug}/${bar.coverSrc}`}
                  focal={bar.coverFocal}
                  aspect="16 / 10"
                  transitionName={i === activeIndex ? `cover-${bar.slug}` : undefined}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {bar.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="border-2 border-black bg-[#faf8f5] p-2.5 shadow-[2px_2px_0px_#000]"
                  >
                    <div className="font-mono text-sm font-black text-black">
                      {m.value}
                      <span className="ml-1 text-xs text-black/60">{m.unit}</span>
                    </div>
                    <div className="font-mono text-[10px] font-bold text-black/60 uppercase">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <ViewTransitionLink
                href={`/work/${bar.slug}`}
                className="mt-5 border-2 border-black bg-[#ff66c4] px-4 py-2.5 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000] inline-flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none w-full justify-center"
              >
                <span>Open case study</span>
                <span aria-hidden="true">&rarr;</span>
              </ViewTransitionLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
}
