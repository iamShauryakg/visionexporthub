import React from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Compass, 
  ShieldCheck, 
  Instagram, 
  Linkedin, 
  Award, 
  FileText, 
  Truck, 
  Globe2, 
  PenTool,
  Twitter
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import Logo from "../images/logo/vision logo.png";

interface FooterProps {
  whatsappNumber: string;
  onOpenLegal: (tab: "privacy" | "moq" | "certificates" | "terms" | "freight") => void;
  onOpenConfig: () => void;
  onNavigate?: (view: "home" | "contact", targetHash?: string) => void;
}

export default function Footer({ whatsappNumber, onOpenLegal, onOpenConfig, onNavigate }: FooterProps) {
  return (
    <footer className="bg-white text-zinc-950 border-t-4 border-zinc-950 pt-24 pb-12 relative overflow-hidden" id="footer">
      {/* Background Watermark */}
      <div className="absolute bottom-0 right-0 opacity-[0.015] text-[15vw] font-serif font-black select-none pointer-events-none uppercase tracking-tighter transform translate-y-1/3 translate-x-12">
        SAMBHAL
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10"
      >
        
        {/* TOP LEVEL: Primary Contact & Brand Pitch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200">
          
          {/* Brand Info & Vision Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center font-serif font-black text-black text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <img src={Logo} alt="Vision Export Logo" />   
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-[0.15em] font-black uppercase text-zinc-950">
                  VISION
                </span>
                <span className="text-[9px] tracking-[0.25em] text-amber-600 font-mono font-bold uppercase -mt-1">
                  IMPORT & EXPORT
                </span>
              </div>
            </div>
            
            <p className="text-xs text-zinc-500 font-sans leading-relaxed font-medium">
              Vision Import & Export is a B2B manufacturer and exporter of ethically sourced buffalo horn, cattle horn, and bone products, producing premium button blanks, plates, toggles, and custom components for global fashion and accessory brands. We combine traditional craftsmanship with modern manufacturing to deliver consistent, sustainable, export-quality solutions.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-zinc-50 text-amber-700 text-[9px] font-mono font-bold tracking-widest uppercase border border-zinc-200">
                <Award className="w-3.5 h-3.5" />
                <span>100% Traceable By-Product</span>
              </span>
            </div>
          </div>

          {/* Sourcing & Technical Divisions */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase flex items-center space-x-2">
                <PenTool className="w-3.5 h-3.5" />
                <span>ATELIER DIVISIONS</span>
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-zinc-600 uppercase tracking-wider font-bold">
                <li><span className="text-zinc-400 font-normal mr-1.5">/ 01 /</span> Raw Horn Splitting</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ 02 /</span> Plate Slicing & Gauge</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ 03 /</span> Standard Blank Punching</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ 04 /</span> Custom Dye Calibrations</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ 05 /</span> Laser Logo Engravings</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5" />
                <span>EXPORT MATRIX</span>
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-zinc-600 uppercase tracking-wider font-bold">
                <li><span className="text-zinc-400 font-normal mr-1.5">/ FOB /</span> Mundra Port, IN</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ FOB /</span> Mumbai Port, IN</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ AIR /</span> IGI Airport, Delhi</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ REG /</span> IND-VET-CO Certified</li>
                <li><span className="text-zinc-400 font-normal mr-1.5">/ CERT /</span> CITES Free Exemption</li>
              </ul>
            </div>
          </div>

        </div>

        {/* MIDDLE LEVEL: Extensive Sourcing Contacts & Two Email IDs & Phone Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-4 border-b border-zinc-200">
          
          {/* Physical Address */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>ATELIER LOCATION</span>
            </h4>
            <div className="text-xs font-sans text-zinc-500 leading-relaxed font-medium">
              <strong className="text-zinc-950">Vision Manufacturing Complex:</strong><br />
              Saraitareen, Sambhal Manufacturing District,<br />
              Uttar Pradesh, Pin 244302, India
              <br />
              <a 
                href="https://maps.app.goo.gl/iJiDoMCnnKPvUPv27?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-amber-600 hover:underline mt-1.5 text-[11px] font-mono uppercase"
              >
                <span>[View on Google Maps]</span>
              </a>
            </div>
          </div>

          {/* TWO Phone Numbers (WhatsApp & Landline Desk) */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>COMMUNICATION DESKS</span>
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-zinc-500 font-bold uppercase w-14">Mobile:</span>
                <a 
                  href="tel:+919548470907" 
                  className="text-zinc-800 hover:text-amber-600 font-sans font-black transition-colors"
                >
                  +91 95484 70907
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-zinc-500 font-bold uppercase w-14">WhatsApp:</span>
                <a 
                  href="https://wa.me/919548470907" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-800 hover:text-amber-600 font-sans font-black transition-colors"
                >
                  +91 95484 70907 <span className="text-[9px] text-emerald-600 font-mono ml-1">[HOTLINE]</span>
                </a>
              </div>
            </div>
          </div>

          {/* TWO Email IDs (Trade & Support/Sourcing) */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>SECURE TRADE EMAILS</span>
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-zinc-500 font-bold uppercase w-14">Primary:</span>
                <a 
                  href="mailto:sales@visionexporthub.com" 
                  className="text-zinc-800 hover:text-amber-600 font-sans font-black transition-colors"
                >
                  sales@visionexporthub.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-zinc-500 font-bold uppercase w-14">Director:</span>
                <a 
                  href="mailto:Rkshah231@gmail.com" 
                  className="text-zinc-800 hover:text-amber-600 font-sans font-medium transition-colors"
                >
                  Rkshah231@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM LEVEL: Social Media handles, Compliance, Credits */}
        <div className="space-y-8 pt-4">
          
          {/* Social Accounts, High-Fashion Links, Custom Brand Showcase */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-900 pb-8">
            <div className="space-y-2 text-center md:text-left">
              <h5 className="text-[10px] font-mono font-black tracking-[0.2em] text-zinc-500 uppercase">
                DIGITAL PORTFOLIO REGISTERS
              </h5>
              <p className="text-[11px] font-sans text-zinc-400">
                Explore real-time specimen arrivals, custom shape trials, and private label ateliers on our channels.
              </p>
            </div>

            {/* Premium Social media desk icons & handles */}
            <div className="flex flex-wrap justify-center gap-2.5">
              <a 
                href="https://instagram.com/visionimportexport" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-amber-500 transition-colors group cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono text-zinc-300 group-hover:text-white uppercase font-bold tracking-wider">Instagram</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/vision-import-and-export-2355a7418?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-amber-500 transition-colors group cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono text-zinc-300 group-hover:text-white uppercase font-bold tracking-wider">LinkedIn</span>
              </a>
              <a 
                href="https://pin.it/7zgktYT6L" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-amber-500 transition-colors group cursor-pointer"
              >
                <FaPinterest className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono text-zinc-300 group-hover:text-white uppercase font-bold tracking-wider">Pinterest</span>
              </a>

              <a 
                href="https://www.facebook.com/share/1BZrBj8F2f/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-amber-500 transition-colors group cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono text-zinc-300 group-hover:text-white uppercase font-bold tracking-wider">Facebook</span>
              </a>

              <a 
                href="https://x.com/VisionImpoExpo" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-amber-500 transition-colors group cursor-pointer"
              >
                <Twitter className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono text-zinc-300 group-hover:text-white uppercase font-bold tracking-wider">X / Twitter</span>
              </a>

              <a 
                href="https://www.threads.net/@visionimportexport" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-amber-500 transition-colors group cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono text-zinc-300 group-hover:text-white uppercase font-bold tracking-wider">Threads</span>
              </a>
            </div>
          </div>

          {/* B2B Legal Desk Column-Based Groups */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-zinc-200 text-left">
            {/* Column 1: Trade Policies */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase">
                Trade Policies
              </h5>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <button 
                    onClick={() => onOpenLegal("moq")}
                    className="text-zinc-600 hover:text-amber-600 uppercase font-bold tracking-wider hover:underline transition-colors text-left cursor-pointer"
                  >
                    MOQ Trade Terms
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenLegal("terms")}
                    className="text-zinc-600 hover:text-amber-600 uppercase font-bold tracking-wider hover:underline transition-colors text-left cursor-pointer"
                  >
                    Terms of Sale
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Bio & Compliance */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase">
                Bio & Compliance
              </h5>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <button 
                    onClick={() => onOpenLegal("certificates")}
                    className="text-zinc-600 hover:text-amber-600 uppercase font-bold tracking-wider hover:underline transition-colors text-left cursor-pointer"
                  >
                    Quality Certificates
                  </button>
                </li>
                <li>
                  <span className="text-zinc-400 uppercase font-normal tracking-wider">
                    CITES Free Exempt
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Logistics Desk */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase">
                Logistics Desk
              </h5>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <button 
                    onClick={() => onOpenLegal("freight")}
                    className="text-zinc-600 hover:text-amber-600 uppercase font-bold tracking-wider hover:underline transition-colors text-left cursor-pointer"
                  >
                    Export & Freight Policy
                  </button>
                </li>
                <li>
                  <span className="text-zinc-400 uppercase font-normal tracking-wider">
                    Port Sourcing Matrices
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Sourcing Hub Admin */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-600 uppercase">
                Administration
              </h5>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <button 
                    onClick={() => onOpenLegal("privacy")}
                    className="text-zinc-600 hover:text-amber-600 uppercase font-bold tracking-wider hover:underline transition-colors text-left cursor-pointer"
                  >
                    B2B Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenConfig}
                    className="text-amber-600 hover:text-amber-500 uppercase font-black tracking-widest hover:underline transition-colors text-left flex items-center cursor-pointer"
                  >
                    <span className="inline-block animate-pulse w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
                    <span>Config Sourcing Desk</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Compliance and Register Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-6 border-b border-zinc-100 pb-6 text-zinc-500 font-mono text-[10px] tracking-widest">
            <div className="space-y-1">
              <p className="font-bold text-zinc-700">
                © {new Date().getFullYear()} VISION IMPORT & EXPORT. ALL RIGHTS RESERVED.
              </p>
              <p className="text-[9px] text-zinc-400">
                PROCESSED WITH EXCLUSIVE ARTISANAL PROTOCOLS IN SAMBHAL, INDIA.
              </p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end gap-3 text-[9px] font-black text-amber-600/80 uppercase">
              <span className="border border-zinc-200 px-2 py-0.5">OEKO-TEX STANDARD 100</span>
              <span className="border border-zinc-200 px-2 py-0.5">CE REGISTERED</span>
              <span className="border border-zinc-200 px-2 py-0.5">VETERINARY SANITISED</span>
              <span className="border border-zinc-200 px-2 py-0.5">REACH PROTOCOL COMPLIANT</span>
            </div>
          </div>

          {/* Brand Signature and Development Credit */}
          <div className="pt-2 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 text-xs">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/75 animate-pulse"></span>
              <span>ENGINEERED FOR SUPREME B2B GLOBAL SUPPLY CHAINS</span>
            </div>
            
            <a 
              href="https://digitalomnicon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-amber-500/40 transition-all duration-300 rounded-none cursor-pointer"
            >
              <span className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-400 uppercase tracking-widest transition-colors">
                DESIGNED & DEVELOPED BY
              </span>
              <span className="text-[10px] font-sans font-black tracking-wider text-amber-600 group-hover:text-amber-500 transition-colors uppercase flex items-center">
                DIGITAL OMNICON
                <span className="ml-1.5 text-zinc-400 group-hover:text-amber-600 transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </span>
            </a>
          </div>

        </div>

      </motion.div>
    </footer>
  );
}

