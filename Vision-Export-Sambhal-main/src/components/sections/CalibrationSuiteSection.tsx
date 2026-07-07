import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CalibrationSuiteSection() {
  const [humidity, setHumidity] = useState(45); // in %
  const [calibratedMoisture, setCalibratedMoisture] = useState(9.5); // %
  const [specimenWeight, setSpecimenWeight] = useState(250); // grams
  const [hasWarpWarning, setHasWarpWarning] = useState(false);
  const [isCarbonMode, setIsCarbonMode] = useState(false);

  // Dynamic formula simulation
  useEffect(() => {
    // Moisture dynamically shifts matching relative environmental humidity
    const moisture = parseFloat((5.5 + (humidity * 0.09)).toFixed(2));
    setCalibratedMoisture(moisture);

    // Dynamic weight expansion/shrinkage
    const weightShift = parseFloat((245 + (moisture * 0.52)).toFixed(1));
    setSpecimenWeight(weightShift);

    // Safe threshold warning
    if (moisture < 8.0 || moisture > 12.0) {
      setHasWarpWarning(true);
    } else {
      setHasWarpWarning(false);
    }
  }, [humidity]);

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
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block mb-3 font-black">
            08. DIGITAL PASSPORT & LAB CALIBRATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Moisture Calibration Suite.
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Simulate shipping container humidity ranges. Observe how relative ambient moisture alters organic bone/horn density weight and structural dimensions.
          </p>
        </motion.div>

        {/* Calibration Dashboard Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setIsCarbonMode(!isCarbonMode)}
          whileHover={{ y: -4 }}
          className={`max-w-3xl mx-auto border-2 p-6 sm:p-10 text-left space-y-8 transition-all duration-500 rounded-3xl cursor-pointer select-none ${
            isCarbonMode
              ? "bg-zinc-950 border-amber-500 text-white shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
              : "bg-white border-zinc-200/80 text-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:border-amber-500/40"
          }`}
        >
          
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-4 transition-colors duration-300 ${
            isCarbonMode ? "border-zinc-900" : "border-zinc-100"
          }`}>
            <div className="space-y-0.5">
              <span className={`text-[9px] font-mono border px-2 py-0.5 font-black uppercase tracking-wider rounded-md ${
                isCarbonMode
                  ? "bg-zinc-900 border-zinc-850 text-zinc-400"
                  : "bg-white border-zinc-200 text-zinc-500"
              }`}>
                SAMBHAL LABS VER 3.1
              </span>
              <h3 className={`font-serif text-lg font-black uppercase tracking-wide transition-colors duration-300 ${
                isCarbonMode ? "text-white" : "text-zinc-950"
              }`}>
                Environmental Stress Simulator
              </h3>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className={`font-black uppercase text-[10px] ${
                isCarbonMode ? "text-amber-400" : "text-amber-600"
              }`}>STATUS: DYNAMIC</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Control Sliders */}
            <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs font-bold uppercase transition-colors duration-300 text-zinc-500">
                  <span>Relative Shipping Humidity:</span>
                  <span className="text-amber-600 font-black">{humidity}% RH</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  value={humidity}
                  onChange={(e) => setHumidity(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-200 h-1 rounded-full outline-none cursor-pointer"
                />
                <span className="text-[10px] font-mono text-zinc-400 block leading-tight">
                  Drag to simulate arid hold storage (15%) or oceanic transport damp environments (90%).
                </span>
              </div>

              <div className={`p-4 border transition-colors duration-300 rounded-2xl ${
                isCarbonMode
                  ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                  : "bg-white border-zinc-200/60 text-zinc-600"
              }`}>
                <span className="text-[9px] font-mono font-black text-amber-600 uppercase tracking-widest block mb-1">
                  TECHNICAL EXPORT NOTE
                </span>
                <p className="text-[11px] leading-relaxed font-sans font-semibold">
                  We kiln-dehydrate and treat every horn batch to perfectly lock structural integrity between <strong className={isCarbonMode ? "text-zinc-200" : "text-zinc-900"}>8.0% and 12.0% moisture</strong>. Outside this limit, materials can warp.
                </p>
              </div>
            </div>

            {/* Readouts display */}
            <div className={`border-2 p-6 space-y-4 font-mono text-xs rounded-2xl transition-colors duration-300 ${
              isCarbonMode
                ? "border-zinc-900 bg-zinc-950 text-zinc-300"
                : "border-zinc-100 bg-white text-zinc-600"
            }`}>
              <div className={`flex justify-between py-1.5 border-b transition-colors duration-300 ${
                isCarbonMode ? "border-zinc-900" : "border-zinc-100"
              }`}>
                <span className="text-zinc-500 font-bold uppercase text-[10px]">1. CALIBRATED MOISTURE</span>
                <span className={`font-black ${hasWarpWarning ? "text-red-500" : "text-emerald-500 animate-pulse"}`}>
                  {calibratedMoisture}%
                </span>
              </div>
              <div className={`flex justify-between py-1.5 border-b transition-colors duration-300 ${
                isCarbonMode ? "border-zinc-900" : "border-zinc-100"
              }`}>
                <span className="text-zinc-500 font-bold uppercase text-[10px]">2. SHIFT SPECIMEN WEIGHT</span>
                <span className={`font-black ${isCarbonMode ? "text-white" : "text-zinc-900"}`}>{specimenWeight}g</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b transition-colors duration-300 ${
                isCarbonMode ? "border-zinc-900" : "border-zinc-100"
              }`}>
                <span className="text-zinc-500 font-bold uppercase text-[10px]">3. BULK VOL EXPANSION</span>
                <span className={`font-black ${isCarbonMode ? "text-white" : "text-zinc-900"}`}>{((calibratedMoisture - 8.5) * 0.08).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-zinc-500 font-bold uppercase text-[10px]">4. WARPINESS RISK</span>
                <span className={`font-black uppercase ${hasWarpWarning ? "text-red-500" : "text-emerald-500"}`}>
                  {hasWarpWarning ? "⚠️ CRITICAL DRIFT" : "✓ HIGH STABILITY"}
                </span>
              </div>

              {hasWarpWarning && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 font-mono text-[10px] text-red-400 leading-relaxed uppercase font-black animate-pulse rounded-xl">
                  ⚠️ WARNING: Moisture parameters are shifting out of stable tolerances! Please consult our engineering desk before shipping.
                </div>
              )}
            </div>

          </div>

          <div className="mt-4 flex justify-center pt-2">
            <span className={`text-[8.5px] font-mono uppercase tracking-[0.2em] font-black py-1.5 px-3.5 rounded-full border transition-all ${
              isCarbonMode
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                : "bg-white border-zinc-200 text-zinc-500"
            }`}>
              {isCarbonMode ? "CARBON DARK MODE • TAP THE OUTER AREA TO RESTORE IVORY" : "PURE IVORY MODE • TAP THE OUTER AREA TO POLISH BLACK"}
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
