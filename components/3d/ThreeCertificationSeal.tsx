"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function SealMesh() {
  const ref = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.22;
    if (ring.current) ring.current.rotation.z -= d * 0.15;
  });

  return (
    <Float speed={1} floatIntensity={0.4} rotationIntensity={0.15}>
      <group ref={ref}>
        <mesh ref={ring}>
          <torusGeometry args={[1.2, 0.028, 14, 96]} />
          <meshStandardMaterial color="#24a87c" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh rotation={[Math.PI / 2.2, 0.15, 0]}>
          <torusGeometry args={[0.95, 0.016, 10, 80]} />
          <meshStandardMaterial color="#005953" metalness={0.75} roughness={0.28} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.72, 0.72, 0.14, 56]} />
          <meshStandardMaterial color="#003d39" metalness={0.7} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.05, 48]} />
          <meshStandardMaterial color="#24a87c" metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.03, 40]} />
          <meshStandardMaterial color="#002e2b" metalness={0.6} roughness={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

function Fallback() {
  return (
    <div className="relative mx-auto h-48 w-48">
      <div className="absolute inset-0 animate-[seal-spin_14s_linear_infinite] rounded-full border border-dashed border-accent-soft/50" />
      <div className="absolute inset-4 animate-seal-spin-reverse rounded-full border border-white/15" />
      <div className="absolute inset-8 rounded-full bg-primary shadow-2xl" />
      <div className="absolute inset-14 rounded-full border-2 border-accent-soft" />
    </div>
  );
}

export function ThreeCertificationSeal({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [ok, setOk] = useState(() => {
    if (typeof window === "undefined") return false;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !prefersReduce && !coarse;
  });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    queueMicrotask(() => setOk(!reduce && !coarse));
  }, [reduce]);

  if (!ok) {
    return (
      <div className={className}>
        <Fallback />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0.1, 3.3], fov: 42 }}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 2]} intensity={1.15} color="#fff4e4" />
        <directionalLight position={[-2, -1, -2]} intensity={0.3} color="#8fd4b8" />
        <Suspense fallback={null}>
          <SealMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
