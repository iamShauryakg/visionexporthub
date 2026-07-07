import React from "react";
import { ArrowRight, Compass, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { HERO_SLIDES } from "../data";

const PREMIUM_IMAGES = HERO_SLIDES.map(slide => slide.image);

interface HeroSliderProps {
  currentHeroSlide: number;
  setCurrentHeroSlide: React.Dispatch<React.SetStateAction<number>>;
  companyName: string;
  whatsappNumber: string;
}

export default function HeroSlider({
  currentHeroSlide,
  setCurrentHeroSlide,
  companyName,
  whatsappNumber,
}: HeroSliderProps) {
  const currentSlideData = HERO_SLIDES[currentHeroSlide] || HERO_SLIDES[0];

  const [touchStart, setTouchStart] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    if (diff > swipeThreshold) {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (diff < -swipeThreshold) {
      setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
    setTouchStart(null);
  };

  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center py-10 overflow-hidden bg-surface-base" 
      id="specimen-config"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Full-Screen Sliding Background Pictures */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.48, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${PREMIUM_IMAGES[currentHeroSlide]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/75 to-[#050507] z-10"></div>
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] z-10"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.025] rounded-full blur-[140px] pointer-events-none z-10"></div>
      </div>
      
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.015] text-[18vw] font-serif font-black tracking-tighter whitespace-nowrap z-0">
        HAUTE COUTURE 3D
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Custom Welcome Chip */}
            <div className="inline-flex items-center space-x-2 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-none">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 font-bold uppercase">
                AUTHENTIC MANUFACTURE & EXPORT EXCELLENCE
              </span>
            </div>

            {/* Title / Description block */}
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-zinc-400 block tracking-[0.25em] uppercase font-bold">
                {currentSlideData.subtitle}
              </span>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentHeroSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] drop-shadow-2xl"
                >
                  {currentSlideData.title}
                </motion.h1>
              </AnimatePresence>
              
              <div className="w-20 h-1.5 bg-amber-500 mt-6"></div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentHeroSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-sm sm:text-base text-zinc-300 leading-relaxed font-medium pt-3"
                >
                  {currentSlideData.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* HIGHLY INTERACTIVE HORN & BONE SPECIMEN QUICK CHIPS */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase font-black block">
                SELECT PREMIUM SPECIMEN
              </span>
              <div className="grid grid-cols-3 gap-3 max-w-xl">
                {[
                  { name: "Buffalo Horn", category: "BUFFALO HORN", index: 0, icon: "🐃" },
                  { name: "Bovine Bone", category: "BOVINE BONE", index: 1, icon: "🦴" },
                  { name: "Cattle Horn", category: "CATTLE HORN", index: 2, icon: "🐂" }
                ].map((item) => {
                  const isActive = currentHeroSlide === item.index;
                  return (
                    <button
                      key={item.index}
                      onClick={() => setCurrentHeroSlide(item.index)}
                      className={`py-3.5 px-4 text-left transition-all duration-300 cursor-pointer rounded-2xl relative overflow-hidden group ${
                        isActive
                          ? "bg-amber-500/10 text-white shadow-[0_10px_30px_rgba(245,158,11,0.08)] border border-amber-500/40"
                          : "bg-zinc-950/30 border border-zinc-900/40 hover:border-zinc-800 hover:bg-zinc-900/30 text-zinc-400"
                      }`}
                    >
                      {/* Active glow dot */}
                      {isActive && (
                        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
                      )}

                      <div className="flex items-center space-x-2">
                        <span className="text-sm select-none filter drop-shadow">{item.icon}</span>
                        <div>
                          <p className={`text-[8.5px] font-mono tracking-widest font-black uppercase ${
                            isActive ? "text-amber-500" : "text-zinc-500"
                          }`}>
                            {item.category}
                          </p>
                          <p className={`text-[11px] font-bold font-sans mt-0.5 tracking-wide ${
                            isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
                          }`}>
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom welcome watermark based on company config */}
            <div className="p-4 bg-zinc-950/70 border border-zinc-900/50 max-w-lg rounded-2xl">
              <span className="text-[9px] font-mono font-bold text-zinc-500 block uppercase tracking-widest mb-1">
                B2B TRADE PREPARATION PORTAL FOR:
              </span>
              <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-wider block">
                {companyName || "GLOBAL LUXURY COUTURE BRANDS"}
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-xl">
              <a
                href="#products"
                className="flex-1 bg-white hover:bg-amber-500 text-black hover:text-black py-4 font-mono text-xs font-black uppercase tracking-widest text-center flex items-center justify-center space-x-2 transition-all duration-300 rounded-full cursor-pointer shadow-[0_10px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
              >
                <span>View Raw Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 font-mono text-xs font-black uppercase tracking-widest text-center flex items-center justify-center space-x-2 transition-all duration-300 rounded-full cursor-pointer shadow-[0_10px_30px_rgba(16,185,129,0.1)]"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>

            {/* Slide Navigation Markers with Ticking Progress Bars */}
            <div className="flex items-center space-x-3 pt-6">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className="relative h-1.5 bg-zinc-800 hover:bg-zinc-700 transition-all rounded-none cursor-pointer overflow-hidden w-12"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {currentHeroSlide === idx && (
                    <motion.div
                      initial={{ left: "-100%" }}
                      animate={{ left: "0%" }}
                      transition={{ duration: 8, ease: "linear" }}
                      className="absolute inset-0 bg-amber-500"
                    />
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Visual Stamp with sliding, fading, and zooming high-end visual cards */}
          <div className="lg:col-span-6 hidden lg:block self-center">
            <div className="relative w-full aspect-[3/4] bg-[#09090c] border border-zinc-900 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden group/heroimg">
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/60"></div>
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/60"></div>
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/60"></div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/60"></div>

              {/* Card Header */}
              <div className="flex justify-between items-center mb-4 text-[10px] font-mono text-zinc-400 tracking-widest">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold uppercase">Specimen Live View</span>
                </span>
                <span className="font-bold text-zinc-600">ID: VN-H{currentHeroSlide + 1}</span>
              </div>

              {/* Slider Image Container */}
              <div className="relative w-full h-[80%] overflow-hidden border border-zinc-950 bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroSlide}
                    src={PREMIUM_IMAGES[currentHeroSlide]}
                    alt="B2B Luxury Specimen"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                    className="w-full h-full object-cover grayscale-[10%] group-hover/heroimg:grayscale-0 group-hover/heroimg:scale-110 transition-all duration-1000 ease-out"
                  />
                </AnimatePresence>
                
                {/* Floating Category Label */}
                <div className="absolute bottom-4 left-4 bg-zinc-950/95 backdrop-blur-md px-4 py-2 text-[10px] font-mono font-bold tracking-[0.25em] text-amber-500 border border-zinc-800 uppercase">
                  {currentHeroSlide === 0 && "100% BLACK BUFFALO HORN"}
                  {currentHeroSlide === 1 && "CALIBRATED SARTORIAL BONE"}
                  {currentHeroSlide === 2 && "TIGER MARBLED HORN TIPS"}
                </div>
              </div>

              {/* Card Footer - Premium Specs */}
              <div className="mt-4 pt-4 border-t border-zinc-900/60 flex justify-between items-end font-sans">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">PROVENANCE ORIGIN</span>
                  <span className="text-xs text-white font-black block uppercase tracking-wide">SAMBHAL COMPLEX</span>
                  <span className="text-[8px] font-mono text-emerald-500 font-bold tracking-wider block uppercase">100% Biological Trace</span>
                </div>
                <div className="text-right space-y-1 font-mono">
                  <span className="text-[8px] text-zinc-600 block uppercase font-bold">COMMERCIAL MOQ</span>
                  <span className="text-[11px] text-amber-400 font-black block">5,000 PCS</span>
                  <span className="text-[8px] text-zinc-500 block">FOB TRADE DIRECT</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
