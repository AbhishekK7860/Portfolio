"use client";

import { socialItems } from "./socials";

/**
 * Desktop social rail fixed to the right gutter — icon links to GitHub,
 * LinkedIn, Medium, Instagram and email, anchored by a vertical line.
 */
export function SocialRail() {
  return (
    <div className="fixed bottom-0 right-6 z-40 hidden flex-col items-center gap-5 lg:flex">
      {socialItems.map(({ key, label, href, Icon }) => {
        const external = !href.startsWith("mailto:");
        return (
          <a
            key={key}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={label}
            title={label}
            className="text-faint transition-colors duration-300 hover:-translate-y-0.5 hover:text-accent"
          >
            <Icon size={18} weight="regular" />
          </a>
        );
      })}
      <span className="mt-1 h-24 w-px bg-line-strong" />
    </div>
  );
}
