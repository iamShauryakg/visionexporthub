import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MANUFACTURING_PROCESS } from "../../data";
import TiltContainer from "../TiltContainer";

export default function ProcessSection() {
  const [clickedSteps, setClickedSteps] = useState<Record<string | number, boolean>>({});

  const toggleStep = (stepNum: string | number) => {
    setClickedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  const PROCESS_STEPS = MANUFACTURING_PROCESS.map((step) => ({
    ...step,
    phase: `Phase 0${step.step}`,
  }));

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
            06. ETHICAL MANUFACTURING WORKFLOW
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            The Journey of Horn Carving.
          </h2>
          <div className="w-16 h-1 bg-zinc-950 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Discover how raw biological by-products are hand-crafted and technically calibrated at our Indian facility, complying with strict export quarantine standards.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 bg-white py-2 px-4 rounded-full max-w-max mx-auto border border-zinc-200/85">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-950 animate-ping"></span>
            <span className="text-[9px] font-mono tracking-wider uppercase text-zinc-850 font-bold">
              Tip: Click any workflow milestone card to toggle luxury carbon/black view
            </span>
          </div>
        </motion.div>

        {/* Process Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative select-none">
          {PROCESS_STEPS.map((step, index) => {
            const isClicked = !!clickedSteps[step.step];

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltContainer id={`process-step-${step.step}`}>
                  <motion.div
                    onClick={() => toggleStep(step.step)}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`p-6 h-full flex flex-col justify-between text-left space-y-6 relative border-2 transition-[background-color,border-color,box-shadow] duration-500 rounded-3xl cursor-pointer select-none ${
                      isClicked
                        ? "bg-zinc-950 border-zinc-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                        : "bg-white border-zinc-200 text-zinc-950 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:border-zinc-950"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Step indicator balloon */}
                      <div
                        className={`w-10 h-10 font-mono text-xs font-black flex items-center justify-center rounded-xl transition-colors duration-300 border ${
                          isClicked
                            ? "bg-zinc-800 border-zinc-700 text-white"
                            : "bg-zinc-100 border-zinc-200 text-zinc-900"
                        }`}
                      >
                        0{step.step}
                      </div>
                      
                      <div className="space-y-2">
                        <span className={`text-[9px] font-mono font-black uppercase tracking-widest block ${
                          isClicked ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          {step.phase}
                        </span>
                        <h4 className={`font-serif text-base font-black uppercase leading-tight transition-colors duration-300 ${
                          isClicked ? "text-white" : "text-zinc-950"
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-[11px] sm:text-xs leading-relaxed font-sans font-semibold transition-colors duration-300 ${
                          isClicked ? "text-zinc-400" : "text-zinc-600"
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className={`pt-3 border-t text-[8px] font-mono font-black uppercase tracking-widest flex justify-between items-center ${
                      isClicked ? "border-zinc-800 text-white" : "border-zinc-100 text-zinc-500"
                    }`}>
                      <span>CALIBRATED WORKFLOW</span>
                      <span className={isClicked ? "text-zinc-400" : "text-zinc-500"}>
                        {isClicked ? "[ OBSIDIAN ]" : "[ LIGHT ]"}
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
