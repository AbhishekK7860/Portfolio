/**
 * PROJECTS — engineering case studies.
 *
 * Every claim here is verified against the public GitHub source
 * (github.com/AbhishekK7860). Adjudications applied:
 *  - AI Recruiter: "100k-scale" = ARCHITECTED FOR, never "ranked 100k".
 *  - StadiumOps: no public live demo → repo link only.
 *  - Builder ID: live demo verified; Voice / RAG / html2canvas REFUTED → omitted.
 *  - CarbonMind: Gemini 2.5 Flash confirmed; OpenRouter NOT claimed for this repo.
 * No user counts / audience metrics are implied anywhere.
 */

export interface ProjectLink {
  label: string;
  href: string;
  kind: "demo" | "repo";
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  /** LIVE · OPEN SOURCE · OFFLINE — a truthful status chip */
  status: string;
  problem: string;
  built: string;
  architecture: string;
  /** Optional AI/system-design highlight */
  aiSystem?: string;
  decisions: string[];
  interesting: string;
  tech: string[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "ai-recruiter",
    index: "01",
    name: "AI Recruiter Pipeline",
    tagline: "Multi-agent semantic candidate ranking",
    category: "AI · MULTI-AGENT",
    year: "2026",
    status: "OPEN SOURCE",
    problem:
      "Screening a large candidate pool is slow, inconsistent, and biased toward keyword matching. The Redrob challenge: rank best-fit candidates reproducibly and explainably — fully offline.",
    built:
      "A multi-agent pipeline that retrieves candidates by meaning rather than keywords, then scores them with a panel of specialized agents fused by a deterministic formula.",
    architecture:
      "A clean ports-and-adapters core. Profiles are embedded with sentence-transformers (all-MiniLM-L6-v2) and indexed in a FAISS cosine index (IndexFlatIP + IDMap) over L2-normalized vectors. A semantic-foundation layer normalizes titles, industries and a skill taxonomy before retrieval.",
    aiSystem:
      "Specialized agents — JD Analyst, Candidate Analyst, Behaviour Analyst, Recruiter and a Critic — run on Google's Agent Development Kit. Signals are fused deterministically (0.20 semantic + 0.20 behaviour + 0.60 LLM), and the Critic applies a hallucination penalty so unsupported claims are pushed down, not rewarded.",
    decisions: [
      "FAISS IndexFlatIP over L2-normalized vectors for exact cosine ranking",
      "Content-hash disk caching of embeddings for cheap, reproducible runs",
      "Atomic JSONL checkpoint / resume so long runs survive interruption",
      "Multi-provider LLM layer (OpenRouter / Google / local) behind one interface",
      "Deterministic score fusion — explainable by construction, not a black box",
    ],
    interesting:
      "It's architected for 100k-scale retrieval while staying fully offline-reproducible — ranking is explainable, and a Critic agent actively penalizes hallucinated evidence.",
    tech: [
      "Python",
      "FAISS",
      "sentence-transformers",
      "Google ADK",
      "Gemini",
      "FastAPI",
      "Gradio",
      "Pydantic",
    ],
    metrics: [
      { label: "RETRIEVAL", value: "FAISS · cosine" },
      { label: "AGENTS", value: "5 specialized" },
      { label: "SCALE", value: "100k-ready" },
    ],
    links: [
      {
        label: "SOURCE",
        href: "https://github.com/AbhishekK7860/india-runs-ai-recruiter",
        kind: "repo",
      },
    ],
  },
  {
    id: "stadiumops",
    index: "02",
    name: "StadiumOps AI",
    tagline: "Explainable real-time operations for live events",
    category: "AI · REAL-TIME OPS",
    year: "2026",
    status: "OPEN SOURCE",
    problem:
      "During a live event, volunteers need fast, clear decisions on crowd flow and incidents — but raw operational data (gate counts, capacities) isn't actionable on its own.",
    built:
      "A real-time operations dashboard that ingests operational CSV data, validates it strictly, and turns it into explainable, volunteer-ready instructions — with a rule-based fallback when the model is unavailable.",
    architecture:
      "Next.js 16 App Router. CSV is parsed with papaparse and validated with Zod (MIME-checked, capped at 500 rows). Insights are generated via OpenRouter (Llama 3.3 70B, with a Hermes 3 405B fallback). Optional Supabase tables provide an audit trail; Recharts renders the views; jsPDF handles export.",
    aiSystem:
      "Every LLM call has a deterministic offline heuristic fallback, so the dashboard stays useful even when the model fails. Prompt-injection detection and per-IP rate limiting guard the ingestion path.",
    decisions: [
      "Zod-validated, MIME-checked CSV ingestion (500-row cap) to keep bad data out",
      "Rule-based offline fallback so insights never hard-depend on the LLM",
      "Prompt-injection detection + IP rate limiting on the AI endpoint",
      "Real test suite: Vitest, Testing Library, and jest-axe a11y checks",
      "PDF / JSON export for clean volunteer handoff",
    ],
    interesting:
      "Built production-minded, not demo-minded: accessibility tests, injection defense, rate limiting and a graceful offline path all live in the repo — not just a happy-path LLM call.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "OpenRouter",
      "Llama 3.3",
      "Zod",
      "Supabase",
      "Recharts",
      "Vitest",
    ],
    metrics: [
      { label: "MODEL", value: "Llama 3.3 70B" },
      { label: "FALLBACK", value: "Rule-based" },
      { label: "TESTS", value: "Vitest + a11y" },
    ],
    links: [
      {
        label: "SOURCE",
        href: "https://github.com/AbhishekK7860/Fifa2026Ops-Ai",
        kind: "repo",
      },
    ],
  },
  {
    id: "id-builder",
    index: "03",
    name: "Builder ID · Hacker House Goa",
    tagline: "Privacy-first ID card studio, entirely in the browser",
    category: "INTERACTIVE · CLIENT-SIDE",
    year: "2026",
    status: "LIVE",
    problem:
      "Event attendees want a personalized 'Builder ID' card fast — from any device, including iPhones — without handing their photo to a server.",
    built:
      "A fully client-side card studio: upload or capture a photo, crop it, drop it into a templated ID card, and share — with all image composition happening in the browser.",
    architecture:
      "Next.js 16 App Router. Camera capture via native getUserMedia, cropping via react-easy-crop, iPhone HEIC images converted client-side with heic2any, and the card composited on a native Canvas across four templates. Sharing uses an OG-image route backed by Vercel Blob; motion via Motion.",
    decisions: [
      "100% in-browser composition — the photo never leaves the device",
      "Native getUserMedia capture instead of a heavy webcam dependency",
      "heic2any so iPhone HEIC uploads simply work",
      "Native Canvas templating for crisp, predictable output",
      "OG-image share route (Vercel Blob) for rich link previews",
    ],
    interesting:
      "A privacy-first image pipeline that handles the messy real-world cases — HEIC, cropping, live camera — and still produces a share-ready card with rich previews.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Canvas API",
      "react-easy-crop",
      "heic2any",
      "Motion",
      "Vercel Blob",
    ],
    metrics: [
      { label: "PRIVACY", value: "On-device" },
      { label: "INPUT", value: "Upload · Camera · HEIC" },
    ],
    links: [
      {
        label: "LIVE DEMO",
        href: "https://hhgoa2026-id-builder.vercel.app",
        kind: "demo",
      },
      {
        label: "SOURCE",
        href: "https://github.com/AbhishekK7860/hhgoa2026-id_builder",
        kind: "repo",
      },
    ],
  },
  {
    id: "carbonmind",
    index: "04",
    name: "CarbonMind AI",
    tagline: "An AI coach for your carbon footprint, grounded in real data",
    category: "AI · SUSTAINABILITY",
    year: "2026",
    status: "LIVE",
    problem:
      "People want to cut their carbon footprint but don't know which actions actually matter most for their own life.",
    built:
      "An AI sustainability coach that estimates your footprint from published emission factors and returns the few highest-impact actions — plus a projection of where you're headed.",
    architecture:
      "Next.js 16 App Router with Gemini 2.5 Flash (via @google/genai) for coaching. A carbon engine computes emissions across transport, food, electricity, shopping and waste using US EPA and UK DEFRA emission factors. Supabase (PostgreSQL + Auth/RLS) stores data, Recharts visualizes it, and Playwright covers the flows end to end.",
    aiSystem:
      "The AI Action Center surfaces the top-3 daily actions; an Impact Pulse score and Future Projection Engine make progress tangible — backed by a deterministic rule engine so guidance stays grounded.",
    decisions: [
      "Emission factors sourced from US EPA and UK DEFRA — not invented numbers",
      "Gemini 2.5 Flash for coaching, with a deterministic rule-engine backstop",
      "Supabase Auth + row-level security for user data",
      "Playwright end-to-end coverage",
      "Demo Mode so anyone can try it without signing up",
    ],
    interesting:
      "The advice sits on published EPA / DEFRA emission factors, so the AI coaching is grounded in real data rather than vibes — built for Google's Virtual PromptWars.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Gemini 2.5 Flash",
      "Supabase",
      "PostgreSQL",
      "Recharts",
      "Playwright",
    ],
    metrics: [
      { label: "MODEL", value: "Gemini 2.5 Flash" },
      { label: "DATA", value: "EPA · DEFRA" },
    ],
    links: [
      {
        label: "LIVE DEMO",
        href: "https://hackthon-main-rosy.vercel.app",
        kind: "demo",
      },
      {
        label: "SOURCE",
        href: "https://github.com/AbhishekK7860/carbonmind-ai",
        kind: "repo",
      },
    ],
  },
];
