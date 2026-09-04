export interface WorkflowEngine {
  id: string;
  name: string;
  role: string;
  badge: string;
  focus: string;
  responsibilities: string[];
  primaryTools: string[];
  guardrail: string;
}

export interface WorkflowSkill {
  name: string;
  category: "Design & UX" | "Agent Governance" | "Engineering Rigor";
  /** Short, truthful provenance/scope tag shown as a chip (e.g. "AGENTS.md", "WCAG 2.2"). */
  tag: string;
  description: string;
  rule: string;
}

export interface WorkflowStage {
  step: string;
  name: string;
  objective: string;
  action: string;
  rule: string;
  evidence: string;
}

export const workflowEngines: WorkflowEngine[] = [
  {
    id: "antigravity",
    name: "Antigravity",
    role: "Architectural & Creative Generation Engine",
    badge: "PASS 1 · MULTI-ANGLE EXPLORATION",
    focus: "Deep exploration, design-engineering craft, WebGL/3D integration, and UX polish.",
    responsibilities: [
      "Multi-angle reasoning: Evaluates solutions from multiple perspectives before writing code.",
      "Frontend craftsmanship: Governed by strict anti-slop rules (curated palettes, tactile motion).",
      "Live visual verification: Employs browser subagents to record video and inspect render output.",
      "Design systems & tokens: Enforces component-first hierarchy and fluid typography scales.",
    ],
    primaryTools: ["Browser Subagent", "WebGL/Three.js Inspector", "Framer Motion", "Tailwind v4"],
    guardrail: "No Generic AI Slop — Every UI must feature authentic, physics-grounded motion and unique identity.",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    role: "Deterministic Terminal & Verification Engine",
    badge: "PASS 2 · STRICT CODE-LEVEL VERIFICATION",
    focus: "High-discipline terminal execution, subagent orchestration, and deterministic test backpressure.",
    responsibilities: [
      "Read-before-write exploration: Maps full codebase reality before touching single files.",
      "Bounded iterative loops: Enforces 5-iteration caps with single-file state tracking (task.md).",
      "Subagent isolation: Delegates deep research to scoped subagents with clean context windows.",
      "Anti-Goodhart protection: Prohibits test weakening, exception swallowing, or mock cheating.",
    ],
    primaryTools: ["Playwright E2E", "Vitest Runner", "Ripgrep Search", "Linter / AST Audits"],
    guardrail: "Evidence-Based Completion — No subjective 'looks good' claims; requires exit code 0 and test proof.",
  },
];

/**
 * The real, verifiable invariants enforced across this build — each one is
 * observable in the codebase or the agent instructions (AGENTS.md), not an
 * invented product. Presented as governance rules rather than named "skills"
 * because this portfolio was hand-built, so no claim of skill-generated output
 * is made.
 */
export const workflowSkills: WorkflowSkill[] = [
  {
    name: "read-before-write",
    category: "Engineering Rigor",
    tag: "AGENTS.md",
    description:
      "Map the codebase and read the actual bundled Next.js 16 docs before touching a file — this framework has breaking changes from training data.",
    rule: "No edits until the surrounding conventions and current file state are read.",
  },
  {
    name: "zero-fabrication",
    category: "Agent Governance",
    tag: "VERIFIED",
    description:
      "Every public claim — models, metrics, credentials — is checked against the real GitHub source. Unverifiable specifics are cut, not invented.",
    rule: "No fabricated numbers or tools. If it can't be verified, it doesn't ship.",
  },
  {
    name: "anti-goodhart-testing",
    category: "Engineering Rigor",
    tag: "PLAYWRIGHT",
    description:
      "Real Playwright specs assert behaviour — hero load, canvas mount, pointer tracking, reduced-motion, chatbot boundaries. Tests are never weakened to pass.",
    rule: "Fix the code to satisfy the test — never the test to excuse the code.",
  },
  {
    name: "wcag-aa-contrast",
    category: "Design & UX",
    tag: "WCAG 2.2",
    description:
      "Text and UI tokens are tuned to clear WCAG 2.2 AA contrast against the cosmic background, with legibility scrims where the particle field is bright.",
    rule: "Muted / faint tokens are lifted until they clear 4.5:1 (3:1 for large text).",
  },
  {
    name: "reduced-motion-first",
    category: "Design & UX",
    tag: "A11Y",
    description:
      "Every continuous animation is gated by prefers-reduced-motion through a JS hook, per-frame guards, and a CSS safety net.",
    rule: "Reduced motion resolves to a composed static frame — no exceptions.",
  },
  {
    name: "verified-iteration",
    category: "Agent Governance",
    tag: "EVIDENCE",
    description:
      "Changes land in small diffs and are confirmed by inspecting the actual rendered result in a real browser, not by assuming code-correct means done.",
    rule: "No 'looks good' by claim — visual or behavioural proof, or it isn't finished.",
  },
];

export const workflowStages: WorkflowStage[] = [
  {
    step: "01",
    name: "EXPLORE",
    objective: "Ground in reality before touching code",
    action: "Run parallel-safe ripgrep searches, inspect live DOM, identify invariants.",
    rule: "Zero state mutations. Brain decoupled from Hands.",
    evidence: "Line-range reads, entry-point callgraphs.",
  },
  {
    step: "02",
    name: "PLAN",
    objective: "Define machine-decidable done criteria",
    action: "Draft implementation plan with explicit boundaries, anti-Goodhart rules, and risk flags.",
    rule: "Mandatory human review gate before non-trivial execution.",
    evidence: "Formal implementation_plan.md artifact.",
  },
  {
    step: "03",
    name: "IMPLEMENT",
    objective: "Targeted, convention-preserving changes",
    action: "Apply minimal diffs sequentially. Zero unasked-for refactors or subjective rewrites.",
    rule: "Atomic sequential writes; preserve naming and style conventions.",
    evidence: "Clean Git diffs against plan.",
  },
  {
    step: "04",
    name: "VERIFY",
    objective: "Mechanically verifiable proof of correctness",
    action: "Run Playwright E2E tests, WCAG accessibility checks, and production builds.",
    rule: "No assertion by claim. Required: Exit code 0, test count, zero console errors.",
    evidence: "Playwright HTML reports, real terminal exit codes.",
  },
];
