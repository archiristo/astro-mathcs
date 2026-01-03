// components/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2, Terminal, BookOpen, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'MathCS.online', href: 'https://mathcs.online' },
  ];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobil menü açık mı?
  const [scrolled, setScrolled] = useState(false); // Sayfa kaydırıldı mı?
  const pathname = usePathname(); // Şu an hangi sayfadayız?

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled || isOpen
            ? 'bg-slate-950/80 backdrop-blur-md border-slate-800 py-3 shadow-lg shadow-purple-900/10'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg group-hover:rotate-12 transition-transform">
              <Terminal size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              MathCS<span className="text-purple-400">.online</span>
            </span>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'
                  }`}
                >
                  {link.name}
                  {/* Aktif Linkin Altındaki Nokta */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-purple-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* SAĞ TARAF (Github veya İletişim Butonu) */}
          <div className="hidden md:flex items-center">
            <a
              href="https://github.com/archiristo"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-full transition-all border border-slate-700"
            >
              <Code2 size={16} />
              <span>GitHub</span>
            </a>
          </div>

          {/* MOBİL MENÜ BUTONU (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBİL MENÜ (Açılır Pencere) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Tıklayınca menüyü kapat
                  className="text-2xl font-bold text-slate-300 hover:text-purple-400 flex items-center gap-4"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-8 border-t border-slate-800 pt-8">
                 <p className="text-slate-500 text-sm mb-4">Contact</p>
                 <div className="flex gap-4">
                    {/* Sosyal ikonları buraya da ekleyebilirsin */}
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-purple-500">
                      <Coffee size={20} />
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}