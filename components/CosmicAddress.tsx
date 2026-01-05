"use client";

import { useState, useEffect } from 'react';

export default function CosmicAddress() {
  // 19 yılın saniye karşılığı üzerinden başlangıç mesafesi (yaklaşık)
  const SECONDS_IN_19_YEARS = 19 * 365.25 * 24 * 60 * 60;
  const SPEED_OF_LIGHT = 299792.458; // km/s
  const initialDistance = SECONDS_IN_19_YEARS * SPEED_OF_LIGHT;

  const [photonDistance, setPhotonDistance] = useState(initialDistance);

  useEffect(() => {
    // 145+ IQ Senkronizasyon: Her saniye ışık hızı kadar mesafe ekle
    const engine = setInterval(() => {
      setPhotonDistance(prev => prev + SPEED_OF_LIGHT);
    }, 1000);

    return () => clearInterval(engine);
  }, []);

  // Sayıyı profesyonel formatta yazdır (Örn: 179.811.260.000.000)
  const formattedDistance = new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: 0
  }).format(photonDistance);

  return (
    <div className="backdrop-blur-xl bg-slate-900/40 border border-white/10 p-5 rounded-3xl shadow-2xl relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Deep Space ID / Active Tracking</p>
      </div>

      <div className="space-y-3">
        {[
          { level: "Planet", name: "Earth (Terra)" },
          { level: "System", name: "Solar System" },
          { level: "Galaxy", name: "Milky Way" },
          { level: "Cluster", name: "Local Group" },
          { level: "Supercluster", name: "Laniakea" }
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-baseline border-b border-white/5 pb-1">
            <span className="text-[9px] text-slate-500 font-mono uppercase italic">{item.level}</span>
            <span className="text-xs text-white font-bold tracking-tight">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-yellow-500/20">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[8px] text-yellow-500/50 uppercase tracking-tighter">Live Photon Flight Distance</p>
          <span className="text-[8px] text-white/30 animate-pulse">~300,000 km/s</span>
        </div>
        <p className="text-base font-black text-yellow-500 font-mono tracking-tighter leading-none">
          {formattedDistance} <span className="text-[10px] ml-1">KM</span>
        </p>
      </div>
      
      {/* Arka plan süslemesi */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all" />
    </div>
  );
}