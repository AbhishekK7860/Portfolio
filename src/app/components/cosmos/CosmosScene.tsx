"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Galaxy } from "./Galaxy";
import { Planet } from "./Planet";
import { BlackHole } from "./BlackHole";
import { OrbitSystem } from "./OrbitSystem";
import { Robot } from "./Robot";
import { clamp, lerp } from "@/lib/utils";

/**
 * Composes the animated cosmos: starfield, spiral galaxy, planet, black hole,
 * orbital system and the AI sentinel. Owns the single window-level pointer
 * listener (the canvas sits behind the UI and never receives DOM events),
 * drives a gentle camera parallax, and scales the whole cluster responsively.
 * `reduced` fully freezes motion into a composed still frame.
 */
export function CosmosScene({ reduced }: { reduced: boolean }) {
  const pointer = useRef({ x: 0, y: 0, last: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.last = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    pointer.current.last = performance.now();
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (reduced) return;
    state.camera.position.x = lerp(state.camera.position.x, pointer.current.x * 0.4, delta * 1.5);
    state.camera.position.y = lerp(state.camera.position.y, -pointer.current.y * 0.3, delta * 1.5);
    state.camera.lookAt(0, 0, 0);
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

      <group scale={groupScale}>
        <Galaxy reduced={reduced} count={galaxyCount} />
        <Planet reduced={reduced} />
        <BlackHole reduced={reduced} />
        <OrbitSystem reduced={reduced} />
        <Robot reduced={reduced} pointer={pointer} />
      </group>
    </>
  );
}
