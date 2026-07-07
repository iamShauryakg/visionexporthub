import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Sparkles, 
  Layers, 
  ShoppingBag, 
  Phone, 
  SunMoon, 
  Hash, 
  HelpCircle,
  FileText,
  BadgeCheck,
  ChevronRight
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function CommandPalette({
  theme,
  toggleTheme,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Define commands available
  const commands: CommandItem[] = [
    {
      id: "hero",
      title: "Jump to Home Hero",
      description: "Go back to top-level heritage hero view",
      category: "Navigation",
      icon: <Hash className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("hero");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "about",
      title: "Jump to Heritage",
      description: "Explore corporate legacy and organic sourcing origins",
      category: "Navigation",
      icon: <Hash className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "specimen-configurator",
      title: "Jump to Interactive Configurator",
      description: "Customize specimens, sizes, and calculate instant MOQs",
      category: "Tools & Panels",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("specimen-configurator");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "products",
      title: "Jump to Extended Catalog",
      description: "Sourcing details for buffalo horn and bovine bone button blanks",
      category: "Navigation",
      icon: <Hash className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("products");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "showroom",
      title: "Jump to Virtual 3D Showroom",
      description: "Inspect finished button specimens and plates on interactive model rigs",
      category: "Tools & Panels",
      icon: <Layers className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("showroom");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "material-lab",
      title: "Jump to Material Lab",
      description: "Check density metrics and structural bio-parameters",
      category: "Navigation",
      icon: <Hash className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("material-lab");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "specs",
      title: "Jump to Technical Specs",
      description: "View thickness, diameter tolerance matrices, and density logs",
      category: "Navigation",
      icon: <FileText className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("specs");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "quality",
      title: "Jump to Quality Control Matrix",
      description: "Moisture thresholds, heat resistance, and chemical screening results",
      category: "Navigation",
      icon: <BadgeCheck className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("quality");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "calibration",
      title: "Jump to Digital Calibration Suite",
      description: "Live interactive tool for dimensional button tolerance checks",
      category: "Tools & Panels",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("calibration");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "faq",
      title: "Jump to FAQ Section",
      description: "Learn about export shipping timeline, compliance, and ethical harvesting",
      category: "Help",
      icon: <HelpCircle className="w-4 h-4 text-zinc-500" />,
      action: () => {
        const el = document.getElementById("faq");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "contact",
      title: "Jump to Contact Desk",
      description: "Send direct inquiry email or view location coordinates",
      category: "Navigation",
      icon: <Hash className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "toggle-theme",
      title: `Toggle Theme (Switch to ${theme === "light" ? "Dark" : "Light"})`,
      description: "Adjust interface aesthetics to preferred light/dark setting",
      category: "Preferences",
      icon: <SunMoon className="w-4 h-4 text-zinc-500" />,
      action: () => {
        toggleTheme();
      }
    }
  ];

  // Listen for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Set focus on input when command palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Navigate selection with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Ensure selected item is scrolled into view in the list
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const parent = listRef.current;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.offsetHeight;
        const parentScrollTop = parent.scrollTop;
        const parentHeight = parent.offsetHeight;

        if (activeTop < parentScrollTop) {
          parent.scrollTop = activeTop;
        } else if (activeTop + activeHeight > parentScrollTop + parentHeight) {
          parent.scrollTop = activeTop + activeHeight - parentHeight;
        }
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Help tooltip indicator in margins */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-40 bg-zinc-950/80 hover:bg-zinc-900 text-amber-500 hover:text-white border border-amber-500/30 hover:border-amber-500 px-3 py-2 text-[10px] font-mono tracking-widest uppercase transition-all shadow-lg flex items-center space-x-1.5 backdrop-blur-md cursor-pointer rounded-none group"
        title="Open B2B Navigation Palette"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Nav Menu</span>
        <kbd className="bg-zinc-800 text-[9px] px-1 py-0.5 border border-zinc-700 rounded-sm font-mono text-zinc-400 group-hover:text-white ml-1">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-[20px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Palette Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white border-2 border-zinc-950 shadow-2xl p-0 mx-4 overflow-hidden rounded-none"
            >
              {/* Search Bar */}
              <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 bg-zinc-50/50">
                <Search className="w-4.5 h-4.5 text-zinc-400 mr-3 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or jump to section..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent border-0 outline-none text-sm text-zinc-950 font-sans placeholder-zinc-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] font-mono text-zinc-400 hover:text-zinc-950 px-1.5 py-0.5 border border-zinc-200 tracking-wider"
                >
                  ESC
                </button>
              </div>

              {/* Commands List */}
              <div 
                ref={listRef}
                className="max-h-80 overflow-y-auto divide-y divide-zinc-100 select-none bg-white"
              >
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => (
                    <div
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-start p-3.5 transition-colors cursor-pointer text-left ${
                        idx === selectedIndex 
                          ? "bg-zinc-950 text-white" 
                          : "bg-white text-zinc-950"
                      }`}
                    >
                      <div className="mr-3.5 mt-0.5 flex-shrink-0">
                        {cmd.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="font-sans text-xs font-bold uppercase tracking-wider truncate">
                            {cmd.title}
                          </h6>
                          <span className={`text-[8px] font-mono tracking-widest px-1.5 py-0.5 uppercase border ${
                            idx === selectedIndex 
                              ? "text-amber-400 border-amber-400/20 bg-amber-400/10" 
                              : "text-zinc-400 border-zinc-200 bg-zinc-50"
                          }`}>
                            {cmd.category}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-0.5 truncate font-medium ${
                          idx === selectedIndex ? "text-zinc-300" : "text-zinc-500"
                        }`}>
                          {cmd.description}
                        </p>
                      </div>
                      <div className={`ml-2 flex-shrink-0 flex items-center justify-center h-full transition-transform ${
                        idx === selectedIndex ? "translate-x-1" : ""
                      }`}>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-500 opacity-60" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center space-y-2">
                    <span className="text-xl block">🔍</span>
                    <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold">No specs matched search criteria</p>
                    <p className="text-[10px] text-zinc-400">Try searching for "products", "showroom", "whatsapp", or "specs"</p>
                  </div>
                )}
              </div>

              {/* Bottom Instructions Footer */}
              <div className="px-4 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <div className="flex items-center space-x-3.5">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </div>
                <span>Vision B2B Command Desk</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
