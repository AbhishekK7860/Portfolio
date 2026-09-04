"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  workflowEngines,
  workflowSkills,
  workflowStages,
  type WorkflowSkill,
} from "@/data/workflow";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import {
  Cpu,
  TerminalWindow,
  ShieldCheck,
  CheckCircle,
  GitBranch,
  Play,
  ArrowRight,
} from "@phosphor-icons/react";

export function Workflow() {
  const [activeEngine, setActiveEngine] = useState<"antigravity" | "claude-code">("antigravity");
  const [activeStage, setActiveStage] = useState(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("ALL");
  const [simulatingTest, setSimulatingTest] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);

  const selectedEngine = workflowEngines.find((e) => e.id === activeEngine)!;
  const currentStage = workflowStages[activeStage];

  const filteredSkills =
    activeSkillCategory === "ALL"
      ? workflowSkills
      : workflowSkills.filter((s) => s.category === activeSkillCategory);

  const categories = ["ALL", "Design & UX", "Agent Governance", "Engineering Rigor"];

  const triggerVerificationSim = () => {
    if (simulatingTest) return;
    setSimulatingTest(true);
    setSimulatedLogs(["[RUNNING]: npx playwright test --reporter=line"]);

    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        "[PASS]: tests/portfolio.spec.ts: Robot cursor tracking & boundaries",
      ]);
    }, 450);

    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        "[PASS]: tests/chatbot.spec.ts: API boundaries & security verification",
      ]);
    }, 900);

    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        "[PASS]: wcag-audit: Contrast >= 4.5:1, aria-labels valid",
        "✓ All checks passed (exit code 0) — evidence over assertion.",
      ]);
      setSimulatingTest(false);
    }, 1400);
  };

  return (
    <section id="workflow" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading
          num="03"
          label="ENGINEERED AI ENVIRONMENT"
          title="How I Build"
        />
      </Reveal>

      {/* Core Philosophy Banner */}
      <Reveal delay={0.05}>
        <div className="relative mb-16 overflow-hidden border border-line-strong bg-gradient-to-r from-surface/80 via-[#0a0d1d]/90 to-surface/80 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent-soft">
                // CORE DIFFERENTIATOR
              </span>
              <p className="mt-2 font-display text-xl font-medium text-fg md:text-2xl">
                &ldquo;I don&apos;t just use AI coding tools. I engineer my AI development environment.&rdquo;
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                A disciplined two-pass engineering workflow: deep architectural exploration in{" "}
                <span className="text-fg font-medium">Antigravity</span> followed by strict
                terminal-level backpressure verification in{" "}
                <span className="text-fg font-medium">Claude Code</span>.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 border border-terminal/30 bg-terminal/10 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-terminal">
                <span className="h-2 w-2 rounded-full bg-terminal animate-pulse" />
                VERIFICATION-FIRST
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Module 1: Two-Pass Dual-Engine Architecture */}
      <Reveal delay={0.1}>
        <div className="mb-20">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="font-display text-2xl font-semibold text-fg">
                The Two-Pass Dual Engine
              </h3>
              <p className="mt-1 text-xs text-muted">
                Interactive comparison of role separation between exploratory design and terminal proof.
              </p>
            </div>
            <div className="flex rounded-[2px] border border-line bg-surface/50 p-1">
              <button
                type="button"
                onClick={() => setActiveEngine("antigravity")}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                  activeEngine === "antigravity"
                    ? "bg-accent-deep text-white shadow-sm"
                    : "text-muted hover:text-fg"
                }`}
              >
                <Cpu size={15} />
                PASS 1: ANTIGRAVITY
              </button>
              <button
                type="button"
                onClick={() => setActiveEngine("claude-code")}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                  activeEngine === "claude-code"
                    ? "bg-accent-deep text-white shadow-sm"
                    : "text-muted hover:text-fg"
                }`}
              >
                <TerminalWindow size={15} />
                PASS 2: CLAUDE CODE
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEngine.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="border border-line bg-surface/30 p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                    {selectedEngine.badge}
                  </span>
                  <h4 className="mt-1 font-display text-xl font-bold text-fg">
                    {selectedEngine.name} — {selectedEngine.role}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedEngine.primaryTools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-line bg-[#090c19] px-2.5 py-1 font-mono text-[10px] text-fg/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-8 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-faint">
                    ENGINE OPERATING RESPONSIBILITIES
                  </p>
                  <ul className="mt-4 space-y-3">
                    {selectedEngine.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-fg/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between border-t border-line pt-6 md:col-span-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-faint">
                      MANDATORY GUARDRAIL &amp; INVARIANT
                    </p>
                    <div className="mt-3 border-l-2 border-accent bg-[#0b0e20] p-4 text-xs leading-relaxed text-muted">
                      {selectedEngine.guardrail}
                    </div>
                  </div>
                  <div className="mt-6 font-mono text-[10px] tracking-[0.18em] text-faint">
                    STATUS: ACTIVE ENVIRONMENT PROTOCOL
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      {/* Module 2: The 4-Stage Agentic Loop Visualizer */}
      <Reveal delay={0.15}>
        <div className="mb-20">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="font-display text-2xl font-semibold text-fg">
                The 4-Stage Agentic Loop
              </h3>
              <p className="mt-1 text-xs text-muted">
                Explore → Plan → Implement → Verify: structured backpressure preventing AI hallucinations.
              </p>
            </div>
            <button
              type="button"
              onClick={triggerVerificationSim}
              disabled={simulatingTest}
              className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs tracking-wider text-accent-soft transition-all hover:border-accent hover:bg-accent/20 disabled:opacity-50"
            >
              <Play size={13} weight="fill" />
              {simulatingTest ? "RUNNING TESTS..." : "SIMULATE BACKPRESSURE"}
            </button>
          </div>

          {/* Stepper buttons */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {workflowStages.map((stage, idx) => {
              const active = idx === activeStage;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`border p-4 text-left transition-all ${
                    active
                      ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                      : "border-line bg-surface/30 hover:border-line-strong hover:bg-surface/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs ${
                        active ? "text-accent-soft font-bold" : "text-faint"
                      }`}
                    >
                      {stage.step}
                    </span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </div>
                  <div className="mt-2 font-display text-sm font-semibold tracking-wide text-fg">
                    {stage.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Details */}
          <div className="mt-4 border border-line bg-surface/30 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <span className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                  STAGE {currentStage.step} // {currentStage.name}
                </span>
                <h4 className="mt-1 font-display text-xl font-bold text-fg">
                  {currentStage.objective}
                </h4>
                <div className="mt-4 space-y-3 text-sm text-muted">
                  <p>
                    <strong className="text-fg">Execution Pattern:</strong> {currentStage.action}
                  </p>
                  <p>
                    <strong className="text-fg">Strict Invariant:</strong> {currentStage.rule}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between border-t border-line pt-4 md:col-span-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                    CHECKABLE EVIDENCE
                  </span>
                  <p className="mt-2 font-mono text-xs text-terminal">{currentStage.evidence}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-faint">
                  <ShieldCheck size={14} className="text-accent" />
                  <span>DETERMINISTIC GUARD</span>
                </div>
              </div>
            </div>

            {/* Simulated terminal output */}
            {simulatedLogs.length > 0 && (
              <div className="mt-6 border border-line-strong bg-[#04060d] p-4 font-mono text-xs">
                <div className="mb-2 flex items-center gap-2 text-faint">
                  <span className="h-2 w-2 rounded-full bg-terminal animate-pulse" />
                  <span>TERMINAL VERIFICATION STREAM</span>
                </div>
                <div className="space-y-1">
                  {simulatedLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes("PASS") || log.includes("passed")
                          ? "text-terminal"
                          : "text-muted"
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* Module 3: Custom Skill Arsenal */}
      <Reveal delay={0.2}>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="font-display text-2xl font-semibold text-fg">
                Governing Invariants
              </h3>
              <p className="mt-1 text-xs text-muted">
                The non-negotiable rules enforced throughout this build — each one observable in the codebase or the agent instructions.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-3 py-1 font-mono text-[11px] tracking-wider transition-colors ${
                    activeSkillCategory === cat
                      ? "border border-accent bg-accent/20 text-accent-soft"
                      : "border border-line text-faint hover:text-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col justify-between border border-line bg-surface/30 p-5 transition-all hover:border-line-strong hover:bg-surface/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-accent-soft">
                      {skill.category.toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] text-faint">{skill.tag}</span>
                  </div>
                  <h4 className="mt-2 font-mono text-sm font-semibold text-fg">
                    {skill.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {skill.description}
                  </p>
                </div>
                <div className="mt-4 border-t border-line/60 pt-3">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-faint">CORE INVARIANT</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-fg/80">{skill.rule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
