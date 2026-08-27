"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A compact oscilloscope HUD "linked" to the cursor: the waveform's amplitude
 * and frequency track pointer Y/X, and a live coordinate readout updates on
 * move. Draws a single static frame under reduced-motion.
 */
export function SignalHUD() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const reduced = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      pointer.current = { x, y };
      setCoords({ x, y });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // mid line
      ctx.strokeStyle = "rgba(139,92,246,0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      // waveform
      const amp = (0.25 + pointer.current.y * 0.55) * (h * 0.42);
      const freq = 0.045 + pointer.current.x * 0.06;
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y =
          h / 2 + Math.sin(x * freq + t) * amp * Math.sin(x * 0.012 + t * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (!reduced) {
        t += 0.09;
        raf = requestAnimationFrame(draw);
      }
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const fmt = (n: number) => n.toFixed(3).padStart(5, "0");

  return (
    <div className="w-full max-w-[240px] border border-line bg-[#080a14]/80 p-3">
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-faint">
        <span>SIGNAL · CURSOR-LINK</span>
      </div>
      <canvas ref={canvasRef} className="h-12 w-full" />
      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-[0.15em] text-muted">
        <span>X {fmt(coords.x)}</span>
        <span>Y {fmt(coords.y)}</span>
      </div>
    </div>
  );
}
