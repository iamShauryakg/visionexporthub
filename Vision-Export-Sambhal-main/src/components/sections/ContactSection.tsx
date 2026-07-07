import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { z } from "zod";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Building2, 
  User, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Globe,
  Compass,
  Anchor,
  Clock
} from "lucide-react";

interface ContactSectionProps {
  whatsappNumber: string;
}

const COUNTRY_DIAL_CODES = [
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "United States / Canada", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
];

const contactFormSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters long."),
  companyName: z.string().min(2, "Company Name must be at least 2 characters long."),
  email: z.string().email("Please enter a valid corporate email address (e.g., procurement@firm.com)."),
  dialCode: z.string(),
  phone: z.string().min(5, "Phone number must be at least 5 digits."),
  message: z.string().optional(),
  captchaInput: z.string().min(1, "Please answer the security verification math question."),
});

type ContactFormFields = z.infer<typeof contactFormSchema>;

interface HubDetail {
  name: string;
  role: string;
  coordinates: string;
  phone: string;
  email: string;
  timezone: string;
  address: string;
  mapUrl: string;
  details: string;
}

const HUBS: Record<string, HubDetail> = {
  sambhal: {
    name: "Sambhal Workspace",
    role: "Ethical Harvest & Manufacturing Atelier",
    coordinates: "28.5800° N • 78.5500° E",
    phone: "+91 95484 70907",
    email: "sales@visionexporthub.com",
    timezone: "IST",
    address: "Chaudhary Sarai, Sambhal, UP, IN",
    mapUrl: "https://maps.google.com/maps?q=Chaudhary%20Sarai,%20Sambhal,%20Uttar%20Pradesh%20244302&t=&z=14&ie=UTF8&iwloc=&output=embed",
    details: "Raw material harvesting, ethical bone & horn processing, initial block carving, custom dyeing, and bulk shipment logistics.",
  },
  milan: {
    name: "Milan Design Base",
    role: "Bespoke Couture Design & CAD Studio",
    coordinates: "45.4642° N • 9.1900° E",
    phone: "+39 02 824 5510",
    email: "milan@visionexporthub.com",
    timezone: "CET",
    address: "Via Montenapoleone, Milan, Italy",
    mapUrl: "https://maps.google.com/maps?q=Duomo%20di%20Milano,%20Milan,%20Italy&t=&z=14&ie=UTF8&iwloc=&output=embed",
    details: "High-end product drafting, 3D CAD calibration, virtual showroom rendering, and client procurement meetings for European fashion houses.",
  },
  mundra: {
    name: "Mundra Ocean Gate",
    role: "Container Freight & Export Logistics Desk",
    coordinates: "22.8400° N • 69.7000° E",
    phone: "+91 22 4002 8811",
    email: "shipping@visionexporthub.com",
    timezone: "IST",
    address: "APSEZ, Mundra Port, Kutch, Gujarat, IN",
    mapUrl: "https://maps.google.com/maps?q=Mundra%20Port,%20Gujarat,%20India&t=&z=12&ie=UTF8&iwloc=&output=embed",
    details: "Ocean container consolidation, custom clearing, bulk export documentation, and global FOB/CIF logistics coordination.",
  }
};

