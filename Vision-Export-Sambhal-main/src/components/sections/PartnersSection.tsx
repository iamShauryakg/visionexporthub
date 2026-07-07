import React from "react";
import { PARTNER_BRANDS } from "../../data";
import BrandLogo from "../BrandLogo";
import { motion } from "motion/react";

export default function PartnersSection() {
  const PARTNER_BRANDS_LIST = PARTNER_BRANDS.map((brand, idx) => ({
    ...brand,
    id: idx + 1,
  }));

  return (
    <section className="py-24 bg-white text-zinc-950 border-b border-zinc-100 overflow-hidden relative select-none">
      {/* Pristine Solid White - Removed fading gradients */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
        
        {/* Header Block with scroll animation */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block font-black">
            11. VERIFIED COUTURE & TAILORING PARTNERS
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
            Our Global Brand Network.
          </h3>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-3"></div>
        </motion.div>

        {/* Marquee or Grid block with entry animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {PARTNER_BRANDS_LIST.map((brand) => (
            <div key={brand.id}>
              <BrandLogo brand={brand} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
