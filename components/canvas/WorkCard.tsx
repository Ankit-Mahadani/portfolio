import Link from "next/link";

const PROJECTS = [
  {
    slug: "nexora",
    title: "Nexora",
    desc: "Autonomous AI engineering platform with NVIDIA AVO evolutionary loop",
    tag: "LIVE",
    year: "2026",
    color: "bg-[#00f0ff]",
  },
  {
    slug: "neuva-lang",
    title: "Neuva",
    desc: "Python library for custom neural network loss & regression",
    tag: "SHIPPED",
    year: "2026",
    color: "bg-[#a6ff00]",
  },
  {
    slug: "darzi-resume-suite",
    title: "Darzi Resume Suite",
    desc: "Multi-agent RAG system for tailored resume generation",
    tag: "LIVE",
    year: "2026",
    color: "bg-[#00f0ff]",
  },
  {
    slug: "hebrew-sales-agent",
    title: "Hebrew Sales Agent",
    desc: "Autonomous conversational agent handling 500+ leads/wk",
    tag: "PROD",
    year: "2025",
    color: "bg-[#ff66c4]",
  },
  {
    slug: "cancer-detection",
    title: "Histopathologic Cancer Detection",
    desc: "DenseNet deep learning classifier achieving 94% accuracy",
    tag: "MODEL",
    year: "2025",
    color: "bg-[#ffe600]",
  },
];

export function WorkCard() {
  return (
    <div className="p-4 sm:p-5 flex flex-col gap-3 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-black/10 pb-2">
        <span className="font-mono text-[10px] font-black uppercase text-black/60">
          Featured Projects &amp; Libraries
        </span>
        <span className="font-mono text-[10px] font-bold text-black/50">5 projects</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {PROJECTS.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex items-center justify-between rounded-lg border-2 border-black/20 bg-white p-2.5 shadow-[1px_1px_0px_#000] transition-all hover:-translate-y-0.5 hover:border-black hover:shadow-[3px_3px_0px_#000]"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs font-black uppercase text-black group-hover:underline">
                  {p.title}
                </span>
                <span className="font-mono text-[9px] text-black/40">{p.year}</span>
              </div>
              <p className="font-sans text-[11px] text-black/70 line-clamp-1">{p.desc}</p>
            </div>
            <span
              className={`rounded border border-black px-1.5 py-0.5 font-mono text-[9px] font-black uppercase text-black ${p.color}`}
            >
              {p.tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
