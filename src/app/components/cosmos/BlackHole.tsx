"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSoftCircleTexture } from "./useSoftCircleTexture";

/**
 * A black hole: a dark event horizon, a fresnel "photon ring", and a
 * rotating accretion disk built from hot → violet → cool particles.
 * The disk spins visibly fast, which sells the object as animated.
 */
export function BlackHole({ reduced }: { reduced: boolean }) {
  const diskRef = useRef<THREE.Points>(null);
  const map = useSoftCircleTexture();

  const geometry = useMemo(() => {
    const count = 4200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const rIn = 0.82;
    const rOut = 2.05;

    const hot = new THREE.Color("#fff1c2");
    const mid = new THREE.Color("#c084fc");
    const cool = new THREE.Color("#4f7bff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = rIn + (rOut - rIn) * Math.sqrt(Math.random());
      const angle = Math.random() * Math.PI * 2;
      const thickness = (Math.random() - 0.5) * 0.05 * (radius / rOut);

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = thickness;
      positions[i3 + 2] = Math.sin(angle) * radius;

      const t = (radius - rIn) / (rOut - rIn);
      const c = hot.clone().lerp(mid, t);
      if (t > 0.5) c.lerp(cool, (t - 0.5) / 0.5);

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  const photonUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#b79bff") },
      uPower: { value: 2.2 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (reduced || !diskRef.current) return;
    diskRef.current.rotation.y += delta * 0.85;
  });

  return (
    <group position={[3.5, 1.55, -1.9]} rotation={[1.05, 0.25, 0]}>
      {/* Event horizon */}
      <mesh>
        <sphereGeometry args={[0.74, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon ring — outer soft fresnel halo */}
      <mesh scale={1.06}>
        <sphereGeometry args={[0.74, 48, 48]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={photonUniforms}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vNormal = normalize(mat3(modelMatrix) * normal);
              vView = normalize(cameraPosition - wp.xyz);
              gl_Position = projectionMatrix * viewMatrix * wp;
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            varying vec3 vView;
            uniform vec3 uColor;
            uniform float uPower;
            void main() {
              float f = pow(1.0 - max(dot(vNormal, vView), 0.0), uPower);
              gl_FragColor = vec4(uColor, f);
            }
          `}
        />
      </mesh>

      {/* Bright photon ring — a crisp glowing torus hugging the horizon */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.016, 16, 160]} />
        <meshBasicMaterial color="#dcd0ff" transparent opacity={0.9} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Accretion disk */}
      <points ref={diskRef} geometry={geometry}>
        <pointsMaterial
          map={map}
          size={0.062}
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
    </group>
  );
}
