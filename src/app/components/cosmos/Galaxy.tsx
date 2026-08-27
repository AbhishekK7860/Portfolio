"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSoftCircleTexture } from "./useSoftCircleTexture";

interface GalaxyProps {
  reduced: boolean;
  count?: number;
}

/**
 * A procedural spiral galaxy — the luminous centrepiece behind the robot.
 * Warm core → violet arms → cosmos-blue rim. Continuously rotates so it
 * reads as a living, video-like swirl (the user's explicit requirement).
 * When reduced-motion is set it renders as a still, fully-formed spiral.
 */
export function Galaxy({ reduced, count = 6500 }: GalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const map = useSoftCircleTexture();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const radiusMax = 5.2;
    const branches = 4;
    const spin = 1.15;
    const randomness = 0.36;
    const randomnessPower = 2.6;

    const inside = new THREE.Color("#ffd9a8"); // warm core
    const mid = new THREE.Color("#a78bfa"); // violet arms
    const outside = new THREE.Color("#3b6dff"); // cosmos-blue rim

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 1.5) * radiusMax;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;

      const scatter = () =>
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + scatter();
      positions[i3 + 1] = scatter() * 0.5;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + scatter();

      const c = inside.clone();
      const t = radius / radiusMax;
      c.lerp(mid, Math.min(t * 1.6, 1));
      if (t > 0.5) c.lerp(outside, (t - 0.5) / 0.5);

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reduced) return;
    pointsRef.current.rotation.y += delta * 0.1;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      rotation={[-1.1, 0, 0.2]}
      position={[2.3, 0.3, -2.8]}
    >
      <pointsMaterial
        map={map}
        size={0.075}
        sizeAttenuation
        depthWrite={false}
        transparent
        vertexColors
        fog={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        opacity={0.95}
      />
    </points>
  );
}
