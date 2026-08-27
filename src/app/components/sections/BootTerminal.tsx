"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

/**
 * A boot-sequence terminal that reveals its lines one by one with a blinking
 * cursor. Renders all lines instantly under reduced-motion.
 */
export function BootTerminal() {
  const reduced = useReducedMotion();
  const lines = site.hero.terminal;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setCount(lines.length);
      return;
    }
    if (count >= lines.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 350 : 750);
    return () => window.clearTimeout(id);
  }, [count, reduced, lines.length]);

  const done = count >= lines.length;

  return (
    <div className="w-full max-w-sm border border-line bg-[#080a14]/80 p-4 font-mono text-[11px] leading-relaxed">
      <div className="mb-3 flex items-center gap-2 border-b border-line pb-2 text-faint">
        <span className="h-2 w-2 rounded-full bg-terminal" />
        <span className="tracking-[0.2em]">SYSTEM.BOOT</span>
      </div>
      <div className="space-y-1.5">
        {lines.slice(0, count).map((line, i) => (
          <div key={line} className="flex items-center gap-2">
            <span className="text-accent-soft">▸</span>
            <span className="text-muted">{line}</span>
            {i === count - 1 && !done && (
              <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-terminal" />
            )}
          </div>
        ))}
        {done && (
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-terminal">✓</span>
            <span className="text-terminal">ONLINE</span>
            <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-terminal" />
          </div>
        )}
      </div>
    </div>
  );
}
