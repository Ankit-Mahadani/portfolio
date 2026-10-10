import { z } from "zod";

export const statusEnum = z.enum(["live", "shipped", "archived"]);
export const spanEnum = z.enum(["full", "half", "bleed"]);
export const kindEnum = z.enum(["screenshot", "diagram", "photo", "ui"]);

export const metricSchema = z.object({
  value: z.string(),
  unit: z.string(),
  label: z.string(),
});

export const galleryItemSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  span: spanEnum.default("half"),
  kind: kindEnum.default("screenshot"),
  aspect: z.string().optional(),
  fit: z.enum(["cover", "contain"]).optional(),
});

export const coverSchema = z.object({
  src: z.string(),
  alt: z.string(),
  focal: z.string().default("50% 50%"),
});

export const linksSchema = z.object({
  live: z.string().optional().default(""),
  repo: z.string().optional().default(""),
  demo: z.string().optional().default(""),
});

export const projectFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  kicker: z.string(),
  status: statusEnum,
  start: z.string().regex(/^\d{4}-\d{2}$/, "start must be YYYY-MM"),
  end: z.string().regex(/^\d{4}-\d{2}$/, "end must be YYYY-MM").or(z.literal("now")),
  role: z.string(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  stack: z.array(z.string()).min(1),
  summary: z.string(),
  metrics: z.array(metricSchema).default([]),
  cover: coverSchema,
  gallery: z.array(galleryItemSchema).default([]),
  links: linksSchema.default({ live: "", repo: "", demo: "" }),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type Metric = z.infer<typeof metricSchema>;

export type Project = ProjectFrontmatter & {
  content: string;
  readingMinutes: number;
};
