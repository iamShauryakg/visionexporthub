import React, { useState, useRef, useEffect } from "react";
import { RotateCw, ShieldCheck, Sliders, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HERO_3D_MATERIALS } from "../data";

const PREMIUM_3D_MATERIALS = HERO_3D_MATERIALS.map((mat, idx) => ({
  ...mat,
  id: idx === 0 ? "obsidian" : idx === 1 ? "ivory-bone" : "tiger-marbled"
}));

export default function ThreeDShowroom() {
  const [selectedMaterial, setSelectedMaterial] = useState(PREMIUM_3D_MATERIALS[0]);
  const [rotateX, setRotateX] = useState<number>(-12);
  const [rotateY, setRotateY] = useState<number>(35);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);
  const [specularLightX, setSpecularLightX] = useState<number>(50);
  const [specularLightY, setSpecularLightY] = useState<number>(30);
  const [thickness, setThickness] = useState<number>(4);
  const [carvingDepth, setCarvingDepth] = useState<number>(0);
  const [isPolished, setIsPolished] = useState<boolean>(false);

  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOrbiting) return;
    let frameId: number;
    const tick = () => {
      setRotateY((prev) => (prev + 0.3) % 360);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isOrbiting]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsOrbiting(false);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;
    
    setRotateY((prev) => prev + deltaX * 0.5);
    setRotateX((prev) => Math.max(-60, Math.min(60, prev - deltaY * 0.5)));
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;
      setSpecularLightX(pctX);
      setSpecularLightY(pctY);
    }
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <section className="py-24 bg-white text-zinc-950 border-b border-zinc-100 overflow-hidden relative" id="showroom-3d">
      <div className="absolute top-10 left-10 text-[9px] font-mono tracking-widest text-zinc-400 uppercase select-none pointer-events-none hidden lg:block font-bold">
        INTERACTIVE 3D ENGINE // COUTURE GRADE VENEERS
      </div>
      <div className="absolute top-10 right-10 text-[9px] font-mono tracking-widest text-zinc-400 uppercase select-none pointer-events-none hidden lg:block font-bold">
        SAMBHAL EXPORT FACILITY // LATHE CALIBRATION
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block with dynamic animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block mb-3 font-black">
            01. DIGITAL MATERIAL SPECIMEN
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Interactive 3D Material Lab.
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold">
            Drag to rotate and inspect organic grain quality, fiber densities, and light reflections under virtual spotlights. Fully calibrated before ocean freight shipping.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls Side Panel - Toggles from White to Black on click! */}
          <motion.div 
            onClick={() => setIsPolished(!isPolished)}
            className={`lg:col-span-4 p-6 sm:p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer select-none space-y-6 order-2 lg:order-1 ${
              isPolished
                ? "bg-zinc-950 border-amber-500 text-white shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                : "bg-white border-zinc-200 text-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:border-amber-500/40"
            }`}
          >
            <div className={`flex items-center space-x-2 pb-4 border-b transition-colors duration-300 ${
              isPolished ? "border-zinc-900" : "border-zinc-100"
            }`} onClick={(e) => e.stopPropagation()}>
              <Sliders className="w-4 h-4 text-amber-600" />
              <span className="text-[11px] font-mono font-black tracking-widest uppercase">
                MATERIAL SELECTOR
              </span>
            </div>

            {/* Material select buttons */}
            <div className="space-y-2.5" onClick={(e) => e.stopPropagation()}>
              {PREMIUM_3D_MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex flex-col cursor-pointer select-none mat-selector-btn ${
                    selectedMaterial.id === mat.id ? "selected" : ""
                  }`}
                >
                  <span className="text-[9px] font-mono tracking-wider text-amber-600 font-black">{mat.subtitle}</span>
                  <span className="font-serif text-sm font-black uppercase mt-0.5">{mat.name}</span>
                </button>
              ))}
            </div>

            {/* Material Info Block */}
            <div className={`space-y-4 pt-4 border-t text-[11px] font-mono transition-colors duration-300 ${
              isPolished ? "border-zinc-900" : "border-zinc-100"
            }`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-bold uppercase">GRAIN PATTERN:</span>
                <span className={`font-black text-right max-w-[180px] line-clamp-1 ${isPolished ? "text-white" : "text-zinc-950"}`}>{selectedMaterial.grain}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-bold uppercase">EXPORT FINISH:</span>
                <span className={`font-black ${isPolished ? "text-white" : "text-zinc-950"}`}>{selectedMaterial.finish}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-bold uppercase">MINIMUM ORDER:</span>
                <span className={`font-black ${isPolished ? "text-white" : "text-zinc-950"}`}>{selectedMaterial.b2bMoq}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-bold uppercase">TRACEABILITY:</span>
                <span className="text-zinc-500 font-black text-right max-w-[160px] line-clamp-1">{selectedMaterial.source}</span>
              </div>
            </div>

            {/* Thickness and engraving depth sliders */}
            <div className={`space-y-4 pt-6 border-t transition-colors duration-300 ${
              isPolished ? "border-zinc-900" : "border-zinc-100"
            }`} onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] font-mono font-black tracking-widest text-amber-600 block uppercase">
                LATHE & CARVING SIMULATION
              </span>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span className="font-bold uppercase">CALIBRATE THICKNESS:</span>
                  <span className={`font-black ${isPolished ? "text-white" : "text-zinc-950"}`}>{thickness} mm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.5"
                  value={thickness}
                  onChange={(e) => setThickness(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-200 h-1 rounded-full outline-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span className="font-bold uppercase">LASER ENGRAVE DEPTH:</span>
                  <span className={`font-black ${isPolished ? "text-white" : "text-zinc-950"}`}>{(carvingDepth / 10).toFixed(1)} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={carvingDepth}
                  onChange={(e) => setCarvingDepth(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-200 h-1 rounded-full outline-none cursor-pointer"
                />
              </div>
            </div>

            <div className={`flex items-center space-x-2 p-3.5 border text-[10px] font-mono rounded-2xl transition-all ${
              isPolished
                ? "bg-zinc-900 border-zinc-850 text-zinc-400"
                : "bg-zinc-50 border-zinc-200 text-zinc-500"
            }`} onClick={(e) => e.stopPropagation()}>
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="leading-snug">REACH & CITES compliant. Fully sterilised under biological quarantine specifications.</span>
            </div>

            <div className="pt-2 text-center">
              <span className={`text-[8px] font-mono uppercase tracking-[0.2em] font-black py-1 px-3.5 rounded-full border ${
                isPolished
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                  : "bg-zinc-50 border-zinc-200 text-zinc-500"
              }`}>
                {isPolished ? "POLISHED OBSIDIAN • TAP TO REVERT IVORY" : "PURE IVORY WHITE • TAP TO POLISH BLACK"}
              </span>
            </div>
          </motion.div>

          {/* Interactive 3D Canvas Space - Clean Ivory-White Ambient light */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center order-1 lg:order-2">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="relative w-full aspect-[4/3] bg-gradient-to-tr from-zinc-50 to-zinc-100/50 border-2 border-zinc-200/80 rounded-3xl cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden group select-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-amber-500/20 transition-all duration-300"
              style={{ perspective: 1200 }}
              title="Drag mouse to rotate materials"
            >
              <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

              {/* Dynamic spotlight reflection flare */}
              <div 
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-300 bg-radial from-amber-500/[0.08] via-transparent to-transparent mix-blend-multiply"
                style={{
                  left: `calc(${specularLightX}% - 250px)`,
                  top: `calc(${specularLightY}% - 250px)`
                }}
              ></div>

              <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2 bg-white/90 border border-zinc-200 text-zinc-600 px-3 py-2 rounded-xl text-[9px] font-mono uppercase tracking-widest font-black shadow-sm">
                <RotateCw className={`w-3.5 h-3.5 text-amber-600 ${isOrbiting ? "animate-spin" : ""}`} />
                <span>Drag Mouse to Rotate in 3D</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOrbiting(!isOrbiting);
                }}
                className={`absolute top-4 right-4 z-20 px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-widest font-black border rounded-full transition-all cursor-pointer shadow-sm ${
                  isOrbiting 
                    ? "bg-zinc-950 text-white border-zinc-950"
                    : "bg-white text-zinc-950 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {isOrbiting ? "⏸ Pause Orbit" : "▶ Resume Orbit"}
              </button>

              <div className="absolute top-4 left-4 z-20 hidden sm:block text-[9px] font-mono text-zinc-500 text-left">
                <span className="block text-zinc-900 font-black">ROTATION MATRIX</span>
                <span>X: {rotateX.toFixed(0)}° • Y: {rotateY.toFixed(0)}°</span>
              </div>

              <div 
                className="relative transition-transform duration-100"
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div 
                  className="relative transition-all duration-500"
                  style={{
                    width: 200,
                    height: 130,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* FRONT FACE */}
                  <div 
                    className="absolute inset-0 border border-white/40 overflow-hidden flex flex-col justify-between p-4 backface-hidden shadow-2xl rounded-lg"
                    style={{
                      background: selectedMaterial.colors.front,
                      transform: `translateZ(${thickness * 4}px)`,
                      width: 200,
                      height: 130
                    }}
                  >
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#fff_25%,transparent_25%),linear-gradient(-45deg,#fff_25%,transparent_25%)] bg-[size:8px_8px] mix-blend-overlay"></div>

                    {selectedMaterial.id === "ivory-bone" && (
                      <div className="absolute inset-0 opacity-[0.04] bg-repeat" style={{ backgroundImage: "radial-gradient(#000 10%, transparent 10%)", backgroundSize: "4px 4px" }}></div>
                    )}

                    {carvingDepth > 0 && (
                      <div 
                        className="absolute inset-4 border border-dashed border-zinc-400 flex flex-col items-center justify-center mix-blend-difference rounded"
                        style={{
                          transform: `translateZ(-${carvingDepth / 10}px)`,
                          backgroundColor: "rgba(0,0,0,0.55)",
                          color: "#ffffff"
                        }}
                      >
                        <span className="text-[11px] font-mono tracking-widest uppercase font-black text-center px-2">
                          B2B CUSTOM ENGRAVE
                        </span>
                        <span className="text-[8px] font-mono tracking-wider opacity-60">
                          DEPTH: {(carvingDepth/10).toFixed(1)}mm
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start z-10 text-white/50 font-mono text-[8px]">
                      <span>MAX SPEC</span>
                      <span>CALIB_OK</span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 font-serif text-3xl font-black italic tracking-widest text-zinc-300 pointer-events-none select-none">
                      VISION
                    </div>

                    <div className="flex justify-between items-end z-10 font-mono">
                      <div>
                        <span className="block text-[8px] text-zinc-300">GRAIN QUALITY</span>
                        <span className="text-[9px] font-black text-white">{selectedMaterial.id === "tiger-marbled" ? "Tiger Translucent" : "Premium Calibre"}</span>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-white/30 animate-pulse"></div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div 
                    className="absolute inset-0 border border-white/20 flex flex-col justify-between p-4 backface-hidden rounded-lg"
                    style={{
                      background: selectedMaterial.colors.back,
                      transform: `rotateY(180deg) translateZ(${thickness * 4}px)`,
                      width: 200,
                      height: 130
                    }}
                  >
                    <div className="absolute inset-0 opacity-10 bg-black/40"></div>
                    <div className="flex justify-between items-start text-white/30 font-mono text-[7px]">
                      <span>EXPORT_SIDE_B</span>
                      <span>REACH_CERT</span>
                    </div>
                    <div className="text-center font-mono text-[10px] text-zinc-500 font-bold uppercase">
                      100% Biodegradable
                    </div>
                    <div className="flex justify-between items-end font-mono text-[7px] text-white/30">
                      <span>SAMBHAL INDIA</span>
                      <span>LOT_2026_A</span>
                    </div>
                  </div>

                  {/* RIGHT SIDE FACE */}
                  <div 
                    className="absolute"
                    style={{
                      background: selectedMaterial.colors.side,
                      transform: `rotateY(90deg) translateZ(${200 - (thickness * 4)}px)`,
                      width: thickness * 8,
                      height: 130,
                      left: 200 - (thickness * 4)
                    }}
                  >
                    <div className="w-full h-full border border-white/20 bg-black/20"></div>
                  </div>

                  {/* LEFT SIDE FACE */}
                  <div 
                    className="absolute"
                    style={{
                      background: selectedMaterial.colors.side,
                      transform: `rotateY(-90deg) translateZ(${thickness * 4}px)`,
                      width: thickness * 8,
                      height: 130,
                      left: - (thickness * 4)
                    }}
                  >
                    <div className="w-full h-full border border-white/20 bg-black/20"></div>
                  </div>

                  {/* TOP FACE */}
                  <div 
                    className="absolute"
                    style={{
                      background: selectedMaterial.colors.side,
                      transform: `rotateX(90deg) translateZ(${thickness * 4}px)`,
                      width: 200,
                      height: thickness * 8,
                      top: - (thickness * 4)
                    }}
                  >
                    <div className="w-full h-full border border-white/20 bg-black/20"></div>
                  </div>

                  {/* BOTTOM FACE */}
                  <div 
                    className="absolute"
                    style={{
                      background: selectedMaterial.colors.side,
                      transform: `rotateX(-90deg) translateZ(${130 - (thickness * 4)}px)`,
                      width: 200,
                      height: thickness * 8,
                      top: 130 - (thickness * 4)
                    }}
                  >
                    <div className="w-full h-full border border-white/20 bg-black/20"></div>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-20 text-[9px] font-mono text-right text-zinc-500 hidden sm:block">
                <span className="block text-zinc-600">SPECULAR RATIO</span>
                <span className="font-bold text-amber-600">{(selectedMaterial.specularPower * 100).toFixed(0)}% HIGH REFLECT</span>
              </div>
            </div>

            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-zinc-200/80 p-6 rounded-2xl text-left">
              <div>
                <span className="text-[10px] font-mono text-amber-700 block font-black">CALIBRATED SIZE STABILITY</span>
                <p className="text-xs text-zinc-600 mt-1 font-semibold">Uniform raw sheets and blanks cut with absolute zero-drift tolerance, tested across precision sewing lasers.</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-700 block font-black">100% ECO-FRIENDLY HORN</span>
                <p className="text-xs text-zinc-600 mt-1 font-semibold">Naturally shed or organic agricultural materials processed with strict compliance with international green laws.</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-700 block font-black">DELIVERY PORTFOLIO</span>
                <p className="text-xs text-zinc-600 mt-1 font-semibold">Exported to Savile Row tailor guilds, Italian couture, Japanese craft networks, and high-end accessory houses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
