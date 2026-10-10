import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug, getAdjacentProject, assetExists } from "@/lib/content";
import { getMdxComponents } from "@/lib/mdx-components";
import { extractHeadings } from "@/lib/slugify";
import { RevealImage } from "@/components/RevealImage";
import { TOC } from "@/components/TOC";
import { CaseStudySpec } from "@/components/CaseStudySpec";
import { MetricsBand } from "@/components/MetricsBand";
import { Gallery, type GalleryResolvedItem } from "@/components/mdx/Gallery";
import { NextRun } from "@/components/NextRun";
import { site } from "@/content/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const headings = extractHeadings(project.content);
  const nextProject = getAdjacentProject(slug);
  const coverExists = assetExists(project.slug, project.cover.src);

  const gallery: GalleryResolvedItem[] = project.gallery.map((item) => {
    const exists = assetExists(project.slug, item.src);
    return {
      src: exists ? `/work/${project.slug}/${item.src}` : undefined,
      alt: item.alt,
      caption: item.caption,
      span: item.span,
      kind: item.kind,
      exists,
      expectedPath: `public/work/${project.slug}/${item.src}`,
    };
  });

  return (
    <article className="min-h-screen bg-[#faf8f5] text-black">
      <header className="relative px-4 pt-12 sm:px-6 lg:px-10">
        <Link
          href="/#work"
          className="mb-8 inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] transition-all hover:bg-[#ffe600] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          &larr; Return to Overview
        </Link>

        <div className="border-3 border-black shadow-[8px_8px_0px_#000] bg-white">
          <RevealImage
            src={coverExists ? `/work/${project.slug}/${project.cover.src}` : undefined}
            alt={project.cover.alt}
            exists={coverExists}
            expectedPath={`public/work/${project.slug}/${project.cover.src}`}
            focal={project.cover.focal}
            aspect="21 / 9"
            priority
            transitionName={`cover-${project.slug}`}
          />
        </div>

        <div className="py-8">
          <div className="inline-block -rotate-1">
            <span className="border-2 border-black bg-[#ffe600] px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000]">
              {project.start} &rarr; {project.end === "now" ? "PRESENT" : project.end}
            </span>
          </div>

          <h1 className="font-display mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-tight text-black tracking-tight">
            {project.title}
          </h1>
          <p className="mt-3 max-w-[64ch] text-lg sm:text-xl font-bold text-black/85">
            {project.kicker}
          </p>
        </div>
      </header>

      <MetricsBand metrics={project.metrics} />

      <div className="grid grid-cols-1 gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <aside className="lg:sticky lg:top-14 lg:col-span-3 lg:h-fit lg:self-start">
          <TOC headings={headings} />
          <div className="mt-6">
            <CaseStudySpec project={project} />
          </div>
        </aside>

        <div className="lg:col-span-9">
          <MDXRemote source={project.content} components={getMdxComponents(project.slug)} />

          {gallery.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display mb-4 text-3xl font-black uppercase text-black">
                Visual Documentation
              </h2>
              <Gallery items={gallery} />
            </section>
          )}

          {nextProject && <NextRun project={nextProject} />}
        </div>
      </div>
    </article>
  );
}
