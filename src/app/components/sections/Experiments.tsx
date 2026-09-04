import { experiments } from "@/data/experiments";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";

export function Experiments() {
  return (
    <section id="experiments" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading num="05" label="EXPLORATION" title="Experiments" />
      </Reveal>

      <div className="border-t border-line">
        {experiments.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.05}>
            <div className="flex flex-col gap-4 border-b border-line py-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-semibold text-fg">
                    {e.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent-soft">
                    {e.kind}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-line px-2 py-0.5 font-mono text-[10px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {e.href && (
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-muted transition-colors hover:text-accent"
                >
                  VIEW <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
