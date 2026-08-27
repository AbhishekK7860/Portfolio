"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface RobotProps {
  reduced: boolean;
  pointer: React.RefObject<{ x: number; y: number; last: number }>;
}

const SHELL = { color: "#151b32", metalness: 0.78, roughness: 0.3 } as const;

/** A small, friendly visual avatar for Abhishek's local portfolio assistant. */
export function Robot({ reduced, pointer }: RobotProps) {
  const bot = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Group>(null);
  const rightEye = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const avatar = bot.current;
    if (!avatar) return;

    if (reduced) {
      avatar.position.set(2.15, 0.12, 1.2);
      avatar.rotation.set(0, 0, 0);
      leftEye.current?.position.set(-0.15, 0.45, 0.345);
      rightEye.current?.position.set(0.15, 0.45, 0.345);
      leftArm.current?.rotation.set(0, 0, 0.26);
      rightArm.current?.rotation.set(0, 0, -0.26);
      return;
    }

    const p = pointer.current;
    const idle = performance.now() - p.last > 2500;
    const px = idle ? 0 : p.x;
    const py = idle ? 0 : p.y;
    const ease = 1 - Math.exp(-delta * 9);
    const gazeX = px * 0.05;
    const gazeY = -py * 0.034;

    if (leftEye.current) {
      leftEye.current.position.x = THREE.MathUtils.lerp(leftEye.current.position.x, -0.15 + gazeX * 0.94, ease);
      leftEye.current.position.y = THREE.MathUtils.lerp(leftEye.current.position.y, 0.45 + gazeY, ease);
    }
    if (rightEye.current) {
      rightEye.current.position.x = THREE.MathUtils.lerp(rightEye.current.position.x, 0.15 + gazeX * 1.06, ease);
      rightEye.current.position.y = THREE.MathUtils.lerp(rightEye.current.position.y, 0.45 + gazeY, ease);
    }

    const t = state.clock.elapsedTime;
    avatar.position.y = 0.12 + Math.sin(t * 1.35) * 0.055;
    avatar.rotation.z = Math.sin(t * 0.75) * 0.025;
    if (leftArm.current) leftArm.current.rotation.z = 0.26 + Math.sin(t * 1.35) * 0.08;
    if (rightArm.current) rightArm.current.rotation.z = -0.26 - Math.sin(t * 1.35) * 0.08;
  });

  return (
    <group ref={bot} position={[2.15, 0.12, 1.2]} scale={0.94}>
      {/* Compact rounded chassis */}
      <RoundedBox args={[0.56, 0.46, 0.42]} radius={0.18} smoothness={4} position={[0, -0.15, 0]}>
        <meshStandardMaterial {...SHELL} color="#11182d" />
      </RoundedBox>
      <mesh position={[0, -0.16, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.105, 0.105, 0.025, 24]} />
        <meshStandardMaterial color="#070b16" emissive="#8b5cf6" emissiveIntensity={1.45} toneMapped={false} />
      </mesh>

      {/* Head and dark sensor face */}
      <RoundedBox args={[0.78, 0.57, 0.5]} radius={0.22} smoothness={5} position={[0, 0.42, 0.01]}>
        <meshStandardMaterial {...SHELL} color="#202944" />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.31, 0.07]} radius={0.1} smoothness={4} position={[0, 0.45, 0.285]}>
        <meshStandardMaterial color="#030611" metalness={0.7} roughness={0.38} />
      </RoundedBox>
      <mesh position={[0, 0.585, 0.33]}>
        <boxGeometry args={[0.42, 0.012, 0.015]} />
        <meshBasicMaterial color="#5b8cff" toneMapped={false} />
      </mesh>

      {([-0.15, 0.15] as const).map((x) => (
        <mesh key={x} position={[x, 0.45, 0.326]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.079, 0.079, 0.018, 20]} />
          <meshStandardMaterial color="#050914" metalness={0.7} roughness={0.32} />
        </mesh>
      ))}
      <group ref={leftEye} position={[-0.15, 0.45, 0.345]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.043, 0.008, 10, 24]} />
          <meshBasicMaterial color="#5b8cff" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.018, 16]} />
          <meshBasicMaterial color="#dceeff" toneMapped={false} />
        </mesh>
      </group>
      <group ref={rightEye} position={[0.15, 0.45, 0.345]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.043, 0.008, 10, 24]} />
          <meshBasicMaterial color="#5b8cff" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.018, 16]} />
          <meshBasicMaterial color="#dceeff" toneMapped={false} />
        </mesh>
      </group>

      {/* Tiny antenna, side pods, and waving arms keep the bot playful. */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.018, 0.025, 0.17, 10]} />
        <meshStandardMaterial {...SHELL} color="#2a3453" />
      </mesh>
      <mesh position={[0, 0.93, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#a78bfa" toneMapped={false} />
      </mesh>
      {([-0.43, 0.43] as const).map((x) => (
        <mesh key={x} position={[x, 0.42, 0]}>
          <sphereGeometry args={[0.105, 16, 16]} />
          <meshStandardMaterial {...SHELL} color="#171f38" />
        </mesh>
      ))}
      <group ref={leftArm} position={[-0.39, -0.05, 0]} rotation={[0, 0, 0.26]}>
        <mesh position={[0, -0.13, 0]}>
          <capsuleGeometry args={[0.055, 0.17, 8, 16]} />
          <meshStandardMaterial {...SHELL} color="#222c49" />
        </mesh>
        <mesh position={[0, -0.27, 0]}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <meshStandardMaterial color="#5b8cff" emissive="#5b8cff" emissiveIntensity={0.45} toneMapped={false} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.39, -0.05, 0]} rotation={[0, 0, -0.26]}>
        <mesh position={[0, -0.13, 0]}>
          <capsuleGeometry args={[0.055, 0.17, 8, 16]} />
          <meshStandardMaterial {...SHELL} color="#222c49" />
        </mesh>
        <mesh position={[0, -0.27, 0]}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <meshStandardMaterial color="#5b8cff" emissive="#5b8cff" emissiveIntensity={0.45} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
