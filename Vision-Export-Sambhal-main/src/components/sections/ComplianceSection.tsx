import React, { useState } from "react";
import { ShieldCheck, Eye, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import TiltContainer from "../TiltContainer";

export default function ComplianceSection() {
  const [clickedCards, setClickedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    setClickedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const COMPLIANCES = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Veterinary Sanitised",
      description: "Approved by the Indian Department of Animal Husbandry. Every bone/horn cargo is hot-air sterilised to kill biological pathogens and guarantee clean customs entries.",
      tag: "OFFICIALLY CERTIFIED"
    },
    {
      id: 2,
      icon: Eye,
      title: "CITES Exempt",
      description: "We use strictly domestic, sustainable buffalo and cow by-products. This means all exports are 100% exempted from CITES restrictions or endangered species regulations.",
      tag: "100% HAZARD-FREE"
    },
    {
      id: 3,
      icon: Sparkles,
      title: "Fumigation Clearance",
      description: "Every ocean container undergoes certified Methyl Bromide or thermal fumigation treatments. Full export-grade quarantine documents are issued on boarding.",
      tag: "BOARDING APPROVED"
    }
  ];

  return (
    <section className="py-24 bg-white text-zinc-950 border-b border-zinc-100 relative overflow-hidden">
      {/* Pristine Solid White - Removed fading gradients */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase block mb-3 font-black">
            10. ENVIRONMENTAL REGULATIONS & SANITARY PROTOCOLS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Quarantine & Sanitary Compliance.
          </h2>
          <div className="w-16 h-1 bg-zinc-950 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            We adhere to strict sanitary rules for global customs entry. Every container is fully sterilised, certified, and cleared under veterinary guidelines.
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 bg-white border border-zinc-200/80 px-4 py-1.5 rounded-full text-[9px] font-mono font-black uppercase text-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse"></span>
            <span>Click boxes to polish them black</span>
          </div>
        </motion.div>

        {/* Grid for compliance cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {COMPLIANCES.map((item, index) => {
            const isClicked = !!clickedCards[item.id];
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TiltContainer id={`compliance-card-${item.id}`}>
                  <motion.div
                    onClick={() => toggleCard(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-8 h-full flex flex-col justify-between space-y-6 border-2 transition-[background-color,border-color,box-shadow] duration-500 rounded-3xl cursor-pointer select-none group relative ${
                      isClicked
                        ? "bg-zinc-950 border-zinc-950 text-white shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                        : "bg-white border-zinc-200 text-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:border-zinc-950"
                    }`}
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-md ${
                        isClicked ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-500"
                      }`}>
                        {isClicked ? "OBSIDIAN" : "TAP TO POLISH"}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-colors duration-300 ${
                        isClicked ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"
                      }`}>
                        <IconComponent className={`w-5 h-5 ${isClicked ? "text-white" : "text-zinc-900"}`} />
                      </div>
                      <h4 className={`font-serif text-lg font-black uppercase transition-colors duration-300 ${isClicked ? "text-white" : "text-zinc-950"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs sm:text-sm font-sans leading-relaxed font-semibold transition-colors duration-300 ${isClicked ? "text-zinc-400" : "text-zinc-600"}`}>
                        {item.description}
                      </p>
                    </div>

                    <span className={`text-[10px] font-mono font-black uppercase tracking-widest block pt-3 border-t transition-colors duration-300 ${
                      isClicked ? "border-zinc-800 text-white" : "border-zinc-100 text-zinc-500"
                    }`}>
                      {item.tag}
                    </span>
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
