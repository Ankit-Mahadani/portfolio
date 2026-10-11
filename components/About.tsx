import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="relative border-t-4 border-black py-20 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#faf8f5]"
    >
      {/* Background Frame Watermark */}
      <div className="pointer-events-none absolute right-8 top-8 font-mono text-[10px] font-black uppercase text-black/20 select-none hidden sm:block">
        PROFILE_SPEC // SECTION_01
      </div>

      <div className="max-w-6xl mx-auto">
        {/* About Header matching reference spec */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">
              ABOUT
            </span>
            <div className="h-[1px] w-28 sm:w-44 bg-black/25" />
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            Hi there!
          </h2>
        </div>

        {/* 2-Column Layout: Photo on Left, Story on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Portrait Photo */}
          <div className="md:col-span-5 lg:col-span-5 max-w-sm sm:max-w-md mx-auto md:mx-0 w-full">
            <div className="group relative overflow-hidden rounded-2xl border-3 border-black bg-white shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0px_#000]">
              <Image
                src="/ankit.jpg"
                alt="Ankit Mahadani"
                width={600}
                height={750}
                priority
                className="w-full aspect-[4/5] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Right Column: Introduction & Background */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center">
            {/* Bold Headline Statement */}
            <p className="font-display text-2xl sm:text-3xl md:text-[2.1rem] font-bold leading-snug sm:leading-[1.28] tracking-tight text-black">
              I build AI stuff and anything else I find interesting, RAG pipelines, multi-agent systems, Full Stack apps, and generally anything that looks shiny at 2AM in the morning :)
            </p>

            {/* Narrative Paragraphs */}
            <div className="mt-6 sm:mt-8 space-y-4 font-sans text-sm sm:text-base leading-relaxed text-black/75">
              <p>
                Computer Science &amp; Engineering student at <span className="font-semibold text-black">VIT Bhopal</span>, diving deep into Machine Learning and autonomous agents, because apparently one courseload wasn&apos;t enough.
              </p>
              <p>
                Right now I split my time between building production AI systems, engineering RAG pipelines and workflow automations, and developing open-source ML libraries like <span className="font-semibold text-black">Neuva</span>.
              </p>
              <p>
                I like building things, breaking them, and occasionally wondering why I decided to build them in the first place.
              </p>
            </div>

            {/* Quick Status Pill Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5 pt-6 border-t border-black/15">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3 py-1 font-mono text-xs font-semibold text-black shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
                <span className="h-2 w-2 rounded-full bg-[#a6ff00] animate-pulse" />
                Available for internships
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3 py-1 font-mono text-xs font-semibold text-black shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
                📍 Durgapur, India
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3 py-1 font-mono text-xs font-semibold text-black shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
                🎓 VIT Bhopal &apos;28
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
