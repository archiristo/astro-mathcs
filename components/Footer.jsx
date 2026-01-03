// components/Footer.jsx
'use client';

import { Github, Youtube, Linkedin, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-8 text-slate-400 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* 1. KOLON: Marka ve Slogan */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 inline-block">
              MathCS<span className="text-purple-500">.online</span>
            </Link>
            <p className="max-w-sm mb-6 leading-relaxed">
              Meeting point of Mathematics and Computer Science.
            </p>
            <div className="flex gap-4">
              {/* Sosyal Medya İkonları */}
              <SocialLink href="https://github.com/archiristo" icon={<Github size={20} />} label="GitHub" />
              <SocialLink href="https://youtube.com/@archiristo" icon={<Youtube size={20} />} label="YouTube" />
              <SocialLink href="https://www.linkedin.com/in/iriskc" icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href="mailto:archiristo@proton.me" icon={<Mail size={20} />} label="Email" />
            </div>
          </div>

          {/* 2. KOLON: Hızlı Linkler */}
          <div>
            <h3 className="text-white font-bold mb-6">Discover</h3>
            <ul className="space-y-4">
              <FooterLink href="/projects">Projects (The Lab)</FooterLink>
              <FooterLink href="/about">About archiristo</FooterLink>
              <FooterLink href="/mathematics">Mathematics</FooterLink>
              <FooterLink href="/computer-science">Computer Science</FooterLink>
            </ul>
          </div>

          {/* 3. KOLON: Rastgele Bilgi / Quote */}
          <div>
            <h3 className="text-white font-bold mb-6">Quote</h3>
            <blockquote className="italic border-l-2 border-purple-500 pl-4 text-slate-500">
              "PER ASPERA AD ASTRA"
            </blockquote>
          </div>
        </div>

        {/* ALT ÇİZGİ: Copyright */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} archiristo. All rights reserved. (or maybe not, love open-source 🐧).</p>
          <p className="flex items-center gap-2">
            Designed with <Heart size={14} className="text-red-500 fill-current animate-pulse" /> using Next.js
          </p>
        </div>

      </div>
    </footer>
  );
}

// Küçük yardımcı bileşenler (Kod tekrarını önlemek için)
function SocialLink({ href, icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-2 bg-slate-900 rounded-lg hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="hover:text-purple-400 transition-colors flex items-center gap-2">
        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        {children}
      </Link>
    </li>
  );
}