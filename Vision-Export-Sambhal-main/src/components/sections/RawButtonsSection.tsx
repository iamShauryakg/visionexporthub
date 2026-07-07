import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Cpu, Maximize2, ShieldCheck, Scale, Droplet, Layers, Search, Compass, FileSpreadsheet, ChevronRight, Sparkles, AlertCircle } from "lucide-react";

interface RawButtonSpecimen {
  id: number;
  name: string;
  stage: string;
  material: string;
  roughness: string;
  moisture: string;
  density: string;
  hardness: string;
  thermal: string;
  latheSpeed: string;
  region: string;
  compliance: string;
  applications: string[];
  description: string;
  image: string;
  category: "horn" | "bone";
}

const RAW_BUTTON_SPECIMENS: RawButtonSpecimen[] = [
  {
    id: 1,
    name: "Raw Calibrated Horn Disc",
    stage: "Stage 01: Lathe Slicing",
    material: "Water Buffalo Core Horn",
    roughness: "240 Grit Fine-Shaved",
    moisture: "8.5% (Atmosphere)",
    density: "1.38 g/cm³",
    hardness: "78 Shore D",
    thermal: "Up to 135°C (Steam Malleable)",
    latheSpeed: "2,800 RPM Limit",
    region: "Uttar Pradesh & Punjab, India",
    compliance: "CE, REACH, OEKO-TEX 100",
    applications: ["Double-Breasted Overcoat Buttons", "Artisanal Optical Frames", "Premium Knife Scales"],
    description: "Cut directly from the solid core tip of Water Buffalo horns. These raw discs display a rough fibrous perimeter with the authentic, gorgeous matte gray-black luster of natural biological horn tissue, calibrated for perfect structural weight.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
    category: "horn",
  },
  {
    id: 2,
    name: "Unpolished Marbled Blank",
    stage: "Stage 02: Thickness Leveling",
    material: "Marbled Indian Zebu Cattle Horn",
    roughness: "320 Grit Flat-Pressed",
    moisture: "9.0% (Cellular Conditioned)",
    density: "1.41 g/cm³",
    hardness: "82 Shore D",
    thermal: "Up to 120°C (Thermo-Formable)",
    latheSpeed: "2,400 RPM Limit",
    region: "Northern Plains, India",
    compliance: "CE, REACH, Animal Health Certified",
    applications: ["Bespoke Suit Buttons", "Fine Hair Accessories", "High-Contrast Inlay Veneers"],
    description: "A dual-tone raw blank carefully pressed using gentle natural heat to ensure absolute structural flatness. Displays swirling ivory and deep charcoal layers waiting for final multi-stage abrasive tumbling to reveal breathtaking luster.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    category: "horn",
  },
  {
    id: 3,
    name: "Natural Bovine Bone Blank",
    stage: "Stage 03: Precision Drilling",
    material: "Bovine Femur Core (Ethical)",
    roughness: "Raw Unbuffed Matte Ivory",
    moisture: "7.2% (De-greased)",
    density: "1.85 g/cm³",
    hardness: "94 Shore D (Ultra-Hard)",
    thermal: "Up to 240°C (High Heat Resistance)",
    latheSpeed: "3,500 RPM limit",
    region: "Certified Organic Farms, Western UP",
    compliance: "Veterinary Clearance, REACH Standards",
    applications: ["Luxury Ivory-White Buttons", "Instrument Nuts & Bridge Pins", "Artisanal Chess & Fine Carving"],
    description: "A thick, dense, solid white bovine bone blank after laser drilling but prior to chemical-free tumbling. Possesses an elegant ivory texture that radiates a rustic, modern-minimalist artisan vibe and supreme thread-stability.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    category: "bone",
  },
];

