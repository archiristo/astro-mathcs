// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import CosmicLoader from '../components/CosmicLoader';
import ISSTracker from '../components/ISSTracker';
import KeplerCard from '../components/KeplerCard';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 145+ IQ Yükleme Stratejisi: 
    // 3 saniyelik bir 'Cosmic Delay' ile sistemin oturmasını bekliyoruz.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CosmicLoader />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Derin Uzay Arka Planı */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Header: Dr. İris Marka İmzası */}

        {/* Dashboard Grid: Modüllerin Buluşması */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <section className="space-y-4">
            <p className="text-xs font-bold text-cyan-500 tracking-[0.3em] uppercase ml-2">
              Live Telemetry
            </p>
            <ISSTracker />
          </section>

          <section className="space-y-4">
            <p className="text-xs font-bold text-purple-500 tracking-[0.3em] uppercase ml-2">
              Orbital Mechanics
            </p>
            <KeplerCard />
          </section>
        </div>

      
      </div>
    </main>
  );
}