import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SectionItem {
  id: string;
  label: string;
}

interface NavigationDotsProps {
  theme: "dark" | "light";
  activeView: string;
}

const SECTIONS: SectionItem[] = [
  { id: "home", label: "Home Base" },
  { id: "about", label: "About Us" },
  { id: "specimen-configurator", label: "Configurator" },
  { id: "products", label: "Products Catalog" },
  { id: "showroom", label: "3D Showroom" },
  { id: "material-lab", label: "Sourcing Science" },
  { id: "specs", label: "Technical Specs" },
  { id: "quality", label: "Quality Assurance" },
  { id: "process", label: "Processing & Slicing" },
  { id: "gallery", label: "Vision Gallery" },
  { id: "raw-materials", label: "Raw Materials" },
  { id: "testimonials", label: "Client Testimonials" },
  { id: "calibration", label: "Calibration Suite" },
  { id: "faq", label: "FAQ Desk" },
  { id: "compliance", label: "Compliance & CSR" },
  { id: "partners", label: "Global Clients" }
];

export default function NavigationDots({ theme, activeView }: NavigationDotsProps) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    if (activeView !== "home") return;

    // Track active section using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px", // Trigger when section occupies the upper-middle viewing area
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that is currently intersecting
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each section DOM element
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    // Fallback for scroll tracking at extreme top or bottom
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      if (scrollY < 100) {
        setActiveSection("home");
      } else if (scrollY + winHeight >= docHeight - 50) {
        setActiveSection(SECTIONS[SECTIONS.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeView]);

  if (activeView !== "home") return null;

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset slightly to account for sticky header height
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div 
      id="side-navigation-dots"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center py-5 px-3 bg-zinc-950/40 dark:bg-black/40 backdrop-blur-md border border-zinc-800/40 dark:border-zinc-900/40 rounded-full shadow-[0_15px_35px_-5px_rgba(0,0,0,0.3)] space-y-3.5"
    >
      {SECTIONS.map((section, idx) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-center group"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Tooltip Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: -14, scale: 1 }}
                  exit={{ opacity: 0, x: 5, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-full whitespace-nowrap px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider uppercase bg-zinc-950 dark:bg-zinc-900 text-amber-500 border border-amber-500/20 shadow-xl pointer-events-none rounded-none"
                >
                  <span className="text-zinc-500 mr-1.5">{String(idx + 1).padStart(2, "0")}</span>
                  {section.label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot Button */}
            <button
              onClick={() => handleDotClick(section.id)}
              className="relative p-1 focus:outline-none group cursor-pointer"
              aria-label={`Scroll to ${section.label}`}
            >
              {/* Outer Pulsing Aura for Active Dot */}
              {isActive && (
                <motion.span
                  layoutId="activeDotRing"
                  className="absolute inset-0 rounded-full border border-amber-500/60 scale-[1.7]"
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                />
              )}

              {/* Core Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.25 : isHovered ? 1.15 : 1,
                  backgroundColor: isActive 
                    ? "#f59e0b" // amber-500
                    : theme === "light" 
                      ? "#a1a1aa" // zinc-400
                      : "#3f3f46" // zinc-700
                }}
                className="w-2 h-2 rounded-full transition-colors duration-200"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
