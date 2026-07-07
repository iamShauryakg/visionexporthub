import React, { useState } from "react";
import { Compass, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import TiltContainer from "../TiltContainer";

export default function TechnicalSpecsSection() {
  const [clickedTolerances, setClickedTolerances] = useState(false);
  const [clickedChemical, setClickedChemical] = useState(false);

  return (
    <section className="py-24 bg-white text-zinc-950 border-b border-zinc-100 relative overflow-hidden">
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
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block mb-3 font-black">
            04. TECHNICAL STANDARDS & SPECIFICATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Certified Quality Parameters.
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Adhering to rigorous technical benchmarks demanded by luxury European fashion labels. Standardised laboratory tests verify every organic bone and horn shipment.
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 bg-white border border-zinc-200/80 px-4 py-1.5 rounded-full text-[9px] font-mono font-black uppercase text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Click cards to polish them black</span>
          </div>
        </motion.div>

        {/* Technical Grid lists with dual white-black toggle mechanism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Card 1: Material Calibration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setClickedTolerances(!clickedTolerances)}
          >
            <TiltContainer id="tech-card-tolerances">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-8 border-2 transition-[background-color,border-color,box-shadow] duration-500 cursor-pointer select-none rounded-3xl relative group ${
                  clickedTolerances
                    ? "bg-zinc-950 border-zinc-950 text-white shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                    : "bg-white border-zinc-200 text-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:border-zinc-950"
                }`}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
                    clickedTolerances ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {clickedTolerances ? "OBSIDIAN POLISHED" : "TAP TO POLISH"}
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b pb-4 transition-colors duration-300 border-zinc-200">
                    <span className="text-xl">📏</span>
                    <h3 className="font-mono text-xs font-black uppercase tracking-widest text-zinc-800">
                      MATERIAL CALIBRATION TOLERANCES
                    </h3>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">Button Blank Diameter:</span>
                      <span className={`font-black ${clickedTolerances ? "text-white" : "text-zinc-950"}`}>±0.2mm (Precise Lathe)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">Plate Thickness Range:</span>
                      <span className={`font-black ${clickedTolerances ? "text-white" : "text-zinc-950"}`}>2.5mm - 6.5mm (±0.15mm)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">Surface Flatness:</span>
                      <span className={`font-black ${clickedTolerances ? "text-white" : "text-zinc-950"}`}>99.2% Deflection Stability</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">Moisture Content range:</span>
                      <span className={`font-black ${clickedTolerances ? "text-white" : "text-zinc-950"}`}>8% - 11% (Dehydration Kiln)</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500 font-bold">Density Constant:</span>
                      <span className={`font-black ${clickedTolerances ? "text-white" : "text-zinc-950"}`}>1.45g/cm³ - 1.55g/cm³</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltContainer>
          </motion.div>

          {/* Card 2: Chemical & Eco Compliance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setClickedChemical(!clickedChemical)}
          >
            <TiltContainer id="tech-card-chemical">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-8 border-2 transition-[background-color,border-color,box-shadow] duration-500 cursor-pointer select-none rounded-3xl relative group ${
                  clickedChemical
                    ? "bg-zinc-950 border-zinc-950 text-white shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                    : "bg-white border-zinc-200 text-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:border-zinc-950"
                }`}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
                    clickedChemical ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {clickedChemical ? "OBSIDIAN POLISHED" : "TAP TO POLISH"}
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b pb-4 transition-colors duration-300 border-zinc-200">
                    <span className="text-xl">🧪</span>
                    <h3 className="font-mono text-xs font-black uppercase tracking-widest text-zinc-800">
                      CHEMICAL & ECO COMPLIANCE
                    </h3>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">Azo Dyes & Bleaches:</span>
                      <span className="text-emerald-500 font-black">0% (Completely Natural)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">REACH Annex XVII:</span>
                      <span className={`font-black ${clickedChemical ? "text-white" : "text-zinc-950"}`}>Fully Certified Compliant</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">Oeko-Tex Standard 100:</span>
                      <span className={`font-black ${clickedChemical ? "text-white" : "text-zinc-950"}`}>Approved Class I</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b transition-colors duration-300 border-zinc-100">
                      <span className="text-zinc-500 font-bold">CITES Status:</span>
                      <span className={`font-black ${clickedChemical ? "text-white" : "text-zinc-950"}`}>Exempted Biological By-Product</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500 font-bold">Formaldehyde Emission:</span>
                      <span className="text-emerald-500 font-black">None (Organic Preservation)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltContainer>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
