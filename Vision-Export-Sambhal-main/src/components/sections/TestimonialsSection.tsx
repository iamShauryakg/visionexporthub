import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CLIENT_TESTIMONIALS } from "../../data";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CLIENT_TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CLIENT_TESTIMONIALS.length) % CLIENT_TESTIMONIALS.length);
  };

  const currentTestimonial = CLIENT_TESTIMONIALS[currentIndex] || CLIENT_TESTIMONIALS[0];

  return (
    <section className="py-24 bg-white text-zinc-900 border-b border-zinc-100 relative overflow-hidden">
      {/* Pristine Solid White - Removed fading gradients */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center select-none">
        
        {/* Main interactive Card */}
        <motion.div
          onClick={() => setIsDarkMode(!isDarkMode)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`p-10 md:p-14 rounded-3xl border-2 transition-[background-color,border-color,box-shadow] duration-500 cursor-pointer ${
            isDarkMode
              ? "bg-zinc-950 text-white border-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
              : "bg-white text-zinc-950 border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-zinc-950"
          }`}
        >
          {/* Quote Emblem */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-8 border transition-all duration-300 ${
            isDarkMode
              ? "bg-zinc-800 border-zinc-700 text-white"
              : "bg-zinc-100 border-zinc-200 text-zinc-900"
          }`}>
            <Quote className="w-5 h-5 transform rotate-180" />
          </div>

          {/* Dynamic Testimonial Slide */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`font-serif text-lg sm:text-2xl italic leading-relaxed max-w-2xl mx-auto font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-100" : "text-zinc-900"
                }`}
              >
                "{currentTestimonial.quote}"
              </motion.p>
            </AnimatePresence>

            <div className="w-12 h-1 bg-zinc-950 mx-auto"></div>

            <div className="space-y-1 font-mono">
              <span className={`text-xs sm:text-sm font-black uppercase block tracking-wider transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-zinc-900"
              }`}>
                {currentTestimonial.author}
              </span>
              <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest block transition-colors duration-300 ${
                isDarkMode ? "text-zinc-500" : "text-zinc-400"
              }`}>
                {currentTestimonial.role} • {currentTestimonial.company}
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <span className={`text-[8.5px] font-mono uppercase tracking-[0.2em] font-black py-1.5 px-3.5 rounded-full border transition-all ${
              isDarkMode
                ? "bg-zinc-800 border-zinc-700 text-white animate-pulse"
                : "bg-white border-zinc-200 text-zinc-500"
            }`}>
              {isDarkMode ? "POLISHED BLACK • TAP TO RESTORE LIGHT" : "NATURAL LIGHT • TAP TO POLISH BLACK"}
            </span>
          </div>
        </motion.div>

        {/* Slide Controls */}
        <div className="flex items-center justify-center space-x-6 pt-10">
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="w-11 h-11 rounded-full bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all cursor-pointer shadow-sm"
            title="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex space-x-2">
            {CLIENT_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx ? "w-8 bg-zinc-950" : "w-2 bg-zinc-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="w-11 h-11 rounded-full bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all cursor-pointer shadow-sm"
            title="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
