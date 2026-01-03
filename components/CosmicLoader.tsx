import { motion } from 'framer-motion';

export default function CosmicLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
      {/* Yıldız Kayması Efekti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', y: '20%', opacity: 0 }}
            animate={{ 
              x: '200%', 
              y: '80%', 
              opacity: [0, 1, 0] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
            className="absolute w-[150px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-[35deg]"
          />
        ))}
      </div>

      {/* Ana Yükleme Logosu */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <div className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
          ASTRO.MATHCS
        </div>
        <div className="mt-4 text-center text-xs tracking-[0.5em] text-cyan-500 uppercase">
          Syncing with ISS...
        </div>
      </motion.div>
    </div>
  );
}