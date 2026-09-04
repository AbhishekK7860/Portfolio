"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { CosmosScene } from "./cosmos/CosmosScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * WebGL host for the animated cosmos. Mounts only after hydration and is
 * loaded via `next/dynamic({ ssr: false })` from CanvasWrapper, so it never
 * runs on the server. DPR is clamped for performance; when reduced-motion is
 * requested the frameloop drops to "demand" (a single composed still frame).
 */
export function Canvas3D() {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  // The cosmos is a fixed layer behind an opaque content slab. Once the hero
  // has scrolled away it is fully covered, so we drop the render loop to
  // "demand" (idle) and resume it when it scrolls back into view. `setState`
  // only fires when crossing the coverage threshold, never on every scroll.
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const isCovered = window.scrollY > window.innerHeight * 1.15;
      setCovered((prev) => (prev === isCovered ? prev : isCovered));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={reduced || covered ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <CosmosScene reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
