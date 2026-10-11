import { Suspense } from "react";
import type { Metadata } from "next";
import { InteractiveCanvas } from "@/components/canvas/InteractiveCanvas";

export const metadata: Metadata = {
  title: "Canvas // Ankit Mahadani",
  description:
    "An infinite interactive canvas playground with beautiful cards, arcade games, and ambient lofi.",
};

export default function CanvasPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#f6f5f0]">
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center font-mono text-sm font-bold uppercase text-black">
            Loading Canvas...
          </div>
        }
      >
        <InteractiveCanvas />
      </Suspense>
    </main>
  );
}
