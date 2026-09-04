"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { skillGroups, certifications } from "@/data/skills";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import {
  TreeStructure,
  MagnifyingGlass,
  CheckCircle,
  Play,
  Cpu,
  Database,
  Lightning,
  ShieldCheck,
  Code,
} from "@phosphor-icons/react";

interface AgentSimulationQuery {
  id: string;
  label: string;
  project: string;
  retriever: string;
  llm: string;
  evalMetric: string;
}

const QUERIES: AgentSimulationQuery[] = [
  {
    id: "recruiter",
    label: "Rank candidate profiles by semantic meaning, explainably",
    project: "AI Recruiter Pipeline (FAISS + Multi-Agent)",
    retriever: "FAISS IndexFlatIP over L2-normalized all-MiniLM-L6-v2 (384-dim) embeddings",
    llm: "5 specialized agents on Google ADK — deterministic 0.20 / 0.20 / 0.60 score fusion",
    evalMetric: "Explainable by construction · Critic penalizes hallucinated evidence",
  },
  {
    id: "stadium",
    label: "Turn operational CSV into volunteer-ready instructions",
    project: "StadiumOps AI (Live-Event Ops)",
    retriever: "Zod-validated, MIME-checked CSV ingestion (500-row cap)",
    llm: "Llama 3.3 70B via OpenRouter, with a rule-based offline fallback",
    evalMetric: "Prompt-injection detection + per-IP rate limiting · Graceful offline path",
  },
  {
    id: "climate",
    label: "Coach the highest-impact carbon actions, grounded in real data",
    project: "CarbonMind AI",
    retriever: "US EPA & UK DEFRA published emission factors",
    llm: "Gemini 2.5 Flash (@google/genai) with a deterministic rule-engine backstop",
    evalMetric: "Grounded in published data, not vibes · Rule-engine backstop",
  },
];

