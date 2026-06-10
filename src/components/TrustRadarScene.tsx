"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// Pulse ring component simulating expanding verification check waves
function RadarRing({ delay = 0, speed = 1, maxRadius = 3 }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime() * speed + delay;
    const progress = (time % 3) / 3; // 0 to 1
    
    // Scale up
    const scale = progress * maxRadius;
    meshRef.current.scale.set(scale, scale, 1);
    
    // Fade out
    if (meshRef.current.material) {
      (meshRef.current.material as THREE.Material).opacity = (1 - progress) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.98, 1, 64]} />
      <meshBasicMaterial color="#d4a64d" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Glowing coordinate lines between the Kaaba and verification nodes
function DashedLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#d4a64d" transparent opacity={0.35} />
    </line>
  );
}

// GPS Node markers revolving in space (enlarged for better visibility)
function GPSNode({ position, color }: { position: [number, number, number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 1.5 + position[0]) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer pulsing ring */}
      <mesh>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// Procedural rotating Mini Kaaba at the center
function MiniKaaba() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
    }
  });
  return (
    <group ref={group} scale={0.34} position={[0, 0, 0]}>
      {/* Main body — dark cube */}
      <mesh>
        <boxGeometry args={[2.4, 3, 2.4]} />
        <meshStandardMaterial color="#0e0d0b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Gold kiswa band */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.42, 0.45, 2.42]} />
        <meshStandardMaterial color="#c8902a" metalness={0.95} roughness={0.06} emissive="#7a5010" emissiveIntensity={0.5} />
      </mesh>
      {/* Second thin gold line */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.42, 0.06, 2.42]} />
        <meshStandardMaterial color="#b8841e" metalness={0.95} roughness={0.08} emissive="#7a5010" emissiveIntensity={0.3} />
      </mesh>
      {/* Door panel */}
      <mesh position={[0, -0.2, 1.21]}>
        <boxGeometry args={[0.6, 1.0, 0.04]} />
        <meshStandardMaterial color="#d4a64d" metalness={0.96} roughness={0.04} emissive="#8c6520" emissiveIntensity={0.6} />
      </mesh>
      {/* Corner pillars */}
      {([ [-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2] ] as [number,number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <cylinderGeometry args={[0.11, 0.11, 3.04, 12]} />
          <meshStandardMaterial color="#c8902a" metalness={0.93} roughness={0.1} />
        </mesh>
      ))}
      {/* Top cap */}
      <mesh position={[0, 1.53, 0]}>
        <boxGeometry args={[2.5, 0.08, 2.5]} />
        <meshStandardMaterial color="#a87828" metalness={0.92} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Constellation structure representing verification assets flow
function VerificationNetwork() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.06;
    }
  });

  // Verification nodes orbiting closer to the Kaaba
  const nodes: { pos: [number, number, number]; color: string }[] = [
    { pos: [1.2, 0.6, -0.8], color: "#d4a64d" }, // Duaa Video Node
    { pos: [-1.2, -0.8, 0.8], color: "#14b8a6" }, // Photo Report Node
    { pos: [0.4, -1.2, -1.2], color: "#60a5fa" }  // Digital Certificate Node
  ];

  return (
    <group ref={groupRef}>
      <MiniKaaba />
      
      {/* Expanding verification sweeps (adjusted radius) */}
      <RadarRing delay={0} speed={0.8} maxRadius={2.3} />
      <RadarRing delay={1.5} speed={0.8} maxRadius={2.3} />

      {/* Connection lines and outer markers */}
      {nodes.map((node, i) => (
        <group key={i}>
          <GPSNode position={node.pos} color={node.color} />
          <DashedLine start={[0, 0, 0]} end={node.pos} />
        </group>
      ))}
    </group>
  );
}

export function TrustRadarScene() {
  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[440px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[5, 8, 5]} intensity={2.0} color="#fff8e7" />
        <pointLight position={[-5, -6, -5]} intensity={0.6} color="#d4a64d" />
        
        <VerificationNetwork />
        
        <Stars radius={60} depth={20} count={500} factor={2} saturation={0.5} fade speed={0.5} />
      </Canvas>
      
      {/* Arabic Verification telemetry and descriptions */}
      <div className="absolute inset-0 pointer-events-none select-none text-[10px] font-mono text-slate-500" dir="rtl">
        <div className="absolute top-1/4 right-[10%] flex flex-col items-start gap-1 text-right">
          <span className="text-[#f2d58e] font-bold text-xs">مركز توثيق نية • مكة المكرمة</span>
          <span className="text-[10px] text-slate-400">حالة التحقق الميداني: نشط وعامل</span>
        </div>
        <div className="absolute bottom-1/4 left-[10%] flex flex-col items-end gap-1 text-left" dir="ltr">
          <span className="text-teal-400 font-bold text-xs">التوثيق الرقمي المعتمد</span>
          <span className="text-[10px] text-slate-400">نسبة مطابقة معايير الأمانة: 100%</span>
        </div>
      </div>
    </div>
  );
}
