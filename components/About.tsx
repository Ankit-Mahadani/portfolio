import { profile } from "@/content/profile";
import { RevealText } from "@/components/RevealText";

export function About() {
  return (
    <section id="about" className="relative border-t-4 border-black px-4 py-20 sm:px-6 lg:px-10 overflow-hidden bg-white/40">
      {/* Background Frame Treatment: Technical Graph Grid & Margin Rulers */}
      <div className="pointer-events-none absolute inset-0 bg-pattern-grid opacity-75" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 border-r border-dashed border-black/15 hidden 2xl:flex flex-col justify-between py-10 items-center font-mono text-[9px] font-bold text-black/30 select-none">
        <span>[01]</span>
        <span>|</span>
        <span>[02]</span>
        <span>|</span>
        <span>[03]</span>
      </div>
      <div className="pointer-events-none absolute -bottom-10 left-1/3 select-none font-mono text-8xl font-black uppercase text-black/[0.03]">
        ARCH_PROFILE
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-block rotate-2">
          <span className="border-2 border-black bg-[#ffe600] px-3.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000]">
            01 // BACKGROUND
          </span>
        </div>

        <RevealText
          as="h2"
          lines={["About"]}
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight text-black"
        />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="border-3 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#000] lg:col-span-8">
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-black/90 font-medium">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-16 border-3 border-black bg-white shadow-[6px_6px_0px_#000] overflow-hidden">
              <div className="border-b-3 border-black bg-[#00f0ff] px-5 py-3.5 flex items-center justify-between font-mono font-black text-xs uppercase text-black">
                <span>Education & Specs</span>
                <span className="border border-black bg-white px-2 py-0.5 text-[10px]">VERIFIED</span>
              </div>
              <div className="p-5 space-y-4 font-mono text-xs">
                <SpecRow k="degree" v={profile.education.degree} />
                <SpecRow k="school" v={profile.education.school} />
                <SpecRow k="duration" v={profile.education.duration} />
                <SpecRow k="focus" v={profile.education.focus} />
                <SpecRow k="base" v={profile.base} />
                <SpecRow k="since" v={profile.since} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 border-b-2 border-black/10 pb-3 last:border-0 last:pb-0">
      <span className="font-bold uppercase text-black/60">{k}</span>
      <span className="font-bold text-black">{v}</span>
    </div>
  );
}
