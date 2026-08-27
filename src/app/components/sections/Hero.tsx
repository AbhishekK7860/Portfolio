"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight, ArrowDown } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";
import { BootTerminal } from "./BootTerminal";
import { SignalHUD } from "./SignalHUD";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const reduced = useReducedMotion();
  const anim = reduced
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };
  const child = reduced ? {} : { variants: item };

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center pt-14"
      aria-label="Introduction"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-20">
        <motion.div {...anim} className="max-w-2xl">
          <motion.p
            {...child}
            className="font-mono text-xs tracking-[0.35em] text-accent-soft"
          >
            {site.hero.greeting}
          </motion.p>

          <motion.h1
            {...child}
            className="mt-5 font-display text-6xl font-bold leading-[0.9] tracking-tight text-fg sm:text-7xl md:text-8xl"
          >
            Abhishek
            <span
              className="block"
              style={{
                WebkitTextStroke: "1px rgba(237,239,247,0.28)",
                color: "transparent",
              }}
            >
              Kesarwani
            </span>
          </motion.h1>

          <motion.p
            {...child}
            className="mt-6 font-mono text-sm tracking-[0.25em] text-muted"
          >
            {site.role.toUpperCase()}
            <span className="mx-3 text-line-strong">/</span>
            {site.location}
          </motion.p>

          <motion.p
            {...child}
            className="mt-7 max-w-xl font-display text-xl leading-snug text-fg/90 md:text-2xl"
          >
            I build <span className="text-accent">AI</span> systems that solve real
            problems.
          </motion.p>

          <motion.p {...child} className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {site.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div {...child} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 rounded-[2px] bg-accent-deep px-6 py-3 font-mono text-xs tracking-[0.2em] text-white transition-colors hover:bg-[#7d5ce8]"
            >
              EXPLORE WORK
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <a
              href={site.socials.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[2px] border border-line-strong px-6 py-3 font-mono text-xs tracking-[0.2em] text-muted transition-colors hover:border-accent hover:text-fg"
            >
              GITHUB
              <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-[2px] px-4 py-3 font-mono text-xs tracking-[0.2em] text-faint transition-colors hover:text-fg"
            >
              CONTACT
            </button>
          </motion.div>

          {/* Cosmic HUD chips */}
          <motion.div {...child} className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {site.hero.cosmicHud.map((c) => (
              <span
                key={c}
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-faint"
              >
                <span className="h-1 w-1 rounded-full bg-accent" />
                {c}
              </span>
            ))}
          </motion.div>

          {/* HUD instruments */}
          <motion.div {...child} className="mt-8 flex flex-wrap items-stretch gap-4">
            <BootTerminal />
            <SignalHUD />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-muted md:flex"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}
