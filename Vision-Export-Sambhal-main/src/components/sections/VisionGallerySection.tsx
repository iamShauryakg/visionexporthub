import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VISION_GALLERY_ITEMS } from "../../data";
import TiltContainer from "../TiltContainer";

export default function VisionGallerySection() {
  const [clickedCards, setClickedCards] = useState<Record<number, boolean>>({});

  const GALLERY_LIST = VISION_GALLERY_ITEMS.map((item, idx) => ({
    ...item,
    id: idx + 1,
    tag: item.step || "Specimen",
  }));

  const toggleCard = (id: number) => {
    setClickedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-24 bg-white text-zinc-950 border-b border-zinc-100 relative overflow-hidden">
      {/* Pristine Solid White - Removed fading gradients */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block mb-3 font-black">
            07. THE AMBIENT VISION GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Raw Biological Canvas.
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Observe our ethical raw materials and calibrated hand-lathe carvings. Sourced with full bio-integrity, compliant with international global customs parameters.
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 bg-white border border-zinc-200/80 px-4 py-1.5 rounded-full text-[9px] font-mono font-black uppercase text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Click frames to polish them black</span>
          </div>
        </motion.div>

        {/* Gallery Grid refactored to a 3-column masonry layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 [column-fill:_balance] w-full">
          {GALLERY_LIST.map((item, index) => {
            const isClicked = !!clickedCards[item.id];
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid inline-block w-full mb-8 h-auto"
              >
                <TiltContainer id={`gallery-card-${item.id}`}>
                  <motion.div 
                    onClick={() => toggleCard(item.id)}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`border-2 overflow-hidden flex flex-col justify-between h-full group transition-all duration-500 rounded-3xl cursor-pointer select-none ${
                      isClicked
                        ? "bg-zinc-950 border-amber-500 text-white shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                        : "bg-white border-zinc-200/80 text-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:border-amber-500/40"
                    }`}
                  >
                    
                    {/* Image Frame */}
                    <div className="relative h-[250px] bg-white overflow-hidden flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <span className="absolute bottom-3 left-3 bg-zinc-950/90 border border-zinc-850 text-[8px] font-mono text-zinc-300 px-2.5 py-1 uppercase tracking-widest font-black rounded-lg">
                        {item.tag}
                      </span>

                      {/* Accent hover tag */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className={`text-[7px] font-mono font-black uppercase px-2 py-0.5 rounded-md ${
                          isClicked ? "bg-amber-500 text-black" : "bg-zinc-950 text-white"
                        }`}>
                          {isClicked ? "OBSIDIAN" : "TAP TO POLISH"}
                        </span>
                      </div>
                    </div>

                    {/* Details Block */}
                    <div className={`p-6 text-left space-y-2 border-t transition-colors duration-300 ${
                      isClicked ? "border-zinc-900" : "border-zinc-100"
                    }`}>
                      <h3 className={`font-serif text-base font-black uppercase leading-tight transition-colors duration-300 ${
                        isClicked ? "text-white" : "text-zinc-950"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs font-sans leading-relaxed font-semibold transition-colors duration-300 ${
                        isClicked ? "text-zinc-400" : "text-zinc-600"
                      }`}>
                        {item.description}
                      </p>
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
