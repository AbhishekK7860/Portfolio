/**
 * EXPERIMENTS — smaller builds, challenge entries, and foundations.
 * All verified on GitHub (AbhishekK7860). Framed honestly as exploration,
 * not headline products. Only ClimateIQ uses OpenRouter (verified in that repo).
 */

export interface Experiment {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  tech: string[];
  href?: string;
}

export const experiments: Experiment[] = [
  {
    id: "climateiq",
    name: "ClimateIQ",
    kind: "FULL-STACK · CHALLENGE",
    blurb:
      "A sibling carbon-footprint app taken full-stack: a FastAPI + Pydantic v2 backend and a React + Vite frontend, powered by Gemini 2.5 Flash via OpenRouter, on Supabase — Dockerized on Render with CI and WCAG 2.1 AA checks.",
    tech: ["FastAPI", "React", "Vite", "OpenRouter", "Docker", "Supabase"],
    href: "https://github.com/AbhishekK7860/Promptwars-Challenge-3",
  },
  {
    id: "promptwars",
    name: "PromptWars Entries",
    kind: "PROMPT ENGINEERING",
    blurb:
      "A run of prompt-engineering challenge entries — probing how far careful persona, few-shot, and structured-output prompting can push a model before you reach for code.",
    tech: ["Prompt Engineering", "LLMs", "HTML"],
    href: "https://github.com/AbhishekK7860/PromptWars-Mini-Challenge-2",
  },
  {
    id: "foundations",
    name: "Foundations in C / C++",
    kind: "FUNDAMENTALS",
    blurb:
      "Where it started — C and C++ practice repositories covering core programming and object-oriented fundamentals. The groundwork under everything above.",
    tech: ["C", "C++", "OOP"],
    href: "https://github.com/AbhishekK7860/C-OOPs-and-basics",
  },
];
