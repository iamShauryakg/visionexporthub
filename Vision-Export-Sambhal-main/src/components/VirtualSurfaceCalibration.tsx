import React from "react";

interface VirtualSurfaceCalibrationProps {
  productId: number;
  productName: string;
  productFinish: "matte" | "high-polish" | "natural-grain";
  setProductFinish: (finish: "matte" | "high-polish" | "natural-grain") => void;
  showToast: (message: string) => void;
}

export default function VirtualSurfaceCalibration({
  productId,
  productName,
  productFinish,
  setProductFinish,
  showToast,
}: VirtualSurfaceCalibrationProps) {
  return (
    <div className="bg-white p-6 border-2 border-zinc-950 space-y-4 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]">
      <div className="flex items-center space-x-2">
        <span className="text-xs bg-zinc-100 text-zinc-800 border border-zinc-300 px-2 py-0.5 font-mono font-bold">LAB</span>
        <h4 className="text-xs sm:text-sm uppercase font-mono tracking-widest text-zinc-950 font-black">
          Virtual Surface Calibration
        </h4>
      </div>
      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
        Simulate alternative physical finishing types on this specimen. The dynamic finish affects the physical appearance and 3D specular light reflection.
      </p>

      <div className="space-y-2.5 pt-2">
        {/* Matte */}
        <button
          onClick={() => {
            setProductFinish("matte");
            showToast(`SUCCESS: Configured Matte finish for ${productName}!`);
          }}
          className={`w-full p-3.5 text-left border-2 transition-all rounded-none flex items-center justify-between cursor-pointer ${
            productFinish === "matte"
              ? "bg-zinc-950 text-white border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] font-black"
              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-950 hover:text-zinc-950"
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-mono font-bold block uppercase">🪨 MATTE FINISH</span>
            <span className="text-xs text-zinc-400 font-semibold block mt-0.5">Raw organic velvet texture</span>
          </div>
          {productFinish === "matte" && <span className="text-sm font-black">✓</span>}
        </button>

        {/* High Polish */}
        <button
          onClick={() => {
            setProductFinish("high-polish");
            showToast(`SUCCESS: Configured High-Polish finish for ${productName}!`);
          }}
          className={`w-full p-3.5 text-left border-2 transition-all rounded-none flex items-center justify-between cursor-pointer ${
            productFinish === "high-polish"
              ? "bg-amber-50 text-amber-800 border-amber-500 shadow-[3px_3px_0px_0px_rgba(245,158,11,0.15)] font-black"
              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-950 hover:text-zinc-950"
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-mono font-bold block uppercase">🌟 HIGH-POLISH</span>
            <span className="text-xs text-amber-600/80 font-semibold block mt-0.5">Glassy mirror specular sheen</span>
          </div>
          {productFinish === "high-polish" && <span className="text-sm font-black">🌟</span>}
        </button>

        {/* Natural Grain */}
        <button
          onClick={() => {
            setProductFinish("natural-grain");
            showToast(`SUCCESS: Configured Natural Grain finish for ${productName}!`);
          }}
          className={`w-full p-3.5 text-left border-2 transition-all rounded-none flex items-center justify-between cursor-pointer ${
            productFinish === "natural-grain"
              ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.15)] font-black"
              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-950 hover:text-zinc-950"
          }`}
        >
          <div>
            <span className="text-xs sm:text-sm font-mono font-bold block uppercase">🌾 NATURAL GRAIN</span>
            <span className="text-xs text-emerald-600/80 font-semibold block mt-0.5">Exposes fine fibrous structure</span>
          </div>
          {productFinish === "natural-grain" && <span className="text-sm font-black">✓</span>}
        </button>
      </div>
    </div>
  );
}
