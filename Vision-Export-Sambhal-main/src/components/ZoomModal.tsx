import React from "react";
import { motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Phone, ShoppingBag, Copy, Printer, Mail } from "lucide-react";
import { Product, getProductImages } from "../data";
import VirtualSurfaceCalibration from "./VirtualSurfaceCalibration";

interface ZoomModalProps {
  key?: string;
  product: Product;
  onClose: () => void;
  productSlideIndices: Record<number, number>;
  handleProductSlideChange: (productId: number, direction: "next" | "prev" | number, e?: React.MouseEvent) => void;
  productFinishes: Record<number, "Natural" >;
  setProductFinishes: React.Dispatch<React.SetStateAction<Record<number, "Natural" >>>;
  showToast: (message: string) => void;
  selectedSizes: Record<number, string>;
  setSelectedSizes: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  selectedQuantities: Record<number, number>;
  setSelectedQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  getSingleProductWhatsAppUrl: (product: Product) => string;
  handleCopyProductText: (product: Product) => void;
}

export default function ZoomModal({
  product,
  onClose,
  productSlideIndices,
  handleProductSlideChange,
  productFinishes,
  setProductFinishes,
  showToast,
  selectedSizes,
  setSelectedSizes,
  selectedQuantities,
  setSelectedQuantities,
  getSingleProductWhatsAppUrl,
  handleCopyProductText,
}: ZoomModalProps) {
  const slides = getProductImages(product);
  const activeIndexRaw = productSlideIndices[product.id] || 0;
  const activeIndex = activeIndexRaw < slides.length ? activeIndexRaw : 0;
  const currentSlide = slides[activeIndex] || slides[0] || { type: "vector", label: "Specimen Digital Spec" };
  const currentFinish = productFinishes[product.id] || "Natural";

  const [isZoomed, setIsZoomed] = React.useState(false);
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = React.useState(false);

  const [touchStart, setTouchStart] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isZoomed || touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    if (diff > swipeThreshold) {
      handleProductSlideChange(product.id, "next");
    } else if (diff < -swipeThreshold) {
      handleProductSlideChange(product.id, "prev");
    }
    setTouchStart(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setHasDragged(false);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      if (Math.abs(dx - panOffset.x) > 3 || Math.abs(dy - panOffset.y) > 3) {
        setHasDragged(true);
      }

      // Constrain panning to reasonable limits
      const maxPanX = 350;
      const maxPanY = 350;
      setPanOffset({
        x: Math.max(-maxPanX, Math.min(maxPanX, dx)),
        y: Math.max(-maxPanY, Math.min(maxPanY, dy))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isZoomed) {
      setIsZoomed(true);
      setPanOffset({ x: 0, y: 0 });
    } else {
      if (!hasDragged) {
        setIsZoomed(false);
        setPanOffset({ x: 0, y: 0 });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 backdrop-blur-[20px] overflow-y-auto p-4 sm:p-6 md:p-12 flex items-start justify-center"
      onClick={onClose}
      id="zoom-modal-backdrop"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative max-w-5xl w-full bg-white/85 backdrop-blur-[20px] border-4 border-zinc-950 p-4 sm:p-8 flex flex-col rounded-none shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] my-8 sm:my-12"
        onClick={(e) => e.stopPropagation()}
        id="zoom-modal-container"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-white hover:bg-zinc-950 text-zinc-950 hover:text-white rounded-none border-2 border-zinc-950 z-50 transition-colors shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 mt-4 text-left">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase block mb-1.5 font-bold">
                  HIGH-RESOLUTION DIGITAL SPECIMEN
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-mono mt-2 uppercase tracking-wider font-semibold">
                  {product.material} • PROVENANCE: SAMBHAL, INDIA
                </p>
              </div>

              <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden border-2 border-zinc-950 bg-white flex items-center justify-center group/zoomimg select-none">
                <div 
                  className="absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-white overflow-hidden"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {currentSlide.type === "vector" ? (
                    <div className="w-full h-full flex items-center justify-center relative bg-white">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        {product.category === "Button Blanks" ? (
                          <div className="w-36 h-36 rounded-full bg-white border-2 border-zinc-950 flex items-center justify-center relative shadow-xl elegant-image-shadow">
                            <div className="absolute inset-2.5 rounded-full border border-dashed border-zinc-950/25"></div>
                            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-full">
                              <div className="w-3 h-3 rounded-full bg-zinc-950 shadow-inner"></div>
                              <div className="w-3 h-3 rounded-full bg-zinc-950 shadow-inner"></div>
                              <div className="w-3 h-3 rounded-full bg-zinc-950 shadow-inner"></div>
                              <div className="w-3 h-3 rounded-full bg-zinc-950 shadow-inner"></div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-48 h-32 rounded bg-white border-2 border-zinc-950 flex items-center justify-center relative shadow-xl elegant-image-shadow">
                            <span className="text-[10px] font-mono tracking-widest text-zinc-950 font-black">RAW HORN VENEER</span>
                          </div>
                        )}
                        <div className="w-20 h-2 bg-zinc-950/10 rounded-full blur-md mt-3"></div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={currentSlide.url}
                      alt={(currentSlide as any).alt || `${product.name} - ${currentSlide.label}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onClick={handleImageClick}
                      style={
                        isZoomed
                          ? {
                              transform: `scale(2.5) translate(${panOffset.x / 2.5}px, ${panOffset.y / 2.5}px)`,
                              cursor: isDragging ? "grabbing" : "grab",
                              transition: isDragging ? "none" : "transform 0.15s ease-out",
                            }
                          : {
                              transform: "scale(1) translate(0px, 0px)",
                              cursor: "zoom-in",
                              transition: "transform 0.3s ease-out",
                            }
                      }
                      className="max-w-full max-h-full object-contain select-none elegant-image-shadow border border-zinc-200/50"
                    />
                  )}
                </div>

                {currentSlide.type !== "vector" && (
                  <div className="absolute top-4 left-4 bg-white/90 border border-zinc-950 text-zinc-950 text-[9px] font-mono px-2.5 py-1 uppercase tracking-widest font-black z-20 pointer-events-none">
                    {isZoomed ? "PAN MODE ACTIVE • DRAG IMAGE TO EXPLORE TEXTURE" : "CLICK SPECIMEN TO ZOOM & DRAG PAN"}
                  </div>
                )}

                <div className="absolute bottom-4 left-4 bg-white/90 border border-zinc-950 text-zinc-950 text-[9px] font-mono px-2.5 py-1 uppercase tracking-widest font-black z-20 pointer-events-none">
                  {currentSlide.label} ({activeIndex + 1}/{slides.length})
                </div>

                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleProductSlideChange(product.id, "prev"); }}
                    className="w-9 h-9 rounded-none bg-white border-2 border-zinc-950 text-zinc-950 flex items-center justify-center pointer-events-auto hover:bg-zinc-950 hover:text-white transition-all active:scale-95 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleProductSlideChange(product.id, "next"); }}
                    className="w-9 h-9 rounded-none bg-white border-2 border-zinc-950 text-zinc-950 flex items-center justify-center pointer-events-auto hover:bg-zinc-950 hover:text-white transition-all active:scale-95 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {slides.map((slide, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleProductSlideChange(product.id, sIdx)}
                    className={`relative w-14 h-14 bg-white border-2 transition-all overflow-hidden flex items-center justify-center rounded-none cursor-pointer ${
                      activeIndex === sIdx ? "border-zinc-950 ring-1 ring-zinc-950/20" : "border-zinc-300 hover:border-zinc-950"
                    }`}
                    title={`Switch to ${slide.label}`}
                  >
                    {slide.type === "vector" ? (
                      <div className="text-[8px] font-mono font-bold text-zinc-950 uppercase text-center leading-tight p-1">
                        Spec CAD
                      </div>
                    ) : (
                      <img
                        src={slide.url}
                        alt={(slide as any).alt || slide.label}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                      />
                    )}
                    <div className="absolute bottom-0.5 right-0.5 bg-white/90 text-[7px] font-mono px-1 border border-zinc-300 text-zinc-950">
                      #{sIdx + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-600 font-bold uppercase tracking-wider">
              <div>
                <span className="block text-zinc-400 mb-0.5">GRAIN</span>
                <span className="text-zinc-950 font-black text-sm">{product.grainPattern}</span>
              </div>
              <div>
                <span className="block text-zinc-400 mb-0.5">Size</span>
                <span className="text-zinc-950 font-black text-sm">{product.dimensions}</span>
              </div>
              {/* <div>
                <span className="block text-zinc-400 mb-0.5">FINISH STATE</span>
                <span className="text-emerald-600 font-black text-sm">
                  {currentFinish === "high-polish" ? "🌟 HIGH-POLISH" : currentFinish === "natural-grain" ? "🌾 NATURAL COLOR" : "🪨 NATURAL COLOR ATTA"}
                </span>
              </div> */}
              <div>
                <span className="block text-zinc-400 mb-0.5">B2B MOQs</span>
                <span className="text-zinc-950 font-black text-sm">
                  {product.category === "Button Blanks" ? "5,000 Kg" : "5,000 Pcs"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <VirtualSurfaceCalibration
              productId={product.id}
              productName={product.name}
              productFinish={currentFinish}
              setProductFinish={(finish) => setProductFinishes(prev => ({ ...prev, [product.id]: finish }))}
              showToast={showToast}
            />

             <div className="bg-white p-6 border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-zinc-950 text-white border border-zinc-950 px-2 py-0.5 font-mono font-bold">DESK</span>
                <h4 className="text-xs sm:text-sm uppercase font-mono tracking-widest text-zinc-950 font-black">
                  Inquiry Desk & Quotation
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-semibold">
                Configure your target gauge and preferred sample volume, then initiate your global trade desk inquiry:
              </p>

              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-zinc-200">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                    Diameter / Size:
                  </label>
                  <select
                    value={selectedSizes[product.id] || (product.category === "Button Blanks" ? "24mm (40L)" : "70x170mm (4mm)")}
                    onChange={(e) => setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })}
                    className="w-full bg-white text-zinc-950 border-2 border-zinc-950 rounded-none px-2 py-2 text-[11px] focus:outline-none focus:border-amber-500 font-bold transition-colors cursor-pointer"
                  >
                    {product.category === "Button Blanks" ? (
                      <>
                        <option value="12mm">12mm</option>
                        <option value="14mm">14mm</option>
                        <option value="16mm">16mm</option>
                        <option value="19mm">19mm</option>
                        <option value="21mm - Common">21mm - Common</option>
                        <option value="23mm">23mm</option>
                        <option value="26mm">26mm</option>
                        <option value="29mm">29mm</option>
                        <option value="31mm">31mm</option>
                      </>
                    ) : product.category === "Flat Plates" ? (
                      <>
                        <option value="50x150mm (3mm)">50x150mm (3mm)</option>
                        <option value="60x160mm (4mm)">60x160mm (4mm)</option>
                        <option value="70x170mm (4mm)">70x170mm (4mm)</option>
                        <option value="80x200mm (5mm)">80x200mm (5mm) - Heavy</option>
                      </>
                    ) : (
                      <>
                        <option value="250ml">250ml</option>
                        <option value="350ml">350ml</option>
                        <option value="500ml">500ml (most popular)</option>
                        <option value="650ml">650ml</option>
                        <option value="750ml">750ml</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                    Target Quantity:
                  </label>
                  <select
                    value={selectedQuantities[product.id] || (product.category === "Button Blanks" ? 10000 : 500)}
                    onChange={(e) => setSelectedQuantities({ ...selectedQuantities, [product.id]: parseInt(e.target.value) })}
                    className="w-full bg-white text-zinc-950 border-2 border-zinc-950 rounded-none px-2 py-2 text-[11px] focus:outline-none focus:border-amber-500 font-mono font-bold transition-colors cursor-pointer"
                  >
                    {product.category === "Button Blanks" ? (
                      <>
                        <option value={500}>500 KG (Trial)</option>
                        <option value={1000}>1000 KG (Standard)</option>
                        <option value={2500}>2500 KG</option>
                        <option value={5000}>5000 KG (Value)</option>
                        <option value={10000}>10000+ KG (FOB)</option>
                      </>
                    ) : (
                      <>
                        <option value={200}>200 plates (Trial)</option>
                        <option value={500}>500 plates (Standard)</option>
                        <option value={1000}>1,000 plates</option>
                        <option value={5000}>5,000+ plates (Container)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={getSingleProductWhatsAppUrl(product)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-none text-xs sm:text-sm uppercase tracking-widest text-center flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-white animate-pulse" />
                  <span>Inquire Specimen on WhatsApp</span>
                </a>
                <a
                  href={`mailto:sales@visionexporthub.com?subject=${encodeURIComponent(
                        `Inquiry about ${product.name}`
                      )}&body=${encodeURIComponent(
                        `Hello,

                    I am interested in the following product:

                    Product: ${product.name}
                    Category: ${product.category}
                    Size: ${selectedSizes[product.id]}
                    Quantity: ${selectedQuantities[product.id]}

                    Please send me more details and a quotation.
                    Here is my contact info: 
                    Phone no. [Your Phone Number]

                    Thank you.`
                      )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                <button
                  onClick={() => handleCopyProductText(product)}
                  className="w-full bg-white hover:bg-zinc-50 text-zinc-950 hover:text-zinc-950 border-2 border-zinc-950 py-4 rounded-none text-xs sm:text-sm uppercase tracking-widest font-black flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]"
                >
                  <Mail className="w-4 h-4 text-white animate-pulse" />
                  <span>Inquire Specimen on mail</span>
                  {/* <Copy className="w-4 h-4" />
                  <span>Copy Specifications</span> */}
                </button>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* PRINT-ONLY COMPONENT */}
      <div id="printable-spec-sheet" className="hidden">
        {/* Double Frame */}
        <div className="border-4 border-double border-zinc-950 p-8 space-y-6 bg-white text-zinc-950">
          
          {/* Top Row / Header */}
          <div className="flex justify-between items-start border-b-2 border-zinc-950 pb-4">
            <div>
              <h1 className="text-xl font-mono tracking-widest font-black uppercase text-zinc-900">
                VISION IMPORT & EXPORT
              </h1>
              <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mt-1">
                Luxury Organic Materials & B2B Supply Chains • Sambhal, UP, India
              </p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono font-bold bg-zinc-900 text-white px-2 py-1 uppercase tracking-widest">
                OFFICIAL SPEC SHEET
              </span>
              <p className="text-[8px] font-mono text-zinc-400 mt-1.5">
                REF: VIS-SPEC-{product.id}-{product.category.substring(0,3).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Subheader Title */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black text-amber-600 tracking-widest uppercase">
              {product.category} SPECIMEN BLUEPRINT
            </span>
            <h2 className="font-serif text-3xl font-black uppercase text-zinc-950 leading-tight">
              {product.name}
            </h2>
            <p className="text-[10px] font-mono italic text-zinc-500">
              Material Origin: {product.origin} • 100% Traceable Biological Sourcing
            </p>
          </div>

          {/* Core Spec Grid */}
          <div className="grid grid-cols-2 gap-6 border-y border-zinc-200 py-6">
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Material Class:</span>
                <span className="text-zinc-900 font-black text-right">{product.material}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Grain & Hue:</span>
                <span className="text-zinc-900 font-black text-right">{product.grainPattern}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Standard Thickness:</span>
                <span className="text-zinc-900 font-black text-right">{product.dimensions}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Sourcing Ethics:</span>
                <span className="text-emerald-700 font-black text-right">{product.sustainable}</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Configured Caliber:</span>
                <span className="text-zinc-900 font-black text-right">
                  {selectedSizes[product.id] || (product.category === "Button Blanks" ? "24mm (40L)" : "70x170mm (4mm)")}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Configured Volume:</span>
                <span className="text-zinc-900 font-black text-right">
                  {(selectedQuantities[product.id] || (product.category === "Button Blanks" ? 10000 : 500)).toLocaleString()} Pcs
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Calibration State:</span>
                <span className="text-zinc-900 font-black text-right uppercase">
                  {productFinishes[product.id] || "Natural"} Finish
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 font-bold uppercase">Estimated MOQ:</span>
                <span className="text-zinc-900 font-black text-right">5,000 KG / Batch</span>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
              BIOLOGICAL PROPERTIES & GENERAL DESCRIPTION
            </h3>
            <p className="text-xs text-zinc-800 font-sans leading-relaxed font-semibold">
              {product.description}
            </p>
          </div>

          {/* Texture & Structure */}
          <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-4 border border-zinc-200">
            <div>
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Surface & Tactile Texture
              </h4>
              <p className="text-[11px] text-zinc-700 font-sans leading-relaxed">
                {product.texture}
              </p>
            </div>
            <div>
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Traceability & Quality Assurance
              </h4>
              <p className="text-[11px] text-zinc-700 font-sans leading-relaxed">
                Processed with zero protected species component extraction. Pre-annealed to 12% moisture limit. Standard deviation &lt; 0.1mm. Suitable for automatic CAD lathes.
              </p>
            </div>
          </div>

          {/* Custom CAD Drawing / Technical Vector Drawing */}
          <div className="border border-zinc-200 p-4 flex flex-col items-center justify-center bg-zinc-50">
            <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">TECHNICAL SCHEMATIC OUTLINE</span>
            {product.category === "Button Blanks" ? (
              <svg width="100" height="100" viewBox="0 0 120 120" className="text-zinc-900 opacity-80">
                <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" fill="none" />
                <circle cx="48" cy="48" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="72" cy="48" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="48" cy="72" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="72" cy="72" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="60" y1="5" x2="60" y2="115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-40" />
                <line x1="5" y1="60" x2="115" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-40" />
              </svg>
            ) : (
              <svg width="100" height="100" viewBox="0 0 120 120" className="text-zinc-900 opacity-80">
                <rect x="25" y="30" width="70" height="55" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="25" y1="20" x2="95" y2="20" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="25" y1="16" x2="25" y2="24" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="95" y1="16" x2="95" y2="24" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="15" y1="30" x2="15" y2="85" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="11" y1="30" x2="19" y2="30" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="11" y1="85" x2="19" y2="85" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M30 40 L90 40 M30 50 L90 50 M30 60 L90 60 M30 70 L90 70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" fill="none" className="opacity-30" />
              </svg>
            )}
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mt-2">CALIBRATED SURFACE SCHEMATIC • PROPRIETARY PRINT</span>
          </div>

          {/* Footnotes & Signoff */}
          <div className="pt-6 border-t border-zinc-200 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                Regulatory Standards Compliant
              </p>
              <div className="flex space-x-2 text-[8px] font-mono font-bold text-zinc-600">
                <span>OEKO-TEX 100</span>
                <span>•</span>
                <span>CE CERTIFIED</span>
                <span>•</span>
                <span>REACH PROTOCOLS</span>
                <span>•</span>
                <span>VETERINARY OK</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="inline-block border border-zinc-300 px-3 py-1 font-mono text-[9px] uppercase tracking-widest font-black text-zinc-700 bg-white">
                STABILIZED CAD SCHEMATIC
              </div>
              <p className="text-[7px] font-mono text-zinc-400 uppercase">
                Generated dynamically via Vision B2B Materials Desk
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
