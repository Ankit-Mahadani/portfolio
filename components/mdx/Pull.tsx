import { Reveal } from "@/components/Reveal";
import type { ReactNode } from "react";

export function Pull({ children }: { children: ReactNode }) {
  return (
    <Reveal
      as="div"
      className="my-12 w-full border-y-4 border-black bg-[#ffe600] py-8 sm:py-10 shadow-[0_4px_0px_#000]"
    >
      <p className="font-display mx-auto max-w-[28ch] px-4 text-center text-[clamp(1.5rem,4vw,2.75rem)] font-black uppercase leading-tight text-black sm:px-0">
        &ldquo;{children}&rdquo;
      </p>
    </Reveal>
  );
}
