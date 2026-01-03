import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astro MathCS Portal",
  description: "Dashboard for Astro MathCS Project",
};

// app/layout.tsx
import Navbar from '../components/AnimatedHeader';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-slate-200 antialiased selection:bg-purple-500/30">{/* 1. Parçacık Arka Planı (Evrenin Dokusu) */}
        <ParticlesBackground />

        {/* 2. Navigasyon (Kozmik Rehber) */}
        <Navbar />

        {/* 3. İçerik (Burası senin ISS ve Kepler kartlarının geleceği yer) */}
        <main className="relative pt-24 min-h-screen">
          {children}
        </main>

        {/* 4. Footer (Dijital İmza) */}
        <Footer />
      </body>
    </html>
  );
}
