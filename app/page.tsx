"use client";

import { useState, useEffect } from 'react';
import CosmicLoader from '../components/CosmicLoader';
import ISSTracker from '../components/ISSTracker';
import KeplerCard from '../components/KeplerCard';
import CosmicDiscovery from '../components/CosmicDiscovery';
import GalaxyKinematics from '../components/GalaxyKinematics';
import SpectrumAnalyzer from '../components/SpectrumAnalyzer'; 
import IFSGalaxyMap from '../components/IFSGalaxyMap'; 
import InfoToggle from '../components/InfoToggle';
import AtmosphericSync from '../components/AtmosphericSync';
import CosmicAddress from '../components/CosmicAddress';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CosmicLoader />;

  return (
    <main className="relative min-h-screen text-slate-200 selection:bg-cyan-500/30">
      

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-12 lg:py-20 space-y-12">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
           <AtmosphericSync />
        </section>

        {/* DASHBOARD GRID: Modüllerin Stratejik Yerleşimi */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* SOL KOLON: Canlı Telemetri ve Yörünge (Bento Style) */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="relative group">
              <InfoToggle title="ISS Tracking" math="TLE Propagation & Lat/Long projection" tech="REST API & Leaflet.js" />
              <p className="text-[10px] font-bold text-cyan-500 tracking-[0.4em] uppercase mb-4 px-2 border-l-2 border-cyan-500">Live Telemetry</p>
              <ISSTracker />
            </section>

            <section className="relative group">
               <InfoToggle title="Cosmic Feed" math="Astronomy Picture of the Day" tech="NASA Open API" />
               <p className="text-[10px] font-bold text-orange-500 tracking-[0.4em] uppercase mb-4 px-2 border-l-2 border-orange-500">
               Daily Discovery
               </p>
              <CosmicDiscovery />
            </section>
                </div>
            

          {/* ORTA KOLON: 3D IFS Simülatörü (Merkez Parça) */}
          <div className="col-span-12 lg:col-span-8">
            <section className="relative group">
             <InfoToggle title="IFS Kinematics" math="Velocity Dispersion GLSL Shaders" tech="Three.js & R3F" />
              <p className="text-[10px] font-bold text-fuchsia-500 tracking-[0.4em] uppercase mb-4 px-2 border-l-2 border-fuchsia-500">Integral Field Spectroscopy (3D Mapping)</p>
              <IFSGalaxyMap />
            </section>
          </div>

          {/* ALT SATIR: Bilimsel Analiz Araçları */}
          <div className="col-span-12 lg:col-span-6">
            <section className="relative group">
              <InfoToggle title="Dark Matter Gap" math="v = sqrt(GM/r) vs Observed v" tech="Recharts D3 Engine" />
              <p className="text-[10px] font-bold text-indigo-500 tracking-[0.4em] uppercase mb-4 px-2 border-l-2 border-indigo-500">Kinematic Analysis</p>
              <GalaxyKinematics />
            </section>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <section className="relative group">
              <p className="text-[10px] font-bold text-emerald-500 tracking-[0.4em] uppercase mb-4 px-2 border-l-2 border-emerald-500">Spectral Redshift Engine</p>
              <InfoToggle title="Spectral Analysis" math="v = z * c (Doppler Shift)" tech="React Hooks & SVG Engine" />
              <SpectrumAnalyzer />
            </section>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <section className="relative group">
              <p className="text-[10px] font-bold text-purple-500 tracking-[0.4em] uppercase mb-4 px-2 border-l-2 border-purple-500">Orbital Solutions</p>
              <KeplerCard />
            </section>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <section className="relative group">
              <p className="text-[10px] font-bold text-purple-500 tracking-[0.4em] uppercase mb-4 px-2 border-l-2 border-purple-500">Orbital Solutions</p>
              <CosmicAddress />
            </section>
          </div>
        </div>

      </div>
    </main>
  );
}