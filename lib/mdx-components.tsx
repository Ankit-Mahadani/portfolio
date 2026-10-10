import type { ReactNode } from "react";
import { assetExists } from "@/lib/content";
import { slugify } from "@/lib/slugify";
import { Fig } from "@/components/mdx/Fig";
import { Gallery, type GalleryResolvedItem } from "@/components/mdx/Gallery";
import { CompareSlider } from "@/components/mdx/CompareSlider";
import { AnnotateHotspots } from "@/components/mdx/AnnotateHotspots";
import { Trace } from "@/components/mdx/Trace";
import { Metric } from "@/components/mdx/Metric";
import { Pull } from "@/components/mdx/Pull";
import { Spec } from "@/components/mdx/Spec";
import { CodeCompare } from "@/components/mdx/CodeCompare";

type GalleryItemInput = {
  src: string;
  alt: string;
  caption?: string;
  span?: "full" | "half" | "bleed";
  kind?: "screenshot" | "diagram" | "photo" | "ui";
  aspect?: string;
  fit?: "cover" | "contain";
};

export function getMdxComponents(slug: string) {
  const resolve = (filename: string) => ({
    exists: assetExists(slug, filename),
    src: assetExists(slug, filename) ? `/work/${slug}/${filename}` : undefined,
    expectedPath: `public/work/${slug}/${filename}`,
  });

  return {
    p: (props: { children: ReactNode }) => (
      <p className="my-5 max-w-[68ch] text-base sm:text-lg leading-relaxed text-black/90 font-medium" {...props} />
    ),
    h2: (props: { children: ReactNode }) => {
      const id = typeof props.children === "string" ? slugify(props.children) : undefined;
      return (
        <h2
          id={id}
          className="font-display mt-14 mb-4 max-w-[68ch] scroll-mt-24 text-3xl sm:text-4xl font-black uppercase tracking-tight text-black border-b-3 border-black pb-2"
          {...props}
        />
      );
    },
    h3: (props: { children: ReactNode }) => (
      <h3 className="font-display mt-10 mb-3 max-w-[68ch] text-2xl font-black uppercase text-black" {...props} />
    ),
    ul: (props: { children: ReactNode }) => (
      <ul className="my-5 max-w-[68ch] list-disc space-y-2.5 pl-6 font-medium text-black/90" {...props} />
    ),
    ol: (props: { children: ReactNode }) => (
      <ol className="my-5 max-w-[68ch] list-decimal space-y-2.5 pl-6 font-medium text-black/90" {...props} />
    ),
    a: (props: { children: ReactNode; href?: string }) => (
      <a
        {...props}
        className="font-bold text-black bg-[#ffe600] px-1 py-0.5 border border-black shadow-[1px_1px_0px_#000] hover:bg-[#00f0ff] transition-colors"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      />
    ),

    Fig: ({
      src,
      alt,
      caption,
      span,
      kind,
      aspect,
      fit,
      maxWidth,
    }: {
      src: string;
      alt: string;
      caption?: string;
      span?: "full" | "half" | "bleed";
      kind?: "screenshot" | "diagram" | "photo" | "ui";
      aspect?: string;
      fit?: "cover" | "contain";
      maxWidth?: string;
    }) => {
      const r = resolve(src);
      return (
        <Fig
          src={r.src}
          alt={alt}
          caption={caption}
          span={span}
          kind={kind}
          aspect={aspect}
          fit={fit}
          maxWidth={maxWidth}
          exists={r.exists}
          expectedPath={r.expectedPath}
        />
      );
    },

    Gallery: ({ items }: { items: GalleryItemInput[] }) => {
      const resolved: GalleryResolvedItem[] = items.map((item) => {
        const r = resolve(item.src);
        return {
          src: r.src,
          alt: item.alt,
          caption: item.caption,
          span: item.span ?? "half",
          kind: item.kind ?? "screenshot",
          aspect: item.aspect,
          fit: item.fit,
          exists: r.exists,
          expectedPath: r.expectedPath,
        };
      });
      return <Gallery items={resolved} />;
    },

    Compare: ({
      before,
      after,
      beforeAlt,
      afterAlt,
    }: {
      before: string;
      after: string;
      beforeAlt: string;
      afterAlt: string;
    }) => {
      const b = resolve(before);
      const a = resolve(after);
      return (
        <CompareSlider
          before={{ src: b.src, alt: beforeAlt, exists: b.exists, expectedPath: b.expectedPath }}
          after={{ src: a.src, alt: afterAlt, exists: a.exists, expectedPath: a.expectedPath }}
        />
      );
    },

    Annotate: ({
      src,
      alt,
      hotspots,
    }: {
      src: string;
      alt: string;
      hotspots: { x: number; y: number; label: string }[];
    }) => {
      const r = resolve(src);
      return (
        <AnnotateHotspots
          src={r.src}
          alt={alt}
          exists={r.exists}
          expectedPath={r.expectedPath}
          hotspots={hotspots}
        />
      );
    },

    Trace,
    Metric,
    Pull,
    Spec,
    CodeCompare,
  };
}
