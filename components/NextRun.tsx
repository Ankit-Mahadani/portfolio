import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import { RevealImage } from "@/components/RevealImage";
import { assetExists } from "@/lib/content";
import type { Project } from "@/lib/schema";

export function NextRun({ project }: { project: Project }) {
  const coverExists = assetExists(project.slug, project.cover.src);

  return (
    <ViewTransitionLink
      href={`/work/${project.slug}`}
      data-cursor="OPEN"
      className="group mt-20 block border-3 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#000]"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="w-full sm:w-64 border-2 border-black shadow-[3px_3px_0px_#000] flex-shrink-0">
          <RevealImage
            src={coverExists ? `/work/${project.slug}/${project.cover.src}` : undefined}
            alt={project.cover.alt}
            exists={coverExists}
            expectedPath={`public/work/${project.slug}/${project.cover.src}`}
            focal={project.cover.focal}
            aspect="16 / 10"
          />
        </div>
        <div>
          <span className="border-2 border-black bg-[#ff66c4] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
            NEXT CASE STUDY &rarr;
          </span>
          <h3 className="font-display mt-3 text-2xl sm:text-3xl font-black uppercase text-black group-hover:underline">
            {project.title}
          </h3>
          <p className="mt-2 max-w-[52ch] text-sm font-bold text-black/70">
            {project.kicker}
          </p>
        </div>
      </div>
    </ViewTransitionLink>
  );
}
