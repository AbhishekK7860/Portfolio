import type { ReactNode } from "react";
import type { Project } from "@/data/projects";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.25em] text-faint">{label}</p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const live = status === "LIVE";
  return (
    <span className={live ? "flex items-center gap-1.5 text-terminal" : "text-muted"}>
      {live && <span className="h-1.5 w-1.5 rounded-full bg-terminal" />}
      {status}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border border-line bg-surface/30 transition-colors hover:border-line-strong">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span className="font-display text-3xl font-bold text-line-strong">
            {project.index}
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-fg md:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="font-mono text-[10px] tracking-[0.2em] text-accent-soft">
            {project.category}
          </span>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint">
            <span>{project.year}</span>
            <span className="h-3 w-px bg-line-strong" />
            <StatusChip status={project.status} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-8 p-6 md:grid-cols-12 md:p-8">
        <div className="space-y-6 md:col-span-4">
          <Field label="PROBLEM">{project.problem}</Field>
          {project.metrics.length > 0 && (
            <div className="space-y-3 border-t border-line pt-5">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                    {m.label}
                  </span>
                  <span className="font-mono text-xs text-fg">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6 md:col-span-8">
          <Field label="WHAT I BUILT">{project.built}</Field>
          <Field label="ARCHITECTURE">{project.architecture}</Field>
          {project.aiSystem && <Field label="AI SYSTEM">{project.aiSystem}</Field>}
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-faint">
              KEY DECISIONS
            </p>
            <ul className="mt-3 space-y-2">
              {project.decisions.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-sm leading-relaxed text-fg/80"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <Field label="WHY IT'S INTERESTING">{project.interesting}</Field>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                l.kind === "demo"
                  ? "inline-flex items-center gap-1.5 rounded-[2px] bg-accent-deep px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-white transition-colors hover:bg-[#7d5ce8]"
                  : "inline-flex items-center gap-1.5 rounded-[2px] border border-line-strong px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-muted transition-colors hover:border-accent hover:text-fg"
              }
            >
              {l.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
