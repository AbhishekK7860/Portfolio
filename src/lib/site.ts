/**
 * Central site configuration.
 * Identity facts here are VERIFIED (GitHub AbhishekK7860 / Medium @mrzubane786)
 * or drawn from the user's own approved reference mockup — never fabricated.
 * Project / skills / writing DATA lives in `src/data/*`.
 */

export interface NavSection {
  id: string;
  num: string;
  label: string;
}

export interface SocialLink {
  key: string;
  label: string;
  short: string;
  href: string;
}

export const site = {
  shortName: "Abhishek",
  fullName: "Abhishek Kesarwani",
  monogram: "AK",
  role: "AI / GenAI Builder",
  location: "INDIA",
  education: "BCA · EXP. 2027",
  status: { label: "SYSTEM.STATUS", value: "ONLINE" },
  availability: "AVAILABLE FOR COLLABORATION",

  // Rotating identity tags in the top bar (from the reference mockup)
  roleTicker: ["AI BUILDER", "SPACE ENTHUSIAST", "CREATIVE SOUL"],

  hero: {
    greeting: "// HELLO, I'M",
    // "AI" is emphasized in the UI; keep the token exact for the highlighter.
    statement: "I build AI systems that solve real problems.",
    subtitle:
      "AI / GenAI builder focused on agentic systems, prompt engineering, and making AI-assisted software reliable through evaluation, testing, and refinement.",
    cosmicHud: ["EXPLORING THE COSMOS", "BUILDING INTELLIGENCE", "CREATING IMPACT"],
    terminal: [
      "INITIATING_PORTFOLIO.EXE",
      "LOADING_SKILLS",
      "READY_TO_BUILD_THE_FUTURE",
    ],
  },

  nav: [
    { id: "home", num: "00", label: "HOME" },
    { id: "about", num: "01", label: "ABOUT" },
    { id: "projects", num: "02", label: "PROJECTS" },
    { id: "workflow", num: "03", label: "HOW I BUILD" },
    { id: "skills", num: "04", label: "CAPABILITIES" },
    { id: "experiments", num: "05", label: "EXPERIMENTS" },
    { id: "writing", num: "06", label: "WRITING" },
    { id: "contact", num: "07", label: "CONTACT" },
  ] satisfies NavSection[],

  socials: {
    github: {
      key: "github",
      label: "GitHub",
      short: "GITHUB",
      href: "https://github.com/AbhishekK7860",
    },
    linkedin: {
      key: "linkedin",
      label: "LinkedIn",
      short: "LINKEDIN",
      href: "https://www.linkedin.com/in/abhishek-santoshkumar-kesarwani-1723682a1/",
    },
    medium: {
      key: "medium",
      label: "Medium",
      short: "MEDIUM",
      href: "https://medium.com/@mrzubane786",
    },
    instagram: {
      key: "instagram",
      label: "Instagram",
      short: "INSTAGRAM",
      href: "https://instagram.com/abhi_786020",
    },
    email: {
      key: "email",
      label: "Email",
      short: "EMAIL",
      href: "mailto:mrzubane786@gmail.com",
    },
  },

  emailAddress: "mrzubane786@gmail.com",
} as const;

export type Site = typeof site;
