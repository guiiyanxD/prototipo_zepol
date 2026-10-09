"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

interface PackageModel3DProps {
  width: number;
  height: number;
  depth: number;
  materialType: string;
}

function PackageMesh({ width, height, depth, materialType }: PackageModel3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.BoxGeometry>(null);

  // Scale cm to three.js units (divide by 10 for easier camera viewing)
  const w = width / 10;
  const h = height / 10;
  const d = (depth || 1) / 10; // Avoid 0 depth to keep it visible

  // Deform geometry to look like a Stand-up Pouch / Bag
  useEffect(() => {
    if (geoRef.current) {
      const positions = geoRef.current.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        // Normalized Y from 0 (bottom) to 1 (top)
        const ny = (y + h / 2) / h; 
        
        // Pinch Z towards 0 at the top to simulate the heat seal
        const sealThickness = 0.02;
        let newZ = z;
        
        if (z > 0) {
          // Front face curves inwards at the top
          newZ = sealThickness + (z - sealThickness) * (1 - Math.pow(ny, 3));
        } else if (z < 0) {
          // Back face curves inwards at the top
          newZ = -sealThickness + (z + sealThickness) * (1 - Math.pow(ny, 3));
        }
        
        positions.setZ(i, newZ);
      }
      
      positions.needsUpdate = true;
      geoRef.current.computeVertexNormals();
    }
  }, [w, h, d]);

  // Determine appearance based on materialType
  let color = "#1E3A8A"; // Zepol primary default
  let metalness = 0.2;
  let roughness = 0.6;
  let transparent = false;
  let opacity = 1;

  if (materialType.includes("Metalizado") || materialType.includes("Aluminio")) {
    color = "#e2e8f0";
    metalness = 0.9;
    roughness = 0.2;
  } else if (materialType.includes("Transparente")) {
    color = "#ffffff";
    transparent = true;
    opacity = 0.4;
    roughness = 0.1;
  } else if (materialType.includes("Papel")) {
    color = "#e6d5b8"; // Kraft paper color
    metalness = 0.0;
    roughness = 0.9;
  } else if (materialType.includes("BOPP") || materialType.includes("Polietileno") || materialType.includes("Polivac")) {
    color = "#0891B2"; // Zepol accent for standard plastics
    metalness = 0.1;
    roughness = 0.3;
  }

  return (
    <mesh ref={meshRef} position={[0, h / 2, 0]} castShadow>
      <boxGeometry ref={geoRef} args={[w, h, d, 4, 32, 4]} />
      <meshStandardMaterial 
        color={color} 
        metalness={metalness} 
        roughness={roughness}
        transparent={transparent}
        opacity={opacity}
      />
    </mesh>
  );
}

export default function PackageModel3D({ width, height, depth, materialType }: PackageModel3DProps) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [5, 4, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        {/* Environment adds realistic reflections */}
        <Environment preset="city" />

        <PackageMesh 
          width={width} 
          height={height} 
          depth={depth} 
          materialType={materialType} 
        />

        {/* Soft shadow underneath */}
        <ContactShadows 
          position={[0, 0, 0]} 
          opacity={0.5} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />

        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1.5}
          minDistance={2}
          maxDistance={15}
          // No polar angle restriction so it can be seen from bottom
        />
      </Canvas>
    </div>
  );
}
