// components/AutoCarousel.js

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; 

const SLIDE_CONTENT = [
  {
    id: 1,
    title: "The Meeting Point of Science and Philosophy",
    subtitle: "MathCS.online is a learning platform that allows you to explore deep topics like Computer Science, Mathematics, Physics, and Philosophy from a fun, interactive, and modern perspective. Developed with great passion by archiristo.",
    link: "/contact/",
    styleType: "glass",
  },
  {
    id: 2,
    title: "NEW VIDEO IS HERE!",
    subtitle: "'Computer Vision Explained With Cats' is here, click here to watch!",
    link: "https://www.youtube.com/@archiristo",
    styleType: "glass",
  },
  {
    id: 3,
    title: "Digital Library by MathCS.online",
    subtitle: "Guides to mastering higher mathematics and deep computer science are here!",
    link: "https://archiristo.gumroad.com",
    styleType: "glass"
  },
];

// Kayan slayt bileşeni
export default function AutoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalTime = 6000; // 4 saniye sonra kaydır

    // Zamanlayıcıyı kuran ve temizleyen useEffect hook'u
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => 
                (prevIndex + 1) % SLIDE_CONTENT.length // Listenin sonuna gelince başa dön
            );
        }, intervalTime);

        // Component temizlendiğinde (sayfadan ayrılınca) zamanlayıcıyı durdur
        return () => clearInterval(timer);
    }, []); // Boş array, sadece bir kez çalıştır demek

    // Framer Motion geçiş ayarları
    const variants = {
        enter: { x: 500, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -500, opacity: 0 },
    };
  
    const currentSlide = SLIDE_CONTENT[currentIndex];

    const getContainerStyles = (styleType) => {
        if (styleType === 'glass') {
            // Cam efekti için saydam arka plan, bulanıklık ve çerçeve
            return "bg-gray-800/70 backdrop-blur-md border border-gray-700/50";
        }
        // Image slaytları için varsayılan, şeffaf arkaplan
        return "bg-transparent"; };

    return (
        <div className="w-full max-w-5xl h-48 sm:h-72 overflow-hidden relative rounded-xl shadow-2xl">
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentIndex} 
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                    
                    className={`absolute inset-0 flex items-center justify-start p-4 sm:p-8 text-white ${getContainerStyles(currentSlide.styleType)}`}
                >
                    
                    {/* KOŞULLU RENDER: Eğer styleType 'image' ise görseli göster */}
                    {currentSlide.styleType === 'image' && currentSlide.imageUrl && (
                        <>
                            {/* 1. Opak Olmayan Görsel */}
                            <Image
                                src={currentSlide.imageUrl}
                                alt={currentSlide.title}
                                layout="fill" 
                                objectFit="cover"
                                quality={90} // Tam opaklık istendiği için kaliteyi artırabiliriz
                                className="opacity-100" 
                            />
                            
                            {/* 2. Metin Okunurluğu İçin Hafif Koyu Katman (Overlay) */}
                            <div className="absolute inset-0 bg-black opacity-30"></div>
                        </>
                    )}

                    {/* 3. Metin İçeriği (Tüm Slaytlar için Ortak) */}
                    {/* Metin her zaman en üstte kalmalı */}
                    <Link href={currentSlide.link} target="_blank" rel="noopener noreferrer" className="relative z-10 max-w-3xl cursor-pointer p-2 sm:p-4 rounded-lg">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-1 sm:mb-2 hover:underline">
                            {currentSlide.title}
                        </h2>
                        <p className="text-base sm:text-xl text-white font-medium"> 
                            {currentSlide.subtitle}
                        </p>
                    </Link>

                </motion.div>
            </AnimatePresence>
            
            {/* Alt kısımdaki nokta indikatörleri */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {SLIDE_CONTENT.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-white scale-110' : 'bg-gray-400 opacity-50'
                        }`}
                        onClick={() => setCurrentIndex(index)} // Noktaya tıklayınca o slayta git
                    />
                ))}
            </div>
        </div>
    );
}