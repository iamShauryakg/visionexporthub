import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  X, 
  ShieldCheck, 
  Award, 
  CreditCard, 
  Scale, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Package,
  FileCheck
} from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "privacy" | "moq" | "certificates" | "terms" | "freight";
}

export default function LegalModal({ isOpen, onClose, initialTab = "privacy" }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<"privacy" | "moq" | "certificates" | "terms" | "freight">(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const tabs = [
    {
      id: "privacy" as const,
      label: "B2B Privacy Policy",
      icon: ShieldCheck,
      subtitle: "Materials NDA & Traceability"
    },
    {
      id: "moq" as const,
      label: "MOQ Trade Terms",
      icon: Package,
      subtitle: "Lot Calibration & Custom Quantities"
    },
    {
      id: "certificates" as const,
      label: "Quality Certificates",
      icon: Award,
      subtitle: "Veterinary Quarantine & REACH"
    },
    {
      id: "terms" as const,
      label: "Terms of Sale",
      icon: CreditCard,
      subtitle: "SWIFT Bank Transfers & Deposits"
    },
    {
      id: "freight" as const,
      label: "Export Terms & Freight Carrier Policy",
      icon: Truck,
      subtitle: "Incoterms & Global Cargo Routing"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      {/* Animated Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25 }}
        className="bg-zinc-950 border-2 border-zinc-850 w-full max-w-5xl h-auto max-h-[90vh] flex flex-col md:flex-row relative overflow-hidden text-white"
        id="legal-compliance-modal"
      >
        
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_32px] pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-9 h-9 bg-black border border-zinc-800 text-gray-600 dark:text-zinc-400  hover:text-white hover:border-amber-500 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Close legal panel"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT PANEL: Responsive Navigation Desk */}
          <div className="w-full md:w-80 bg-white dark:bg-[#070709] border-b md:border-b-0 md:border-r border-gray-300 dark:border-zinc-900 p-6 flex flex-col justify-between relative z-10 space-y-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-[0.2em] block">
                Vision Desk
              </span>

              <h3 className="font-sans text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Official Disclosures.
              </h3>

              <p className="text-[10px] font-mono text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                VERIFIED SOURCE // SAMBHAL INDIA
              </p>
            </div>

            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-3 border transition-all rounded-none cursor-pointer flex flex-col ${
                      isSelected
                        ? "bg-amber-50 dark:bg-zinc-900 border-amber-500 text-gray-900 dark:text-white"
                        : "bg-gray-50 dark:bg-zinc-950/60 border-gray-300 dark:border-zinc-900 text-gray-700 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 ${
                          isSelected
                            ? "text-amber-500"
                            : "text-gray-500 dark:text-zinc-500"
                        }`}
                      />

                      <span className="text-xs font-sans font-bold tracking-wide">
                        {tab.label}
                      </span>
                    </div>

                    <span className="text-[9px] block mt-1 leading-snug font-sans font-medium text-gray-500 dark:text-zinc-500 lowercase first-letter:uppercase">
                      {tab.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Regulatory Panel */}
          <div className="bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-900 p-4 space-y-3">
            <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 dark:text-zinc-500 block uppercase">
              Global Clearance Checklist
            </span>

            <div className="space-y-2 text-[10px] font-mono text-gray-700 dark:text-zinc-400 leading-normal uppercase">
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>REACH Directives</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>CITES Free Sourcing</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>IND-VET-CO Registered</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AREA: Full Document Viewer (Designed with Ultra-Readable Sans-Serif Font) */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto h-[60vh] md:h-[80vh] p-8 relative z-10 bg-black/40 legal-page legal-content-area">
          
          <div className="space-y-6">
            
            {/* Active Header Section */}
          <div>
            {activeTab === "privacy" && (
              <div className="space-y-1">
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
                  B2B Privacy Policy & Materials Traceability
                </h2>
                <p className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
                  DOCUMENT REF: VIMP-B2B-PRV-2026
                </p>
              </div>
            )}

         {activeTab === "moq" && (
          <div className="space-y-1">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
              MOQ Trade Terms & Custom Lots
            </h2>
            <p className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              DOCUMENT REF: VIMP-MOQ-TRD-2026
            </p>
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="space-y-1">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
              Quality Certificates & Health Audits
            </h2>
            <p className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              DOCUMENT REF: VIMP-QC-VET-2026
            </p>
          </div>
        )}

          {activeTab === "terms" && (
            <div className="space-y-1">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
                Terms of Sale & Settlement Milestones
              </h2>
              <p className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                DOCUMENT REF: VIMP-TOS-SLS-2026
              </p>
            </div>
          )}

          {activeTab === "freight" && (
            <div className="space-y-1">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
                Export Terms & Freight Carrier Policy
              </h2>
              <p className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                DOCUMENT REF: VIMP-EXP-FRT-2026
              </p>
            </div>
          )}

  <div className="w-12 h-[3px] bg-amber-600 dark:bg-amber-500 mt-3"></div>
</div>

            {/* Scrollable Document Core Content */}
            <div className="font-sans text-sm text-zinc-300 leading-relaxed space-y-6">
              
            {activeTab === "privacy" && (
              <>
                <p className="text-gray-700 dark:text-zinc-400 font-sans text-xs">
                  We appreciate the proprietary and sensitive nature of custom designs crafted by elite luxury global fashion houses. This document clarifies our biological traceability, design custody, and information transparency rules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                  <div className="bg-white dark:bg-[#08080a] border border-gray-300 dark:border-zinc-900 p-4.5 rounded-none space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">
                      1. Biological Traceability
                    </h4>
                    <p className="text-[10px] text-gray-700 dark:text-zinc-400 leading-normal">
                      All raw materials (including buffalo horn structures, cow horn tips, and bovine bone blanks) are obtained exclusively as agricultural by-products of regional food facilities.
                    </p>
                    <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-500 uppercase tracking-widest block pt-1">
                      // 100% ETHICALLY HARVESTED
                    </span>
                  </div>

                  <div className="bg-white dark:bg-[#08080a] border border-gray-300 dark:border-zinc-900 p-4.5 rounded-none space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">
                      2. Client CAD & NDA Protection
                    </h4>
                    <p className="text-[10px] text-gray-700 dark:text-zinc-400 leading-normal">
                      Any custom CAD files, button specifications, unique logo laser formats, or specialized physical molds are locked in secure custody. Custom molds are strictly restricted to your account runs.
                    </p>
                    <span className="text-[8px] font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest block pt-1">
                      // COMPREHENSIVE NDAS SIGNED
                    </span>
                  </div>

                  <div className="bg-white dark:bg-[#08080a] border border-gray-300 dark:border-zinc-900 p-4.5 rounded-none space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">
                      3. Secure Communications
                    </h4>
                    <p className="text-[10px] text-gray-700 dark:text-zinc-400 leading-normal">
                      Your wholesale coordinates, specifications, and inquiries are archived under rigid cybersecurity controls. We do not distribute your contact logs or RFQ details to list brokers.
                    </p>
                    <span className="text-[8px] font-mono text-gray-500 dark:text-zinc-500 block pt-1">
                      sales@visionexporthub.com
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-900 rounded-none space-y-2">
                  <span className="text-[9px] font-mono font-bold uppercase text-amber-600 dark:text-amber-500 tracking-wider">
                    Corporate Commitment
                  </span>
                  <p className="text-gray-700 dark:text-zinc-400 text-xs leading-normal">
                    Vision Export Hub is committed to a clean supply chain. We certify that zero horn, bone, or animal components are obtained from wild animals, forest reserves, or endangered species protected under CITES. All processing occurs in our state-of-the-art facility in Sambhal, India.
                  </p>
                </div>
              </>
            )}

              {activeTab === "moq" && (
              <>
                <p className="text-gray-700 dark:text-zinc-300 font-sans text-xs">
                  To maintain rigorous dimensional calibration on high-speed CNC lathes and ensure color batch consistency, standard MOQ thresholds are strictly enforced:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#070709] my-4">
                  <table className="w-full text-left text-xs text-gray-700 dark:text-zinc-300">
                    <thead className="bg-gray-100 dark:bg-[#0c0c10] text-[9px] uppercase tracking-wider font-mono text-gray-600 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800">
                      <tr>
                        <th className="p-3">Material Category</th>
                        <th className="p-3 text-right">Standard MOQ</th>
                        <th className="p-3">Calibration Setup Policy</th>
                        <th className="p-3">Lead Time Estimate</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                      <tr className="hover:bg-gray-50 dark:hover:bg-zinc-900/40 transition-colors">
                        <td className="p-3 font-semibold text-gray-900 dark:text-white">
                          Horn Button Blanks
                        </td>
                        <td className="p-3 text-right text-amber-600 dark:text-amber-500 font-bold">
                          5,000 Pcs
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          Free with run (Per size & thickness)
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          15 - 20 Business Days
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-zinc-900/40 transition-colors">
                        <td className="p-3 font-semibold text-gray-900 dark:text-white">
                          Bone Buttons & Blanks
                        </td>
                        <td className="p-3 text-right text-amber-600 dark:text-amber-500 font-bold">
                          3,000 Pcs
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          Free with run (Natural or bleached)
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          20 - 25 Business Days
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-zinc-900/40 transition-colors">
                        <td className="p-3 font-semibold text-gray-900 dark:text-white">
                          Premium Horn Plates
                        </td>
                        <td className="p-3 text-right text-amber-600 dark:text-amber-500 font-bold">
                          250 Pcs
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          Custom flat stock thickness leveling
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          10 - 15 Business Days
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-zinc-900/40 transition-colors">
                        <td className="p-3 font-semibold text-gray-900 dark:text-white">
                          Natural Raw Horn Tips
                        </td>
                        <td className="p-3 text-right text-amber-600 dark:text-amber-500 font-bold">
                          100 Kilograms
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          By-weight lot assortment
                        </td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400 text-xs">
                          7 - 10 Business Days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4.5 space-y-2.5">
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Custom Prototyping & Sample Mockups
                  </h5>

                  <p className="text-gray-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                    We offer physical sample prototyping with CAD adjustments before full production commitment. A small setup charge of $150 applies for customized drill jig adjustments or laser plate carvings, which is fully credited back and subtracted from your final wholesale invoice upon signing off the production run.
                  </p>
                </div>
              </>
            )}

             {activeTab === "certificates" && (
              <>
                <p className="text-gray-700 dark:text-zinc-300 font-sans text-xs mb-4">
                  Every batch processed in our Sambhal manufacturing hub is accompanied by full export documentation conforming to international veterinary health and custom clearance standards:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                    <div className="absolute -top-3 -right-3 w-16 h-16 border-2 border-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500/10 font-mono text-[8px] tracking-tight uppercase select-none pointer-events-none rotate-12">
                      OFFICIAL APPROVED
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/25 text-emerald-600 dark:text-emerald-500 rounded-none flex-shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                          1. Veterinary Sanitary Certificate
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-normal">
                          Issued by the Government of India, Ministry of Fisheries, Animal Husbandry & Dairying. Verifies pathogen-free sterilization at 130°C.
                        </p>
                        <div className="text-[8px] font-mono text-gray-500 dark:text-zinc-500 mt-2">
                          DOC REF: IND-VET-MIN-2026
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                    <div className="absolute -top-3 -right-3 w-16 h-16 border-2 border-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500/10 font-mono text-[8px] tracking-tight uppercase select-none pointer-events-none -rotate-12">
                      EXEMPT VERIFIED
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/25 text-amber-600 dark:text-amber-500 rounded-none flex-shrink-0">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                          2. CITES Exemption Declaration
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-normal">
                          Official certification proving source material is strictly harvested from domestic livestock (<span className="italic font-mono">Bubalus bubalis</span>), exempt from CITES wildlife restrictions.
                        </p>
                        <div className="text-[8px] font-mono text-gray-500 dark:text-zinc-500 mt-2">
                          DOC REF: CITES-EXMPT-DOM
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                    <div className="absolute -top-3 -right-3 w-16 h-16 border-2 border-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500/10 font-mono text-[8px] tracking-tight uppercase select-none pointer-events-none rotate-45">
                      REACH COMPLIANT
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-500/25 text-blue-600 dark:text-blue-400 rounded-none flex-shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                          3. REACH Directive Compliance
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-normal">
                          Verifies that our coloring dyes and mechanical polished layers are completely free from restricted substances, toxic formaldehyde, and chemical solvents.
                        </p>
                        <div className="text-[8px] font-mono text-gray-500 dark:text-zinc-500 mt-2">
                          DOC REF: REACH-EU-SAFETY
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                    <div className="absolute -top-3 -right-3 w-16 h-16 border-2 border-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500/10 font-mono text-[8px] tracking-tight uppercase select-none pointer-events-none -rotate-45">
                      DEEP STERILISE
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-teal-100 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-500/25 text-teal-600 dark:text-teal-400 rounded-none flex-shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                          4. Fumigation / Phytosanitary Certificate
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-normal">
                          Ensures container-level methyl bromide or advanced heat treatment of pallets, preventing any transit pest vectors.
                        </p>
                        <div className="text-[8px] font-mono text-gray-500 dark:text-zinc-500 mt-2">
                          DOC REF: FUM-PHYTO-LOT-X
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

             {activeTab === "terms" && (
              <>
                <p className="text-gray-700 dark:text-zinc-300 font-sans text-xs">
                  Our wholesale B2B international sale agreements are executed securely under standard commercial frameworks to guarantee swift procurement:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-sans">
                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 space-y-3">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-500 uppercase block font-bold tracking-wider">
                      // SETTLEMENT MILESTONES
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 pb-2">
                        <span className="text-gray-800 dark:text-zinc-300 font-semibold">
                          1. Advance Telegraphic Deposit:
                        </span>
                        <span className="font-mono text-amber-700 dark:text-white bg-amber-100 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 px-2 py-0.5 font-bold">
                          50% Deposit
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <span className="text-gray-800 dark:text-zinc-300 font-semibold">
                          2. Balance Upon Shipment Ready:
                        </span>
                        <span className="font-mono text-gray-800 dark:text-white bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 px-2 py-0.5 font-bold">
                          50% Balance
                        </span>
                      </div>

                      <p className="text-[9px] text-gray-500 dark:text-zinc-500 leading-normal uppercase">
                        The balance is paid against presentation of our veterinary sanitary papers, CITES declarations, and ocean Bill of Lading (B/L) drafts.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 space-y-3">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-500 uppercase block font-bold tracking-wider">
                      // SWIFT & WIRE CHANNELS
                    </span>

                    <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-relaxed">
                      All commercial invoices are issued strictly in United States Dollars ($ USD) or Euros (€ EUR). Bank wires are processed directly via secure SWIFT transfer channels routing directly to our corporate bank account inside State Bank of India (SBI).
                    </p>

                    <div className="p-2 bg-gray-100 dark:bg-black border border-gray-200 dark:border-zinc-800 flex items-center space-x-2 text-[9px] font-mono text-gray-600 dark:text-zinc-500 uppercase">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>State Bank of India Corporate Clearing Verified</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-none space-y-1.5 text-xs">
                  <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Currency & Pricing Volatility Protection
                  </h5>

                  <p className="text-gray-600 dark:text-zinc-400 text-xs leading-normal">
                    All Proforma Invoice (PI) quotations remain firm for exactly 60 calendar days from the date of issuance. Any dramatic variations in global transport logistics or commodity prices of horn components will be addressed and reconciled prior to bilateral signature.
                  </p>
                </div>
              </>
            )}

            {activeTab === "freight" && (
              <>
                <p className="text-gray-700 dark:text-zinc-300 font-sans text-xs">
                  We coordinate globally under standard Incoterms to ensure hassle-free custom clearances and reliable transit:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 font-sans">
                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">
                        1. FOB Shipping Ports
                      </h4>
                    </div>

                    <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-normal">
                      - Ocean Freight: Nhava Sheva (Mumbai) or Mundra Port (Gujarat).
                      <br />
                      - Air Freight: Indira Gandhi International Airport (IGI, New Delhi).
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">
                        2. Courier Networks
                      </h4>
                    </div>

                    <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-normal">
                      For lightweight blanks, custom mockups, and express collections, we route directly with premium courier accounts: DHL Express, FedEx, and UPS.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800 p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Scale className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">
                        3. Custom Brokers
                      </h4>
                    </div>

                    <p className="text-[10px] text-gray-600 dark:text-zinc-400 leading-normal">
                      While we manage veterinary sanitary papers and Indian customs export clearances, clients designate their import brokers for duty clearances.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs space-y-2.5">
                  <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Cargo Lead Times and Tracking
                  </h5>

                  <p className="text-gray-600 dark:text-zinc-400 leading-normal">
                    Air transport packages are fully dispatched within 5–7 business days from customs verification, with direct airway tracking IDs sent via email. Sea cargo lots take 25–45 calendar days depending on target destination ports, managed under strict container load (LCL/FCL) guidelines.
                  </p>
                </div>
              </>
            )}

            </div>

          </div>

          {/* Sourcing Desk Contact Details */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
  <div className="space-y-2">
    <span className="text-[10px] font-mono font-bold text-gray-700 dark:text-zinc-400 uppercase tracking-wider block">
      Trade Desk Contacts
    </span>

    <div className="space-y-1.5 text-gray-700 dark:text-zinc-300">
      <div className="flex items-center space-x-2">
        <Mail className="w-4 h-4 text-amber-600 dark:text-amber-500" />
        <a
          href="mailto:sales@visionexporthub.com"
          className="hover:text-amber-600 dark:hover:text-amber-400 underline transition-colors"
        >
          sales@visionexporthub.com
        </a>
      </div>

      <div className="flex items-center space-x-2">
        <Mail className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
        <a
          href="mailto:Rkshah231@gmail.com"
          className="hover:text-amber-600 dark:hover:text-amber-400 underline transition-colors"
        >
          Rkshah231@gmail.com
        </a>
      </div>
    </div>
  </div>

  <div className="space-y-2">
    <span className="text-[10px] font-mono font-bold text-gray-700 dark:text-zinc-400 uppercase tracking-wider block">
      Direct Telecommunications
    </span>

    <div className="space-y-1.5 text-gray-700 dark:text-zinc-300">
      <div className="flex items-center space-x-2">
        <Phone className="w-4 h-4 text-amber-600 dark:text-amber-500" />
        <a
          href="tel:+919548470907"
          className="hover:text-amber-600 dark:hover:text-amber-400 underline transition-colors"
        >
          +91 95484 70907 (Director Hotline)
        </a>
      </div>

      <div className="flex items-center space-x-2">
        <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
        <a
          href="https://wa.me/919548470907"
          target="_blank"
          rel="noreferrer"
          className="hover:text-amber-600 dark:hover:text-amber-400 underline transition-colors"
        >
          WhatsApp Chat Desk
        </a>
      </div>
    </div>
  </div>
</div>
        </div>

      </motion.div>
    </div>
  );
}
