import { useState, useEffect } from 'react';

// Adana Koordinatları
const ADANA = { lat: 37.0, lon: 35.3 };

export default function ISSTracker() {
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [distance, setDistance] = useState(0);

  const calculateDistance = (lat2: number, lon2: number) => {
    const R = 6371; // Dünya yarıçapı (km)
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
        const res = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await res.json();
        const { latitude, longitude } = data.iss_position;
        const latNum = parseFloat(latitude);
        const lonNum = parseFloat(longitude);
        
        setPosition({ lat: latNum, lon: lonNum });
        setDistance(calculateDistance(latNum, lonNum));
      } catch (err) {
        console.error("Agent Perception Error:", err);
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 5000); // 5 saniyede bir güncelle (P04)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backdrop-blur-xl bg-black/30 border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        ISS Real-Time Tracking
      </h1>
      <div className="space-y-2 text-gray-300">
        <p>🛸 Latitude: <span className="text-cyan-400">{position.lat.toFixed(4)}</span></p>
        <p>🛸 Longitude: <span className="text-cyan-400">{position.lon.toFixed(4)}</span></p>
        <div className="h-px bg-white/10 my-4" />
        <p className="text-xl">
          Distance to Adana: <span className="font-mono text-yellow-400">{distance.toFixed(2)} km</span>
        </p>
      </div>
    </div>
  );
}