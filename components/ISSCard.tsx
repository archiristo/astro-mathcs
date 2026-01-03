// components/ISSCard.tsx

// 1. Veri Yapısını Tanımlıyoruz (AIE201 Disiplini)
interface ISSData {
  iss_position: {
    latitude: string;
    longitude: string;
  };
  message: string;
  timestamp: number;
}

// 2. Props tipini belirtiyoruz
export default function ISSCard({ data }: { data: ISSData }) {
  return (
    <div className="backdrop-blur-xl bg-black/30 border border-white/10 p-8 rounded-3xl shadow-2xl transition-all hover:border-cyan-500/50">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        ISS Live Location
      </h2>
      <div className="space-y-4 text-gray-300">
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-xs uppercase tracking-widest text-gray-500">Latitude</span>
          <span className="font-mono text-cyan-400">{data.iss_position.latitude}</span>
        </div>
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-xs uppercase tracking-widest text-gray-500">Longitude</span>
          <span className="font-mono text-cyan-400">{data.iss_position.longitude}</span>
        </div>
        
        <div className="h-px bg-white/10 my-4" />
        
        <div className="flex items-center gap-2 text-[10px] text-gray-500 italic uppercase tracking-tighter">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Signal: Stable (ISS-Perception Active)
        </div>
      </div>
    </div>
  );
}
