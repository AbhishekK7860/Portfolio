"use client";

import { site } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const IDS = site.nav.map((n) => n.id);

/**
 * Desktop vertical scroll-spy navigation, fixed to the left gutter.
 * The active section's marker line extends and turns violet.
 */
export function SideNav() {
  const active = useActiveSection(IDS);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-4">
        {site.nav.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="group flex items-center gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "h-px bg-line-strong transition-all duration-300",
                    isActive
                      ? "w-8 bg-accent"
                      : "w-4 group-hover:w-6 group-hover:bg-muted",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[0.25em] transition-colors duration-300",
                    isActive
                      ? "text-fg"
                      : "text-faint group-hover:text-muted",
                  )}
                >
                  {item.num} {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
