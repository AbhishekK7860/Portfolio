import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  num: string;
  label: string;
  title: string;
  className?: string;
}

/**
 * Editorial section header: "03 —— SKILLS" HUD line above a large display
 * title. Shared across every content section for a consistent rhythm.
 */
export function SectionHeading({ num, label, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-accent-soft">{num}</span>
        <span className="h-px w-12 bg-line-strong" />
        <span className="font-mono text-xs tracking-[0.3em] text-muted">{label}</span>
      </div>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
        {title}
      </h2>
    </div>
  );
}
