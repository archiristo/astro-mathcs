"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { r: 0, v_expected: 0, v_observed: 0 },
  { r: 5, v_expected: 150, v_observed: 160 },
  { r: 10, v_expected: 130, v_observed: 210 },
  { r: 20, v_expected: 100, v_observed: 225 },
  { r: 40, v_expected: 75, v_observed: 230 },
  { r: 60, v_expected: 60, v_observed: 235 },
];

export default function GalaxyKinematics() {
  return (
    <div className="backdrop-blur-xl bg-slate-900/40 border border-purple-500/20 p-8 rounded-3xl shadow-2xl mt-8">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-3 h-3 bg-purple-500 rounded-full animate-ping" />
        Galaxy Rotation Curve: Dark Matter Analysis
      </h2>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="r" label={{ value: 'Radius (kpc)', position: 'insideBottom', offset: -5 }} stroke="#94a3b8" />
            <YAxis label={{ value: 'Velocity (km/s)', angle: -90, position: 'insideLeft' }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
            <Legend />
            <Line type="monotone" dataKey="v_expected" stroke="#6366f1" name="Newtonian (Expected)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="v_observed" stroke="#a855f7" name="Observed" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <p className="mt-6 text-sm text-slate-400 italic">
        * The gap between Observed and Expected curves represents the influence of Dark Matter halo.
      </p>
    </div>
  );
}