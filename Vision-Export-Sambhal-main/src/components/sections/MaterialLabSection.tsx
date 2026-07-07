import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { ARCHITECTURE_SPECS } from "../../data";
import ArchitectureSpecPanel from "../ArchitectureSpecPanel";

const ARCHITECTURE_SPECS_LIST = Object.values(ARCHITECTURE_SPECS).map((spec, idx) => ({
  ...spec,
  id: idx + 1,
}));

const dustParticles = Array.from({ length: 32 }).map((_, i) => ({
  id: i,
  size: Math.random() * 3.5 + 1.2, // 1.2px to 4.7px
  x: Math.random() * 100, // percentage horizontal placement
  y: Math.random() * 100, // percentage vertical placement
  duration: Math.random() * 12 + 10, // 10s to 22s slow and gentle drift
  delay: Math.random() * -20, // offset so particles are already fully animated on load
  opacity: Math.random() * 0.22 + 0.08, // subtle tactile aesthetic
  color: Math.random() > 0.65 ? "#C5A059" : Math.random() > 0.3 ? "#EBE6D7" : "#D4D4D8", // Gold/amber, natural Ivory, or sleek Zinc silver
}));

export default function MaterialLabSection({ whatsappNumber }: { whatsappNumber: string }) {
  const [selectedSpecId, setSelectedSpecId] = useState<number>(1);

  const selectedSpec = ARCHITECTURE_SPECS_LIST.find((s) => s.id === selectedSpecId);

  return (
    <section className="py-24 bg-white text-zinc-900 border-b border-zinc-100 relative overflow-hidden">
      {/* Pristine Solid White - Removed fading gradients */}

      {/* Subtle floating dust/glitter particles to mimic bone & horn dust */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" id="dust-particles-container">
        {dustParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              backgroundColor: p.color,
              filter: "blur(0.3px)",
            }}
            animate={{
              y: [0, -220, 0],
              x: [0, Math.sin(p.id) * 35, 0],
              rotate: [0, 360],
              opacity: [p.opacity, p.opacity * 1.6, p.opacity * 0.3, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block mb-3 font-black">
            03. MATERIAL ARCHITECTURE SPECIFICATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Indian Biological Specs.
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Inspect structural blueprints, biological density metrics, and chemical calibration parameters of verified organic exports, compliant with luxury standards.
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 bg-white border border-zinc-200/80 px-4 py-1.5 rounded-full text-[9px] font-mono font-black uppercase text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Click cards to polish them black</span>
          </div>
        </motion.div>

        {/* Dynamic Interactive Split Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Specimen Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-mono font-black text-amber-600 uppercase tracking-widest block text-left">
              SELECT BIOLOGICAL SPECIMEN
            </span>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 pb-12">
              {ARCHITECTURE_SPECS_LIST.map((spec) => {
                const isSelected = selectedSpecId === spec.id;
                return (
                  <motion.button
                    key={spec.id}
                    onClick={() => setSelectedSpecId(spec.id)}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full p-5 border-2 transition-all duration-500 text-left flex flex-col justify-between items-start rounded-2xl cursor-pointer select-none specimen-lab-btn ${
                      isSelected ? "selected" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[9px] font-mono tracking-wider font-black lab-btn-subtitle">
                        {spec.industrialGrade}
                      </span>
                      <span className="text-[8px] font-mono font-bold uppercase text-zinc-400">
                        {spec.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-black uppercase mt-1 leading-snug transition-colors duration-300 lab-btn-title">
                      {spec.name}
                    </h3>
                    <div className="flex items-center justify-between w-full mt-2.5">
                      <span className="text-[10px] font-mono block italic font-medium truncate max-w-[80%] lab-btn-meta">
                        Scientific: {spec.scientificName}
                      </span>
                      <span className="text-[8.5px] font-mono font-black uppercase lab-btn-action">
                        {isSelected ? "OBSIDIAN" : "IVORY • VIEW"}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Specimen Deep Report Panel */}
          <div className="lg:col-span-7 bg-white border-2 border-zinc-200 p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[450px]">
            {selectedSpec ? (
              <ArchitectureSpecPanel
                spec={selectedSpec}
                whatsappNumber={whatsappNumber}
                onBack={() => {}}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-24 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-zinc-700 animate-pulse" />
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest font-black">
                  No Specimen Selected
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
