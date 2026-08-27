"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * A soft radial sprite used to render points as glowing round particles
 * instead of hard squares. Generated procedurally on a canvas — no asset
 * file, no licensing concern. Client-only (needs `document`); safe here
 * because the whole 3D tree is dynamically imported with { ssr: false }.
 */
export function useSoftCircleTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}
