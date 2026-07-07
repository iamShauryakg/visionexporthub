import React, { useState } from "react";
import { PartnerBrand } from "../types";
import { motion } from "motion/react";

interface BrandLogoProps {
  brand: PartnerBrand;
}

export default function BrandLogo({ brand }: BrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`flex items-center space-x-4 px-6 py-4 border transition-all duration-500 rounded-2xl select-none cursor-pointer ${
        isHovered
          ? "border-amber-500 bg-amber-50/50 text-zinc-950 shadow-sm"
          : "border-zinc-200 bg-white text-zinc-950 shadow-sm"
      }`}
    >
      {/* Dynamic Emblem with transition */}
      {brand.style === "serif-classic" && (
        <div className={`w-6 h-6 border flex items-center justify-center font-serif text-[10px] font-bold transition-colors duration-300 ${
          isHovered ? "border-zinc-700 text-zinc-300" : "border-zinc-300 text-zinc-600"
        }`}>
          S
        </div>
      )}
      {brand.style === "sans-minimal" && (
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className={`absolute inset-0 border rounded-full animate-[spin_12s_linear_infinite] ${
            isHovered ? "border-zinc-600" : "border-zinc-300"
          }`}></div>
          <div className={`w-2.5 h-2.5 rounded-full ${
            isHovered ? "bg-amber-400" : "bg-zinc-400"
          }`}></div>
        </div>
      )}
      {brand.style === "serif-italic" && (
        <div className={`w-5 h-5 flex items-center justify-center font-serif italic text-base font-semibold transition-colors duration-300 ${
          isHovered ? "text-amber-400" : "text-zinc-700"
        }`}>
          M
        </div>
      )}
      {brand.style === "serif-bold" && (
        <div className="flex space-x-0.5">
          <div className={`w-2.5 h-4 transition-colors duration-300 ${isHovered ? "bg-amber-500" : "bg-zinc-400"}`}></div>
          <div className={`w-2.5 h-4 transition-colors duration-300 ${isHovered ? "bg-zinc-700" : "bg-zinc-300"}`}></div>
        </div>
      )}
      {brand.style === "serif-crest" && (
        <div className={`w-6 h-6 border-2 border-dashed rounded-full flex items-center justify-center font-serif text-[8px] transition-colors duration-300 ${
          isHovered ? "border-zinc-700 text-zinc-300" : "border-zinc-300 text-zinc-600"
        }`}>
          N
        </div>
      )}
      {brand.style === "mono-clean" && (
        <div className={`w-5 h-5 flex items-center justify-center font-mono text-[9px] font-black transition-colors duration-300 ${
          isHovered ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-700"
        }`}>
          京
        </div>
      )}
      {brand.style === "serif-heavy" && (
        <div className={`w-6 h-6 border flex items-center justify-center font-serif text-xs font-black transition-colors duration-300 ${
          isHovered ? "border-zinc-600 text-amber-400" : "border-zinc-300 text-zinc-700"
        }`}>
          H
        </div>
      )}
      {brand.style === "sans-wide" && (
        <div className={`w-5 h-2.5 transition-colors duration-300 ${isHovered ? "bg-amber-500" : "bg-zinc-400"}`}></div>
      )}

      {/* Brand Text Details */}
      <div className="flex flex-col text-left">
        <span className={`text-xs uppercase tracking-[0.2em] font-black leading-none transition-colors duration-300 text-zinc-950 ${
          brand.style.startsWith("serif") ? "font-serif" : brand.style === "mono-clean" ? "font-mono" : "font-sans"
        }`}>
          {brand.name}
        </span>
        <span className="text-[8px] font-mono tracking-widest font-bold mt-1 uppercase text-zinc-500">
          {brand.location}
        </span>
      </div>
    </motion.div>
  );
}
