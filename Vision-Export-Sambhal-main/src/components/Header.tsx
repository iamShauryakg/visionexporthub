import React, { useState, useEffect } from "react";
import { Menu, X, ShieldCheck, Globe, HelpCircle, ArrowLeft, ChevronDown, ChevronUp, ShoppingCart, Award, Package, CreditCard, Truck, Settings, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Product } from "../types";
import { FAQS } from "../data/constants";
import Logo from "../images/logo/vision logo.png"

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const formatPhone = (num: string) => {
  if (num.startsWith("91") && num.length === 12) {
    return "+91 " + num.slice(2, 7) + " " + num.slice(7);
  }
  return "+" + num;
};

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenLegal: (tab: "privacy" | "moq" | "certificates" | "terms" | "freight") => void;
  whatsappNumber: string;
  onOpenConfig: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  activeView?: "home" | "contact";
  onNavigate?: (view: "home" | "contact", targetHash?: string) => void;
}

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenLegal,
  whatsappNumber,
  onOpenConfig,
  theme,
  onToggleTheme,
  activeView = "home",
  onNavigate,
}: HeaderProps) {
  const [overlayView, setOverlayView] = useState<"menu" | "privacy" | "export" | "faq">("menu");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [isMobileLegalOpen, setIsMobileLegalOpen] = useState<boolean>(false);

  // Reset overlay state when mobile menu is closed
  useEffect(() => {
    if (!mobileMenuOpen) {
      setOverlayView("menu");
      setExpandedFaqIndex(null);
      setIsMobileLegalOpen(false);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* FIXED NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-zinc-900 shadow-sm text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate("home", "#hero");
              }
            }}
            className="flex items-center space-x-3 group" 
            id="nav-logo"
          >
            <div className="logo-medallion relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute inset-0.5 rounded-full border border-amber-500/10"></div>
              <div className="relative z-10 flex flex-col items-center justify-center -space-y-0.5">
                <span className="font-serif font-black text-amber-500 text-lg leading-none tracking-tighter select-none transform group-hover:scale-110 transition-transform duration-300">
                <img src={Logo} alt="Vision Export Logo"  />
                  
                </span>
                <div className="grid grid-cols-2 gap-1 mt-0.5 opacity-90">
                  <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                  <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.15em] font-black uppercase text-white group-hover:text-amber-500 transition-colors">
                VISION
              </span>
              <div className="flex items-center space-x-1 -mt-1.5">
                <div className="h-[1px] w-3 bg-amber-500/40 group-hover:bg-amber-500 transition-colors"></div>
                <span className="text-[8px] tracking-[0.25em] text-zinc-400 font-mono font-bold uppercase whitespace-nowrap group-hover:text-amber-500 transition-colors">
                  IMPORT & EXPORT
                </span>
                <div className="h-[1px] w-3 bg-amber-500/40 group-hover:bg-amber-500 transition-colors"></div>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links with Staggered Entrance */}
          <motion.nav 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1
                }
              }
            }}
            className="hidden lg:flex items-center space-x-6 text-xs tracking-widest uppercase font-bold text-zinc-300"
          >
            <motion.a 
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              href="#hero" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("home", "#hero");
                }
              }}
              className={`relative py-1 hover:text-amber-500 transition-colors duration-300 group ${activeView === "home" ? "text-amber-500" : ""}`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${activeView === "home" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </motion.a>
            <motion.a 
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              href="#about" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("home", "#about");
                }
              }}
              className="relative py-1 hover:text-amber-500 transition-colors duration-300 group"
            >
              Heritage
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
            <motion.a 
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              href="#products" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("home", "#products");
                }
              }}
              className="relative py-1 hover:text-amber-500 transition-colors duration-300 group"
            >
              Extended Catalog
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
            <motion.a 
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              href="#specs" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("home", "#specs");
                }
              }}
              className="relative py-1 hover:text-amber-500 transition-colors duration-300 group"
            >
              Technical Specs
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
            {/* <motion.a 
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              href="#qc" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("home", "#qc");
                }
              }}
              className="relative py-1 hover:text-amber-500 transition-colors duration-300 group"
            >
              Quality Matrix
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a> */}
            <motion.a 
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              href="#contact" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("contact");
                }
              }}
              className={`relative py-1 hover:text-amber-500 transition-colors duration-300 group ${activeView === "contact" ? "text-amber-500" : ""}`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${activeView === "contact" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </motion.a>
          </motion.nav>

          {/* Right Action Menu - Theme Toggle & WhatsApp Desk */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Desktop Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 border border-zinc-800 hover:border-zinc-500 bg-transparent text-zinc-300 hover:text-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center h-11 w-11 overflow-hidden relative"
              title={theme === "light" ? "Switch to Obsidian Dark Mode" : "Switch to Couture Light Mode"}
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-4 h-4 text-zinc-800" />
                  </motion.div>
                ) : (<motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn flex items-center space-x-2 px-4 py-2 border border-emerald-800 transition-all font-mono text-sm cursor-pointer group rounded-none"
              title="Direct WhatsApp Sourcing & Export Desk"
            >
              <WhatsAppIcon className="w-4.5 h-4.5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-bold font-mono text-white tracking-wider leading-none">{formatPhone(whatsappNumber)}</span>
            </a>
          </div>

          {/* Mobile Action Buttons - Unified WhatsApp & Theme Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 border border-zinc-800 bg-transparent text-zinc-300 hover:text-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
              title={theme === "light" ? "Switch to Obsidian Dark Mode" : "Switch to Couture Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-3.5 h-3.5 text-zinc-800" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn flex items-center space-x-1.5 px-3 py-2 border border-emerald-800 transition-all text-xs rounded-none"
              title="B2B WhatsApp Desk"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span className="text-xs font-bold font-mono text-white leading-none">{formatPhone(whatsappNumber)}</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-300 hover:text-amber-500 focus:outline-none cursor-pointer"
              id="btn-mobile-hamburger"
              title="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto pt-24 pb-6 px-6 backdrop-blur-lg ${theme === "dark" ? "bg-zinc-950/95 text-white" : "bg-white/95 text-zinc-900"}`}
            id="mobile-nav-menu"
          >
            {/* Ambient Background Grid lines */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] opacity-90 pointer-events-none -z-10 ${theme === "dark" ? "from-zinc-900 via-zinc-950 to-zinc-950" : "from-zinc-50 via-white to-white"}`}></div>
            <div className={`absolute inset-0 bg-[linear-gradient(rgba(${theme === "dark" ? "255,255,255,0.015" : "0,0,0,0.015"})_1px,_transparent_1px),_linear-gradient(90deg,_rgba(${theme === "dark" ? "255,255,255,0.015" : "0,0,0,0.015"})_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none -z-10`}></div>

            <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-between py-4">
              
              {/* CONDITIONAL SUB-PANELS */}
              {overlayView === "menu" ? (
                /* MAIN MENU VIEW */
                <div className="space-y-8">
                  {/* Primary Navigation Links */}
                  <div className="flex flex-col space-y-3.5 text-base font-serif tracking-wider">
                    <a
                      href="#hero"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate("/", "#hero");
                      }}
                      className={`group py-2 border-b flex justify-between items-center transition-colors ${theme === "dark" ? "border-zinc-800 text-zinc-200 hover:text-amber-500" : "border-zinc-200/80 text-zinc-800 hover:text-amber-600"}`}
                    >
                      <span className="font-bold">01. HOME BASE</span>
                      <span className={`text-[10px] font-mono group-hover:text-amber-500 uppercase tracking-widest transition-colors ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>[ REACH ]</span>
                    </a>
                    <a
                      href="#about"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate("home", "#about");
                      }}
                      className={`group py-2 border-b flex justify-between items-center transition-colors ${theme === "dark" ? "border-zinc-800 text-zinc-200 hover:text-amber-500" : "border-zinc-200/80 text-zinc-800 hover:text-amber-600"}`}
                    >
                      <span className="font-bold">02. THE HERITAGE</span>
                      <span className={`text-[10px] font-mono group-hover:text-amber-500 uppercase tracking-widest transition-colors ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>[ SAMBHAL ]</span>
                    </a>
                    <a
                      href="#products"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate("home", "#products");
                      }}
                      className={`group py-2 border-b flex justify-between items-center transition-colors ${theme === "dark" ? "border-zinc-800 text-zinc-200 hover:text-amber-500" : "border-zinc-200/80 text-zinc-800 hover:text-amber-600"}`}
                    >
                      <span className="font-bold">03. EXTENDED CATALOG</span>
                      <span className={`text-[10px] font-mono group-hover:text-amber-500 uppercase tracking-widest transition-colors ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>[ B2B SELECTION ]</span>
                    </a>
                    <a
                      href="#specs"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate("home", "#specs");
                      }}
                      className={`group py-2 border-b flex justify-between items-center transition-colors ${theme === "dark" ? "border-zinc-800 text-zinc-200 hover:text-amber-500" : "border-zinc-200/80 text-zinc-800 hover:text-amber-600"}`}
                    >
                      <span className="font-bold">04. TECHNICAL SPECS</span>
                      <span className={`text-[10px] font-mono group-hover:text-amber-500 uppercase tracking-widest transition-colors ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>[ METRICS ]</span>
                    </a>
                    {/* <a
                      href="#qc"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate("home", "#qc");
                      }}
                      className={`group py-2 border-b flex justify-between items-center transition-colors ${theme === "dark" ? "border-zinc-800 text-zinc-200 hover:text-amber-500" : "border-zinc-200/80 text-zinc-800 hover:text-amber-600"}`}
                    >
                      <span className="font-bold">05. QUALITY MATRIX</span>
                      <span className={`text-[10px] font-mono group-hover:text-amber-500 uppercase tracking-widest transition-colors ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>[ STANDARDS ]</span>
                    </a> */}
                    <a
                      href="#sustainability"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate("home", "#sustainability");
                      }}
                      className={`group py-2 border-b flex justify-between items-center transition-colors ${theme === "dark" ? "border-zinc-800 text-zinc-200 hover:text-amber-500" : "border-zinc-200/80 text-zinc-800 hover:text-amber-600"}`}
                    >
                      <span className="font-bold">05. SUSTAINABILITY</span>
                      <span className={`text-[10px] font-mono group-hover:text-amber-500 uppercase tracking-widest transition-colors ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>[ BY-PRODUCT ]</span>
                    </a>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate("contact");
                      }}
                      className={`group py-2 border-b flex justify-between items-center transition-colors ${theme === "dark" ? "border-zinc-800 text-zinc-200 hover:text-amber-500" : "border-zinc-200/80 text-zinc-800 hover:text-amber-600"}`}
                    >
                      <span className="font-bold">06. EXPORT DESK</span>
                      <span className={`text-[10px] font-mono group-hover:text-amber-500 uppercase tracking-widest transition-colors ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>[ DISPATCH ]</span>
                    </a>
                  </div>

                  {/* PREMIUM B2B LEGAL DESK ACCORDION */}
                  <div className="space-y-3 pt-2">
                    <div className={`border p-1.5 rounded-none transition-all ${theme === "dark" ? "border-zinc-800 bg-zinc-900/40" : "border-zinc-200 bg-zinc-50"}`}>
                      <button
                        onClick={() => setIsMobileLegalOpen(!isMobileLegalOpen)}
                        className={`w-full flex items-center justify-between py-2.5 px-3 font-mono text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}
                      >
                        <span className="flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>B2B LEGAL DESK</span>
                        </span>
                        {isMobileLegalOpen ? (
                          <ChevronUp className="w-4 h-4 text-amber-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isMobileLegalOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className={`grid grid-cols-2 gap-2 p-1.5 pt-3 border-t ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"}`}>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  onOpenLegal("privacy");
                                }}
                                className={`flex flex-col items-center justify-center p-3 border transition-all rounded-none text-center cursor-pointer group ${theme === "dark" ? "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 hover:border-amber-500/50" : "bg-white hover:bg-zinc-100 border-zinc-200 hover:border-amber-500/50"}`}
                              >
                                <ShieldCheck className="w-4 h-4 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                                <span className={`text-[8px] font-sans font-bold tracking-wider uppercase text-center transition-colors ${theme === "dark" ? "text-zinc-300 group-hover:text-white" : "text-zinc-700 group-hover:text-zinc-950"}`}>Privacy Policy</span>
                                <span className={`text-[6.5px] font-mono uppercase mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>B2B Traceability</span>
                              </button>

                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  onOpenLegal("moq");
                                }}
                                className={`flex flex-col items-center justify-center p-3 border transition-all rounded-none text-center cursor-pointer group ${theme === "dark" ? "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 hover:border-amber-500/50" : "bg-white hover:bg-zinc-100 border-zinc-200 hover:border-amber-500/50"}`}
                              >
                                <Package className="w-4 h-4 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                                <span className={`text-[8px] font-sans font-bold tracking-wider uppercase text-center transition-colors ${theme === "dark" ? "text-zinc-300 group-hover:text-white" : "text-zinc-700 group-hover:text-zinc-950"}`}>MOQ Trade Terms</span>
                                <span className={`text-[6.5px] font-mono uppercase mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>Minimum Lots</span>
                              </button>

                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  onOpenLegal("certificates");
                                }}
                                className={`flex flex-col items-center justify-center p-3 border transition-all rounded-none text-center cursor-pointer group ${theme === "dark" ? "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 hover:border-amber-500/50" : "bg-white hover:bg-zinc-100 border-zinc-200 hover:border-amber-500/50"}`}
                              >
                                <Award className="w-4 h-4 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                                <span className={`text-[8px] font-sans font-bold tracking-wider uppercase text-center transition-colors ${theme === "dark" ? "text-zinc-300 group-hover:text-white" : "text-zinc-700 group-hover:text-zinc-950"}`}>Quality Certs</span>
                                <span className={`text-[6.5px] font-mono uppercase mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>Veterinary</span>
                              </button>

                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  onOpenLegal("terms");
                                }}
                                className={`flex flex-col items-center justify-center p-3 border transition-all rounded-none text-center cursor-pointer group ${theme === "dark" ? "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 hover:border-amber-500/50" : "bg-white hover:bg-zinc-100 border-zinc-200 hover:border-amber-500/50"}`}
                              >
                                <CreditCard className="w-4 h-4 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                                <span className={`text-[8px] font-sans font-bold tracking-wider uppercase text-center transition-colors ${theme === "dark" ? "text-zinc-300 group-hover:text-white" : "text-zinc-700 group-hover:text-zinc-950"}`}>Terms of Sale</span>
                                <span className={`text-[6.5px] font-mono uppercase mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>SWIFT Wire</span>
                              </button>

                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  onOpenLegal("freight");
                                }}
                                className={`flex flex-col items-center justify-center p-3 border transition-all rounded-none text-center cursor-pointer group col-span-2 ${theme === "dark" ? "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 hover:border-amber-500/50" : "bg-white hover:bg-zinc-100 border-zinc-200 hover:border-amber-500/50"}`}
                              >
                                <Truck className="w-4 h-4 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                                <span className={`text-[8px] font-sans font-bold tracking-wider uppercase text-center transition-colors ${theme === "dark" ? "text-zinc-300 group-hover:text-white" : "text-zinc-700 group-hover:text-zinc-950"}`}>Export & Freight Policy</span>
                                <span className={`text-[6.5px] font-mono uppercase mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>Global Carrier</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ) : overlayView === "privacy" ? (
                /* PRIVACY POLICY SUB-VIEW */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setOverlayView("menu")}
                    className={`inline-flex items-center space-x-2 text-[10px] font-mono font-black uppercase transition-colors mb-2 cursor-pointer ${theme === "dark" ? "text-amber-500 hover:text-amber-400" : "text-amber-600 hover:text-amber-700"}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Navigation Desk</span>
                  </button>

                  <div className={`border-b pb-3 ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"}`}>
                    <h3 className={`font-serif text-lg font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-100" : "text-zinc-900"}`}>
                      Privacy & Confidentiality
                    </h3>
                    <p className={`text-[9px] font-mono uppercase tracking-widest mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                      Biological Traceability & Proprietary NDA Protocol
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 text-xs font-sans leading-relaxed scrollbar-thin">
                    <div className={`border-l-2 border-amber-500 p-3 space-y-1 ${theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-50"}`}>
                      <h4 className={`font-mono text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                        1. Proprietary Design NDA
                      </h4>
                      <p className={`text-[11px] ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Custom button blueprints, CAD vector drawings, custom-tooled specimen sizing configurations, and private brand logo engravings remain strictly proprietary. Under zero circumstances are client layouts shared with third-party fashion houses.
                      </p>
                    </div>

                    <div className={`border-l-2 border-amber-500 p-3 space-y-1 ${theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-50"}`}>
                      <h4 className={`font-mono text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                        2. Certified Biological Traceability
                      </h4>
                      <p className={`text-[11px] ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        We trace 100% of our organic horns and bone specimens to certified, municipal agriculture meat-processing by-product yards in Sambhal and wider Uttar Pradesh. No raw specimens are harvested from protected forest reserves or wild habitats.
                      </p>
                    </div>

                    <div className={`border-l-2 border-amber-500 p-3 space-y-1 ${theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-50"}`}>
                      <h4 className={`font-mono text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                        3. Secure Transaction Ledger
                      </h4>
                      <p className={`text-[11px] ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Corporate contact profiles, physical mailing registers, custom sample dispatch histories, and bank Swift transfer records are handled with strict security protocols. We do not maintain public lists of our high-fashion luxury brand partners.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : overlayView === "export" ? (
                /* EXPORT TERMS SUB-VIEW */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setOverlayView("menu")}
                    className={`inline-flex items-center space-x-2 text-[10px] font-mono font-black uppercase transition-colors mb-2 cursor-pointer ${theme === "dark" ? "text-amber-500 hover:text-amber-400" : "text-amber-600 hover:text-amber-700"}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Navigation Desk</span>
                  </button>

                  <div className={`border-b pb-3 ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"}`}>
                    <h3 className={`font-serif text-lg font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-100" : "text-zinc-900"}`}>
                      FOB Sambhal Export Terms
                    </h3>
                    <p className={`text-[9px] font-mono uppercase tracking-widest mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                      B2B Sourcing, Calibrations & Transfer Rules
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 text-xs font-sans leading-relaxed scrollbar-thin">
                    <div className={`border-l-2 border-amber-500 p-3 space-y-1 ${theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-50"}`}>
                      <h4 className={`font-mono text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                        1. Minimum Order Quantity (MOQ)
                      </h4>
                      <p className={`text-[11px] ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Due to the meticulous process of calibrating latches, setting up customized lathe speeds, and managing organic dye batches, we maintain a firm MOQ of 5,000 Pcs for standard button blanks and 200 Pcs for custom-cut flat sheets.
                      </p>
                    </div>

                    <div className={`border-l-2 border-amber-500 p-3 space-y-1 ${theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-50"}`}>
                      <h4 className={`font-mono text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                        2. Global Delivery & FOB Ports
                      </h4>
                      <p className={`text-[11px] ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Our primary freight logistics route is FOB via Mundra Port or Nhava Sheva (Mumbai). Small-batch sample orders and urgent air shipments dispatch immediately from Indira Gandhi International Airport (IGIA), Delhi via DHL, FedEx, or UPS.
                      </p>
                    </div>

                    <div className={`border-l-2 border-amber-500 p-3 space-y-1 ${theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-50"}`}>
                      <h4 className={`font-mono text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                        3. Payment Milestones
                      </h4>
                      <p className={`text-[11px] ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Standard wholesale orders require a 50% advance deposit by wire transfer upon formal pre-production sample sign-off. The remaining 50% is due immediately upon presenting the Bill of Lading (B/L) and Veterinary Sanitary Certificates.
                      </p>
                    </div>

                    <div className={`border-l-2 border-amber-500 p-3 space-y-1 ${theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-50"}`}>
                      <h4 className={`font-mono text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                        4. Biological Material Tolerances
                      </h4>
                      <p className={`text-[11px] ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        As our products are crafted from authentic horn and bovine bone, natural grain swirls, occasional color fluctuations, and minor fiber variations are inherent. Thicknesses are calibrated to a precise ±0.15mm margin.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* FAQ DESK SUB-VIEW (ACCORDION) */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setOverlayView("menu")}
                    className={`inline-flex items-center space-x-2 text-[10px] font-mono font-black uppercase transition-colors mb-2 cursor-pointer ${theme === "dark" ? "text-amber-500 hover:text-amber-400" : "text-amber-600 hover:text-amber-700"}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Navigation Desk</span>
                  </button>

                  <div className={`border-b pb-3 ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"}`}>
                    <h3 className={`font-serif text-lg font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-100" : "text-zinc-900"}`}>
                      B2B Sourcing Support
                    </h3>
                    <p className={`text-[9px] font-mono uppercase tracking-widest mt-0.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                      Frequently Asked Wholesale Sourcing Questions
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
                    {FAQS.map((faq, idx) => {
                      const isExpanded = expandedFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`border transition-colors ${theme === "dark" ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-200 bg-white"}`}
                        >
                          <button
                            onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                            className={`w-full flex items-center justify-between p-3.5 text-left font-sans text-xs font-semibold transition-colors cursor-pointer ${theme === "dark" ? "text-zinc-200 hover:text-amber-500" : "text-zinc-800 hover:text-amber-600"}`}
                          >
                            <span>{faq.question}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-amber-600 ml-2 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-zinc-400 ml-2 flex-shrink-0" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className={`px-3.5 pb-4 pt-1 font-sans text-[11px] leading-relaxed border-t ${theme === "dark" ? "text-zinc-400 border-zinc-800" : "text-zinc-600 border-zinc-200"}`}>
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* BRAND INDICATOR */}
              <div className={`pt-6 border-t ${theme === "light" ? "border-zinc-800" : "border-zinc-200"}`}>
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="flex items-center space-x-1.5 text-[8px] font-mono tracking-[0.15em] text-zinc-500 font-bold uppercase">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>SAMBHAL EXPORT HUB ORIGIN • CITES EXEMPTED</span>
                  </div>
                  <p className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">
                    OEKO-TEX STANDARD 100 • REGISTERED UNDER IND-VET-CO
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