export default function ContactSection({ whatsappNumber }: ContactSectionProps) {
  // Form States
  const [formData, setFormData] = useState<ContactFormFields>({
    name: "",
    companyName: "",
    email: "",
    dialCode: "+39", // Default: Italy
    phone: "",
    message: "",
    captchaInput: "",
  });

  // Submitted Fields for high-fidelity Success Screen
  const [submittedName, setSubmittedName] = useState("");
  const [submittedCompany, setSubmittedCompany] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [contactMode, setContactMode] = useState<"callback" | "email">("callback");
  const [submittedMode, setSubmittedMode] = useState<"callback" | "email">("callback");

  // Selected Interactive Hub
  const [selectedHubKey, setSelectedHubKey] = useState<keyof typeof HUBS>("sambhal");

  // Local Live Time tracking for "Global Presence" Desk
  const [localTimes, setLocalTimes] = useState({ milan: "", IST: "" });

  useEffect(() => {
    const updateTimes = () => {
      const optionsIST = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false } as const;
      const optionsMilan = { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false } as const;
      
      setLocalTimes({
        milan: new Intl.DateTimeFormat("en-US", optionsMilan).format(new Date()),
        IST: new Intl.DateTimeFormat("en-US", optionsIST).format(new Date()),
      });
    };
    
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time validation states
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormFields, boolean>>>({});

  // Captcha State
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 0, num2: 0, answer: 0 });
  const [captchaVerified, setCaptchaVerified] = useState<boolean | null>(null);
  
  // Status States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  // Searchable Country Code Dropdown States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate random math captcha on mount or reset
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaChallenge({
      num1,
      num2,
      answer: num1 + num2,
    });
    setFormData(prev => ({ ...prev, captchaInput: "" }));
    setCaptchaVerified(null);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    if (name === "name") {
      if (value.trim().length < 2) {
        errorMessage = "Full Name must be at least 2 characters long.";
      }
    } else if (name === "companyName") {
      if (value.trim().length < 2) {
        errorMessage = "Company Name must be at least 2 characters long.";
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        errorMessage = "Business Email is required.";
      } else if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid corporate email address.";
      }
    } else if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (contactMode === "callback" && !value) {
        errorMessage = "Phone number is required.";
      } else if (value && digitsOnly.length < 5) {
        errorMessage = "Phone number must be at least 5 digits.";
      }
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name as keyof ContactFormFields]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    
    // Mark all fields as touched
    const allTouched = {
      name: true,
      companyName: true,
      email: true,
      phone: true,
      captchaInput: true,
    };
    setTouched(allTouched);

    // Run custom validate for all fields
    const newErrors: Partial<Record<keyof ContactFormFields, string>> = {};
    if (formData.name.trim().length < 2) {
      newErrors.name = "Full Name must be at least 2 characters long.";
    }
    if (formData.companyName.trim().length < 2) {
      newErrors.companyName = "Company Name must be at least 2 characters long.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Business Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid corporate email address.";
    }
    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (contactMode === "callback" && !formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone && digitsOnly.length < 5) {
      newErrors.phone = "Phone number must be at least 5 digits.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => !!err)) {
      setValidationError("Please resolve the highlighted errors below before transmitting.");
      return;
    }

    // Dynamic Zod Schema Validation based on mode
    const activeSchema = contactFormSchema.extend({
      phone: contactMode === "callback" 
        ? z.string().min(5, "Phone number must be at least 5 digits.")
        : z.string().optional()
    });
    const validationResult = activeSchema.safeParse(formData);
    if (!validationResult.success) {
      // Pick the first error message to display in the main error alert
      const firstError = validationResult.error.issues[0]?.message || "Validation failed.";
      setValidationError(firstError);
      return;
    }

    // Captcha Validation
    const userAns = parseInt(formData.captchaInput.trim(), 10);
    if (isNaN(userAns) || userAns !== captchaChallenge.answer) {
      setCaptchaVerified(false);
      setValidationError("Security verification check failed. Please enter the correct sum.");
      return;
    }

    setCaptchaVerified(true);
    setIsSubmitting(true);
    
    // Capture user's contact entries for the beautiful success screen receipt
    const finalPhone = formData.phone ? `${formData.dialCode} ${formData.phone}` : "N/A (Direct Email Mode)";
    const finalName = formData.name;
    const finalCompany = formData.companyName;
    const finalEmail = formData.email;
    const finalMode = contactMode;

    // Simulate secure B2B transaction dispatch
    setTimeout(() => {
      setSubmittedName(finalName);
      setSubmittedCompany(finalCompany);
      setSubmittedPhone(finalPhone);
      setSubmittedEmail(finalEmail);
      setSubmittedMode(finalMode);
      setIsSubmitting(false);
      setSubmitStatus("success");
      
      // Clear errors and touched state
      setTouched({});
      setErrors({});
    }, 1500);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      companyName: "",
      email: "",
      dialCode: "+39",
      phone: "",
      message: "",
      captchaInput: "",
    });
    setSubmittedName("");
    setSubmittedCompany("");
    setSubmittedPhone("");
    setSubmittedEmail("");
    setSubmitStatus("idle");
    generateCaptcha();
  };

  const selectedCountry = COUNTRY_DIAL_CODES.find(item => item.code === formData.dialCode) || COUNTRY_DIAL_CODES[0];
  const filteredCountries = COUNTRY_DIAL_CODES.filter(item => 
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.code.includes(searchQuery)
  );

  return (
    <section 
      id="contact" 
      className="py-24 bg-surface-base text-text-primary border-t border-border-primary relative overflow-hidden"
    >
      {/* Background brand watermarks */}
      <div className="absolute top-10 left-10 opacity-[0.02] text-[10vw] font-serif font-black pointer-events-none uppercase tracking-tighter">
        CONTACT
      </div>
      <div className="absolute bottom-10 right-10 opacity-[0.02] text-[10vw] font-serif font-black pointer-events-none uppercase tracking-tighter">
        B2B HUB
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Balanced Two-Column Hero Text & Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: REQUEST CALLBACK HERO TEXT + THE PREMIUM FORM */}
          <div className="space-y-6 flex flex-col justify-start">
            
            {/* HERO TEXT: REQUEST CALLBACK */}
            <div className="space-y-3">
              <span className="text-amber-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
                SECURE B2B DIRECT ROUTING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-text-primary leading-tight">
                Request Callback
              </h2>
              <div className="h-[2px] w-12 bg-amber-500"></div>
              <p className="text-text-secondary text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                Initiate a private consultation with our export directors. Specify your material sizes or custom CAD requirements below to register your workspace on our digital ledger and secure a prioritized callback.
              </p>
            </div>

            <div className="bg-surface-secondary/40 border border-border-primary p-6 sm:p-8 relative min-h-[520px] flex flex-col justify-center">
              {/* Corner Accent Marks */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/50"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/50"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/50"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/50"></div>

              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-4"
                  >
                    {/* High-fidelity checkmark drawing animation */}
                    <div className="relative flex items-center justify-center w-20 h-20">
                      <motion.div
                        className="absolute inset-0 border-2 border-emerald-500/20 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.div
                        className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-pulse"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -35 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 11 }}
                      >
                        <CheckCircle className="w-12 h-12 text-emerald-500" />
                      </motion.div>
                    </div>

                    <div className="space-y-2 max-w-md">
                      <span className="text-emerald-500 font-mono text-[10px] tracking-[0.2em] uppercase font-bold block">
                        Transmission Successful
                      </span>
                      <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-text-primary">
                        Thank you, {submittedName}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">
                        {submittedMode === "callback" ? (
                          <>
                            Your wholesale callback inquiry has been logged. A director from our <span className="text-amber-500 font-bold uppercase">{HUBS[selectedHubKey].name}</span> desk will contact you shortly at <span className="text-text-primary font-bold font-mono">{submittedPhone}</span>.
                          </>
                        ) : (
                          <>
                            Your wholesale direct email inquiry has been logged. A director from our <span className="text-amber-500 font-bold uppercase">{HUBS[selectedHubKey].name}</span> desk will transmit a custom proposal to your corporate email <span className="text-text-primary font-bold font-mono">{submittedEmail}</span>.
                          </>
                        )}
                      </p>
                    </div>

                    {/* Receipt breakdown */}
                    <div className="w-full max-w-sm bg-surface-base/60 border border-border-primary p-4 text-left font-mono text-[10px] text-text-secondary space-y-1.5 shadow-inner">
                      <div className="flex justify-between border-b border-border-primary/40 pb-1.5 mb-1.5 text-text-primary font-bold">
                        <span>TRANSMISSION REGISTER</span>
                        <span className="text-emerald-500">128-BIT SECURE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COMPANY:</span>
                        <span className="text-text-primary font-bold truncate max-w-[180px]">{submittedCompany}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROUTED PORT:</span>
                        <span className="text-amber-500 font-bold uppercase">{HUBS[selectedHubKey].name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PROTOCOL:</span>
                        <span className="text-text-primary font-bold uppercase">{submittedMode === "callback" ? "CALLBACK SCHEDULING" : "DIRECT EMAIL PROPOSAL"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COORDINATES:</span>
                        <span className="text-text-primary font-bold">{HUBS[selectedHubKey].coordinates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TRANSMIT KEY:</span>
                        <span className="text-text-primary font-bold uppercase">SEC-TXN-{Math.random().toString(36).substring(3, 9).toUpperCase()}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleResetForm}
                      className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-100 font-mono text-[10px] uppercase font-black tracking-widest transition-all duration-200 border border-border-primary shadow-sm active:scale-95 cursor-pointer"
                    >
                      {submittedMode === "callback" ? "New Callback Request" : "New Email Inquiry"}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="w-full space-y-6"
                  >
                    <div className="mb-2 text-left">
                      <h3 className="font-serif text-base font-bold uppercase tracking-wider text-text-primary flex items-center space-x-2">
                        <ShieldCheck className="w-5 h-5 text-amber-500" />
                        <span>Interactive Sourcing Terminal</span>
                      </h3>
                      <p className="text-[9px] font-mono text-text-secondary uppercase mt-0.5">
                        Encrypted Connection • Verified Trade Dispatch Protocol
                      </p>
                    </div>

                    {/* FLOATING QUICK CONTACT TOGGLE */}
                    <div className="flex items-center justify-between p-2.5 bg-zinc-950/90 border border-border-primary rounded-none shadow-sm relative">
                      <div className="flex items-center space-x-1.5 pl-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                        </span>
                        <span className="font-mono text-[9px] text-text-secondary uppercase font-bold tracking-wider">
                          Quick Contact:
                        </span>
                      </div>
                      <div className="relative flex p-0.5 bg-surface-base border border-border-primary rounded-none">
                        <button
                          type="button"
                          onClick={() => setContactMode("callback")}
                          className={`relative px-3 py-1 text-[9px] font-mono uppercase tracking-widest font-black transition-all duration-300 z-10 cursor-pointer ${
                            contactMode === "callback"
                              ? "text-zinc-950"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          Callback
                          {contactMode === "callback" && (
                            <motion.div
                              layoutId="activeContactMode"
                              className="absolute inset-0 bg-amber-500 rounded-none -z-10"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMode("email")}
                          className={`relative px-3 py-1 text-[9px] font-mono uppercase tracking-widest font-black transition-all duration-300 z-10 cursor-pointer ${
                            contactMode === "email"
                              ? "text-zinc-950"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          Direct Email
                          {contactMode === "email" && (
                            <motion.div
                              layoutId="activeContactMode"
                              className="absolute inset-0 bg-amber-500 rounded-none -z-10"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Error Alert */}
                    {validationError && (
                      <div className="p-3 bg-red-950/20 border border-red-500/30 text-red-400 font-mono text-[10px] uppercase flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* FULL NAME */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="block text-[9px] font-mono font-bold uppercase text-text-secondary tracking-widest">
                              Full Name *
                            </label>
                            {touched.name && !errors.name && formData.name && (
                              <span className="text-emerald-500 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle className="w-2.5 h-2.5" /> VERIFIED
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <User className={`absolute left-3 top-2.5 w-4 h-4 transition-colors duration-200 ${
                              touched.name && errors.name 
                                ? "text-red-400" 
                                : touched.name && !errors.name && formData.name 
                                  ? "text-emerald-500" 
                                  : "text-text-secondary"
                            }`} />
                            <input 
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g., Matteo Rossi"
                              className={`w-full bg-surface-base text-text-primary pl-9 pr-3 py-2 text-xs font-sans border transition-all duration-250 rounded-none placeholder:text-text-secondary/50 focus:outline-none ${
                                touched.name && errors.name
                                  ? "border-red-500/80 focus:border-red-500 bg-red-500/[0.02]"
                                  : touched.name && !errors.name && formData.name
                                    ? "border-emerald-500/50 focus:border-emerald-500 bg-emerald-500/[0.01]"
                                    : "border-border-primary focus:border-amber-500"
                              }`}
                            />
                          </div>
                          {touched.name && errors.name && (
                            <p className="text-red-400 font-mono text-[8px] uppercase tracking-wider mt-0.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                              <span>{errors.name}</span>
                            </p>
                          )}
                        </div>

                        {/* COMPANY NAME */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="block text-[9px] font-mono font-bold uppercase text-text-secondary tracking-widest">
                              Company Name *
                            </label>
                            {touched.companyName && !errors.companyName && formData.companyName && (
                              <span className="text-emerald-500 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle className="w-2.5 h-2.5" /> VERIFIED
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Building2 className={`absolute left-3 top-2.5 w-4 h-4 transition-colors duration-200 ${
                              touched.companyName && errors.companyName 
                                ? "text-red-400" 
                                : touched.companyName && !errors.companyName && formData.companyName 
                                  ? "text-emerald-500" 
                                  : "text-text-secondary"
                            }`} />
                            <input 
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g., Sarto Tessile SpA"
                              className={`w-full bg-surface-base text-text-primary pl-9 pr-3 py-2 text-xs font-sans border transition-all duration-250 rounded-none placeholder:text-text-secondary/50 focus:outline-none ${
                                touched.companyName && errors.companyName
                                  ? "border-red-500/80 focus:border-red-500 bg-red-500/[0.02]"
                                  : touched.companyName && !errors.companyName && formData.companyName
                                    ? "border-emerald-500/50 focus:border-emerald-500 bg-emerald-500/[0.01]"
                                    : "border-border-primary focus:border-amber-500"
                              }`}
                            />
                          </div>
                          {touched.companyName && errors.companyName && (
                            <p className="text-red-400 font-mono text-[8px] uppercase tracking-wider mt-0.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                              <span>{errors.companyName}</span>
                            </p>
                          )}
                        </div>

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* EMAIL */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="block text-[9px] font-mono font-bold uppercase text-text-secondary tracking-widest">
                              Business Email *
                            </label>
                            {touched.email && !errors.email && formData.email && (
                              <span className="text-emerald-500 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle className="w-2.5 h-2.5" /> VERIFIED
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Mail className={`absolute left-3 top-2.5 w-4 h-4 transition-colors duration-200 ${
                              touched.email && errors.email 
                                ? "text-red-400" 
                                : touched.email && !errors.email && formData.email 
                                  ? "text-emerald-500" 
                                  : "text-text-secondary"
                            }`} />
                            <input 
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g., purchasing@sartotessile.it"
                              className={`w-full bg-surface-base text-text-primary pl-9 pr-3 py-2 text-xs font-sans border transition-all duration-250 rounded-none placeholder:text-text-secondary/50 focus:outline-none ${
                                touched.email && errors.email
                                  ? "border-red-500/80 focus:border-red-500 bg-red-500/[0.02]"
                                  : touched.email && !errors.email && formData.email
                                    ? "border-emerald-500/50 focus:border-emerald-500 bg-emerald-500/[0.01]"
                                    : "border-border-primary focus:border-amber-500"
                              }`}
                            />
                          </div>
                          {touched.email && errors.email && (
                            <p className="text-red-400 font-mono text-[8px] uppercase tracking-wider mt-0.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                              <span>{errors.email}</span>
                            </p>
                          )}
                        </div>

                        {/* PHONE */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="block text-[9px] font-mono font-bold uppercase text-text-secondary tracking-widest">
                              Phone Number {contactMode === "callback" ? "*" : "(Optional)"}
                            </label>
                            {touched.phone && !errors.phone && formData.phone && (
                              <span className="text-emerald-500 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle className="w-2.5 h-2.5" /> VERIFIED
                              </span>
                            )}
                          </div>
                          <div className={`flex border transition-colors duration-250 relative ${
                            touched.phone && errors.phone
                              ? "border-red-500/80 focus-within:border-red-500 bg-red-500/[0.02]"
                              : touched.phone && !errors.phone && formData.phone
                                ? "border-emerald-500/50 focus-within:border-emerald-500 bg-emerald-500/[0.01]"
                                : "border-border-primary focus-within:border-amber-500"
                          }`}>
                            <div ref={dropdownRef} className="relative flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsDropdownOpen(!isDropdownOpen);
                                  setSearchQuery("");
                                }}
                                className="bg-surface-secondary text-text-primary px-2 h-full text-xs font-mono border-r border-border-primary hover:bg-zinc-900 transition-colors flex items-center gap-1 cursor-pointer outline-none"
                                style={{ minWidth: "85px" }}
                              >
                                <span>{selectedCountry.flag}</span>
                                <span className="text-[10px] font-semibold">{selectedCountry.code}</span>
                                <span className="text-[7px] text-amber-500/80">▼</span>
                              </button>

                              {isDropdownOpen && (
                                <div className="absolute left-0 top-full mt-1.5 w-64 bg-zinc-950 border border-amber-500/25 shadow-2xl rounded-md overflow-hidden z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-150">
                                  <div className="p-2 border-b border-border-primary bg-zinc-900/50">
                                    <input
                                      type="text"
                                      placeholder="Search country..."
                                      value={searchQuery}
                                      onChange={(e) => setSearchQuery(e.target.value)}
                                      className="w-full bg-zinc-950 text-text-primary px-2 py-1 text-xs rounded border border-border-primary focus:border-amber-500 focus:outline-none placeholder:text-zinc-600 font-sans"
                                    />
                                  </div>
                                  <div className="max-h-48 overflow-y-auto divide-y divide-zinc-900/40 font-mono">
                                    {filteredCountries.length > 0 ? (
                                      filteredCountries.map((item, index) => (
                                        <button
                                          key={index}
                                          type="button"
                                          onClick={() => {
                                            setFormData(prev => ({ ...prev, dialCode: item.code }));
                                            setIsDropdownOpen(false);
                                          }}
                                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-amber-500/10 hover:text-amber-400 transition-colors flex items-center justify-between font-sans cursor-pointer"
                                        >
                                          <div className="flex items-center gap-2">
                                            <span>{item.flag}</span>
                                            <span className="truncate max-w-[140px] text-zinc-300 font-medium">{item.country}</span>
                                          </div>
                                          <span className="font-mono text-amber-500/70 text-[9px]">{item.code}</span>
                                        </button>
                                      ))
                                    ) : (
                                      <div className="p-3 text-center text-zinc-600 text-xs font-sans">
                                        No countries found
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <input 
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g., 312 456 7890"
                              className="w-full bg-surface-base text-text-primary px-3 py-2 text-xs font-sans focus:outline-none rounded-none placeholder:text-text-secondary/50"
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className="text-red-400 font-mono text-[8px] uppercase tracking-wider mt-0.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                              <span>{errors.phone}</span>
                            </p>
                          )}
                        </div>

                      </div>

                      {/* SPECIFICATIONS */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-mono font-bold uppercase text-text-secondary tracking-widest">
                          Material Sizing & Specifications (Inquiry Details)
                        </label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Specify material types (e.g., raw horn tips, bone blocks, flat blanks, particular custom sizing or dye metrics desired...)"
                          className="w-full bg-surface-base text-text-primary p-2.5 text-xs font-sans border border-border-primary focus:border-amber-500 focus:outline-none transition-colors rounded-none resize-none placeholder:text-text-secondary/50"
                        />
                      </div>

                      {/* CAPTCHA */}
                      <div className="bg-surface-secondary/70 p-3 border border-border-primary flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center space-x-2.5 text-left">
                          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 w-8 h-8 flex items-center justify-center font-serif text-sm font-black rounded-none">
                            ?
                          </div>
                          <div>
                            <h5 className="font-mono text-[8px] font-black uppercase tracking-wider text-text-primary">
                              Verification Query
                            </h5>
                            <p className="font-serif text-[11px] font-bold text-text-secondary">
                              What is {captchaChallenge.num1} + {captchaChallenge.num2}?
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input 
                            type="text"
                            name="captchaInput"
                            value={formData.captchaInput}
                            onChange={handleChange}
                            placeholder="Answer"
                            className="w-20 bg-surface-base text-text-primary px-2 py-1.5 text-xs font-mono text-center border border-border-primary focus:border-amber-500 focus:outline-none transition-colors rounded-none placeholder:text-text-secondary/50"
                          />
                          <button
                            type="button"
                            onClick={generateCaptcha}
                            className="px-2 py-1 border border-border-primary hover:border-amber-500/50 text-[9px] font-mono text-text-secondary hover:text-amber-500 transition-colors uppercase font-bold cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                      </div>

                      {/* SUBMIT */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black py-3 font-mono font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full mr-2"></span>
                            <span>{contactMode === "callback" ? "TRANSMITTING CALLBACK..." : "TRANSMITTING EMAIL..."}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-black" />
                            <span>{contactMode === "callback" ? "TRANSMIT CALLBACK PIPELINE" : "TRANSMIT DIRECT EMAIL"}</span>
                          </>
                        )}
                      </button>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: GLOBAL PRESENCE HERO TEXT + INTERACTIVE MAP HIGHLIGHT */}
          <div className="space-y-6 flex flex-col justify-start">
            
            {/* HERO TEXT: GLOBAL PRESENCE */}
            <div className="space-y-3">
              <span className="text-amber-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
                ESTABLISHED TRADE DISPATCH HUBS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-text-primary leading-tight">
                Global Presence
              </h2>
              <div className="h-[2px] w-12 bg-amber-500"></div>
              <p className="text-text-secondary text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                Seamlessly connecting international haute couture with authentic regional craft. Interact with our active hubs below to explore real-time coordinate data and specialized dispatch focuses.
              </p>
            </div>

            {/* Hub Selector Navigation Nodes */}
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(HUBS) as Array<keyof typeof HUBS>).map((key) => {
                const isActive = selectedHubKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedHubKey(key);
                    }}
                    className={`p-2.5 border text-center font-mono text-[9px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-black border-amber-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-surface-secondary/40 text-text-secondary border-border-primary hover:text-text-primary hover:border-amber-500/40"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      {key === "milan" ? (
                        <Globe className="w-3.5 h-3.5" />
                      ) : key === "sambhal" ? (
                        <Compass className="w-3.5 h-3.5" />
                      ) : (
                        <Anchor className="w-3.5 h-3.5" />
                      )}
                      <span>{key}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* THE MAP HIGHLIGHT WRAPPER */}
            <div className="border border-border-primary bg-surface-secondary/20 p-2 flex flex-col h-full relative group">
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-surface-base text-text-primary text-[8px] font-mono font-bold tracking-widest uppercase border border-border-primary shadow-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span>ACTIVE HUB: {HUBS[selectedHubKey].name}</span>
                </span>
              </div>

              {/* Dynamic Grayscale Map Frame */}
              <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden border border-border-primary relative bg-surface-base">
                <iframe
                  title={`Vision Export Hub - ${HUBS[selectedHubKey].name}`}
                  src={HUBS[selectedHubKey].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.7) contrast(1.15) brightness(0.92)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="w-full h-full object-cover dark:invert dark:opacity-80 dark:hue-rotate-180 transition-all duration-500"
                ></iframe>
              </div>

              {/* Interactive Hub Detail Specifications panel */}
              <div className="p-4 bg-surface-base border-t border-border-primary text-left space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border-primary/50 pb-2">
                  <div>
                    <h4 className="font-serif text-sm font-black text-text-primary uppercase tracking-wider">
                      {HUBS[selectedHubKey].name}
                    </h4>
                    <span className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                      {HUBS[selectedHubKey].role}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 bg-surface-secondary px-2 py-0.5 border border-border-primary/40">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span className="font-mono text-[9px] font-bold text-text-primary">
                      {HUBS[selectedHubKey].timezone === "CET" ? localTimes.milan : localTimes.IST} {HUBS[selectedHubKey].timezone}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-text-secondary leading-relaxed font-sans font-medium">
                  {HUBS[selectedHubKey].details}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1.5 font-mono text-[9px] text-text-secondary">
                  <div>
                    <span className="font-bold text-text-primary block">HUB COORDINATES:</span>
                    <span>{HUBS[selectedHubKey].coordinates}</span>
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block">OFFICE PHYSICAL POINT:</span>
                    <span className="truncate block max-w-[180px]">{HUBS[selectedHubKey].address}</span>
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block">HUB DIRECT LINE:</span>
                    <a href={`tel:${HUBS[selectedHubKey].phone}`} className="hover:text-amber-500 transition-colors">{HUBS[selectedHubKey].phone}</a>
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block">HUB DIRECT SECURE MAIL:</span>
                    <a href={`mailto:${HUBS[selectedHubKey].email}`} className="hover:text-amber-500 transition-colors truncate block max-w-[180px]">{HUBS[selectedHubKey].email}</a>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a 
                    href="https://maps.app.goo.gl/iJiDoMCnnKPvUPv27?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black font-mono text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer border border-border-primary shadow-sm"
                  >
                    <span>Open Hub Coordinates</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
