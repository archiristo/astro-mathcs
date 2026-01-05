"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function SpectrumAnalyzer() {
  const [redshift, setRedshift] = useState(0.05);
  const lightSpeed = 299792;
  const velocity = (redshift * lightSpeed).toFixed(2);

  // Dinamik Spektrum Verisi (H-Alpha ve OIII çizgileriyle)
  const generateSpectrum = (z: number) => {
    const points = [];
    const hAlphaBase = 656.3; // Hidrojen Alfa çizgisi (nm)
    const o3Base = 500.7;    // Oksijen III çizgisi (nm)
    
    const hAlphaObs = hAlphaBase * (1 + z);
    const o3Obs = o3Base * (1 + z);

    for (let w = 400; w <= 800; w += 2) {
      // Rastgele gürültü + Gaussian tepeleri (Emisyon çizgileri)
      let intensity = 10 + Math.random() * 2;
      intensity += 50 * Math.exp(-Math.pow(w - hAlphaObs, 2) / 10);
      intensity += 30 * Math.exp(-Math.pow(w - o3Obs, 2) / 8);
      points.push({ wavelength: w, intensity: parseFloat(intensity.toFixed(2)) });
    }
    return { points, hAlphaObs, o3Obs };
  };

  const { points, hAlphaObs, o3Obs } = generateSpectrum(redshift);

  return (
    <div className="backdrop-blur-xl bg-slate-900/40 border border-cyan-500/20 p-8 rounded-3xl shadow-2xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          IFS Spectrum Analyzer
        </h2>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Recessional Velocity</p>
          <p className="text-2xl font-black text-cyan-400 font-mono">{velocity} km/s</p>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <label className="text-sm text-slate-400 block font-mono">Adjust Redshift (z): {redshift.toFixed(3)}</label>
        <input 
          type="range" min="0" max="0.3" step="0.001" value={redshift} 
          onChange={(e) => setRedshift(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="wavelength" stroke="#94a3b8" label={{ value: 'Wavelength (nm)', position: 'insideBottom', offset: -5 }} />
            <YAxis hide domain={[0, 80]} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
            <ReferenceLine x={hAlphaObs} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'H-α', position: 'top', fill: '#ef4444' }} />
            <ReferenceLine x={o3Obs} stroke="#22c55e" strokeDasharray="3 3" label={{ value: '[OIII]', position: 'top', fill: '#22c55e' }} />
            <Line type="monotone" dataKey="intensity" stroke="#22d3ee" strokeWidth={1.5} dot={false} animationDuration={300} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}