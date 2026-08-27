/**
 * Writing / "Field Notes" — VERIFIED from the Medium RSS feed
 * (medium.com/feed/@mrzubane786). Titles, dates, and URLs are exact.
 * Blurbs are grounded in the fetched article content — not embellished.
 */

export interface Article {
  title: string;
  /** ISO date */
  date: string;
  dateLabel: string;
  url: string;
  /** Editorial category shown as a HUD kicker */
  kicker: string;
  blurb: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    title: "From Prompting to AI Looping: The Next Computing Abstraction",
    date: "2026-06-29",
    dateLabel: "JUN 2026",
    url: "https://medium.com/@mrzubane786/from-prompting-to-ai-looping-the-next-computing-abstraction-2493cf7d14ea",
    kicker: "AGENTIC SYSTEMS",
    blurb:
      "The next leap isn't a better prompt — it's autonomous loops that plan, run, check, repair, and refine. An argument for why prompt engineering is becoming goal engineering.",
    tags: ["AI Agents", "Prompt Engineering", "AI"],
  },
  {
    title:
      "What People Get Wrong About Vibe Coding: Building CarbonMind AI & ClimateIQ",
    date: "2026-06-21",
    dateLabel: "JUN 2026",
    url: "https://medium.com/@mrzubane786/what-people-get-wrong-about-vibe-coding-building-carbonmind-ai-and-climateiq-for-google-virtual-498715239955",
    kicker: "BUILD LOG",
    blurb:
      "Field notes from building CarbonMind AI and ClimateIQ for Google's virtual PromptWars — and what the 'vibe coding' conversation actually gets right and wrong.",
    tags: ["AI Agents", "Vibe Coding", "Web Development"],
  },
  {
    title: "From Idea to Launch: I Just Shipped My First Gen AI Web App!",
    date: "2025-12-18",
    dateLabel: "DEC 2025",
    url: "https://medium.com/@mrzubane786/from-idea-to-launch-i-just-shipped-my-first-gen-ai-web-app-1759ec9e8729",
    kicker: "BUILD LOG",
    blurb:
      "Shipping 'AI Hunter Free Tool Scout' end to end — from idea to a live GenAI web app, and what it taught me about launching real products.",
    tags: ["GenAI", "Google AI Studio", "AI"],
  },
  {
    title:
      "I Didn't Build an App, I Learned to Speak to AI: My Prompt Engineering Journey with Google Cloud",
    date: "2025-08-02",
    dateLabel: "AUG 2025",
    url: "https://medium.com/@mrzubane786/i-didnt-build-an-app-i-learned-to-speak-to-ai-my-prompt-engineering-journey-with-google-cloud-16a3e49210ba",
    kicker: "PROMPT ENGINEERING",
    blurb:
      "A journey through Google's GenAI Exchange and Vertex AI — persona prompting, few-shot, structured output, and why prompting is the new literacy for developers.",
    tags: ["Prompt Engineering", "Vertex AI", "Gemini"],
  },
];
