// Components/ISSCard.tsx
// Modern tekniklerin ve araçların kullanımı (P04) 
export default function ISSCard({ data }) {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
      <h2 className="text-neon-blue font-bold text-xl">ISS Live Location</h2>
      <p className="text-gray-300">Latitude: {data.iss_position.latitude}</p>
      <p className="text-gray-300">Longitude: {data.iss_position.longitude}</p>
      <div className="mt-4 text-xs italic text-gray-500">
        Status: Tracking Active (19th Year Edition)
      </div>
    </div>
  );
}