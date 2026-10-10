export type ExperienceRole = {
  role: string;
  org: string;
  start: string;
  end: string;
  bullets: string[];
  stack: string[];
};

export const experience: ExperienceRole[] = [
  {
    role: "AI Agent Developer",
    org: "CrowdWisdom Trading",
    start: "2025-04",
    end: "2026-04",
    bullets: [
      "Built a web-scraping system aggregating 1,000+ sites, lifting market-intelligence coverage 40% for faster trading decisions.",
      "Shipped AI Telegram and voice bots automating outreach to 500+ B2B leads a week, growing qualified leads 30% and cutting manual sales effort by 15 hours weekly.",
      "Automated backend workflows with n8n, Python, and GPT/Gemini, cutting manual task overhead 25% and lifting engagement metrics 25%.",
    ],
    stack: ["Web Scraping", "AI Agents", "n8n", "LLMs", "Automation"],
  },
  {
    role: "AI Product & Automation Systems Engineer Intern",
    org: "Saraswati Vidyamandir",
    start: "2026-05",
    end: "now",
    bullets: [
      "Built AI automation for student management, parent communication, and staff coordination, cutting manual admin workload 30%.",
      "Developed workflow automations in n8n, Python, Node.js, and GPT/Gemini, speeding up task execution across internal processes.",
      "Engineered mobile-friendly AI products with the founder, improving adoption among non-technical staff and shipping cadence.",
    ],
    stack: ["n8n", "Python", "Node.js", "GPT/Gemini", "System Design"],
  },
];

export const signals = [
  { value: "1", label: "Hackathon win", detail: "Microsoft Club" },
  { value: "300", label: "DSA problems solved", detail: "GFG 160 + independent" },
  { value: "6", label: "AI/ML projects shipped", detail: "solo + team" },
  { value: "2", label: "Internships completed", detail: "AI product & automation" },
] as const;
