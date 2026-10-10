"use client";

import { useEffect, useState } from "react";
import { reducedMotionNow } from "@/lib/motion";

/** Splits "500+", "94", "0.32", "<1", "ATS" into an animatable numeric part plus literal prefix/suffix. */
function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: raw, number: null as number | null, suffix: "", decimals: 0 };
  const [, prefix = "", num = "0", suffix = ""] = match;
  const decimals = num.includes(".") ? num.split(".")[1]?.length ?? 0 : 0;
  return { prefix, number: parseFloat(num), suffix, decimals };
}

export function Counter({ value, active = true }: { value: string; active?: boolean }) {
  const { prefix, number, suffix, decimals } = parseValue(value);
  const [display, setDisplay] = useState<string>(() => {
    if (number === null) return value;
    return number.toFixed(decimals);
  });

  useEffect(() => {
    if (number === null) {
      setDisplay(value);
      return;
    }

    if (!active || reducedMotionNow()) {
      setDisplay(number.toFixed(decimals));
      return;
    }

    const duration = 700;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = number * eased;
      setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString());
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(number.toFixed(decimals));
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, number, decimals]);

  if (number === null) {
    return (
      <span>
        {prefix}
        {suffix}
      </span>
    );
  }

  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
