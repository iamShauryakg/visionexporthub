import React, { useState } from "react";
import { ShieldCheck, Microscope, Flame, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TiltContainer from "../TiltContainer";

const QC_STEPS = [
  {
    id: 1,
    icon: Microscope,
    title: "1. Fiber Density Check",
    description: "Microscopic inspection verifies that natural biological structures are intact, with no micro-cracking or hidden bone marrow porous decay.",
    verdict: "VERDICT: 100% SOUND",
  },
  {
    id: 2,
    icon: Flame,
    title: "2. Heat Resistance",
    description: "Specimens undergo high-temp ironing and laundering test scenarios (up to 140°C) with zero risk of melting or organic structure warping.",
    verdict: "VERDICT: IRON SAFE",
  },
  {
    id: 3,
    icon: Droplets,
    title: "3. Moisture Stability",
    description: "Kiln-drying calibrations verify moisture parameters remain between 8% and 11%, preventing downstream splitting during laser-cutting.",
    verdict: "VERDICT: DRIFT-FREE",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "4. Color Uniformity",
    description: "Batches are sorted strictly by optical shade ranges. We guarantee absolute uniformity across both black obsidian and ivory bovine bone.",
    verdict: "VERDICT: HAND SORTED",
  },
];

export default function QualityControlSection() {
  const [clickedQC, setClickedQC] = useState<Record<number, boolean>>({});

  const toggleQC = (id: number) => {
    setClickedQC((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-24 bg-white text-zinc-900 border-b border-zinc-100 relative overflow-hidden">
      {/* Pristine Solid White - Removed fading gradients */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block with animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase block mb-3 font-black">
            05. THE QUALITY ASSURANCE MATRIX
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Microscopic Quality Control.
          </h2>
          <div className="w-16 h-1 bg-zinc-950 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Every batch undergoes four stages of rigorous technical inspection at our Sambhal facility. Zero-defect tolerance for luxury tailoring and accessory designers.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 bg-white py-2 px-4 rounded-full max-w-max mx-auto border border-zinc-200">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-950 animate-ping"></span>
            <span className="text-[9px] font-mono tracking-wider uppercase text-zinc-800 font-bold">
              Tip: Click any diagnostic card to scan and view in luxury dark mode
            </span>
          </div>
        </motion.div>

        {/* 4 Bento Block Inspection cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left select-none">
          {QC_STEPS.map((step, index) => {
            const isClicked = !!clickedQC[step.id];
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltContainer id={`qc-card-${step.id}`}>
                  <motion.div
                    onClick={() => toggleQC(step.id)}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`p-6 flex flex-col justify-between h-full space-y-6 relative border-2 transition-[background-color,border-color,box-shadow] duration-500 rounded-3xl cursor-pointer select-none ${
                      isClicked
                        ? "bg-zinc-950 border-zinc-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                        : "bg-white border-zinc-200 text-zinc-950 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:border-zinc-950"
                    }`}
                  >
                    <div className="space-y-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300 ${
                          isClicked
                            ? "bg-zinc-800 border border-zinc-700"
                            : "bg-zinc-100 border border-zinc-200"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isClicked ? "text-white" : "text-zinc-900"
                          }`}
                        />
                      </div>
                      <h4
                        className={`font-serif text-lg font-black uppercase leading-tight transition-colors duration-300 ${
                          isClicked ? "text-white" : "text-zinc-950"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`text-[11px] sm:text-xs font-sans leading-relaxed font-semibold transition-colors duration-300 ${
                          isClicked ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                    <div
                      className={`flex items-center justify-between pt-3 border-t transition-colors duration-300 ${
                        isClicked ? "border-zinc-900 text-amber-500" : "border-zinc-100 text-zinc-500"
                      }`}
                    >
                      <span className="text-[9px] font-mono font-black uppercase tracking-widest">
                        {step.verdict}
                      </span>
                      <span className={`text-[8px] font-mono uppercase tracking-widest font-black ${
                        isClicked ? "text-emerald-400" : "text-amber-600"
                      }`}>
                        {isClicked ? "PASSED" : "PENDING"}
                      </span>
                    </div>
                  </motion.div>
                </TiltContainer>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
