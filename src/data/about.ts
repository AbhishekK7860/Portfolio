/**
 * ABOUT / ORIGIN content.
 * Factual spine (location, study, focus) is verified from GitHub.
 * The creative layer (shayari, music, space) is the user's own stated
 * identity, presented as self-description — not as externally-verified fact.
 */

export const about = {
  kicker: "ORIGIN",
  headline: "About",
  lead: "I'm Abhishek — a BCA student from Prayagraj, India, building at the intersection of AI, human creativity, and trustworthy software.",
  paragraphs: [
    "I started where a lot of engineers do — C and C++ fundamentals — and followed my curiosity into generative AI and agentic systems. Now I build things that actually ship: multi-agent pipelines, LLM-powered dashboards, and interactive tools, most of them forged under hackathon pressure.",
    "I'm as interested in how humans talk to machines as in the machines themselves. On Medium I write about prompt engineering as the new literacy, and about the shift from prompting to autonomous AI looping — plan, run, check, repair, refine.",
    "Away from the editor, the same curiosity points outward — toward space and cosmology — and inward, into language and sound. I write shayari and make music. To me it's one impulse: find the pattern, then build with it.",
  ],
  focus: [
    "Building multi-agent systems",
    "Exploring AI + space intersections",
    "Writing code that creates impact",
    "Creating shayari & music",
  ],
  facts: [
    { label: "LOCATION", value: "India" },
    { label: "STUDY", value: "BCA · exp. 2027" },
    { label: "STATUS", value: "Available for collaboration" },
    { label: "FOCUS", value: "AI · Agents · Evaluation" },
  ],
  quote:
    "Between the stars and the code, I find the patterns of existence — building agents, exploring galaxies, writing shayari, composing music.",
  canvasLine: "THE UNIVERSE IS MY CANVAS",
} as const;
