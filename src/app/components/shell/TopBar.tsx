"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";
import { socialItems } from "./socials";

/**
 * Fixed top HUD bar: monogram + name, a live "ONLINE" status with an IST
 * clock and a rotating role ticker, and (on mobile) a full-screen menu.
 */
export function TopBar() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [tick, setTick] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }),
      );
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || reduced) return;
    const id = window.setInterval(
      () => setTick((t) => (t + 1) % site.roleTicker.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [mounted, reduced]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[#04050c]/85">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Brand */}
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-line-strong font-display text-sm font-bold text-fg transition-colors group-hover:border-accent group-hover:text-accent">
              {site.monogram}
            </span>
            <span className="hidden font-mono text-xs tracking-[0.25em] text-muted sm:block">
              {site.fullName.toUpperCase()}
            </span>
          </button>

          {/* Right cluster (desktop) */}
          <div className="hidden items-center gap-5 md:flex">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terminal" />
              </span>
              <span className="text-terminal">ONLINE</span>
            </span>
            <span className="h-4 w-px bg-line-strong" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
              IST {mounted ? time : "--:--:--"}
            </span>
            <span className="h-4 w-px bg-line-strong" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent-soft">
              {reduced ? site.roleTicker.join(" · ") : site.roleTicker[tick]}
            </span>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center border border-line-strong text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#04050c] px-6 pb-10 pt-20 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-left"
                >
                  <span className="font-mono text-xs text-accent-soft">{item.num}</span>
                  <span className="font-display text-2xl font-medium text-fg">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-auto flex flex-wrap gap-4 pt-8">
              {socialItems.map(({ key, label, href, Icon }) => {
                const external = !href.startsWith("mailto:");
                return (
                  <a
                    key={key}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-2 border border-line-strong px-3 py-2 font-mono text-[11px] tracking-[0.15em] text-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    <Icon size={16} />
                    {label.toUpperCase()}
                    {external && <ArrowUpRight size={12} className="text-faint" />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
