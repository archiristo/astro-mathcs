import { useState } from 'react';

export default function KeplerCard() {
  const [au, setAu] = useState<number>(1);
  const [period, setPeriod] = useState<number>(1);

  const calculatePeriod = (value: number) => {
    const p = Math.sqrt(Math.pow(value, 3));
    setAu(value);
    setPeriod(p);
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl transition-all hover:border-cyan-500/50">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
        Kepler's 3rd Law Calculator
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Distance from Sun (AU): <span className="text-white font-mono">{au} AU</span>
          </label>
          <input 
            type="range" 
            min="0.1" 
            max="40" 
            step="0.1"
            value={au}
            onChange={(e) => calculatePeriod(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm mb-1">Orbital Period (P):</p>
          <p className="text-3xl font-mono text-cyan-400">
            {period.toFixed(2)} <span className="text-sm text-gray-500">Earth Years</span>
          </p>
        </div>

        <div className="text-[10px] text-gray-600 italic mt-4 font-serif">
          "The squares of the orbital periods are proportional to the cubes of the semi-major axes."
        </div>
      </div>
    </div>
  );
}