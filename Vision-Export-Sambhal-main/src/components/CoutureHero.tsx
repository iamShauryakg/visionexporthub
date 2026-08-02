import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight, Shield } from "lucide-react";
import Heroimages1 from '../images/heroIMG/hero.png'
import Heroimages2 from '../images/heroIMG/hero2.png'

interface CoutureHeroProps {
  companyName: string;
  heroImages?: string[];
}

const DEFAULT_HERO_IMAGES = [
  Heroimages1,
  Heroimages2
];

export default function CoutureHero({ companyName, heroImages }: CoutureHeroProps) {
  const images = heroImages && heroImages.length > 0 ? heroImages : DEFAULT_HERO_IMAGES;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section 
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-surface-base"
      id="home"
    >
      {/* Cinematic Full-Screen Rotating Background Image */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('${images[currentImageIndex]}')` 
            }}
          />
        </AnimatePresence>
        
        {/* Luxury gradient overlays for deep contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#050507] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-transparent to-[#050507]/70 z-10" />
        
        {/* Subtle grid accent to maintain the technical material science vibe */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] z-10" />
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <div className="space-y-8 flex flex-col items-center">
          
          {/* Subtle Traceable Sourcing Chip */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 uppercase font-mono tracking-[0.3em] text-[10px] text-amber-500 font-extrabold"
          >
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>ESTABLISHED 1978 // SAMBHAL, INDIA</span>
          </motion.div>

          {/* Clean, Majestic Couture Display Heading */}
          <div className="space-y-4 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.95]"
            >
              VISION EXPORT
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-zinc-400 text-xs sm:text-sm uppercase tracking-[0.35em] font-extrabold mt-1"
            >
              PREMIUM BIOMATERIAL HOUSE
            </motion.p>
          </div>

          {/* Short, Concise, Punchy Value Statement - "itna bada na do" directly respected */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-medium tracking-wide"
          >
            Located in one of India's renowned centers for traditional horn craftsmanship, we combine skilled artisanal expertise with modern manufacturing techniques to produce high-quality Buffalo Horn Button Blanks, Cow Horn Button Blanks, Horn Toggles, Horn Tips, Horn Plates, and a wide range of Bone Products. Our products are valued for their natural beauty, durability, unique color variations, and eco-friendly appeal.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-medium tracking-wide"
          >
            With a strong commitment to quality, consistency, and customer satisfaction, we serve manufacturers, wholesalers, importers, and distributors worldwide, offering customized solutions and reliable export services. Our dedication to craftsmanship and sustainable sourcing ensures that every product reflects the authenticity and elegance of natural horn and bone materials.

          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center"
          >
            <a 
              href="#products"
              className="btn-luxury-gold px-8 py-4 font-mono text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer border border-transparent"
            >
              <span>Explore Raw Blanks</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="#specimen-configurator"
              className="btn-outline-luxury px-8 py-4 font-mono text-xs font-semibold uppercase tracking-widest flex items-center justify-center cursor-pointer"
            >
              <span>Specimen Analyzer</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-mono text-[20px] uppercase tracking-[0.4em] text-zinc-500">SCROLL DOWN</span>
          <ChevronDown className="w-4 h-4 text-amber-500" />
        </motion.div>
      </div>
    </section>
  );
}
