import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { projectFrontmatterSchema, type Project } from "./schema";
import { monthIndexOf } from "./timeline";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const WORK_DIR = path.join(process.cwd(), "public", "work");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const filePath = path.join(PROJECTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const result = projectFrontmatterSchema.safeParse(data);
    if (!result.success) {
      throw new Error(
        `Invalid frontmatter in content/projects/${filename}:\n${result.error.issues
          .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`
      );
    }

    const fm = result.data;
    if (fm.slug !== filename.replace(/\.mdx$/, "")) {
      throw new Error(
        `Slug mismatch in content/projects/${filename}: frontmatter slug "${fm.slug}" must match filename`
      );
    }

    return {
      ...fm,
      content,
      readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    } satisfies Project;
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project | undefined {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  return all[(idx + 1) % all.length];
}

/**
 * public/work/<slug>/ may be empty until real photos are dropped in. Existence is
 * checked at request time (server/build only) so the UI can render an honest
 * placeholder instead of a broken <img> or stock photography.
 */
export function assetExists(slug: string, filename: string): boolean {
  return fs.existsSync(path.join(WORK_DIR, slug, filename));
}
