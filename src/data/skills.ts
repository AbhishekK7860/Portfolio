/**
 * SKILLS — grounded in tech that appears in real, public repositories
 * (github.com/AbhishekK7860), plus clearly-earned certifications.
 * No invented proficiencies. MongoDB / tools with no repo evidence are omitted.
 */

export interface SkillGroup {
  num: string;
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    num: "01",
    label: "LANGUAGES",
    items: ["Python", "TypeScript", "JavaScript", "C", "C++"],
  },
  {
    num: "02",
    label: "AI / ML",
    items: [
      "FAISS",
      "sentence-transformers",
      "Google ADK",
      "Gemini",
      "Vertex AI",
      "RAG / Embeddings",
      "Multi-Agent Systems",
      "Prompt Engineering",
    ],
  },
  {
    num: "03",
    label: "APPLICATION DEVELOPMENT",
    items: [
      "Next.js",
      "React",
      "FastAPI",
      "Tailwind CSS",
      "Zod",
      "Zustand",
      "React Hook Form",
    ],
  },
  {
    num: "04",
    label: "DATA / INFRA",
    items: ["Supabase", "PostgreSQL", "Vercel", "Docker", "OpenRouter"],
  },
  {
    num: "05",
    label: "QUALITY",
    items: ["Vitest", "Playwright", "jest-axe / a11y", "Testing Library"],
  },
];

/** Verified certifications (from the GitHub profile). */
export const certifications: string[] = [
  "Microsoft AI Yatra",
  "Google Cloud — Generative AI",
  "GUVI · HCL — AI",
];
