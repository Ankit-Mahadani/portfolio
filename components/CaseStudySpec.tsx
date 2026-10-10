import type { Project } from "@/lib/schema";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "LIVE",
  shipped: "SHIPPED",
  archived: "ARCHIVED",
};

export function CaseStudySpec({ project }: { project: Project }) {
  const hasLinks = project.links.live || project.links.repo || project.links.demo;

  return (
    <div className="space-y-4 border-3 border-black bg-white p-5 font-mono text-xs text-black shadow-[6px_6px_0px_#000]">
      <div className="border-b-2 border-black pb-2 flex items-center justify-between">
        <span className="font-black uppercase tracking-wider">PROJECT SPECS</span>
        <span className="border border-black bg-[#a6ff00] px-1.5 py-0.5 text-[10px] font-black">
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <Row k="role" v={project.role} />
      <Row k="timeline" v={`${project.start} — ${project.end === "now" ? "now" : project.end}`} />
      
      <div>
        <span className="font-bold uppercase text-black/60">STACK</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="border-2 border-black bg-[#faf8f5] px-2 py-0.5 text-[11px] font-bold text-black shadow-[1px_1px_0px_#000]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {hasLinks && (
        <div className="flex flex-col gap-2 border-t-2 border-black/10 pt-4">
          <span className="font-bold uppercase text-black/60">EXTERNAL LINKS</span>
          {project.links.live && <LinkRow label="Live Deployment" href={project.links.live} />}
          {project.links.repo && <LinkRow label="Source Repository" href={project.links.repo} />}
          {project.links.demo && (
            <LinkRow
              label={
                project.links.demo.includes("pypi.org")
                  ? "PyPI Package"
                  : project.links.demo.includes("npm")
                    ? "npm Package"
                    : "Interactive Demo"
              }
              href={project.links.demo}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b-2 border-black/10 pb-3">
      <span className="font-bold uppercase text-black/60">{k}</span>
      <span className="font-bold text-black">{v}</span>
    </div>
  );
}

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-2 border-black bg-[#ffe600] px-3 py-1 font-bold text-black shadow-[2px_2px_0px_#000] inline-block hover:bg-[#00f0ff] transition-colors"
    >
      {label} &nearr;
    </a>
  );
}
