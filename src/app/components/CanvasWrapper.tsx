"use client";

import dynamic from "next/dynamic";

const Canvas3D = dynamic(() => import("./Canvas3D").then((mod) => mod.Canvas3D), {
  ssr: false,
});

/**
 * Fixed, full-viewport background layer holding the 3D cosmos plus two
 * functional legibility scrims (darker on the left and bottom) so hero text
 * stays WCAG-compliant over the bright right-hand side. Page content sits
 * above this in a `relative z-10` wrapper. A static CSS starfield shows if
 * WebGL never mounts, so the background is never plain black.
 */
export function CanvasWrapper() {
  return (
    <div className="fixed inset-0 z-0 bg-[#04050c]" aria-hidden="true">
      {/* No-WebGL fallback: a faint static nebula gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 72% 38%, rgba(90,60,180,0.16), transparent 60%), radial-gradient(900px 700px at 85% 70%, rgba(40,80,200,0.12), transparent 55%)",
        }}
      />

      <Canvas3D />

      {/* Left legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(4,5,12,0.94) 0%, rgba(4,5,12,0.6) 32%, rgba(4,5,12,0.08) 60%, rgba(4,5,12,0) 100%)",
        }}
      />
      {/* Bottom legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(4,5,12,0.9) 0%, rgba(4,5,12,0) 32%)",
        }}
      />
    </div>
  );
}
