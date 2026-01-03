// components/ParticlesBackground.jsx
'use client'; // Next.js App Router için bu satır şart (Tarayıcıda çalıştığını belirtir)

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // Motoru sadece bir kere, sayfa yüklendiğinde başlatıyoruz.
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Parçacıkların nasıl davranacağını belirleyen "beyin" burası.
  const options = {
    background: {
      color: {
        value: "#020617", // Tailwind'deki bg-slate-950 renginin HEX kodu
      },
    },
    fpsLimit: 120, // Akıcı olması için.
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Fare üzerlerine gelince yakalasın.
        },
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 1,
            color: "#a855f7", // Vurgu rengi: Elektrik Moru (Tailwind purple-500)
          },
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff", // Noktaların rengi (Beyaz)
      },
      links: {
        color: "#6366f1", // Bağlantı çizgilerinin rengi: İndigo mavisi
        distance: 150,
        enable: true,
        opacity: 0.3, // Çizgiler çok baskın olmasın, silik dursun.
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce", // Kenarlara çarpınca geri dönsünler.
        },
        random: false,
        speed: 1.5, // Çok hızlı olmasın, sakin bir tempo.
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // Ekrandaki nokta sayısı.
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle", // Şeklimiz daire.
      },
      size: {
        value: { min: 1, max: 3 }, // Noktaların boyutu rastgele değişsin.
      },
    },
    detectRetina: true,
  };

  if (!init) return null; // Yüklenene kadar boş göster.

  return (
    // z-0 ve absolute ile en arkaya atıyoruz.
    <Particles
      id="tsparticles"
      options={options}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ParticlesBackground;