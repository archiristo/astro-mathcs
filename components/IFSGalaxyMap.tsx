"use client";

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- GLSL SHADERS (Matematiksel Boyama Motoru) ---

const vertexShader = `
  varying vec2 vUv;
  varying float vRadius;
  void main() {
    vUv = uv;
    // Merkeze olan uzaklığı hesapla (0.0 - 0.5 arası)
    vRadius = distance(uv, vec2(0.5));
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  }
`;

const fragmentShader = `
  uniform float uDispersion; // Slider'dan gelen değer
  varying float vRadius;

  // Renk gradyanı fonksiyonu (Sıcaktan soğuğa)
  vec3 colorGradient(float t) {
      // Merkez: Kırmızı/Sarı, Dış: Mavi/Mor
      vec3 col1 = vec3(1.0, 0.2, 0.0); // Kırmızı
      vec3 col2 = vec3(1.0, 0.8, 0.0); // Sarı
      vec3 col3 = vec3(0.0, 0.5, 1.0); // Mavi
      vec3 col4 = vec3(0.1, 0.0, 0.3); // Koyu Mor
      
      float step1 = 0.15 * uDispersion;
      float step2 = 0.3 * uDispersion;
      float step3 = 0.45;

      vec3 color = mix(col1, col2, smoothstep(0.0, step1, t));
      color = mix(color, col3, smoothstep(step1, step2, t));
      color = mix(color, col4, smoothstep(step2, step3, t));
      return color;
  }

  void main() {
    // Uzaklığa göre rengi belirle
    vec3 finalColor = colorGradient(vRadius);
    // Dış kenarları yumuşat (Alpha maskesi)
    float alpha = 1.0 - smoothstep(0.3, 0.5, vRadius);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// --- 3D Galaksi Objesi ---
function GalaxyMesh({ dispersion }: { dispersion: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Shader'a gönderilecek dinamik veriler
  const uniforms = useMemo(
    () => ({
      uDispersion: { value: dispersion },
    }),
    []
  );

  // Slider değiştikçe shader'ı güncelle
  useFrame((state) => {
    if (meshRef.current) {
       // Galaksiyi yavaşça döndür
       meshRef.current.rotation.z += 0.001;
       // Uniform değerini güncelle
       (meshRef.current.material as THREE.ShaderMaterial).uniforms.uDispersion.value = dispersion;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]}>
      {/* Yüksek detaylı bir düzlem (Disk şekli için) */}
      <planeGeometry args={[10, 10, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false} // Diğer objelerin arkasında kalmasını engeller
        blending={THREE.AdditiveBlending} // Parlama efekti için
      />
    </mesh>
  );
}

// --- Ana Bileşen ---
export default function IFSGalaxyMap() {
  const [dispersion, setDispersion] = useState(1.0);

  return (
    <div className="backdrop-blur-xl bg-slate-900/50 border border-fuchsia-500/30 p-6 rounded-3xl shadow-2xl h-[600px] flex flex-col">
      <div className="flex justify-between items-center mb-4 z-10">
         <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-3 h-3 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_10px_#e879f9]" />
          3D IFS Kinematics Map (Velocity Dispersion)
        </h2>
      </div>

      {/* Kontrol Paneli */}
      <div className="absolute bottom-8 left-8 z-20 bg-black/60 p-4 rounded-xl border border-white/10 backdrop-blur-md">
        <label className="text-sm text-fuchsia-300 block font-mono mb-2">
          Gradient Profile (Central Agitation): {dispersion.toFixed(1)}
        </label>
        <input 
          type="range" min="0.5" max="2.0" step="0.1" value={dispersion} 
          onChange={(e) => setDispersion(parseFloat(e.target.value))}
          className="w-48 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
        />
      </div>
      
      {/* 3D Canvas Alanı */}
      <div className="flex-grow rounded-2xl overflow-hidden relative">
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <color attach="background" args={['#020617']} /> {/* Çok koyu lacivert arka plan */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <GalaxyMesh dispersion={dispersion} />
          
          <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={true}
              autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </div>
  );
}