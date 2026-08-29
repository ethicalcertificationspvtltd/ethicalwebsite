"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

function PrecisionSeal({ mouse }: { mouse: MouseRef }) {
  const root = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;
    if (root.current) {
      root.current.rotation.y += delta * 0.08;
      root.current.rotation.x = THREE.MathUtils.damp(
        root.current.rotation.x,
        mouse.current.y * 0.22,
        3.2,
        delta,
      );
      root.current.rotation.z = THREE.MathUtils.damp(
        root.current.rotation.z,
        -mouse.current.x * 0.18,
        3.2,
        delta,
      );
      root.current.position.y = Math.sin(t * 0.7) * 0.04;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.16;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.11;
  });

  return (
    <group ref={root}>
      <mesh ref={ringA}>
        <torusGeometry args={[1.55, 0.018, 12, 128]} />
        <meshStandardMaterial color="#24a87c" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.28, 0.014, 12, 120]} />
        <meshStandardMaterial color="#005953" metalness={0.78} roughness={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.01, 8, 96]} />
        <meshStandardMaterial
          color="#c09c54"
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.7}
        />
      </mesh>

      <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.25}>
        <mesh>
          <cylinderGeometry args={[0.82, 0.82, 0.14, 64]} />
          <meshStandardMaterial color="#003d39" metalness={0.72} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.05, 64]} />
          <meshStandardMaterial color="#24a87c" metalness={0.95} roughness={0.16} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.03, 48]} />
          <meshStandardMaterial color="#002e2b" metalness={0.65} roughness={0.32} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.72, 0.12, Math.sin(a) * 0.72]}
              rotation={[0, -a, 0]}
            >
              <boxGeometry args={[0.018, 0.02, 0.06]} />
              <meshStandardMaterial color="#24a87c" metalness={0.9} roughness={0.2} />
            </mesh>
          );
        })}
      </Float>

      <Float speed={1.1} floatIntensity={0.35} rotationIntensity={0.2} position={[-1.55, -0.25, 0.45]}>
        <mesh rotation={[0.45, 0.6, 0.15]}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial color="#24a87c" metalness={0.88} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.15} position={[1.55, 0.45, -0.2]}>
        <mesh rotation={[0.3, -0.4, 0.2]}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#005953" metalness={0.75} roughness={0.25} />
        </mesh>
      </Float>

      <mesh rotation={[1.2, 0.4, 0.2]} position={[0, -0.05, 0]}>
        <torusGeometry args={[1.85, 0.006, 6, 100, Math.PI * 1.2]} />
        <meshStandardMaterial color="#005953" metalness={0.6} roughness={0.4} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function SoftParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(90);
    for (let i = 0; i < 30; i++) {
      const a = i * 2.399;
      const r = 0.35 + (i % 7) * 0.28;
      arr[i * 3] = Math.cos(a) * r * 1.8;
      arr[i * 3 + 1] = Math.sin(a * 0.7) * r * 1.1;
      arr[i * 3 + 2] = Math.sin(a) * r * 1.4;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#24a87c" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene({ mouse }: { mouse: MouseRef }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4.5, 5.5, 2.5]} intensity={1.2} color="#fff4e4" />
      <directionalLight position={[-3.5, -1.5, -3]} intensity={0.35} color="#8fd4b8" />
      <spotLight position={[2, 4, 3]} angle={0.35} penumbra={0.7} intensity={0.45} color="#24a87c" />
      <PrecisionSeal mouse={mouse} />
      <SoftParticles />
    </>
  );
}

function HeroFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden>
      <div className="absolute h-64 w-64 rounded-full border border-primary/15" />
      <div className="absolute h-48 w-48 animate-[seal-spin_18s_linear_infinite] rounded-full border border-dashed border-accent/35" />
      <div className="absolute h-36 w-36 animate-seal-spin-reverse rounded-full border border-primary/20" />
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary shadow-[0_24px_70px_rgba(0,89,83,0.35)]">
        <div className="h-20 w-20 rounded-full border-2 border-accent-soft/85" />
        <div className="absolute h-10 w-10 rounded-full bg-accent-soft/30" />
      </div>
    </div>
  );
}

export function ThreeHero({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<"3d" | "fallback">(() => {
    if (typeof window === "undefined") return "fallback";
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
    if (prefersReduce || coarse || lowMem) return "fallback";
    return "3d";
  });

  useEffect(() => {
    if (reduce) {
      queueMicrotask(() => setMode("fallback"));
      return;
    }
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
    queueMicrotask(() => setMode(coarse || lowMem ? "fallback" : "3d"));
  }, [reduce]);

  useEffect(() => {
    if (mode !== "3d") return;
    let raf = 0;
    const tick = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.06;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.06;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  if (mode !== "3d") return <div className={className}><HeroFallback /></div>;

  return (
    <div
      className={`relative h-full w-full bg-transparent ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        target.current.x = (e.clientX - rect.left) / rect.width - 0.5;
        target.current.y = (e.clientY - rect.top) / rect.height - 0.5;
      }}
      onMouseLeave={() => {
        target.current.x = 0;
        target.current.y = 0;
      }}
    >
      <Canvas
        className="!bg-transparent"
        style={{ background: "transparent" }}
        dpr={[1, 1.4]}
        camera={{ position: [0, 0.15, 4.4], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
