import React from "react";
import { Sliders, Phone, CheckCircle } from "lucide-react";

interface PartnerSettingsProps {
  isConfigOpen: boolean;
  setIsConfigOpen: (open: boolean) => void;
  whatsappNumber: string;
  setWhatsappNumber: (num: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
}

export default function PartnerSettings({
  isConfigOpen,
  setIsConfigOpen,
  whatsappNumber,
  setWhatsappNumber,
  companyName,
  setCompanyName,
}: PartnerSettingsProps) {
  if (!isConfigOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-80 bg-black border-4 border-amber-500 p-5 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
      <div className="flex items-center justify-between border-b border-zinc-850 pb-2 mb-4">
        <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest">
          CONFIG: EXPORT DESK
        </span>
        <button
          onClick={() => setIsConfigOpen(false)}
          className="text-zinc-500 hover:text-white font-mono text-[10px] uppercase font-bold cursor-pointer"
        >
          [Close]
        </button>
      </div>

      <div className="space-y-4 text-left">
        <p className="text-[11px] font-mono text-zinc-400 leading-relaxed font-bold uppercase">
          Set your private WhatsApp and Company parameters to auto-generate personalized B2B export quotes.
        </p>

        {/* Whatsapp Input */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-mono text-zinc-500 block uppercase font-bold">
            Target WhatsApp Number:
          </label>
          <div className="flex items-center bg-zinc-950 border border-zinc-800 focus-within:border-amber-500 px-2 py-1.5">
            <span className="text-[11px] font-mono text-zinc-500 font-bold pr-1">+</span>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="919876543210"
              className="w-full bg-transparent text-white font-mono text-xs outline-none focus:ring-0 font-bold"
            />
          </div>
          <span className="text-[8px] font-mono text-zinc-600 block leading-tight">
            Use full international format without + or 00. Defaults to our Indian Export Hub.
          </span>
        </div>

        {/* Company Name Input */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-mono text-zinc-500 block uppercase font-bold">
            Buyer / Company Name:
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. SAVILE ROW ASSOCIATES"
            className="w-full bg-zinc-950 text-white border border-zinc-800 outline-none focus:border-amber-500 px-2.5 py-1.5 font-mono text-xs font-bold"
          />
        </div>

        <button
          onClick={() => setIsConfigOpen(false)}
          className="w-full bg-white hover:bg-zinc-200 text-black py-2 rounded-none font-mono text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-1 transition-colors cursor-pointer"
        >
          <CheckCircle className="w-3.5 h-3.5 text-black" />
          <span>Save Desk Parameters</span>
        </button>
      </div>
    </div>
  );
}
