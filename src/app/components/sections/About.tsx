import { about } from "@/data/about";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading num="01" label={about.kicker} title={about.headline} />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-2xl leading-snug text-fg md:text-3xl">
              {about.lead}
            </p>
          </Reveal>
          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="max-w-xl leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="border border-line bg-surface/40 p-6">
              <p className="font-mono text-[10px] tracking-[0.3em] text-faint">
                CURRENT FOCUS
              </p>
              <ul className="mt-4 space-y-3">
                {about.focus.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-fg/85">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="my-6 h-px bg-line" />
              <dl className="grid grid-cols-2 gap-4">
                {about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-faint">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <figure className="mt-16 border-l-2 border-accent pl-6 md:mt-20 md:pl-8">
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent-soft">
            {about.canvasLine}
          </p>
          <blockquote className="mt-4 max-w-3xl font-display text-2xl leading-snug text-fg md:text-3xl">
            &ldquo;{about.quote}&rdquo;
          </blockquote>
        </figure>
      </Reveal>
    </section>
  );
}
