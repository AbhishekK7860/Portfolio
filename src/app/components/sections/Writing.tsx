import { articles } from "@/data/writing";
import { site } from "@/lib/site";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";

export function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading num="05" label="FIELD NOTES" title="Writing" />
      </Reveal>
      <Reveal>
        <p className="mb-12 max-w-2xl text-muted">
          Essays on agentic systems, prompt engineering, and building in public —
          what I learn while shipping, written down.
        </p>
      </Reveal>

      <div className="border-t border-line">
        {articles.map((a, i) => (
          <Reveal key={a.url} delay={Math.min(i * 0.05, 0.15)}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 border-b border-line py-8 transition-colors hover:bg-surface/30 md:flex-row md:items-baseline md:gap-8"
            >
              <div className="flex shrink-0 items-center gap-3 md:w-48 md:flex-col md:items-start md:gap-2">
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent-soft">
                  {a.kicker}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                  {a.dateLabel}
                </span>
              </div>
              <div className="max-w-2xl">
                <h3 className="font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent md:text-xl">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {a.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-faint">
                      #{t.replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <a
          href={site.socials.medium.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          READ MORE ON MEDIUM <span aria-hidden>↗</span>
        </a>
      </Reveal>
    </section>
  );
}