export default function RawButtonsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedSpecId, setSelectedSpecId] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<"all" | "horn" | "bone">("all");
  
  // Custom B2B order size calculator variables
  const [orderQuantity, setOrderQuantity] = useState<number>(10000);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  const selectedSpecimen = RAW_BUTTON_SPECIMENS.find(s => s.id === selectedSpecId) || RAW_BUTTON_SPECIMENS[0];

  const filteredSpecimens = RAW_BUTTON_SPECIMENS.filter(spec => {
    if (activeFilter === "all") return true;
    return spec.category === activeFilter;
  });

  // Calculate dynamic specs for B2B buyer
  const calcWeightKg = (orderQuantity * parseFloat(selectedSpecimen.density) * 0.0035).toFixed(1); // Rough calculation based on average blank volume
  const calcLeadTimeDays = orderQuantity <= 5000 ? 10 : orderQuantity <= 25000 ? 18 : 28;

  const handleCopySpecText = () => {
    const text = `
VISION IMPORT & EXPORT — RAW SPECIMEN SHEET
=============================================
SPECIMEN REF: VIS-RAW-0${selectedSpecimen.id}
PRODUCT: ${selectedSpecimen.name}
STAGE: ${selectedSpecimen.stage}
MATERIAL CLASS: ${selectedSpecimen.material}
---------------------------------------------
TECHNICAL DATA:
- Surface Roughness: ${selectedSpecimen.roughness}
- Internal Moisture: ${selectedSpecimen.moisture}
- Volumetric Density: ${selectedSpecimen.density}
- Shore D Hardness: ${selectedSpecimen.hardness}
- Thermal Tolerance: ${selectedSpecimen.thermal}
- Recommended Lathe: ${selectedSpecimen.latheSpeed}
- Origin Sourcing: ${selectedSpecimen.region}
- Regulatory Compliance: ${selectedSpecimen.compliance}
- Best Applications: ${selectedSpecimen.applications.join(", ")}
---------------------------------------------
Generated dynamically via Vision Material Desk (Sambhal, India)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const getWhatsAppLink = () => {
    const text = `Hello Vision Export, I am interested in procuring a batch of raw material specimen: "${selectedSpecimen.name}" (SPEC-0${selectedSpecimen.id}). Can you please share pricing and minimum order terms for a volume of approx ${orderQuantity.toLocaleString()} pieces? Thanks.`;
    return `https://wa.me/918218151208?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-24 bg-surface-base text-text-primary border-b border-zinc-900 relative overflow-hidden">
      
      {/* Absolute Background Ambient Details */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-700/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between pb-10 mb-14 border-b border-zinc-900 text-left gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-4"
          >
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500 uppercase block font-black">
                08 / RAW SPECIMEN HUB
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
              Raw Materials & Blanks
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
              Examine biological button blanks and structural disks in their unpolished, pristine state. 
              Harvested as traceable organic by-products, each raw blank is calibrated for moisture limits 
              and tensile density—providing the foundational premium medium for global haute couture.
            </p>
          </motion.div>

          {/* Luxury Filtering and Quick Badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex bg-[#0E0E12] border border-zinc-800 p-1.5 rounded-none font-mono text-[9px] uppercase tracking-wider font-bold">
              <button 
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 transition-all cursor-pointer ${activeFilter === "all" ? "bg-amber-500 text-zinc-950 font-black" : "text-zinc-400 hover:text-white"}`}
              >
                All Specimens
              </button>
              <button 
                onClick={() => setActiveFilter("horn")}
                className={`px-4 py-2 transition-all cursor-pointer ${activeFilter === "horn" ? "bg-amber-500 text-zinc-950 font-black" : "text-zinc-400 hover:text-white"}`}
              >
                Horn
              </button>
              <button 
                onClick={() => setActiveFilter("bone")}
                className={`px-4 py-2 transition-all cursor-pointer ${activeFilter === "bone" ? "bg-amber-500 text-zinc-950 font-black" : "text-zinc-400 hover:text-white"}`}
              >
                Bone
              </button>
            </div>

            <div className="inline-flex items-center space-x-2 bg-[#0E0E12] border border-zinc-800 px-4 py-2.5 text-[9px] font-mono font-black uppercase text-amber-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping"></span>
              <span>100% Traceable Origin</span>
            </div>
          </div>
        </div>

        {/* 3-Column Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredSpecimens.map((spec) => {
              const isSelected = selectedSpecId === spec.id;
              return (
                <motion.div
                  layout
                  key={spec.id}
                  onMouseEnter={() => setHoveredId(spec.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedSpecId(spec.id)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative flex flex-col h-full bg-[#0E0E12] border rounded-none overflow-hidden transition-all duration-500 text-left cursor-pointer ${
                    isSelected 
                      ? "border-amber-500 shadow-[0_0_30px_rgba(223,154,40,0.12)]" 
                      : "border-zinc-800/80 hover:border-zinc-700 hover:bg-[#13131A] hover:shadow-xl"
                  }`}
                >
                  {/* Image Container with Calibration Blueprint styling */}
                  <div className="relative aspect-square w-full overflow-hidden bg-surface-base flex items-center justify-center p-8 border-b border-zinc-900">
                    
                    {/* Blueprint grid background */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: "linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                      }}
                    />

                    {/* CAD Crosshair Markers */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-zinc-800 pointer-events-none group-hover:border-amber-500/40 transition-colors" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-zinc-800 pointer-events-none group-hover:border-amber-500/40 transition-colors" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-zinc-800 pointer-events-none group-hover:border-amber-500/40 transition-colors" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-zinc-800 pointer-events-none group-hover:border-amber-500/40 transition-colors" />

                    {/* Laser scanning beam line on hover / selection */}
                    {(hoveredId === spec.id || isSelected) && (
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent z-10 pointer-events-none shadow-[0_0_8px_#C5A059]"
                        initial={{ top: "10%" }}
                        animate={{ top: ["10%", "90%", "10%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}

                    <img
                      src={spec.image}
                      alt={spec.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-4/5 h-4/5 object-cover rounded-none filter transition-all duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100 contrast-105 border border-zinc-800/50"
                    />

                    {/* Technical scanning coordinate indicators */}
                    <div className="absolute bottom-3 left-4 font-mono text-[7px] text-zinc-600 group-hover:text-amber-500/70 transition-colors">
                      CALIB_SYS_ON // SEC: {spec.id}09
                    </div>

                    {/* Active Analysis Overlay Badge */}
                    <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                      <div className="bg-[#0E0E12] border border-amber-500/80 px-4 py-2 text-[8px] font-mono font-black uppercase tracking-widest text-amber-500 flex items-center space-x-2 shadow-2xl">
                        <Maximize2 className="w-3 h-3 text-amber-500 animate-pulse" />
                        <span>Inspect Material Profile</span>
                      </div>
                    </div>

                    {/* Stage Technical Badge */}
                    <span className="absolute top-4 left-4 bg-zinc-950/95 border border-zinc-800 text-[7px] font-mono text-zinc-400 px-2.5 py-1 uppercase tracking-widest font-black rounded-none">
                      {spec.stage}
                    </span>

                    {/* Index Reference Number */}
                    <span className="absolute top-4 right-4 bg-amber-500 text-[8px] font-mono text-zinc-950 px-2 py-0.5 rounded-none font-black uppercase tracking-wider">
                      SPEC 0{spec.id}
                    </span>
                  </div>

                  {/* Card content with perfect contrast styling */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-widest block">
                          {spec.material}
                        </span>
                        {isSelected && (
                          <span className="text-[7px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 uppercase tracking-wider">
                            Active Specimen
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-serif text-xl font-black uppercase tracking-tight text-white group-hover:text-amber-500 transition-colors">
                        {spec.name}
                      </h3>
                      
                      <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                        {spec.description}
                      </p>
                    </div>

                    {/* Spec Sheet Mini Grid with beautiful tech-lab containers */}
                    <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 gap-3 text-[9px] font-mono">
                      <div className="bg-surface-base border border-zinc-900/80 p-2.5 rounded-none">
                        <span className="text-zinc-500 block uppercase font-bold text-[7px] tracking-wider">Surface Roughness</span>
                        <span className="text-zinc-200 font-black block mt-0.5 tracking-wide">{spec.roughness}</span>
                      </div>
                      <div className="bg-surface-base border border-zinc-900/80 p-2.5 rounded-none">
                        <span className="text-zinc-500 block uppercase font-bold text-[7px] tracking-wider">Internal Moisture</span>
                        <span className="text-zinc-200 font-black block mt-0.5 tracking-wide">{spec.moisture}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dynamic Specimen Analyzer / Material Science Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-zinc-800 bg-[#0E0E12] rounded-none p-6 md:p-10 text-left relative overflow-hidden"
        >
          {/* Subtle design matrix accents */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-zinc-800 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-zinc-800 pointer-events-none" />
          <div className="absolute top-3 right-4 font-mono text-[7px] text-zinc-600 select-none">
            VISION_SYS_LAB_MODULE_V4.92
          </div>

          <div className="flex items-center space-x-3 mb-8 pb-5 border-b border-zinc-800">
            <Cpu className="w-5 h-5 text-amber-500 animate-spin-slow" />
            <h3 className="font-mono text-xs font-black uppercase tracking-[0.3em] text-amber-500">
              Microscope Material Analyzer — Specimen 0{selectedSpecimen.id} Profile
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Column 1: Performance Matrix Ratios (Radar style bar indicators) */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                [01] Structural Performance Coefficients
              </span>
              
              <div className="space-y-4">
                {/* Metric 1 */}
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-zinc-400 uppercase tracking-wider">Density Ratio (Purity)</span>
                    <span className="text-amber-500">{selectedSpecimen.density}</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-none overflow-hidden relative border border-zinc-800/40">
                    <motion.div 
                      key={`density-${selectedSpecimen.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(selectedSpecimen.density) / 2.0) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute top-0 bottom-0 left-0 bg-amber-500" 
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-zinc-400 uppercase tracking-wider">Hardness Rating (Shore D)</span>
                    <span className="text-amber-500">{selectedSpecimen.hardness}</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-none overflow-hidden relative border border-zinc-800/40">
                    <motion.div 
                      key={`hardness-${selectedSpecimen.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseInt(selectedSpecimen.hardness) / 100) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      className="absolute top-0 bottom-0 left-0 bg-amber-500" 
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-zinc-400 uppercase tracking-wider">Machining & Drilling Elasticity</span>
                    <span className="text-amber-500">
                      {selectedSpecimen.category === "bone" ? "Excellent (Stable Threading)" : "High Elasticity (Steam mold)"}
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-none overflow-hidden relative border border-zinc-800/40">
                    <motion.div 
                      key={`elasticity-${selectedSpecimen.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: selectedSpecimen.category === "bone" ? "95%" : "80%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      className="absolute top-0 bottom-0 left-0 bg-amber-500" 
                    />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-zinc-400 uppercase tracking-wider">Moisture Content Index</span>
                    <span className="text-amber-500">{selectedSpecimen.moisture}</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-none overflow-hidden relative border border-zinc-800/40">
                    <motion.div 
                      key={`moisture-${selectedSpecimen.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(selectedSpecimen.moisture) / 15) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      className="absolute top-0 bottom-0 left-0 bg-sky-500" 
                    />
                  </div>
                </div>
              </div>

              {/* Technical Schematics Notes */}
              <div className="bg-surface-base border border-zinc-900 p-4 font-mono text-[9px] text-zinc-500 leading-relaxed space-y-2">
                <div className="flex items-center space-x-2 text-zinc-400 font-bold">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="uppercase tracking-wider">Calibration Mandate</span>
                </div>
                <p>
                  Annealed to exactly 12% moisture thresholds in-house at Sambhal. Maximum thermal distortion limit is {selectedSpecimen.thermal}. Under-thickness variance conforms to rigid ±0.1mm margins, fully tested for automatic luxury apparel lathe machines.
                </p>
              </div>
            </div>

            {/* Column 2: Material Science details, sourcing, compliance certificates */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                [02] Biological Origin & Traceability
              </span>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase block">Biological Class</span>
                  <p className="text-sm font-bold text-white uppercase tracking-wide">{selectedSpecimen.material}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase block">Uttar Pradesh Sourcing Region</span>
                  <p className="text-sm font-semibold text-zinc-200">{selectedSpecimen.region}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase block">Global Sourcing Compliance</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedSpecimen.compliance.split(", ").map((c, i) => (
                      <span key={i} className="text-[8px] font-mono text-emerald-500 bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 font-bold uppercase">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase block">Recommended Apparel Applications</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {selectedSpecimen.applications.map((app, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-zinc-300 font-semibold font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Interactive B2B Batch Calculator & Procurement Actions */}
            <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-zinc-800 lg:pl-10">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                [03] B2B Procurement Desk
              </span>

              {/* Dynamic quantity slider and calculations */}
              <div className="space-y-4 bg-surface-base border border-zinc-900 p-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[9px] font-bold">
                    <span className="text-zinc-400 uppercase">Target Batch Volume</span>
                    <span className="text-white bg-zinc-800 px-2 py-0.5">{orderQuantity.toLocaleString()} Pcs</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="100000" 
                    step="1000" 
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                    className="w-full accent-amber-500 bg-zinc-800 h-1 rounded-none outline-none appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[7px] text-zinc-600">
                    <span>1K MOQ</span>
                    <span>100K MAX BATCH</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-900 space-y-2 font-mono text-[9px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Est. Consignment Weight:</span>
                    <span className="text-zinc-200 font-bold">{calcWeightKg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Standard Calibration Cycle:</span>
                    <span className="text-zinc-200 font-bold">{calcLeadTimeDays} Working Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Packaging Type:</span>
                    <span className="text-zinc-200 font-bold">Anti-Moisture Vacuum Cartons</span>
                  </div>
                </div>
              </div>

              {/* Primary call to actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#C5A059] hover:bg-amber-600 text-zinc-950 py-3.5 text-center block text-xs uppercase tracking-widest font-black rounded-none shadow-xl transition-all hover:scale-[1.01] hover:shadow-amber-500/5"
                >
                  Procure Specimen Samples
                </a>

                <button
                  onClick={handleCopySpecText}
                  className="w-full bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 py-3 rounded-none text-[10px] uppercase tracking-widest font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-500" />
                  <span>{copyStatus ? "Copied Technical Log!" : "Copy Spec Blueprint"}</span>
                </button>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
