"use client";

import { useEffect, useRef } from "react";

export function ReactiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let offset = 0;
    const baseSpeed = -0.75; // Base drift: negative values move toward top-left (bottom-right -> top-left)
    let speed = baseSpeed;
    let targetSpeed = baseSpeed;
    let prevX = 0;
    let prevY = 0;
    let hasPrev = false;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasPrev) {
        prevX = e.clientX;
        prevY = e.clientY;
        hasPrev = true;
        return;
      }

      const vx = e.clientX - prevX;
      const vy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      // Project mouse movement onto the diagonal vector (-1, -1) [top-left direction]
      // Top-left movement (vx < 0, vy < 0) yields a positive dot product.
      // Bottom-right movement (vx > 0, vy > 0) yields a negative dot product.
      const dot = (-vx - vy) / 1.414;

      if (dot > 0) {
        // SAME DIRECTION (towards top-left) -> Speeds up!
        targetSpeed = baseSpeed - Math.min(dot * 0.14, 4.0);
      } else {
        // OPPOSITE DIRECTION (towards bottom-right) -> Slows down!
        // Moves targetSpeed towards near-zero / very slow crawl
        targetSpeed = Math.min(-0.08, baseSpeed - dot * 0.085);
      }
    };

    const loop = () => {
      // Natural spring decay back to base cruising speed
      targetSpeed += (baseSpeed - targetSpeed) * 0.055;
      speed += (targetSpeed - speed) * 0.12;

      offset = (offset + speed) % 80;

      if (gridRef.current) {
        gridRef.current.style.backgroundPosition = `${offset}px ${offset}px`;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="pointer-events-none absolute inset-0 opacity-85"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.08) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1.5px, transparent 1.5px)",
        backgroundSize: "80px 80px",
        willChange: "background-position",
      }}
      aria-hidden="true"
    />
  );
}
