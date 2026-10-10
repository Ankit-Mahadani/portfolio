import { RevealImage } from "@/components/RevealImage";

export function Fig({
  src,
  alt,
  caption,
  span = "full",
  kind = "screenshot",
  exists,
  expectedPath,
  aspect,
  fit,
  maxWidth,
}: {
  src?: string;
  alt: string;
  caption?: string;
  span?: "full" | "half" | "bleed";
  kind?: "screenshot" | "diagram" | "photo" | "ui";
  exists: boolean;
  expectedPath: string;
  aspect?: string;
  fit?: "cover" | "contain";
  maxWidth?: string;
}) {
  const wrapClass =
    span === "bleed"
      ? "my-10 w-full"
      : span === "half"
        ? "my-10 sm:max-w-[50%] sm:mx-auto"
        : maxWidth
          ? "my-10 mx-auto w-full"
          : "my-10";

  const defaultAspect =
    span === "bleed" ? "21 / 9" : kind === "screenshot" || kind === "ui" ? "16 / 9" : "16 / 10";

  return (
    <figure className={wrapClass} style={maxWidth ? { maxWidth } : undefined}>
      <RevealImage
        src={src}
        alt={alt}
        exists={exists}
        expectedPath={expectedPath}
        kind={kind}
        aspect={aspect ?? defaultAspect}
        fit={fit ?? (kind === "screenshot" || kind === "ui" ? "contain" : "cover")}
      />
      {caption && (
        <figcaption className="mt-2.5 inline-block border border-black bg-white px-2 py-0.5 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
