"use client";

const locations = [
  { name: "ADANA / TR", role: "Local Station", status: "CLEAR", eff: "94%", color: "text-green-400" },
  { name: "GARCHING / DE", role: "ESO HQ", status: "CLOUDY", eff: "62%", color: "text-amber-400" },
  { name: "PARANAL / CL", role: "VLT Observatory", status: "PERFECT", eff: "99%", color: "text-cyan-400" },
  { name: "HOUSTON / TX", role: "NASA Mission Control", status: "OPTIMAL", eff: "88%", color: "text-blue-400" },
];

export default function AtmosphericSync() {
  return (
    <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 p-6 rounded-3xl shadow-2xl space-y-6 transition-all hover:border-cyan-500/30">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global Sync Active</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {locations.map((loc, index) => (
          <div key={index} className="space-y-2 group">
            <p className="text-[8px] text-slate-500 uppercase tracking-[0.2em] font-bold">{loc.role}</p>
            <p className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">{loc.name}</p>
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-mono ${loc.color}`}>{loc.status}</span>
              <span className="text-[10px] font-mono text-slate-400">{loc.eff}</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-transparent to-current ${loc.color}`} 
                style={{ width: loc.eff }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}