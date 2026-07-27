import React, { useState, useEffect } from "react";
import { 
  ZoomIn, 
  ShoppingBag, 
  Copy, 
  Check, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Eye 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, PRODUCTS, getProductImages } from "../../data";

interface ProductsSectionProps {
  onZoomProduct: (product: Product) => void;
  selectedSizes: Record<number, string>;
  selectedQuantities: Record<number, number>;
  setSelectedSizes: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  setSelectedQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  productFinishes: Record<number, "Natural" | "high-polish" | "natural color Atta">;
  setProductFinishes: React.Dispatch<React.SetStateAction<Record<number, "Natural" | "high-polish" | "natural color Atta">>>;
  handleCopyProductText: (product: Product) => void;
  productSlideIndices?: Record<number, number>;
  handleProductSlideChange?: (productId: number, direction: "next" | "prev" | number, e?: React.MouseEvent) => void;
}

const CATEGORIES = ["All Materials", "Button Blanks", "Flat Plates", "Other"];

interface ProductCardProps extends ProductsSectionProps {
  product: Product;
  key?: any;
}

// Modular high-resolution Product Card component with embedded carousel
function ProductCard({
  product,
  onZoomProduct,
  selectedSizes,
  selectedQuantities,
  setSelectedSizes,
  setSelectedQuantities,
  productFinishes,
  setProductFinishes,
  handleCopyProductText,
  productSlideIndices,
  handleProductSlideChange,
}: ProductCardProps) {
  const slides = getProductImages(product);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isPolished, setIsPolished] = useState<boolean>(false);
  const [simulatedLuster, setSimulatedLuster] = useState<boolean>(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    if (diff > swipeThreshold) {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    } else if (diff < -swipeThreshold) {
      setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
    setTouchStart(null);
  };

  // Auto-cycle carousel through 3-5 images (cycles every 3.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCopyProductText(product);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerLuster = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSimulatedLuster(true);
    setTimeout(() => setSimulatedLuster(false), 1500);
  };

  const handleZoomClick = () => {
    // Sync active carousel index back to parent slide indices before zoom
    if (handleProductSlideChange) {
      handleProductSlideChange(product.id, currentSlideIndex);
    }
    onZoomProduct(product);
  };

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const getSizesForProduct = (prod: Product) => {
    if (prod.category === "Button Blanks") {
      return ["14mm", "16mm", "19mm", "21mm", "23mm", "26mm", "29mm", "31mm"];
    } else if (prod.category === "Flat Plates") {
      return ["60x140mm", "70x170mm", "80x200mm"];
    } else {
      return ["Natural Tips", "Solid Blocks", "Slices (2.5mm)"];
    }
  };

  const sizes = getSizesForProduct(product);
  const selectedSize = selectedSizes[product.id] || sizes[1] || sizes[0];
  const selectedQty = selectedQuantities[product.id] || (product.category === "Button Blanks" ? 10000 : 500);
  const currentFinish = productFinishes[product.id] || "matte";

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`border-2 rounded-3xl overflow-hidden flex flex-col transition-all duration-500 relative break-inside-avoid inline-block w-full mb-8 ${
        isPolished
          ? "bg-zinc-950 border-zinc-900 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          : "bg-white border-zinc-200/80 text-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:border-zinc-950"
      }`}
    >
      {/* 1. Carousel Image Section */}
      <div 
        onClick={handleZoomClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-square w-full bg-zinc-50 flex items-center justify-center p-6 sm:p-8 cursor-zoom-in overflow-hidden group select-none"
      >
        {/* Subtle radial gradient backing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,24,27,0.03)_0%,transparent_75%)] pointer-events-none"></div>

        {/* Shimmer glaze overlay during polish/luster simulation */}
        {simulatedLuster && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_1.5s_infinite] pointer-events-none z-20"></div>
        )}

        {/* High Resolution Slide Render */}
        <div className="relative z-10 w-full h-full flex items-center justify-center transform transition-transform duration-700 group-hover:scale-[1.03]">
          <AnimatePresence mode="wait">
            {currentSlide?.type === "vector" ? (
              <motion.div 
                key={`vector-${currentSlideIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                {product.category === "Button Blanks" ? (
                  <div className="w-48 h-48 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center relative">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <div className="w-4.5 h-4.5 rounded-full bg-zinc-800 shadow-inner"></div>
                      <div className="w-4.5 h-4.5 rounded-full bg-zinc-800 shadow-inner"></div>
                      <div className="w-4.5 h-4.5 rounded-full bg-zinc-800 shadow-inner"></div>
                      <div className="w-4.5 h-4.5 rounded-full bg-zinc-800 shadow-inner"></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-56 h-36 rounded bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
                    <span className="text-xs font-mono tracking-widest text-zinc-500 font-bold uppercase">CAD Specimen Plate</span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.img
                key={`img-${currentSlideIndex}`}
                src={currentSlide?.url}
                alt={(currentSlide as any)?.alt || `${product.name} - ${currentSlide?.label}`}
                referrerPolicy="no-referrer"
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`w-full h-full max-h-full max-w-full object-contain filter transition-all duration-700 ${
                  isPolished ? "brightness-110 saturate-100 contrast-105" : ""
                } drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]`}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Slide navigation controls (chevrons shown on hover) */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-zinc-800 hover:text-black shadow-md border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
          title="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-zinc-800 hover:text-black shadow-md border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
          title="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom index dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-20" onClick={(e) => e.stopPropagation()}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlideIndex === idx 
                  ? "w-4 bg-zinc-900" 
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        {/* Dynamic Image purpose pill badge */}
        <span className="absolute top-4 left-4  text-[7px] font-mono text-white px-2 py-0.5 uppercase tracking-widest font-black rounded z-20">
          {currentSlide?.label || "Specimen Photo"}
        </span>

        {/* Index indicator */}
        <span className="absolute top-4 right-4 bg-black/90 dark:bg-white/55 text-white dark:text-black text-[8px] font-mono px-2 py-0.5 rounded border border-zinc-700 dark:border-zinc-300 z-20">
          0{currentSlideIndex + 1} / 0{slides.length}
        </span>

        {/* Click to inspect zoom banner overlay */}
        <div className="absolute inset-x-0 bottom-12 py-2 bg-zinc-950/20 text-white font-mono text-[8px] uppercase tracking-[0.2em] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none font-bold">
          Click Image to Inspect Zoom
        </div>
      </div>

      {/* 2. Card Content Area */}
      <div className="p-6 flex flex-col justify-between flex-grow text-left">
        <div className="space-y-4">
          
          {/* Header ID Row */}
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className={isPolished ? "text-zinc-400" : "text-zinc-500"}>
              {product.category.toUpperCase()}
            </span>
            {/* <span className="text-amber-600 font-black tracking-wider">
              LOT #SH-00{product.id}
            </span> */}
          </div>

          {/* Product Title */}
          <div>
            <h3 className="font-serif text-xl font-bold uppercase tracking-tight line-clamp-1">
              {product.name}
            </h3>
            <p className={`text-xs mt-1.5 leading-relaxed font-semibold line-clamp-3 ${
              isPolished ? "text-zinc-400" : "text-zinc-600"
            }`}>
              {product.description}
            </p>
          </div>

          {/* Miniature Specs Grid */}
          <div className={`grid grid-cols-2 gap-y-2 gap-x-4 pt-3.5 border-t text-[10px] font-mono ${
            isPolished ? "border-zinc-800" : "border-zinc-100"
          }`}>
            <div>
              <span className="text-zinc-500 block uppercase font-bold text-[8px]">Natural Species</span>
              <span className={`font-black block mt-0.5 truncate ${isPolished ? "text-white" : "text-zinc-900"}`}>
                {product.material.split(" (")[0]}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase font-bold text-[8px]">Grain Caliber</span>
              <span className={`font-black block mt-0.5 truncate ${isPolished ? "text-white" : "text-zinc-900"}`}>
                {product.grainPattern}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase font-bold text-[8px]">Tactile Texture</span>
              <span className={`font-black block mt-0.5 truncate ${isPolished ? "text-white" : "text-zinc-900"}`}>
                {product.texture.split(", ")[0]}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase font-bold text-[8px]">Sourcing Impact</span>
              <span className="text-emerald-500 font-black block mt-0.5 truncate">
                {product.sustainable.split(", ")[0]}
              </span>
            </div>
          </div>

        </div>

        {/* 3. Inspect details & configure action button */}
        <div className="mt-8">
          <button
            onClick={handleZoomClick}
            className={`w-full py-4 text-[10px] font-mono font-black uppercase tracking-widest text-center flex items-center justify-center space-x-2 cursor-pointer border rounded-full transition-all duration-300 ${
              isPolished
                ? "bg-white text-zinc-950 border-white hover:bg-transparent hover:text-white"
                : "bg-zinc-950 text-white border-zinc-950 hover:bg-transparent hover:text-zinc-950"
            }`}
          >
            <span>INSPECT & CONFIGURE</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsSection({
  onZoomProduct,
  selectedSizes,
  selectedQuantities,
  setSelectedSizes,
  setSelectedQuantities,
  productFinishes,
  setProductFinishes,
  handleCopyProductText,
  productSlideIndices,
  handleProductSlideChange,
}: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Materials");

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory === "All Materials") return true;
    return product.category === selectedCategory;
  });

  return (
    <section className="py-24 bg-white text-zinc-950 border-b border-zinc-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block - Elegant Left/Right Alignment */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-10 mb-14 border-b border-zinc-100">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-3 text-left"
          >
            <div className="flex items-center space-x-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block font-black">
                02 / ARCHIVAL COLLECTION
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-none">
              Exhibition Lookbook
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-semibold leading-relaxed">
              Curated biological specimens carved in Sambhal. Toggle material configurations, simulate authentic hand-polished luster, and request custom volume trade quotes.
            </p>
          </motion.div>

          {/* Sleek Floating Pill Category Selector */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-1 mt-6 md:mt-0 bg-white p-1.5 border border-zinc-200/60 rounded-full"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 font-mono text-[9px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 rounded-full cursor-pointer select-none ${
                  selectedCategory === cat
                    ? "bg-white text-zinc-950 font-black border border-zinc-900 shadow-none"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Refactored High-Resolution product display grid to a 3-column masonry layout */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onZoomProduct={onZoomProduct}
              selectedSizes={selectedSizes}
              selectedQuantities={selectedQuantities}
              setSelectedSizes={setSelectedSizes}
              setSelectedQuantities={setSelectedQuantities}
              productFinishes={productFinishes}
              setProductFinishes={setProductFinishes}
              handleCopyProductText={handleCopyProductText}
              productSlideIndices={productSlideIndices}
              handleProductSlideChange={handleProductSlideChange}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center text-zinc-400 font-mono text-xs bg-white border border-zinc-200 rounded-3xl mt-10">
            No specimens available under this material filter.
          </div>
        )}

      </div>
    </section>
  );
}
