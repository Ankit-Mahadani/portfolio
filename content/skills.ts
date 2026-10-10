export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "LANGUAGES",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"],
  },
  {
    category: "FRAMEWORKS",
    items: ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "PyTorch"],
  },
  {
    category: "DATABASES",
    items: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "Prisma", "SQLite"],
  },
  {
    category: "CLOUD & DEVOPS",
    items: ["AWS", "Docker", "Git", "GitHub Actions", "S3"],
  },
  {
    category: "AI/ML",
    items: ["LLM APIs", "LangGraph", "RAG pipelines", "Vector embeddings", "Semantic search"],
  },
  {
    category: "TESTING",
    items: ["Jest", "Vitest", "PyTest"],
  },
];
