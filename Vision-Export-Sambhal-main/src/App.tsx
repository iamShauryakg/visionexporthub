import React, { useState, useEffect, useLayoutEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import { Product } from "./types";
import { ArrowUp, Compass, Clock, Globe, Cpu, Anchor, ShieldCheck, HelpCircle, Activity } from "lucide-react";
import { PRODUCTS, getProductImages } from "./data";

// Import layout components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CoutureHero from "./components/CoutureHero";
import HeroSlider from "./components/HeroSlider";
import PartnerSettings from "./components/PartnerSettings";
import ThreeDShowroom from "./components/ThreeDShowroom";
import ZoomModal from "./components/ZoomModal";
import LegalModal from "./components/LegalModal";
import NavigationDots from "./components/NavigationDots";
import CommandPalette from "./components/CommandPalette";

// Import section modules
import AboutSection from "./components/sections/AboutSection";
import ProductsSection from "./components/sections/ProductsSection";
import MaterialLabSection from "./components/sections/MaterialLabSection";
import TechnicalSpecsSection from "./components/sections/TechnicalSpecsSection";
import QualityControlSection from "./components/sections/QualityControlSection";
import ProcessSection from "./components/sections/ProcessSection";
import VisionGallerySection from "./components/sections/VisionGallerySection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import CalibrationSuiteSection from "./components/sections/CalibrationSuiteSection";
import FAQSection from "./components/sections/FAQSection";
import ComplianceSection from "./components/sections/ComplianceSection";
import PartnersSection from "./components/sections/PartnersSection";
import RawButtonsSection from "./components/sections/RawButtonsSection";
import ContactSection from "./components/sections/ContactSection";
import { MagneticDeskCard } from "./components/MagneticDeskCard";

function ScrollRevealDivider() {
  return (
    <div className="w-full overflow-hidden py-0">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-zinc-300 dark:border-white/45 max-w-7xl mx-auto my-0 origin-center"
      />
    </div>
  );
}

interface StaggeredSectionRevealProps {
  children: React.ReactNode;
}

function StaggeredSectionReveal({ children }: StaggeredSectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

interface LazySectionProps {
  children: React.ReactNode;
}

function LazySection({ children }: LazySectionProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "250px 0px",
        threshold: 0,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="w-full h-full min-h-[150px] relative">
      {isIntersected ? (
        children
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="animate-pulse space-y-8 w-full">
            {/* Header skeleton */}
            <div className="flex flex-col items-center space-y-3 max-w-md mx-auto">
              <div className="h-2 w-12 bg-amber-500/20 rounded-full" />
              <div className="h-6 w-48 bg-gradient-to-r from-amber-500/5 via-amber-500/20 to-amber-500/5 rounded-md" />
              <div className="h-3 w-64 bg-zinc-800/40 rounded-md" />
            </div>
            
            {/* Grid layout skeleton matching premium cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-amber-500/10 bg-zinc-950/40 rounded-xl p-6 space-y-6 h-[300px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/10 to-transparent flex items-center justify-center">
                      <div className="w-6 h-6 rounded bg-amber-500/10" />
                    </div>
                    <div className="h-4 w-2/3 bg-zinc-800/50 rounded" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-zinc-900/60 rounded" />
                      <div className="h-3 w-5/6 bg-zinc-900/60 rounded" />
                    </div>
                  </div>
                  <div className="h-8 w-full bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 rounded-lg border border-amber-500/10" />
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] font-mono tracking-[0.2em] text-zinc-600 uppercase animate-pulse">
              Calibrating luxury digital showroom elements...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface PremiumTactileContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  theme:"light" | "dark" ;
}

function PremiumTactileContainer({ children, id, className = "", theme }: PremiumTactileContainerProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ 
        opacity: { duration: 0.7, ease: "easeOut" },
        y: { duration: 0.7, ease: "easeOut" },
      }}
      className={`relative z-10 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

export default function App() {
  const [activeZoomProduct, setActiveZoomProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("919548470907");
  const [companyName, setCompanyName] = useState("GLOBAL LUXURY BRAND");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("vision-theme")as "dark" | "light" | null;
      if (savedTheme) {
        const root = document.documentElement;
        if (savedTheme === "light") {
          root.classList.add("light");
          root.style.setProperty("--color-surface-base", "#ffffff");
          root.style.setProperty("--color-text-primary", "#111827");
          root.style.setProperty("--color-surface-secondary", "#f3f4f6");
          root.style.setProperty("--color-text-secondary", "#4b5563");
          root.style.setProperty("--color-border-primary", "#e5e7eb");
          root.style.setProperty("--color-border-secondary", "#d1d5db");
        } else {
          root.classList.remove("light");
          root.style.setProperty("--color-surface-base", "#050507");
          root.style.setProperty("--color-text-primary", "#ffffff");
          root.style.setProperty("--color-surface-secondary", "#0e0e12");
          root.style.setProperty("--color-text-secondary", "#a1a1aa");
          root.style.setProperty("--color-border-primary", "#1e1e24");
          root.style.setProperty("--color-border-secondary", "#27272a");
        }
        return savedTheme;
      }
    }
    return "light";
  });

  // Synchronize class and local storage changes before first print with CSS variables
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.style.setProperty("--color-surface-base", "#ffffff");
      root.style.setProperty("--color-text-primary", "#111827");
      root.style.setProperty("--color-surface-secondary", "#f3f4f6");
      root.style.setProperty("--color-text-secondary", "#4b5563");
      root.style.setProperty("--color-border-primary", "#e5e7eb");
      root.style.setProperty("--color-border-secondary", "#d1d5db");
      localStorage.setItem("vision-theme", "light");
    } else {
      root.classList.remove("light");
      root.style.setProperty("--color-surface-base", "#050507");
      root.style.setProperty("--color-text-primary", "#ffffff");
      root.style.setProperty("--color-surface-secondary", "#0e0e12");
      root.style.setProperty("--color-text-secondary", "#a1a1aa");
      root.style.setProperty("--color-border-primary", "#1e1e24");
      root.style.setProperty("--color-border-secondary", "#27272a");
      localStorage.setItem("vision-theme", "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Legal Modal states
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<"privacy" | "moq" | "certificates" | "terms" | "freight">("privacy");

  const handleOpenLegal = (tab: "privacy" | "moq" | "certificates" | "terms" | "freight") => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeView, setActiveView] = useState<"home" | "contact">("home");

  const handleNavigate = (view: "home" | "contact", targetHash?: string) => {
    setActiveView(view);
    if (view === "home" && targetHash) {
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Track page scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Individual product slides & custom options
  const [productSlideIndices, setProductSlideIndices] = useState<Record<number, number>>({});
  const [productFinishes, setProductFinishes] = useState<Record<number, "matte" | "high-polish" | "natural-grain">>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({});

  // Slide loop for Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const [times, setTimes] = useState({ milan: "12:00:00", sambhal: "15:30:00" });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      
      const milanDate = new Date(utc + 3600000 * 2);
      const sambhalDate = new Date(utc + 3600000 * 5.5);

      const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
      };

      setTimes({
        milan: formatTime(milanDate),
        sambhal: formatTime(sambhalDate)
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global keyboard shortcuts for power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an editable field
      const activeEl = document.activeElement;
      if (activeEl) {
        const tagName = activeEl.tagName.toLowerCase();
        const isContentEditable = activeEl.hasAttribute('contenteditable') || activeEl.getAttribute('contenteditable') === 'true';
        if (tagName === "input" || tagName === "textarea" || tagName === "select" || isContentEditable) {
          return;
        }
      }

      const key = e.key.toLowerCase();
      if (key === "t") {
        e.preventDefault();
        toggleTheme();
        showToast(`THEME TOGGLED: Switched to ${theme === "dark" ? "light" : "dark"} mode.`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  // Safe clipboard helper
  const handleCopyProductText = (product: Product) => {
    const defaultSize = selectedSizes[product.id] || (product.category === "Button Blanks" ? "24mm (40L)" : "70x170mm (4mm)");
    const defaultQty = selectedQuantities[product.id] || (product.category === "Button Blanks" ? 10000 : 500);
    const finish = productFinishes[product.id] || "matte";

    const text = `VISION EXPORT CATALOG SPECIMEN:
- Name: ${product.name}
- Category: ${product.category}
- Material: ${product.material}
- Target Size: ${defaultSize}
- Grain Pattern: ${product.grainPattern}
- Simulated Finish: ${finish.toUpperCase()}
- Target MOQ Volume: ${defaultQty.toLocaleString()} pieces
- Reference Source: Sambhal Manufacturing Hub, Uttar Pradesh, India`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(`COPIED: Specs for ${product.name} ready to share!`))
        .catch(() => fallbackCopy(text, product.name));
    } else {
      fallbackCopy(text, product.name);
    }
  };

  const fallbackCopy = (text: string, prodName: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast(`COPIED: Specs for ${prodName} ready to share!`);
    } catch {
      showToast("ERROR: Unable to copy parameters to clipboard.");
    }
    document.body.removeChild(textArea);
  };

  // Image slide navigation
  const handleProductSlideChange = (productId: number, direction: "next" | "prev" | number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const slides = getProductImages(product);
    const currentIndex = productSlideIndices[productId] || 0;

    let nextIndex = currentIndex;
    if (typeof direction === "number") {
      nextIndex = direction;
    } else if (direction === "next") {
      nextIndex = (currentIndex + 1) % slides.length;
    } else if (direction === "prev") {
      nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    setProductSlideIndices((prev) => ({ ...prev, [productId]: nextIndex }));
  };

  // WhatsApp Link Builders
  const getSingleProductWhatsAppUrl = (product: Product) => {
    const defaultSize = selectedSizes[product.id] || (product.category === "Button Blanks" ? "24mm (40L)" : "70x170mm (4mm)");
    const defaultQty = selectedQuantities[product.id] || (product.category === "Button Blanks" ? 10000 : 500);
    const finish = productFinishes[product.id] || "matte";

    const text = `Hello Vision Import & Export, I am preparing a B2B trade desk inquiry on behalf of "${companyName}".
Please provide a customized export quote for "${product.name}":
- Material Class: ${product.material}
- Calibrated Size: ${defaultSize}
- Simulation Finish: ${finish.toUpperCase()}
- Target MOQ: ${defaultQty.toLocaleString()} Pcs
Please share availability, standard lead times, and FOB shipping prices from Sambhal Hub.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const themeStyles = {
    "--color-surface-base": theme === "light" ? "#ffffff" : "#050507",
    "--color-text-primary": theme === "light" ? "#111827" : "#ffffff",
    "--color-surface-secondary": theme === "light" ? "#f3f4f6" : "#0e0e12",
    "--color-text-secondary": theme === "light" ? "#4b5563" : "#a1a1aa",
    "--color-border-primary": theme === "light" ? "#e5e7eb" : "#1e1e24",
    "--color-border-secondary": theme === "light" ? "#d1d5db" : "#27272a",
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div 
        style={themeStyles}
        className="min-h-screen bg-surface-base text-text-primary font-sans antialiased overflow-x-hidden relative"
      >
        {/* Thin, fixed B2B scroll-progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-border-primary z-[9999] pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-[#C5A059] to-white transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Dynamic Premium Bone & Horn Noise Texture Overlay */}
        <div className="premium-noise-overlay"></div>

        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onOpenLegal={handleOpenLegal}
          whatsappNumber={whatsappNumber}
          onOpenConfig={() => setIsConfigOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          activeView={activeView}
          onNavigate={handleNavigate}
        />

        <NavigationDots theme={theme} activeView={activeView} />

      {activeView === "home" ? (
        <>
          <CoutureHero companyName={companyName} />

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="about">
            <AboutSection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer 
            id="specimen-configurator" 
            className="bg-surface-secondary/20 pt-16 pb-8"
            theme={theme}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
              <span className="text-amber-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">ANALYSIS SUITE</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary mt-1">Interactive Specimen Configurator</h2>
              <p className="text-text-secondary text-xs sm:text-sm max-w-xl mx-auto mt-2">Inspect moisture-controlled raw biological horn & bone specimens, view ID metrics, and calculate bulk MOQs instantly.</p>
            </div>
            <HeroSlider
              currentHeroSlide={currentHeroSlide}
              setCurrentHeroSlide={setCurrentHeroSlide}
              companyName={companyName}
              whatsappNumber={whatsappNumber}
            />
          </PremiumTactileContainer>
          
          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="products">
            <ProductsSection
              onZoomProduct={setActiveZoomProduct}
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
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="showroom">
            <LazySection>
              <ThreeDShowroom />
            </LazySection>
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="material-lab">
            <MaterialLabSection whatsappNumber={whatsappNumber} />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="specs">
            <TechnicalSpecsSection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="quality">
            <QualityControlSection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="process">
            <ProcessSection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="gallery">
            <VisionGallerySection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="raw-materials">
            <RawButtonsSection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="testimonials">
            <TestimonialsSection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="calibration">
            <LazySection>
              <CalibrationSuiteSection />
            </LazySection>
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="faq">
            <FAQSection whatsappNumber={whatsappNumber} />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="sustainability">
            <ComplianceSection />
          </PremiumTactileContainer>

          <ScrollRevealDivider />

          <PremiumTactileContainer theme={theme} id="partners">
            <PartnersSection />
          </PremiumTactileContainer>
        </>
      ) : (
        <div className="pt-28 pb-20 min-h-screen flex flex-col justify-start relative overflow-hidden">
          {/* Elegant background grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-96 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none" />

          {/* Decorative floating ambient glow lights */}
          <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-amber-500/[0.03] filter blur-[120px] pointer-events-none animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-amber-600/[0.03] filter blur-[150px] pointer-events-none"></div>

          {/* Top navigation row with improved return button */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-10 z-10">
            <button 
              onClick={() => handleNavigate("home")}
              className="group inline-flex items-center space-x-3 text-[10px] font-mono font-black text-amber-500 hover:text-white uppercase tracking-widest cursor-pointer transition-all border border-amber-500/25 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/20 px-5 py-2.5 rounded-none shadow-[2px_2px_0px_0px_rgba(245,158,11,0.2)] hover:shadow-none"
            >
              <span className="transform group-hover:-translate-x-1.5 transition-transform duration-300 font-bold">←</span>
              <span>RETURN TO HOME BASE PORTFOLIO</span>
            </button>
          </div>

          {/* HERO SPLIT ROW */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* LEFT COLUMN: HERO INFORMATION */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-amber-500/10 border border-amber-500/35 rounded-none">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                  <span className="text-amber-500 font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
                    COMMUNICATION MATRIX // EST. 1982
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-none">
                    Atelier <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
                      Contact Desk
                    </span>
                  </h1>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                    Directly establish connection with our design directories, biological sourcing agents, and global shipping terminals. Secure, audited, and strictly confidential submissions only.
                  </p>
                </div>

                {/* Tag Metrics Bar */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="px-3 py-1.5 border border-border-primary text-text-secondary text-[9px] font-mono uppercase tracking-wider bg-surface-secondary/20">
                    [ 128-bit Encryption ]
                  </span>
                  <span className="px-3 py-1.5 border border-border-primary text-text-secondary text-[9px] font-mono uppercase tracking-wider bg-surface-secondary/20">
                    [ Certified Organic Origin ]
                  </span>
                  <span className="px-3 py-1.5 border border-border-primary text-text-secondary text-[9px] font-mono uppercase tracking-wider bg-surface-secondary/20">
                    [ ISO 9001:2015 Audited ]
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: REFINED BLUEPRINT SVG */}
              <div className="lg:col-span-5 hidden lg:flex justify-end">
                <div className={`p-4 border border-amber-500/15 rounded-none relative overflow-hidden shadow-2xl ${theme === "dark" ? "bg-zinc-950/40" : "bg-zinc-50"}`}>
                  {/* Corner aesthetic notches */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber-500"></div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-500"></div>
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-amber-500"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-amber-500"></div>
                  
                  <div className="absolute top-2 right-4 text-[7px] font-mono text-amber-500/40 uppercase tracking-widest">
                    SPEC MODEL: WH-902 / D_FOUR_HOLE
                  </div>

                  <svg viewBox="0 0 400 400" className="w-full max-w-[320px] aspect-square text-amber-500/80 drop-shadow-[0_0_12px_rgba(245,158,11,0.12)]">
                    <defs>
                      <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" className="opacity-30" />

                    <rect x="10" y="10" width="380" height="380" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" />
                    
                    <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" />
                    <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" />

                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "200px 200px" }}
                    >
                      <circle cx="200" cy="200" r="135" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                      <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="5 3" />
                      <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
                      
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const x1 = 200 + 130 * Math.cos(angle);
                        const y1 = 200 + 130 * Math.sin(angle);
                        const x2 = 200 + 140 * Math.cos(angle);
                        const y2 = 200 + 140 * Math.sin(angle);
                        return (
                          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                        );
                      })}

                      <circle cx="170" cy="170" r="7" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      <circle cx="230" cy="170" r="7" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      <circle cx="170" cy="230" r="7" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      <circle cx="230" cy="230" r="7" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                    </motion.g>

                    <path d="M 200 65 L 335 65" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="340" y="68" className="font-mono text-[7.5px] fill-amber-500 font-bold" textAnchor="start">D=28.00mm (44L)</text>
                    
                    <path d="M 200 95 L 310 95" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="315" y="98" className="font-mono text-[7.5px] fill-amber-500/80" textAnchor="start">RIM=1.50mm</text>

                    <path d="M 170 170 L 170 135 L 135 135" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
                    <text x="130" y="138" className="font-mono text-[7.5px] fill-amber-500/70" textAnchor="end">HOLE D=2.20mm</text>

                    <text x="200" y="32" className="font-mono text-[7.5px] fill-amber-500/40" textAnchor="middle">0° Y-AXIS</text>
                    <text x="368" y="202" className="font-mono text-[7.5px] fill-amber-500/40" textAnchor="middle">90° X-AXIS</text>
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* ACTIVE DESKS SUBSECTION GRID */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12 z-10">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              
              {/* DESK 1: MILAN DESIGN DESK */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      type: "spring", 
                      stiffness: 85, 
                      damping: 15 
                    } 
                  }
                }}
                className="h-full"
              >
                <MagneticDeskCard
                  theme={theme}
                  className="p-5 h-full flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-none text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[9px] font-mono font-black text-emerald-500 uppercase tracking-widest">
                          SECURE LINE
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-amber-500 font-mono text-[8.5px] font-bold tracking-widest uppercase block">
                        DESIGN & BLUEPRINTS
                      </span>
                      <h3 className="font-serif text-base font-black uppercase text-text-primary">
                        Milan Couture Base
                      </h3>
                    </div>

                    <div className="space-y-1.5 border-t border-border-primary pt-3 font-mono text-[10px] text-text-secondary">
                      <div className="flex justify-between">
                        <span>COORDINATES:</span>
                        <span className="text-text-primary font-bold">45.4642° N • 9.1900° E</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ISO MATRIX:</span>
                        <span className="text-text-primary font-bold">MILAN-CAD-01</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-primary flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                      <span className="text-[10px] font-mono tracking-wider">LOCAL TIME:</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-500">
                      {times.milan} CET
                    </span>
                  </div>
                </MagneticDeskCard>
              </motion.div>

              {/* DESK 2: SAMBHAL ATELIER */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      type: "spring", 
                      stiffness: 85, 
                      damping: 15 
                    } 
                  }
                }}
                className="h-full"
              >
                <MagneticDeskCard
                  theme={theme}
                  className="p-5 h-full flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-none text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[9px] font-mono font-black text-emerald-500 uppercase tracking-widest">
                          DISPATCH READY
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-amber-500 font-mono text-[8.5px] font-bold tracking-widest uppercase block">
                        SOURCE & CRAFTING
                      </span>
                      <h3 className="font-serif text-base font-black uppercase text-text-primary">
                        Sambhal Sourcing Desk
                      </h3>
                    </div>

                    <div className="space-y-1.5 border-t border-border-primary pt-3 font-mono text-[10px] text-text-secondary">
                      <div className="flex justify-between">
                        <span>COORDINATES:</span>
                        <span className="text-text-primary font-bold">28.5800° N • 78.5500° E</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VET CERTIFIED:</span>
                        <span className="text-text-primary font-bold">UP-SAM-44</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-primary flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                      <span className="text-[10px] font-mono tracking-wider">LOCAL TIME:</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-500">
                      {times.sambhal} IST
                    </span>
                  </div>
                </MagneticDeskCard>
              </motion.div>

              {/* DESK 3: MUNDRA SHIPPING */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      type: "spring", 
                      stiffness: 85, 
                      damping: 15 
                    } 
                  }
                }}
                className="h-full"
              >
                <MagneticDeskCard
                  theme={theme}
                  className="p-5 h-full flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-none text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                        <Anchor className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[9px] font-mono font-black text-emerald-500 uppercase tracking-widest">
                          LOGISTICS ON
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-amber-500 font-mono text-[8.5px] font-bold tracking-widest uppercase block">
                        PORTS & CONTAINER CARGO
                      </span>
                      <h3 className="font-serif text-base font-black uppercase text-text-primary">
                        Mundra Port Desk
                      </h3>
                    </div>

                    <div className="space-y-1.5 border-t border-border-primary pt-3 font-mono text-[10px] text-text-secondary">
                      <div className="flex justify-between">
                        <span>COORDINATES:</span>
                        <span className="text-text-primary font-bold">22.8400° N • 69.7000° E</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LOT ROUTING:</span>
                        <span className="text-text-primary font-bold">MUNDRA-OCEAN-FOB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-primary flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                      <span className="text-[10px] font-mono tracking-wider">LOCAL TIME:</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-500">
                      {times.sambhal} IST
                    </span>
                  </div>
                </MagneticDeskCard>
              </motion.div>

            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <ContactSection whatsappNumber={whatsappNumber} />
          </motion.div>
        </div>
      )}

      <ScrollRevealDivider />

      <Footer whatsappNumber={whatsappNumber} onOpenLegal={handleOpenLegal} onOpenConfig={() => setIsConfigOpen(true)} onNavigate={handleNavigate} />

      {/* Floating Widgets */}
      <PartnerSettings
        isConfigOpen={isConfigOpen}
        setIsConfigOpen={setIsConfigOpen}
        whatsappNumber={whatsappNumber}
        setWhatsappNumber={setWhatsappNumber}
        companyName={companyName}
        setCompanyName={setCompanyName}
      />

      {/* Modals & Trays */}
      <AnimatePresence>
        {isLegalOpen && (
          <LegalModal
            isOpen={isLegalOpen}
            onClose={() => setIsLegalOpen(false)}
            initialTab={legalTab}
          />
        )}

        {activeZoomProduct && (
          <ZoomModal
            product={activeZoomProduct}
            onClose={() => setActiveZoomProduct(null)}
            productSlideIndices={productSlideIndices}
            handleProductSlideChange={handleProductSlideChange}
            productFinishes={productFinishes}
            setProductFinishes={setProductFinishes}
            showToast={showToast}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedQuantities={selectedQuantities}
            setSelectedQuantities={setSelectedQuantities}
            getSingleProductWhatsAppUrl={getSingleProductWhatsAppUrl}
            handleCopyProductText={handleCopyProductText}
          />
        )}
      </AnimatePresence>

      <CommandPalette
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Dynamic Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed bottom-6 left-6 z-50 animate-bounce">
            <div className="bg-surface-secondary border-2 border-border-primary text-text-primary px-5 py-3 font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--color-border-primary)]">
              {toastMessage}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button with Dynamic Circular Progress */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 bg-zinc-950 dark:bg-zinc-900 text-amber-500 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 group border border-amber-500/10 cursor-pointer"
            title="Scroll Back to Top"
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 56 56">
              {/* Background Track Circle */}
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2.5"
                className="opacity-10 text-zinc-600 dark:text-zinc-400"
              />
              {/* Foreground Animated Progress Circle */}
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="#f59e0b" /* amber-500 */
                strokeWidth="3.5"
                strokeDasharray="150.8"
                strokeDashoffset={150.8 - (scrollProgress / 100) * 150.8}
                strokeLinecap="round"
                className="transition-all duration-100 ease-out"
              />
            </svg>
            
            {/* Arrow Up Icon */}
            <ArrowUp className="w-5 h-5 text-amber-500 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Persistent Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_4px_24px_rgba(16,185,129,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 group border border-emerald-400/30 cursor-pointer"
        title="Direct B2B Chat on WhatsApp"
      >
        {/* Animated pulsing outer ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-75 group-hover:opacity-0 transition-opacity"></span>
        
        {/* WhatsApp Icon */}
        <svg 
          className="w-7 h-7 filter drop-shadow-md" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      </div>
    </ThemeContext.Provider>
  );
}
