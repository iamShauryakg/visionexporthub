import React, { useState } from "react";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../../data";

interface FAQSectionProps {
  whatsappNumber?: string;
}

export default function FAQSection({ whatsappNumber = "919548470907" }: FAQSectionProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const FAQS_LIST = FAQS.map((faq, idx) => ({
    ...faq,
    id: idx + 1,
  }));

  return (
    <section className="py-24 bg-white text-zinc-900 border-b border-zinc-100 relative overflow-hidden">
      {/* Pristine Solid White - Removed fading gradients */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-600 uppercase block mb-3 font-black">
            09. LOGISTICS & TRADE SUPPORT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight">
            Frequently Asked FAQs.
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold text-center">
            Review detailed guidelines on minimum order values, custom sample mockups, shipping times, and veterinary health clearances.
          </p>
        </motion.div>

        {/* FAQs Accordion */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS_LIST.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`transition-all duration-300 rounded-2xl overflow-hidden border-2 select-none ${
                  isOpen
                    ? "bg-zinc-950 text-white border-amber-500 shadow-[0_15px_40px_rgba(0,0,0,0.3)] scale-[1.01]"
                    : "bg-white text-zinc-950 border-zinc-200/80 shadow-sm hover:border-amber-500/40 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isOpen ? "text-amber-500" : "text-amber-600"}`} />
                    <span className={`font-sans text-sm sm:text-base font-bold leading-snug transition-colors duration-300 ${isOpen ? "text-white" : "text-zinc-900"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-zinc-400 hover:text-zinc-850" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 border-t border-zinc-900 text-xs sm:text-sm leading-relaxed font-semibold text-zinc-300">
                        <p>{faq.answer}</p>
                        {faq.id === 5 && (
                          <div className="mt-4 pt-3.5 border-t border-zinc-900 flex flex-wrap gap-2.5">
                            <a
                              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Vision Import & Export, I am testing the dynamic pre-filled WhatsApp integration. Please share your luxury catalogue and current FOB terms for Horn buttons.")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 rounded-full border border-emerald-500/30 hover:border-white shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                            >
                              <MessageSquare className="w-4 h-4 text-white" />
                              <span>Launch Test WhatsApp Template Now</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
