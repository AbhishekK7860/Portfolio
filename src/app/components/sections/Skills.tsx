import { skillGroups, certifications } from "@/data/skills";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading num="03" label="CAPABILITIES" title="Skills" />
      </Reveal>

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.04} className="bg-[#080a14] p-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-accent-soft">{g.num}</span>
              <span className="font-mono text-[11px] tracking-[0.25em] text-muted">
                {g.label}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="border border-line px-2.5 py-1 font-mono text-[11px] text-fg/80"
                >
                  {it}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-faint">
            CERTIFIED
          </span>
          {certifications.map((c) => (
            <span key={c} className="flex items-center gap-2 text-sm text-muted">
              <span className="h-1 w-1 rounded-full bg-terminal" />
              {c}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
