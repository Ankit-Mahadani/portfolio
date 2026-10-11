import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Manifest } from "@/components/Manifest";
import { RunRail, type RailProject } from "@/components/RunRail";
import { Experience } from "@/components/Experience";
import { Signals } from "@/components/Signals";
import { Contact } from "@/components/Contact";
import { CanvasTeaser } from "@/components/CanvasTeaser";
import { Footer } from "@/components/Footer";
import { getAllProjects, assetExists } from "@/lib/content";

export default function Home() {
  const projects = getAllProjects();

  const railProjects: RailProject[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    kicker: p.kicker,
    status: p.status,
    start: p.start,
    end: p.end,
    metrics: p.metrics,
    coverSrc: p.cover.src,
    coverAlt: p.cover.alt,
    coverExists: assetExists(p.slug, p.cover.src),
    coverFocal: p.cover.focal,
    stack: p.stack,
    summary: p.summary,
    links: p.links,
  }));

  return (
    <div className="relative min-h-screen bg-void text-chalk">
      <Hero />
      <About />
      <Manifest />
      <RunRail projects={railProjects} />
      <Experience />
      <Signals />
      <Contact />
      <CanvasTeaser />
      <Footer />
    </div>
  );
}
