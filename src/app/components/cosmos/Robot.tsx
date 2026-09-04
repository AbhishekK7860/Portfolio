"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface RobotProps {
  reduced: boolean;
  pointer: React.RefObject<{ x: number; y: number; last: number; active?: boolean }>;
}

const SHELL = { color: "#151b32", metalness: 0.78, roughness: 0.3 } as const;
const MAX_PUPIL_RADIUS = 0.028;

/**
 * An interactive, sentient-feeling 3D robotic companion.
 * Features coordinated head yaw/pitch + eye saccade tracking,
 * radial boundary clamping (pupils never escape eye sockets),
 * organic blinking reflex, idle curiosity scanning, and full
 * reduced-motion compliance.
 */
export function Robot({ reduced, pointer }: RobotProps) {
  const bot = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Group>(null);
  const rightEye = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const reactorLight = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const avatar = bot.current;
    if (!avatar) return;

    if (reduced) {
      avatar.position.set(2.15, 0.12, 1.2);
      avatar.rotation.set(0, 0, 0);
      headGroup.current?.rotation.set(0, 0, 0);
      leftEye.current?.position.set(-0.15, 0.1, 0.345);
      leftEye.current?.scale.set(1, 1, 1);
      rightEye.current?.position.set(0.15, 0.1, 0.345);
      rightEye.current?.scale.set(1, 1, 1);
      leftArm.current?.rotation.set(0, 0, 0.26);
      rightArm.current?.rotation.set(0, 0, -0.26);
      return;
    }

    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const isUserActive = p.active !== false && performance.now() - p.last < 2400;

    // Natural idle curiosity scanning when user is not moving the pointer
    let targetPx = p.x;
    let targetPy = p.y;
    if (!isUserActive) {
      targetPx = Math.sin(t * 0.7) * 0.4 + Math.cos(t * 0.25) * 0.15;
      targetPy = Math.sin(t * 0.5) * 0.22;
    }

    // 1. Coordinated Head Yaw, Pitch, and subtle Roll
    const headTargetYaw = targetPx * 0.26; // ~15 deg
    const headTargetPitch = -targetPy * 0.14; // ~8 deg
    const headTargetRoll = targetPx * 0.035;

    const headDamp = 1 - Math.exp(-delta * 6);
    if (headGroup.current) {
      headGroup.current.rotation.y = THREE.MathUtils.lerp(
        headGroup.current.rotation.y,
        headTargetYaw,
        headDamp,
      );
      headGroup.current.rotation.x = THREE.MathUtils.lerp(
        headGroup.current.rotation.x,
        headTargetPitch,
        headDamp,
      );
      headGroup.current.rotation.z = THREE.MathUtils.lerp(
        headGroup.current.rotation.z,
        headTargetRoll,
        headDamp,
      );
    }

    // 2. Eye Saccades with Radial Socket Boundary Clamping
    // Relative eye displacement from socket centers
    const rawGazeX = targetPx * 0.034;
    const rawGazeY = -targetPy * 0.024;
    const dist = Math.hypot(rawGazeX, rawGazeY);
    const clampScale = dist > MAX_PUPIL_RADIUS ? MAX_PUPIL_RADIUS / dist : 1;
    const clampedGazeX = rawGazeX * clampScale;
    const clampedGazeY = rawGazeY * clampScale;

    // Natural quick eye saccade damping
    const eyeDamp = 1 - Math.exp(-delta * 12);

    // 3. Organic Blinking Reflex: every 4 seconds, quick 110ms blink
    const blinkCycle = t % 4.2;
    let eyeScaleY = 1;
    if (blinkCycle < 0.11) {
      const blinkProgress = Math.sin((blinkCycle / 0.11) * Math.PI);
      eyeScaleY = THREE.MathUtils.lerp(1, 0.06, blinkProgress);
    }

    if (leftEye.current) {
      leftEye.current.position.x = THREE.MathUtils.lerp(
        leftEye.current.position.x,
        -0.15 + clampedGazeX * 0.95,
        eyeDamp,
      );
      leftEye.current.position.y = THREE.MathUtils.lerp(
        leftEye.current.position.y,
        0.1 + clampedGazeY,
        eyeDamp,
      );
      leftEye.current.scale.y = eyeScaleY;
    }

    if (rightEye.current) {
      rightEye.current.position.x = THREE.MathUtils.lerp(
        rightEye.current.position.x,
        0.15 + clampedGazeX * 1.05,
        eyeDamp,
      );
      rightEye.current.position.y = THREE.MathUtils.lerp(
        rightEye.current.position.y,
        0.1 + clampedGazeY,
        eyeDamp,
      );
      rightEye.current.scale.y = eyeScaleY;
    }

    // 4. Subtle Body Floating & Banking
    avatar.position.y = 0.12 + Math.sin(t * 1.35) * 0.055;
    avatar.rotation.z = Math.sin(t * 0.75) * 0.025;
    avatar.rotation.y = THREE.MathUtils.lerp(
      avatar.rotation.y,
      headTargetYaw * 0.22,
      1 - Math.exp(-delta * 2.5),
    );

    // Dynamic arm breathing
    if (leftArm.current) {
      leftArm.current.rotation.z = 0.26 + Math.sin(t * 1.35) * 0.07;
      leftArm.current.rotation.x = -headTargetPitch * 0.4;
    }
    if (rightArm.current) {
      rightArm.current.rotation.z = -0.26 - Math.sin(t * 1.35) * 0.07;
      rightArm.current.rotation.x = -headTargetPitch * 0.4;
    }

    // Chest reactor pulse
    if (reactorLight.current) {
      reactorLight.current.intensity = 1.2 + Math.sin(t * 2.5) * 0.4;
    }
  });

  return (
    <group ref={bot} position={[2.15, 0.12, 1.2]} scale={0.94}>
      {/* Compact rounded chassis / torso */}
      <RoundedBox args={[0.56, 0.46, 0.42]} radius={0.18} smoothness={4} position={[0, -0.15, 0]}>
        <meshStandardMaterial {...SHELL} color="#11182d" />
      </RoundedBox>

      {/* Emissive chest reactor core */}
      <mesh position={[0, -0.16, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.105, 0.105, 0.025, 24]} />
        <meshStandardMaterial color="#070b16" emissive="#8b5cf6" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <pointLight ref={reactorLight} position={[0, -0.16, 0.3]} distance={1.8} color="#a78bfa" intensity={1.3} />

      {/* Head Group: Pivoted at neck joint [0, 0.35, 0] for natural yaw, pitch, and roll */}
      <group ref={headGroup} position={[0, 0.35, 0]}>
        {/* Head shell */}
        <RoundedBox args={[0.78, 0.57, 0.5]} radius={0.22} smoothness={5} position={[0, 0.07, 0.01]}>
          <meshStandardMaterial {...SHELL} color="#202944" />
        </RoundedBox>

        {/* Visor sensor panel */}
        <RoundedBox args={[0.62, 0.31, 0.07]} radius={0.1} smoothness={4} position={[0, 0.1, 0.285]}>
          <meshStandardMaterial color="#030611" metalness={0.7} roughness={0.38} />
        </RoundedBox>

        {/* Blue brow HUD line */}
        <mesh position={[0, 0.235, 0.33]}>
          <boxGeometry args={[0.42, 0.012, 0.015]} />
          <meshBasicMaterial color="#5b8cff" toneMapped={false} />
        </mesh>

        {/* Fixed outer eye socket recesses */}
        {([-0.15, 0.15] as const).map((x) => (
          <mesh key={x} position={[x, 0.1, 0.326]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.079, 0.079, 0.018, 20]} />
            <meshStandardMaterial color="#050914" metalness={0.7} roughness={0.32} />
          </mesh>
        ))}

        {/* Left Pupil / Eye Sensor (Relative to neck: y = 0.1) */}
        <group ref={leftEye} position={[-0.15, 0.1, 0.345]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.043, 0.008, 10, 24]} />
            <meshBasicMaterial color="#5b8cff" toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.018, 16]} />
            <meshBasicMaterial color="#dceeff" toneMapped={false} />
          </mesh>
        </group>

        {/* Right Pupil / Eye Sensor (Relative to neck: y = 0.1) */}
        <group ref={rightEye} position={[0.15, 0.1, 0.345]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.043, 0.008, 10, 24]} />
            <meshBasicMaterial color="#5b8cff" toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.018, 16]} />
            <meshBasicMaterial color="#dceeff" toneMapped={false} />
          </mesh>
        </group>

        {/* Antenna stem & glowing beacon orb */}
        <mesh position={[0, 0.47, 0]}>
          <cylinderGeometry args={[0.018, 0.025, 0.17, 10]} />
          <meshStandardMaterial {...SHELL} color="#2a3453" />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#a78bfa" toneMapped={false} />
        </mesh>

        {/* Ear pods */}
        {([-0.43, 0.43] as const).map((x) => (
          <mesh key={x} position={[x, 0.07, 0]}>
            <sphereGeometry args={[0.105, 16, 16]} />
            <meshStandardMaterial {...SHELL} color="#171f38" />
          </mesh>
        ))}
      </group>

      {/* Articulated arms */}
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
