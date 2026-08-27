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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <CosmosScene reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
