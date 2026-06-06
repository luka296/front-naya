"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function GoldSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#d4a64d"
        metalness={0.9}
        roughness={0.1}
        emissive="#7a5010"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function GoldTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0015;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.8, 0.25, 16, 100]} />
      <meshStandardMaterial
        color="#e5c06b"
        metalness={0.95}
        roughness={0.05}
        emissive="#a87828"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

export function Floating3DShapes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 2,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff8e7" />
      <pointLight position={[-5, 3, 3]} intensity={0.8} color="#d4a64d" distance={12} />

      <Suspense fallback={null}>
        <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.25}>
          <group position={[-2.5, 1.5, -1]}>
            <GoldSphere />
          </group>
        </Float>

        <Float speed={0.6} rotationIntensity={0.35} floatIntensity={0.3}>
          <group position={[2.5, -1.2, -1]}>
            <GoldTorus />
          </group>
        </Float>
      </Suspense>

      <Environment preset="night" />
    </Canvas>
  );
}

