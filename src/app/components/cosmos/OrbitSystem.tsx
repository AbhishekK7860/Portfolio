"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbiterProps {
  radius: number;
  speed: number;
  size: number;
  color: string;
  tilt: number;
  phase: number;
  reduced: boolean;
}

function Orbiter({ radius, speed, size, color, tilt, phase, reduced }: OrbiterProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = reduced ? phase : state.clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Ring({
  radius,
  tilt,
  color,
  opacity,
}: {
  radius: number;
  tilt: number;
  color: string;
  opacity: number;
}) {
  return (
    <mesh rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 12, 140]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
    </mesh>
  );
}

/**
 * Thin orbital trajectories with small bodies tracing them at different
 * speeds — quiet, continuous motion that frames the robot and galaxy.
 */
export function OrbitSystem({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.y += delta * 0.03;
  });
  return (
    <group ref={group} position={[2.1, -0.2, 0.4]}>
      <Ring radius={2.1} tilt={Math.PI / 2.1} color="#3d4a7a" opacity={0.35} />
      <Ring radius={2.8} tilt={Math.PI / 2.6} color="#2b3566" opacity={0.28} />
      <Orbiter radius={2.1} speed={0.5} size={0.05} color="#a78bfa" tilt={Math.PI / 2.1} phase={0} reduced={reduced} />
      <Orbiter radius={2.8} speed={0.32} size={0.06} color="#5b8cff" tilt={Math.PI / 2.6} phase={2.0} reduced={reduced} />
      <Orbiter radius={2.1} speed={0.5} size={0.03} color="#edeff7" tilt={Math.PI / 2.1} phase={3.4} reduced={reduced} />
    </group>
  );
}
