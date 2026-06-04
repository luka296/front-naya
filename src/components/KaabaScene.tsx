"use client";

import { useRef, Suspense, useMemo, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, Stars, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────
   Error Boundary
───────────────────────────────────────── */
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ─────────────────────────────────────────
   Procedural Kaaba — shows immediately
───────────────────────────────────────── */
function ProceduralKaaba() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.07;
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Main body — dark cube */}
      <mesh castShadow>
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
      {/* Door arch */}
      <mesh position={[0, 0.35, 1.22]}>
        <boxGeometry args={[0.65, 0.15, 0.02]} />
        <meshStandardMaterial color="#e5c06b" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Corner pillars */}
      {([ [-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2] ] as [number,number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]} castShadow>
          <cylinderGeometry args={[0.11, 0.11, 3.04, 12]} />
          <meshStandardMaterial color="#c8902a" metalness={0.93} roughness={0.1} />
        </mesh>
      ))}
      {/* Top cap with small overhang */}
      <mesh position={[0, 1.53, 0]}>
        <boxGeometry args={[2.5, 0.08, 2.5]} />
        <meshStandardMaterial color="#a87828" metalness={0.92} roughness={0.1} />
      </mesh>
      {/* Base platform */}
      <mesh position={[0, -1.55, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.12, 3.5]} />
        <meshStandardMaterial color="#1a1915" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   Real Kaaba GLB
───────────────────────────────────────── */
function KaabaGLB() {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/kaaba_in_mecca.glb");
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    // Compute bounding box to auto-center
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    // Offset so model is centered at origin
    c.position.sub(center);
    c.position.y += size.y / 2; // sit on ground
    return { obj: c, maxDim: Math.max(size.x, size.y, size.z) };
  }, [scene]);

  // Auto-scale to fit ~3 units tall
  const scale = 3 / (cloned.maxDim || 1);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={group} position={[0, -1.5, 0]} scale={scale}>
      <primitive object={cloned.obj} />
    </group>
  );
}

/* ─────────────────────────────────────────
   Hajj Man GLB (optional)
───────────────────────────────────────── */
function HajjManGLB({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF("/models/hajj_man_animated.glb");
  const { actions } = useAnimations(animations, group);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    c.position.sub(center);
    c.position.y += size.y / 2;
    return { obj: c, maxDim: Math.max(size.x, size.y, size.z) };
  }, [scene]);

  const scale = 2.5 / (cloned.maxDim || 1);

  useEffect(() => {
    const key = Object.keys(actions ?? {})[0];
    if (key && actions?.[key]) actions[key]!.play();
  }, [actions]);

  useFrame(() => {
    if (!group.current) return;
    const opacity = Math.min(1, Math.max(0.05, scrollY.current * 0.004));
    group.current.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        (m as THREE.MeshStandardMaterial).opacity = opacity;
        (m as THREE.MeshStandardMaterial).transparent = true;
      });
    });
  });

  return (
    <group ref={group} position={[4, -1.5, -1.5]} scale={scale} rotation={[0, -0.5, 0]}>
      <primitive object={cloned.obj} />
    </group>
  );
}

/* ─────────────────────────────────────────
   Scene Models composite
───────────────────────────────────────── */
function SceneModels({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  return (
    <>
      <ModelErrorBoundary fallback={
        <Float speed={0.6} rotationIntensity={0.03} floatIntensity={0.2}>
          <ProceduralKaaba />
        </Float>
      }>
        <Suspense fallback={
          <Float speed={0.6} rotationIntensity={0.03} floatIntensity={0.2}>
            <ProceduralKaaba />
          </Float>
        }>
          <Float speed={0.6} rotationIntensity={0.03} floatIntensity={0.2}>
            <KaabaGLB />
          </Float>
        </Suspense>
      </ModelErrorBoundary>

      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <HajjManGLB scrollY={scrollY} />
        </Suspense>
      </ModelErrorBoundary>
    </>
  );
}

/* ─────────────────────────────────────────
   Gold Particles
───────────────────────────────────────── */
function GoldParticles() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.012;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f0cc7c" size={0.04} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

/* ─────────────────────────────────────────
   Gold Ring
───────────────────────────────────────── */
function GoldRing({ radius, speed, opacity }: { radius: number; speed: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * speed;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 2, 120]} />
      <meshBasicMaterial color="#d4a64d" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   Camera Rig
───────────────────────────────────────── */
function CameraRig({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 1, 6));
  useFrame(() => {
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const t = Math.min(1, scrollY.current / maxScroll);
    let x = 0, y = 1, z = 6;
    if (t < 0.2) {
      const p = t / 0.2;
      x = THREE.MathUtils.lerp(0, -2, p);
      y = THREE.MathUtils.lerp(1, 1.5, p);
      z = THREE.MathUtils.lerp(6, 8, p);
    } else if (t < 0.5) {
      const p = (t - 0.2) / 0.3;
      x = THREE.MathUtils.lerp(-2, 3, p);
      y = THREE.MathUtils.lerp(1.5, 0.5, p);
      z = THREE.MathUtils.lerp(8, 9, p);
    } else if (t < 0.8) {
      const p = (t - 0.5) / 0.3;
      x = THREE.MathUtils.lerp(3, -1.5, p);
      y = THREE.MathUtils.lerp(0.5, 2, p);
      z = THREE.MathUtils.lerp(9, 10, p);
    } else {
      const p = (t - 0.8) / 0.2;
      x = THREE.MathUtils.lerp(-1.5, 0, p);
      y = THREE.MathUtils.lerp(2, 1, p);
      z = THREE.MathUtils.lerp(10, 6, p);
    }
    target.current.set(x, y, z);
    camera.position.lerp(target.current, 0.035);
    camera.lookAt(0, 0.3, 0);
  });
  return null;
}

/* ─────────────────────────────────────────
   Main Canvas
───────────────────────────────────────── */
export function KaabaScene({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#fff8e7" castShadow />
      <directionalLight position={[-3, 6, -2]} intensity={0.8} color="#d4a64d" />
      <pointLight position={[-5, 3, 3]} intensity={1.8} color="#d4a64d" distance={25} />
      <pointLight position={[5, -1, 4]} intensity={1.0} color="#f0cc7c" distance={20} />
      <pointLight position={[0, 7, -4]} intensity={1.2} color="#ffffff" distance={22} />
      <pointLight position={[0, -3, 3]} intensity={1.2} color="#c89a3a" distance={16} />
      {/* Extra front light so Kaaba is well lit */}
      <spotLight position={[0, 4, 8]} intensity={2.0} angle={0.5} penumbra={0.8} color="#fff5e0" />

      <CameraRig scrollY={scrollY} />
      <Stars radius={70} depth={40} count={2200} factor={3} saturation={0} fade speed={0.4} />
      <GoldParticles />
      <GoldRing radius={3.8} speed={0.1}  opacity={0.2} />
      <GoldRing radius={5.2} speed={-0.05} opacity={0.12} />
      <GoldRing radius={6.8} speed={0.035} opacity={0.06} />

      <SceneModels scrollY={scrollY} />

      <ContactShadows position={[0, -1.55, 0]} opacity={0.5} scale={16} blur={2.5} far={4} color="#000" />
      <Environment preset="night" />
    </Canvas>
  );
}

if (typeof window !== "undefined") {
  useGLTF.preload("/models/kaaba_in_mecca.glb");
  useGLTF.preload("/models/hajj_man_animated.glb");
}
