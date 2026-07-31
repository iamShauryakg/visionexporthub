import React, { useState } from "react";
import { Compass, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import TiltContainer from "../TiltContainer";

const STRENGTHS = [
  {
    id: 1,
    icon: Compass,
    title: "100% Ethical By-Products",
    description: "We use strictly organic horn and bone harvested as natural agricultural by-products. We enforce absolute compliance with global environmental mandates, CITES criteria, and Veterinary sterilisation regulations.",
    step: "01 // CERTIFIED ZERO-HARM"
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Savile Row Tailor Calibre",
    description: "From deep, uniform-black Obsidian buffalo horn to translucent amber veins, our horn specimens showcase unmatched natural biological marbling. Favored by the world's most prestigious tailor guilds.",
    step: "02 // PRESTIGE GRAIN RATIO"
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Industrial Scale Precision",
    description: "We couple old-world hand lathe carving with automated calibration technology, guaranteeing precision tolerances to ±0.1mm. High volume shipping capacity from our Uttar Pradesh facility.",
    step: "03 // AUTOMATED DRIFT RATIO"
  }
];

export default function AboutSection() {
  const [clickedCards, setClickedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    setClickedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-24 bg-white text-zinc-900 border-b border-zinc-100 relative overflow-hidden">
      {/* Pristine Solid White - Removed fading gradients */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title block with motion fade-up */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >          <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase block mb-3 font-black">
            THE HERITAGE & ETHOS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Our Century-Old Craft.
          </h2>
          <div className="w-16 h-1 bg-zinc-950 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Based in Sambhal UP, India, is a leading manufacturer and global exporter of premium-quality natural horn and bone products. With decades of expertise in traditional craftsmanship and modern manufacturing, we specialize in producing high-quality horn and bone materials for the fashion, garment accessories, button manufacturing, handicrafts, and luxury goods industries. Our commitment to superior quality, ethical sourcing, precision craftsmanship, and reliable worldwide supply has earned us the trust of customers across international markets.          </p>
          
          <div className="mt-6 inline-flex items-center space-x-2 bg-zinc-950/5 hover:bg-zinc-950/10 transition-colors py-2.5 px-5 rounded-full border border-zinc-200 cursor-help">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-950 animate-ping"></span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-800 font-extrabold flex items-center gap-1.5">
              Click cards to polish them black (toggle luxury finish) <ArrowRight className="w-3 h-3 text-zinc-900" />
            </span>
          </div>
        </motion.div>

        {/* Bento Cards of Core Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STRENGTHS.map((strength, index) => {
            const isClicked = !!clickedCards[strength.id];
            const IconComponent = strength.icon;

            return (
              <motion.div
                key={strength.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TiltContainer id={`strength-card-${strength.id}`}>
                  <motion.div
                    onClick={() => toggleCard(strength.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-8 h-full flex flex-col justify-between text-left space-y-6 relative transition-[background-color,border-color,box-shadow] duration-500 rounded-2xl cursor-pointer select-none border-2 group ${
                      isClicked
                        ? "bg-zinc-950 border-zinc-950 text-white shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
                        : "bg-white border-zinc-200 text-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:border-zinc-950 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    {/* Visual Pointer Indicator on Hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className={`text-[8px] font-mono font-black uppercase px-2.5 py-1 rounded-full ${
                        isClicked ? "bg-zinc-800 text-white border border-zinc-750" : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                      }`}>
                        {isClicked ? "OBSIDIAN" : "LIGHT"}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                          isClicked
                            ? "bg-zinc-800 border border-zinc-700"
                            : "bg-zinc-100 border border-zinc-200"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-12 ${
                            isClicked ? "text-white" : "text-zinc-900"
                          }`}
                        />
                      </div>
                      
                      <h3
                        className={`font-serif text-xl font-black uppercase tracking-tight transition-colors duration-300 ${
                          isClicked ? "text-white" : "text-zinc-950"
                        }`}
                      >
                        {strength.title}
                      </h3>
                      
                      <p
                        className={`text-xs sm:text-sm font-sans leading-relaxed font-semibold transition-colors duration-300 ${
                          isClicked ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {strength.description}
                      </p>
                    </div>

                    <div
                      className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${
                        isClicked ? "border-zinc-800 text-white" : "border-zinc-100 text-zinc-500"
                      }`}
                    >
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest">
                        {strength.step}
                      </span>
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-black ${
                        isClicked ? "text-zinc-400 animate-pulse" : "text-zinc-800"
                      }`}>
                        {isClicked ? "✓ POLISHED" : "✎ TAP TO POLISH"}
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
