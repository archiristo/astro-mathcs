// components/ISSTracker.tsx
"use client";

import { useState, useEffect } from 'react';

const ADANA = { lat: 37.0000, lon: 35.3213 }; // Adana tam koordinat

export default function ISSTracker() {
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [distance, setDistance] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const calculateDistance = (lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - ADANA.lat) * (Math.PI / 180);
    const dLon = (lon2 - ADANA.lon) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(ADANA.lat * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const fetchISS = async () => {
      try {
        // HTTPS destekleyen daha stabil API (WheretheISS)
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        if (!res.ok) throw new Error('API Connection Failed');
        
        const data = await res.json();
        const latNum = parseFloat(data.latitude);
        const lonNum = parseFloat(data.longitude);
        
        setPosition({ lat: latNum, lon: lonNum });
        setDistance(calculateDistance(latNum, lonNum));
        setError(null);
      } catch (err) {
        console.error("Signal Lost:", err);
        setError("Searching for satellite signal...");
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h1 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
        ISS LIVE TELEMETRY
      </h1>

      {error ? (
        <div className="text-yellow-500 text-xs animate-pulse font-mono uppercase tracking-widest">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Latitude</p>
              <p className="text-xl font-mono text-cyan-400">{position.lat.toFixed(4)}°</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Longitude</p>
              <p className="text-xl font-mono text-cyan-400">{position.lon.toFixed(4)}°</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="text-gray-400 text-sm">Distance to Adana HQ:</p>
            <p className="text-4xl font-black text-yellow-400 tracking-tighter">
              {distance.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} <span className="text-sm font-normal text-gray-600 italic">km</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}