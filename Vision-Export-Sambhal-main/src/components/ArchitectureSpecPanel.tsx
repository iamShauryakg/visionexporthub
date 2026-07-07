import React, { useState } from "react";
import { ArchitectureSpec } from "../types";

export interface ArchitectureSpecPanelProps {
  spec: ArchitectureSpec;
  onBack: () => void;
  whatsappNumber: string;
}

export default function ArchitectureSpecPanel({
  spec,
  onBack,
  whatsappNumber,
}: ArchitectureSpecPanelProps) {
  const [inquiryQty, setInquiryQty] = useState(5000);
  const [customSize, setCustomSize] = useState(spec.availableSizes.split(", ")[0] || "Standard");
  const [activeTab, setActiveTab] = useState<"spec" | "tech" | "rfq">("spec");

  const waText = `Hello Vision Import & Export, I am interested in custom B2B bulk orders of "${spec.name}" from your Product Architecture list.
- Category: ${spec.category}
- Required Qty: ${inquiryQty} Pcs
- Selected Size Spec: ${customSize}
Please share details, lead times, and quote.`;

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 technical-page technical-content-area">
      {/* Header back button */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs sm:text-sm font-mono uppercase font-black text-amber-600 hover:text-amber-800 hover:line-through transition-all cursor-pointer"
        >
          <span>← Back to Menu</span>
        </button>
        <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">{spec.industrialGrade}</span>
      </div>

      {/* Product Title and Category */}
      <div className="space-y-2">
        <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 font-mono font-bold uppercase tracking-widest">{spec.category}</span>
        <h4 className="font-serif text-2xl sm:text-3xl font-black text-zinc-950 uppercase leading-tight">{spec.name}</h4>
        <span className="text-xs font-mono text-zinc-500 italic block">Scientific Name: {spec.scientificName}</span>
      </div>

      {/* Tab Switcher */}
      <div className="grid grid-cols-3 gap-1 spec-tab-container rounded-none">
        {(["spec", "tech", "rfq"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold rounded-none cursor-pointer spec-tab-btn ${
              activeTab === tab
                ? "spec-tab-btn-active"
                : "spec-tab-btn-inactive"
            }`}
          >
            {tab === "spec" ? "Details" : tab === "tech" ? "Specs" : "Quote"}
          </button>
        ))}
      </div>

      {/* Render tabs */}
      {activeTab === "spec" && (
        <div className="space-y-4 animate-fade-in">
          <div className="relative bg-zinc-50 border-2 border-zinc-200 p-5 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_1px,transparent_1px)] [background-size:10px_10px] opacity-70"></div>
            <div className="relative z-10 w-full h-36 flex items-center justify-center text-amber-600/85">
              {spec.blueprintSvgType === "button" && (
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                  <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="2.5" fill="none" className="opacity-90" />
                  <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" fill="none" className="opacity-60" />
                  <circle cx="48" cy="48" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="72" cy="48" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="48" cy="72" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="72" cy="72" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="60" y1="5" x2="60" y2="115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-40" />
                  <line x1="5" y1="60" x2="115" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-40" />
                  <text x="60" y="114" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-70">Ø {customSize.includes("mm") ? customSize.split(" ")[0] : "14L-40L"}</text>
                </svg>
              )}
              {spec.blueprintSvgType === "plate" && (
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <rect x="25" y="30" width="70" height="55" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="25" y1="20" x2="95" y2="20" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="25" y1="16" x2="25" y2="24" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="95" y1="16" x2="95" y2="24" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="15" y1="30" x2="15" y2="85" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="11" y1="30" x2="19" y2="30" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="11" y1="85" x2="19" y2="85" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M30 40 L90 40 M30 50 L90 50 M30 60 L90 60 M30 70 L90 70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" fill="none" className="opacity-30" />
                  <text x="60" y="15" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-80">L = 120-220mm</text>
                  <text x="8" y="60" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 8 60)" className="opacity-80">W = 50-80mm</text>
                </svg>
              )}
              {spec.blueprintSvgType === "sheet" && (
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <rect x="20" y="35" width="80" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M25 35 Q60 55 95 35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" fill="none" className="opacity-40" />
                  <line x1="20" y1="82" x2="100" y2="82" stroke="currentColor" strokeWidth="0.75" fill="none" />
                  <polygon points="20,82 24,80 24,84" fill="currentColor" />
                  <polygon points="100,82 96,80 96,84" fill="currentColor" />
                  <path d="M25 45 C45 42, 75 48, 95 45" stroke="currentColor" strokeWidth="0.75" fill="none" className="opacity-40" />
                  <path d="M25 55 C45 52, 75 58, 95 55" stroke="currentColor" strokeWidth="0.5" fill="none" className="opacity-20" />
                  <text x="60" y="91" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-80">CALIBRATED SURFACE</text>
                  <text x="60" y="30" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-80">T = {spec.tolerances.split(", ")[0].replace("Thickness: ", "")}</text>
                </svg>
              )}
              {spec.blueprintSvgType === "tip" && (
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <path d="M25 80 C25 60, 50 25, 95 20 C85 45, 60 75, 45 85 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M45 55 C52 58, 58 52, 60 48" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <line x1="60" y1="48" x2="95" y2="20" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 1" fill="none" className="opacity-70" />
                  <text x="82" y="42" fill="currentColor" fontSize="5" fontFamily="monospace" transform="rotate(-38 82 42)" className="opacity-80">SOLID CORE</text>
                  <text x="35" y="93" fill="currentColor" fontSize="5.5" fontFamily="monospace" className="opacity-80">BASE Ø30-80mm</text>
                </svg>
              )}
              {spec.blueprintSvgType === "scale" && (
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <path d="M20 40 C20 35, 100 35, 100 40 L100 70 C100 75, 20 75, 20 70 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="20" y1="55" x2="100" y2="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" fill="none" className="opacity-40" />
                  <line x1="60" y1="25" x2="60" y2="85" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" fill="none" className="opacity-50" />
                  <path d="M50 48 L60 55 L70 48" stroke="currentColor" strokeWidth="0.75" fill="none" />
                  <text x="60" y="20" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-80">SYMMETRIC BOOKMATCH</text>
                  <text x="60" y="94" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-80">T = 6.0mm ±0.1mm</text>
                </svg>
              )}
              {spec.blueprintSvgType === "block" && (
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <path d="M60 25 L100 45 L100 85 L60 105 L20 85 L20 45 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M60 25 L60 105 M60 65 L100 45 M60 65 L20 45" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-80" />
                  <text x="35" y="40" fill="currentColor" fontSize="5" fontFamily="monospace" className="opacity-70">W = 50mm</text>
                  <text x="85" y="40" fill="currentColor" fontSize="5" fontFamily="monospace" className="opacity-70">L = 50mm</text>
                  <text x="64" y="85" fill="currentColor" fontSize="5" fontFamily="monospace" className="opacity-70">H = 50mm</text>
                </svg>
              )}
              {spec.blueprintSvgType === "toggle" && (
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <path d="M15 60 C15 45, 40 40, 60 40 C80 40, 105 45, 105 60 C105 75, 80 80, 60 80 C40 80, 15 75, 15 60 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="48" cy="60" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="72" cy="60" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="48" y1="60" x2="72" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" fill="none" className="opacity-40" />
                  <text x="60" y="32" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-80">CHAMFERED INNER RIMS</text>
                  <text x="60" y="93" fill="currentColor" fontSize="5.5" fontFamily="monospace" textAnchor="middle" className="opacity-80">L = 30-70mm</text>
                </svg>
              )}
            </div>
            <div className="absolute bottom-2.5 right-3.5 font-mono text-[9px] text-zinc-500 font-bold select-none uppercase tracking-widest leading-normal text-right">
              Vision Industrial Database<br />
              CAD STABILIZED SHEET • VER 4.02
            </div>
          </div>

          <div className="space-y-1 bg-zinc-50 p-4 border border-zinc-200">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Core Spec Description</span>
            <p className="text-xs sm:text-sm text-zinc-800 font-sans leading-relaxed font-medium">{spec.description}</p>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono font-black text-amber-600 block uppercase tracking-widest">Recommended B2B Applications</span>
            <div className="space-y-2 pl-1">
              {spec.primaryApplications.map((app, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-zinc-700 bg-zinc-50 border border-zinc-200 p-2.5">
                  <span className="text-amber-500 text-sm mt-px leading-none">▪</span>
                  <span className="font-sans leading-relaxed font-medium">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "tech" && (
        <div className="space-y-4 animate-fade-in">
          <div className="border border-zinc-200 bg-zinc-50 p-4 space-y-3.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500 uppercase font-bold">1. DENSITY</span>
              <span className="text-zinc-900 font-bold">{spec.density}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500 uppercase font-bold">2. HARDNESS</span>
              <span className="text-zinc-900 font-bold">{spec.hardness}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500 uppercase font-bold">3. MOISTURE RANGE</span>
              <span className="text-zinc-900 font-bold">{spec.moistureContent}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500 uppercase font-bold">4. TOLERANCES</span>
              <span className="text-zinc-900 font-bold text-right leading-relaxed max-w-[180px]">{spec.tolerances}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500 uppercase font-bold">5. STANDARD SIZE</span>
              <span className="text-zinc-900 font-bold text-right leading-relaxed max-w-[180px]">{spec.availableSizes}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 uppercase font-bold">6. TECHNIQUE</span>
              <span className="text-zinc-800 font-medium text-right leading-relaxed max-w-[180px]">{spec.artisanTechnique}</span>
            </div>
          </div>
          <div className="p-3.5 bg-amber-50 border border-amber-200 font-mono text-[11px] leading-relaxed text-zinc-700">
            ℹ️ <strong className="text-amber-700">Calibration Notice:</strong> Our Indian laboratories verify every shipment's calcium-density and moisture metrics before packaging to meet rigorous Oeko-Tex and chemical standards.
          </div>
        </div>
      )}

      {activeTab === "rfq" && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-5 bg-white border-2 border-zinc-200 p-5">
            <span className="text-xs sm:text-sm font-mono font-black text-amber-600 uppercase tracking-widest block border-b border-zinc-100 pb-2">⚡ PRE-CALCULATE RFQ SPECS</span>
            <div className="space-y-4 text-sm font-mono">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-600 font-bold">
                  <span>EST. B2B VOLUME</span>
                  <span className="text-amber-600 font-black">{inquiryQty.toLocaleString()} Pcs</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={inquiryQty}
                  onChange={(e) => setInquiryQty(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-zinc-200 rounded-none cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs text-zinc-600 block uppercase font-bold">CHOOSE SIZE CALIBER</span>
                <select
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  className="w-full bg-white border border-zinc-200 text-zinc-800 text-xs p-2.5 rounded-none outline-none focus:border-amber-500 font-mono font-bold"
                >
                  {spec.availableSizes.split(", ").map((size, idx) => {
                    const cleanSize = size.split(" (")[0] || size;
                    return (
                      <option key={idx} value={cleanSize}>
                        {cleanSize}
                      </option>
                    );
                  })}
                  <option value="Custom Bespoke Dimensions">Custom Dimensions (Send blueprint)</option>
                </select>
              </div>
            </div>
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-none space-y-1.5">
              <span className="text-[10px] font-mono font-black text-zinc-500 uppercase block tracking-wider">Live Quotation Preview</span>
              <p className="text-[11px] font-mono text-zinc-700 leading-relaxed break-words whitespace-pre-line">{waText}</p>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury-gold w-full py-3 rounded-none font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-center flex items-center justify-center space-x-2 cursor-pointer border border-transparent"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.025 14.072.996 11.86.996c-5.436 0-9.86 4.37-9.864 9.799-.001 1.77.487 3.5 1.414 4.116l-.262.955-.547 1.993 2.07-.542.886-.233z" />
              </svg>
              <span>SUBMIT SPECS RFQ</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