export function Skills() {
  const [selectedQueryIdx, setSelectedQueryIdx] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [activeTab, setActiveTab] = useState<"agents" | "matrix">("agents");

  const query = QUERIES[selectedQueryIdx];

  const triggerAgentRun = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setActiveStep(0);

    setTimeout(() => setActiveStep(1), 600);
    setTimeout(() => setActiveStep(2), 1200);
    setTimeout(() => setActiveStep(3), 1800);
    setTimeout(() => {
      setActiveStep(4); // Finished
      setIsRunningSim(false);
    }, 2400);
  };

  const agentSteps = [
    {
      num: "01",
      name: "SUPERVISOR",
      role: "Intent Routing",
      desc: "Decomposes input prompt into deterministic retrieval & generation subtasks.",
      icon: TreeStructure,
    },
    {
      num: "02",
      name: "RETRIEVER",
      role: "Vector Search",
      desc: query.retriever,
      icon: Database,
    },
    {
      num: "03",
      name: "SPECIALIST",
      role: "Synthesis",
      desc: query.llm,
      icon: Lightning,
    },
    {
      num: "04",
      name: "EVALUATOR",
      role: "Guardrails",
      desc: "Validates schema adherence, factual boundaries, and zero hallucination rules.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading num="04" label="ENGINEERING CAPABILITIES" title="What I Can Build" />
      </Reveal>

      {/* Mode Switcher */}
      <Reveal delay={0.05}>
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Interactive demonstrations of multi-agent architectures, vector search pipelines,
            and production-grade full-stack engineering.
          </p>
          <div className="flex rounded-[2px] border border-line bg-surface/50 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("agents")}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                activeTab === "agents"
                  ? "bg-accent-deep text-white shadow-sm"
                  : "text-muted hover:text-fg"
              }`}
            >
              <Cpu size={15} />
              AGENTIC PIPELINE
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                activeTab === "matrix"
                  ? "bg-accent-deep text-white shadow-sm"
                  : "text-muted hover:text-fg"
              }`}
            >
              <Code size={15} />
              FULL STACK MATRIX
            </button>
          </div>
        </div>
      </Reveal>

      {activeTab === "agents" ? (
        <Reveal delay={0.1}>
          <div className="space-y-8">
            {/* Simulation Query Picker */}
            <div className="border border-line bg-surface/30 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                    INTERACTIVE SYSTEM SIMULATION
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-fg">
                    Multi-Agent Orchestration &amp; RAG Pipeline
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={triggerAgentRun}
                  disabled={isRunningSim}
                  className="inline-flex items-center gap-2 border border-accent/40 bg-accent/15 px-4 py-2.5 font-mono text-xs tracking-wider text-accent-soft transition-all hover:border-accent hover:bg-accent/25 disabled:opacity-50"
                >
                  <Play size={13} weight="fill" />
                  {isRunningSim ? "RUNNING ORCHESTRATION..." : "DISPATCH PIPELINE"}
                </button>
              </div>

              {/* Sample Queries */}
              <div className="mt-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-faint">
                  SELECT REAL-WORLD SYSTEM QUERY:
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {QUERIES.map((q, idx) => {
                    const isSelected = selectedQueryIdx === idx;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setSelectedQueryIdx(idx);
                          setActiveStep(null);
                        }}
                        className={`p-3.5 text-left transition-all border ${
                          isSelected
                            ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                            : "border-line bg-[#080b18]/60 hover:border-line-strong hover:bg-surface/50"
                        }`}
                      >
                        <p className="font-mono text-[10px] tracking-wider text-accent-soft">
                          {q.project}
                        </p>
                        <p className="mt-1 text-xs font-medium text-fg/90">{q.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Pipeline Nodes */}
              <div className="mt-8">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {agentSteps.map((step, idx) => {
                    const isCurrent = activeStep === idx;
                    const isPassed = activeStep !== null && activeStep > idx;
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.name}
                        className={`relative border p-5 transition-all ${
                          isCurrent
                            ? "border-terminal bg-terminal/10 shadow-[0_0_24px_rgba(74,222,128,0.15)] scale-[1.02]"
                            : isPassed
                            ? "border-accent/60 bg-accent/5"
                            : "border-line bg-[#070a16]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono text-[10px] ${
                              isCurrent
                                ? "text-terminal font-bold"
                                : isPassed
                                ? "text-accent-soft"
                                : "text-faint"
                            }`}
                          >
                            STEP {step.num}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {isCurrent && (
                              <span className="flex h-2 w-2 rounded-full bg-terminal animate-ping" />
                            )}
                            {isPassed && <CheckCircle size={14} className="text-terminal" />}
                            <Icon
                              size={16}
                              className={isCurrent ? "text-terminal" : "text-muted"}
                            />
                          </div>
                        </div>

                        <h4 className="mt-3 font-display text-sm font-bold text-fg">
                          {step.name}
                        </h4>
                        <p className="font-mono text-[10px] tracking-wider text-accent-soft">
                          {step.role}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted">{step.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Execution Telemetry Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-faint">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isRunningSim
                        ? "bg-terminal animate-pulse"
                        : activeStep === 4
                        ? "bg-terminal"
                        : "bg-line-strong"
                    }`}
                  />
                  <span>
                    STATUS:{" "}
                    {isRunningSim
                      ? "ORCHESTRATING SUBTASKS..."
                      : activeStep === 4
                      ? "SIMULATION COMPLETE"
                      : "STANDBY · READY TO DISPATCH"}
                  </span>
                </div>
                <div className="text-terminal">{query.evalMetric}</div>
              </div>
            </div>
          </div>
        </Reveal>
      ) : (
        /* Module: Full Stack Matrix */
        <Reveal delay={0.1}>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <div key={g.label} className="bg-[#080a14] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-accent-soft">{g.num}</span>
                    <span className="font-mono text-[11px] tracking-[0.25em] text-muted">
                      {g.label}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-faint">{g.items.length} TOOLS</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="border border-line bg-surface/30 px-2.5 py-1 font-mono text-[11px] text-fg/80 transition-colors hover:border-accent hover:text-fg"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Certifications strip */}
      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
          <span className="font-mono text-[10px] tracking-[0.3em] text-faint">
            EARNED CREDENTIALS
          </span>
          {certifications.map((c) => (
            <span key={c} className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-terminal" />
              {c}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
