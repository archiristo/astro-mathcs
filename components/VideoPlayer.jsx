// components/VideoPlayer.jsx
export default function VideoPlayer({ videoId }) {
  if (!videoId) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 shadow-2xl shadow-purple-900/20 bg-slate-900 my-8">
      {/* 16:9 Oranını Korumak için Tailwind'in aspect-video sınıfını kullanıyoruz */}
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
}