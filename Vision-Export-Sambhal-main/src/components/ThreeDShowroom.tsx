import React, { useState, useRef, useEffect } from "react";
import { 
  RotateCw, 
  ShieldCheck, 
  Sliders, 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Eye, 
  Move3d,
  Layers,
  Sun,
  ZoomIn,
  MessageSquare,
  ArrowUpRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HERO_3D_MATERIALS } from "../data";
import { Hero3DMaterial } from "../types";


export default function ThreeDShowroom() {
  const [materialsList, setMaterialsList] = useState<Hero3DMaterial[]>(HERO_3D_MATERIALS);
  const [selectedMaterial, setSelectedMaterial] = useState<Hero3DMaterial>(HERO_3D_MATERIALS[0]);
  
  const [rotateX, setRotateX] = useState<number>(-12);
  const [rotateY, setRotateY] = useState<number>(28);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);
  const [specularLightX, setSpecularLightX] = useState<number>(50);
  const [specularLightY, setSpecularLightY] = useState<number>(30);
  const [thickness, setThickness] = useState<number>(4.5); // mm
  const [zoomScale, setZoomScale] = useState<number>(1.0); // 0.8 to 1.4
  const [glossLevel, setGlossLevel] = useState<number>(85); // %

  // Custom Image Upload modal / form state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newPlateName, setNewPlateName] = useState<string>("");
  const [newPlateImageUrl, setNewPlateImageUrl] = useState<string>("");
  const [newPlateSource, setNewPlateSource] = useState<string>("Custom Imported Specimen");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Orbit animation loop
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
    setRotateX((prev) => Math.max(-75, Math.min(75, prev - deltaY * 0.5)));
    
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

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPlateImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new image as 3D plate
  const handleAddCustomPlate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlateImageUrl) return;

    const name = newPlateName.trim() || `Custom Plate Specimen #${materialsList.length + 1}`;
    const newMat: Hero3DMaterial = {
      id: `custom-plate-${Date.now()}`,
      name: name,
      subtitle: "CUSTOM UPLOAD • 3D CONVERTED PLATE",
      grain: "Organic Custom Surface Striae",
      finish: "Hand-Polished Flat Slab",
      b2bMoq: "100 KG",
      source: newPlateSource || "Client Custom Specimen",
      image: newPlateImageUrl,
      colors: {
        front: "linear-gradient(180deg, #d97706 0%, #78350f 100%)",
        back: "linear-gradient(180deg, #78350f 0%, #451a03 100%)",
        side: "#451a03",
        accent: "#fef3c7"
      },
      shadingClass: "from-amber-600 to-amber-950",
      specularPower: 0.9,
      description: "User uploaded custom plate specimen rendered into an interactive 3D thin plate slab with real-time thickness and lighting control."
    };

    setMaterialsList((prev) => [...prev, newMat]);
    setSelectedMaterial(newMat);
    setIsAddModalOpen(false);
    setNewPlateName("");
    setNewPlateImageUrl("");
  };

  // Preset view angles
  const setPresetAngle = (view: "3d" | "front" | "side" | "back" | "top") => {
    setIsOrbiting(false);
    switch (view) {
      case "3d":
        setRotateX(-12);
        setRotateY(28);
        break;
      case "front":
        setRotateX(0);
        setRotateY(0);
        break;
      case "side":
        setRotateX(0);
        setRotateY(90);
        break;
      case "back":
        setRotateX(0);
        setRotateY(180);
        break;
      case "top":
        setRotateX(-85);
        setRotateY(0);
        break;
    }
  };

  // WhatsApp Inquiry Link
  const getWhatsAppInquiry = () => {
    const text = `Hello Vision Export team, I am reviewing your Interactive 3D Material Lab specimen:
- Specimen Name: "${selectedMaterial.name}"
- Grain Pattern: ${selectedMaterial.grain}
- Calibrated Thickness: ${thickness} mm
- Minimum Order (MOQ): ${selectedMaterial.b2bMoq}
- Origin: ${selectedMaterial.source}
Please send detailed FOB pricing, bulk availability, and physical sample terms.`;
    return `https://wa.me/918218151208?text=${encodeURIComponent(text)}`;
  };

  // Calculated 3D slab dimensions
  const baseWidth = 160; // px
  const baseHeight = 310; // px
  const plateDepth = Math.max(3, thickness * 2.2); // px depth

  return (
    <section className="py-20 bg-zinc-950 text-white relative overflow-hidden border-b border-zinc-800/80" id="showroom-3d">
      {/* Background ambient light glowing orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

  {/* Title & Subtitle Header */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center max-w-3xl mx-auto mb-14"
  >
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-4">
      <Move3d className="w-4 h-4 text-amber-500" />
      <span>Sambhal B2B Material Lab • 3D Specimen Inspector</span>
    </div>

    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 uppercase leading-tight font-serif">
      Interactive 3D Material Lab
    </h2>

    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 mb-5 rounded-full"></div>

    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
      Inspect authentic flat horn plates in real-time 3D space. Manipulate view
      angles, calibrate slab thickness, test surface specular sheen, or upload
      your custom image to render in 3D.
    </p>
  </motion.div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

    {/* LEFT SIDE PANEL */}
    <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-2xl p-6 space-y-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div className="flex items-center space-x-2 text-amber-600">
          <Sliders className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Select Plate Specimen
          </span>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Image to 3D</span>
        </button>
      </div>

      {/* Specimen List */}
      <div className="space-y-2.5 max-h-[270px] overflow-y-auto pr-1 custom-scrollbar">

        {materialsList.map((mat, idx) => {

          const isSelected = selectedMaterial.name === mat.name;

          return (
            <button
              key={mat.id || idx}
              onClick={() => setSelectedMaterial(mat)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                isSelected
                  ? "bg-amber-50 border-amber-500 shadow-md"
                  : "bg-white border-zinc-200 hover:border-amber-400 hover:bg-amber-50"
              }`}
            >

              {/* Thumbnail */}
                <div className="w-10 h-14 rounded-md overflow-hidden bg-zinc-100 border border-zinc-300 flex-shrink-0 relative">
                  {mat.image ? (
                    <img
                      src={mat.image}
                      alt={mat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: mat.colors.front }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  <span className="block text-[10px] uppercase font-semibold text-amber-600 tracking-wider line-clamp-1">
                    {mat.subtitle}
                  </span>

                  <span className="block text-xs font-bold text-zinc-900 tracking-tight truncate mt-0.5">
                    {mat.name}
                  </span>

                  <span className="block text-[11px] text-zinc-600 truncate mt-0.5">
                    MOQ:
                    <span className="text-zinc-900 font-semibold">
                      {" "}
                      {mat.b2bMoq}
                    </span>
                  </span>

                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                )}

              </button>
            );

          })}

        </div>

           {/* Technical Specs Box */}
        <div className="bg-stone-50 rounded-xl p-4 border border-zinc-200 space-y-2.5 text-xs shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 font-medium">Grain Structure:</span>
            <span className="font-semibold text-zinc-900 text-right truncate max-w-[170px]">
              {selectedMaterial.grain}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-zinc-500 font-medium">Export Finish:</span>
            <span className="font-semibold text-zinc-900">
              {selectedMaterial.finish}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-zinc-500 font-medium">Wholesale MOQ:</span>
            <span className="font-semibold text-amber-600">
              {selectedMaterial.b2bMoq}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-zinc-500 font-medium">Herds Origin:</span>
            <span className="font-semibold text-zinc-900 text-right truncate max-w-[170px]">
              {selectedMaterial.source}
            </span>
          </div>
          </div>

          {/* Calibration Sliders */}
          <div className="space-y-4 pt-2 border-t border-zinc-200">

            {/* Thickness Calibration */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Plate Thickness</span>
                </span>

                <span className="text-amber-600 font-bold">
                  {thickness} mm
                </span>
              </div>

              <input
                type="range"
                min="2"
                max="10"
                step="0.5"
                value={thickness}
                onChange={(e) => setThickness(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1.5 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>2mm (Thin)</span>
                <span>5mm (Std Plate)</span>
                <span>10mm (Heavy Slab)</span>
              </div>
            </div>

            {/* Surface Gloss Calibration */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-700 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Specular Sheen</span>
                </span>

                <span className="text-amber-600 font-bold">
                  {glossLevel}%
                </span>
              </div>

              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={glossLevel}
                onChange={(e) => setGlossLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

            {/* Quarantine & Quality Tag */}
           <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs shadow-sm">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>
              REACH &amp; CITES compliant. Certified ethically sourced natural horn plates.
            </span>
          </div>

          </div>

          {/* RIGHT SIDE PANEL: 3D Viewport Container */}
          <div className="lg:col-span-8 flex flex-col space-y-5">
            
           <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border border-zinc-300 rounded-2xl cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden shadow-xl select-none group"
            style={{ perspective: 1200 }}
            title="Drag mouse or touch to rotate 3D plate"
          >
            {/* Floor grid pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>

            {/* Dynamic spotlight sheen */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-300 bg-radial from-amber-500/15 via-transparent to-transparent mix-blend-screen"
              style={{
                left: `calc(${specularLightX}% - 250px)`,
                top: `calc(${specularLightY}% - 250px)`,
                opacity: glossLevel / 100
              }}
            ></div>

            {/* View Angle Preset Selector Bar */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1 bg-white/95 p-1.5 rounded-xl border border-zinc-300 backdrop-blur-md shadow-lg">
              <span className="text-[11px] text-zinc-600 font-semibold px-2 self-center hidden sm:inline">
                Camera:
              </span>

              <button
                onClick={() => setPresetAngle("3d")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-zinc-300 hover:bg-amber-50 hover:border-amber-500 text-zinc-800 transition-colors cursor-pointer"
              >
                Isometric 3D
              </button>

              <button
                onClick={() => setPresetAngle("front")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-zinc-300 hover:bg-amber-50 hover:border-amber-500 text-zinc-800 transition-colors cursor-pointer"
              >
                Front
              </button>

              <button
                onClick={() => setPresetAngle("side")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-zinc-300 hover:bg-amber-50 hover:border-amber-500 text-zinc-800 transition-colors cursor-pointer"
              >
                Side Edge
              </button>

              <button
                onClick={() => setPresetAngle("back")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-zinc-300 hover:bg-amber-50 hover:border-amber-500 text-zinc-800 transition-colors cursor-pointer"
              >
                Back
              </button>

              <button
                onClick={() => setPresetAngle("top")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-zinc-300 hover:bg-amber-50 hover:border-amber-500 text-zinc-800 transition-colors cursor-pointer"
              >
                Top
              </button>
            </div>

            {/* Orbit Toggle Button */}
            <button
              onClick={() => setIsOrbiting(!isOrbiting)}
              className={`absolute top-4 right-4 z-20 px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
                isOrbiting
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-100"
              }`}
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${isOrbiting ? "animate-spin" : ""}`}
              />
              <span>{isOrbiting ? "Pause Orbit" : "Auto Orbit"}</span>
            </button>

            {/* Live Rotation Coordinates */}
              <div className="absolute bottom-4 left-4 z-20 text-xs font-medium text-zinc-700 bg-white/95 px-3 py-1.5 rounded-xl border border-zinc-300 backdrop-blur-md shadow-md">
                Angle:
                <span className="text-amber-600 font-bold">
                  {" "}X: {rotateX.toFixed(0)}°
                </span>
                {" | "}
                <span className="text-amber-600 font-bold">
                  Y: {rotateY.toFixed(0)}°
                </span>
              </div>

              {/* Drag Instruction Badge */}
              <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-1.5 text-xs text-zinc-700 bg-white/95 px-3 py-1.5 rounded-xl border border-zinc-300 backdrop-blur-md shadow-md">
                <Eye className="w-3.5 h-3.5 text-amber-500" />
                <span>Click &amp; drag to rotate 3D plate</span>
              </div>
              {/* 3D PLATE MESH OBJECT */}
              <div
                className="relative transition-transform duration-75 ease-out"
                style={{
                  transform: `scale(${zoomScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                  willChange: "transform"
                }}
              >
                <div
                  className="relative transition-all duration-300"
                  style={{
                    width: baseWidth,
                    height: baseHeight,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 rounded-md border border-white/30 shadow-2xl overflow-hidden flex flex-col justify-between p-3.5 select-none"
                    style={{
                      transform: `translateZ(${plateDepth / 2}px)`,
                      width: baseWidth,
                      height: baseHeight,
                      backgroundImage: selectedMaterial.image
                        ? `url(${selectedMaterial.image})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: selectedMaterial.colors.side,
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {/* Gloss Highlight */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)",
                        opacity: glossLevel / 100
                      }}
                    />

                    {/* Branding */}
                    <div className="relative z-10 flex justify-between items-start text-[10px] font-extrabold text-white bg-black/50 px-2.5 py-1 rounded backdrop-blur-md border border-white/20">
                      <span>VISION HORN</span>
                      <span>{thickness}mm PLATE</span>
                    </div>

                    {/* Material Name */}
                    <div className="relative z-10 bg-black/60 p-2.5 rounded-lg backdrop-blur-md text-left border border-white/20">
                      <span className="block text-[10px] font-bold text-amber-300 uppercase tracking-wider line-clamp-1">
                        {selectedMaterial.name}
                      </span>
                      <span className="block text-[9px] text-zinc-300 mt-0.5 line-clamp-1">
                        {selectedMaterial.grain}
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 rounded-md border border-white/30 shadow-2xl overflow-hidden flex flex-col justify-between p-3.5 select-none"
                    style={{
                      transform: `rotateY(180deg) translateZ(${plateDepth / 2}px)`,
                      width: baseWidth,
                      height: baseHeight,
                      backgroundImage: selectedMaterial.image
                        ? `url(${selectedMaterial.image})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: selectedMaterial.colors.side,
                      backfaceVisibility: "hidden"
                    }}
                  >
                    <div className="absolute inset-0 bg-black/35 pointer-events-none" />

                    <div className="relative z-10 flex justify-between items-start text-[9px] font-bold text-white/80 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm border border-white/20">
                      <span>EXPORT GRADE</span>
                      <span>100% ORGANIC</span>
                    </div>

                    <div className="relative z-10 text-center bg-black/70 p-2.5 rounded-lg border border-white/20">
                      <span className="text-[11px] font-serif font-black text-amber-400 tracking-widest block">
                        VISION EXPORT
                      </span>
                      <span className="text-[9px] text-zinc-300 block mt-0.5 font-medium">
                        SAMBHAL HUB, INDIA
                      </span>
                    </div>
                  </div>

                  {/* RIGHT EDGE */}
                  <div
                    className="absolute border border-white/20"
                    style={{
                      width: plateDepth,
                      height: baseHeight,
                      left: baseWidth - plateDepth / 2,
                      transform: "rotateY(90deg)",
                      backgroundColor: selectedMaterial.colors.side,
                      backgroundImage:
                        "linear-gradient(90deg, rgba(0,0,0,0.4), rgba(255,255,255,0.15))"
                    }}
                  />

                  {/* LEFT EDGE */}
                  <div
                    className="absolute border border-white/20"
                    style={{
                      width: plateDepth,
                      height: baseHeight,
                      left: -plateDepth / 2,
                      transform: "rotateY(-90deg)",
                      backgroundColor: selectedMaterial.colors.side,
                      backgroundImage:
                        "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(0,0,0,0.4))"
                    }}
                  />

                  {/* TOP EDGE */}
                  <div
                    className="absolute border border-white/20"
                    style={{
                      width: baseWidth,
                      height: plateDepth,
                      top: -plateDepth / 2,
                      transform: "rotateX(90deg)",
                      backgroundColor: selectedMaterial.colors.side,
                      backgroundImage:
                        "linear-gradient(180deg, rgba(255,255,255,0.25), rgba(0,0,0,0.2))"
                    }}
                  />

                  {/* BOTTOM EDGE */}
                  <div
                    className="absolute border border-white/20"
                    style={{
                      width: baseWidth,
                      height: plateDepth,
                      top: baseHeight - plateDepth / 2,
                      transform: "rotateX(-90deg)",
                      backgroundColor: selectedMaterial.colors.side,
                      backgroundImage:
                        "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(255,255,255,0.15))"
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Specimen Description & Quick WhatsApp Inquiry CTA */}
            <div className="bg-white border border-zinc-300 rounded-2xl p-5 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 max-w-xl">
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{selectedMaterial.name} — B2B Specimen Overview</span>
                </h4>

                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  {selectedMaterial.description}
                </p>
              </div>

              <a
                href={getWhatsAppInquiry()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire B2B Pricing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Convert Custom Image to 3D Plate Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl text-left space-y-5"
            >
           <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-500" />
              <span>Convert Image to 3D Plate Specimen</span>
            </h3>

            <button
              onClick={() => setIsAddModalOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              &times;
            </button>
          </div>

            <form onSubmit={handleAddCustomPlate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Specimen / Plate Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amber Striae Horn Plate #04"
                  value={newPlateName}
                  onChange={(e) => setNewPlateName(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Upload Plate Image File
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-zinc-300 hover:border-amber-500 bg-stone-50 hover:bg-amber-50 p-4 rounded-xl text-xs font-bold text-zinc-700 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-amber-500" />
                  <span>
                    {newPlateImageUrl
                      ? "Image Loaded! Click to Change"
                      : "Click to Upload Local File"}
                  </span>
                </button>
              </div>

              <div className="text-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                — OR PASTE DIRECT URL —
              </div>

              <div>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newPlateImageUrl}
                  onChange={(e) => setNewPlateImageUrl(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              {/* Preset Images */}
              <div className="space-y-1.5 pt-1">
                <span className="block text-[11px] font-semibold text-zinc-600">
                  Or pick a sample plate texture:
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setNewPlateImageUrl(
                        "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1000&q=80"
                      )
                    }
                    className="p-1.5 border border-zinc-300 hover:border-amber-500 hover:bg-amber-50 rounded-lg bg-white text-[10px] text-zinc-700 font-medium transition-colors cursor-pointer"
                  >
                    Honey Amber
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setNewPlateImageUrl(
                        "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1000&q=80"
                      )
                    }
                    className="p-1.5 border border-zinc-300 hover:border-amber-500 hover:bg-amber-50 rounded-lg bg-white text-[10px] text-zinc-700 font-medium transition-colors cursor-pointer"
                  >
                    Auburn Wood
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setNewPlateImageUrl(
                        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80"
                      )
                    }
                    className="p-1.5 border border-zinc-300 hover:border-amber-500 hover:bg-amber-50 rounded-lg bg-white text-[10px] text-zinc-700 font-medium transition-colors cursor-pointer"
                  >
                    Marble Onyx
                  </button>
                </div>
              </div>

              {newPlateImageUrl && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
                  <img
                    src={newPlateImageUrl}
                    alt="Preview"
                    className="w-10 h-14 object-cover rounded-md border border-zinc-300"
                  />
                  <span className="text-xs text-emerald-700 font-bold">
                    Image ready for 3D slab conversion!
                  </span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-700 text-xs font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!newPlateImageUrl}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Convert to 3D Plate
                </button>
              </div>
            </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
