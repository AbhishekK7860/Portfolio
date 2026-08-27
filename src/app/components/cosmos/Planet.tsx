"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A planet with a fresnel atmosphere halo, slowly self-rotating.
 * The atmosphere is an additive shell that glows only at the silhouette —
 * a cheap, reliable substitute for a full bloom pipeline.
 */
export function Planet({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#7aa2ff") },
      uPower: { value: 3.0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (reduced || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group position={[4.4, -1.7, -2.6]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 12]} />
        <meshStandardMaterial
          color="#242a55"
          roughness={0.62}
          metalness={0.18}
          emissive="#0b1030"
          emissiveIntensity={0.45}
          flatShading
        />
      </mesh>

      {/* Atmosphere halo */}
      <mesh scale={1.2}>
        <icosahedronGeometry args={[0.55, 24]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={atmosphereUniforms}
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
    </group>
  );
}
