export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(markdown: string): { id: string; label: string }[] {
  const lines = markdown.split("\n");
  return lines
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const label = line.replace(/^##\s+/, "").trim();
      return { id: slugify(label), label };
    });
}
