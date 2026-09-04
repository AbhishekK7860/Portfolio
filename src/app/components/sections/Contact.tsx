import { site } from "@/lib/site";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";

const connectLinks = [
  site.socials.github,
  site.socials.linkedin,
  site.socials.medium,
  site.socials.instagram,
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading num="07" label="CONNECT" title="Contact" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-3xl leading-tight text-fg md:text-5xl">
              Have a problem worth solving?
              <br />
              <span className="text-accent">Let&rsquo;s build something.</span>
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <a
              href={site.socials.email.href}
              className="group mt-10 inline-flex items-center gap-2 border-b border-line-strong pb-1 font-display text-xl text-fg transition-colors hover:border-accent hover:text-accent md:text-2xl"
            >
              {site.emailAddress}
              <span
                aria-hidden
                className="text-muted transition-colors group-hover:text-accent"
              >
                ↗
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-terminal">
                {site.availability}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <p className="font-mono text-[10px] tracking-[0.3em] text-faint">
              ELSEWHERE
            </p>
            <div className="mt-4 grid grid-cols-2 gap-px border border-line bg-line">
              {connectLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 bg-[#080a14] px-4 py-5 transition-colors hover:bg-surface-2"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted transition-colors group-hover:text-fg">
                    {s.short}
                  </span>
                  <span
                    aria-hidden
                    className="text-faint transition-colors group-hover:text-accent"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
