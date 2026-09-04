"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { Galaxy } from "./Galaxy";
import { Planet } from "./Planet";
import { BlackHole } from "./BlackHole";
import { OrbitSystem } from "./OrbitSystem";
import { Robot } from "./Robot";
import { clamp, lerp } from "@/lib/utils";

/** Smoothstep — eases 0→1 with zero velocity at both ends. */
const smooth = (x: number) => x * x * (3 - 2 * x);

/**
 * Composes the animated cosmos: starfield, spiral galaxy, planet, black hole,
 * orbital system and the AI sentinel. Owns the single window-level pointer
 * listener (the canvas sits behind the UI and never receives DOM events) plus
 * a passive scroll listener, and scales the whole cluster responsively.
 *
 * Camera choreography, layered lightest→heaviest:
 *  · mount "settle" — camera eases in from further out on first load;
 *  · pointer parallax — a gentle drift toward the cursor;
 *  · scroll fly-through — as the hero scrolls away the camera rises and pulls
 *    back and the cluster banks, so leaving the hero feels like moving up
 *    through the world rather than sliding a document over a static image.
 * `reduced` fully freezes motion into a composed still frame.
 */
export function CosmosScene({ reduced }: { reduced: boolean }) {
  const pointer = useRef({ x: 0, y: 0, last: 0, active: false });
  const scroll = useRef(0); // 0 at top → 1 once the hero is fully scrolled away
  const intro = useRef(0); // 0 → 1 mount settle
  const cluster = useRef<THREE.Group>(null);
  const { size } = useThree();

  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      const nx = clamp((clientX / window.innerWidth) * 2 - 1, -1, 1);
      const ny = clamp((clientY / window.innerHeight) * 2 - 1, -1, 1);
      pointer.current.x = nx;
      pointer.current.y = ny;
      pointer.current.last = performance.now();
      pointer.current.active = true;
    };

    const onMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const onLeave = () => {
      pointer.current.active = false;
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onScroll = () => {
      const h = window.innerHeight || 1;
      scroll.current = clamp(window.scrollY / h, 0, 1);
    };
    onScroll();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    pointer.current.last = performance.now();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (reduced) return;

    // Mount settle: ease intro 0→1 over ~1.4s so the camera glides into place.
    intro.current = Math.min(1, intro.current + delta / 1.4);
    const settle = 1 - smooth(intro.current); // 1 → 0

    const s = smooth(scroll.current);
    const cam = state.camera;

    // Pointer parallax attenuates as you scroll away, so the frame calms while
    // it recedes instead of jittering.
    const parallax = 1 - s * 0.7;
    const targetX =
      (pointer.current.active ? pointer.current.x * 0.35 : 0) * parallax;
    const targetY =
      (pointer.current.active ? -pointer.current.y * 0.25 : 0) * parallax + s * 1.6;
    const targetZ = 7 + settle * 2.6 + s * 3.4;

    const damp = 1 - Math.exp(-delta * 3.5);
    cam.position.x = lerp(cam.position.x, targetX, damp);
    cam.position.y = lerp(cam.position.y, targetY, damp);
    cam.position.z = lerp(cam.position.z, targetZ, 1 - Math.exp(-delta * 4));
    cam.lookAt(0, s * 0.7, 0);

    // The whole cluster banks gently as the hero leaves — parallax against the
    // fixed starfield sells the sense of rising up through the scene.
    if (cluster.current) {
      cluster.current.rotation.y = lerp(cluster.current.rotation.y, s * 0.4, damp);
      cluster.current.rotation.x = lerp(cluster.current.rotation.x, s * 0.12, damp);
    }
  });

  const isMobile = size.width < 768;
  const groupScale = clamp(size.width / 1280, 0.6, 1);
  const starCount = isMobile ? 1800 : 3500;
  const galaxyCount = isMobile ? 3800 : 6500;

  return (
    <>
      <color attach="background" args={["#04050c"]} />
      <fog attach="fog" args={["#04050c", 9, 24]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 4, 5]} intensity={1.7} color="#c4b5fd" />
      <directionalLight position={[-6, -1, -4]} intensity={0.7} color="#5b8cff" />
      {/* Galaxy-core glow */}
      <pointLight position={[2.3, 0.3, -2.4]} intensity={22} distance={16} color="#a78bfa" />
      {/* Robot key light — front-right, gives the metal head definition */}
      <pointLight position={[4.5, 1.6, 4.5]} intensity={9} distance={13} color="#cdd9ff" />
      {/* Robot violet fill from below-left */}
      <pointLight position={[0.4, -1.6, 2.5]} intensity={7} distance={10} color="#8b5cf6" />

      <Stars
        radius={80}
        depth={50}
        count={starCount}
        factor={3.2}
        saturation={0}
        fade
        speed={reduced ? 0 : 0.6}
      />

      <group ref={cluster} scale={groupScale}>
        <Galaxy reduced={reduced} count={galaxyCount} />
        <Planet reduced={reduced} />
        <BlackHole reduced={reduced} />
        <OrbitSystem reduced={reduced} />
        <Robot reduced={reduced} pointer={pointer} />
      </group>
    </>
  );
}
