import { HeroSlide, Hero3DMaterial, VisionGalleryItem, PartnerBrand, ArchitectureSpec, ManufacturingStep, Testimonial, FAQItem } from "../types";
import rawimage1 from "../images/Raw Materials & Blanks/1.png";
import rawimage2 from "../images/Raw Materials & Blanks/2.png";
import rawimage3 from "../images/Raw Materials & Blanks/3.png";
import Heroimage1 from "../images/heroIMG/hero.png";
import Heroimage2 from "../images/heroIMG/hero2.png";
import Heroimage3 from "../images/heroIMG/hero3.png";


export const HERO_SLIDES: HeroSlide[] = [
  {
    image: Heroimage1,
    title: "GLOBAL REACH. SUSTAINABLE LUXURY.",
    subtitle: "PREMIUM NATURAL ARTISANRY • SAMBHAL, INDIA",
    description: "Ethically sourced water buffalo horn and bovine bone button blanks, expertly crafted in Sambhal, India for world-class haute couture brands."
  },
  {
    image: Heroimage2,
    title: "DESIGNED FOR HAUTE COUTURE.",
    subtitle: "WORLD-CLASS TAILORING MATERIAL SUPPLY",
    description: "Calibrated material supplies engineered specifically for elite suiting, bespoke tailors, and heritage luxury labels worldwide."
  },
  {
    image: Heroimage3,
    title: "ETHICAL BY-PRODUCT HERITAGE.",
    subtitle: "100% ORGANIC & CRUELTY-FREE CERTIFIED",
    description: "100% natural, traceable, and organic biological materials collected strictly as certified cruelty-free agricultural by-products."
  }
];

export const HERO_3D_MATERIALS: Hero3DMaterial[] = [
  {
    id: "golden-amber-plate",
    name: "Golden Amber Horn Plate",
    subtitle: "NATURAL HONEY AMBER • FLAT PLATE",
    grain: "Fine Vertical Honey Amber Grain",
    finish: "High Gloss Hand Polished Veneer",
    b2bMoq: "200 KG",
    source: "Sambhal Craft Hub, UP, India",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1000&q=80",
    colors: {
      front: "linear-gradient(180deg, #f59e0b 0%, #d97706 40%, #b45309 80%, #78350f 100%)",
      back: "linear-gradient(180deg, #d97706 0%, #b45309 60%, #78350f 100%)",
      side: "#92400e",
      accent: "#fef3c7"
    },
    shadingClass: "from-amber-500 via-amber-600 to-amber-800",
    specularPower: 0.9,
    description: "Warm golden amber horn plate slab with fine natural vertical grain striae. Precision calibrated for luxury eyewear, artisan cutlery, and bespoke accessories."
  },
  {
    id: "deep-mahogany-plate",
    name: "Deep Mahogany Horn Plate",
    subtitle: "AUBURN REDDISH BROWN • FLAT PLATE",
    grain: "Rich Wavy Auburn Chestnut Grain",
    finish: "Silk Smooth Satin Polish",
    b2bMoq: "200 KG",
    source: "Indo-Gangetic Organic Herds",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1000&q=80",
    colors: {
      front: "linear-gradient(180deg, #7f1d1d 0%, #991b1b 30%, #450a0a 70%, #292524 100%)",
      back: "linear-gradient(180deg, #991b1b 0%, #450a0a 100%)",
      side: "#450a0a",
      accent: "#fca5a5"
    },
    shadingClass: "from-red-900 via-stone-900 to-zinc-950",
    specularPower: 0.85,
    description: "Rich deep reddish-brown mahogany horn plate with expressive wavy fibrous veins. High strength and dense organic structure."
  },
  {
    id: "onyx-streak-amber-plate",
    name: "Onyx Streak Amber Horn Plate",
    subtitle: "EXOTIC TWO-TONE MARBLED • FLAT PLATE",
    grain: "Amber Canvas with Obsidian Onyx Stripe",
    finish: "Mirror Polished Dual Tone",
    b2bMoq: "200 KG",
    source: "Selected Sambhal Reserve Horns",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80",
    colors: {
      front: "linear-gradient(90deg, #18181b 0%, #27272a 22%, #d97706 45%, #f59e0b 70%, #b45309 100%)",
      back: "linear-gradient(90deg, #27272a 0%, #b45309 50%, #d97706 100%)",
      side: "#3f3f46",
      accent: "#fbbf24"
    },
    shadingClass: "from-zinc-950 via-amber-700 to-amber-500",
    specularPower: 0.95,
    description: "Striking two-tone natural horn slab featuring a prominent obsidian black streak running alongside warm honey-amber grain. Highly sought after for unique luxury crafts."
  }
];

export const VISION_GALLERY_ITEMS: VisionGalleryItem[] = [
  {
    image: rawimage1,
    title: "Precision Lathe Shaving",
    step: "01",
    subtitle: "CALIBER CONTROL",
    description: "Raw ethically sourced buffalo horn cores are sliced into uniform sheets, then precision center-stamped using state-of-the-art diamond tip cutters to guarantee circular diameter consistency down to ±0.15mm."
  },
  {
    image: rawimage2,
    title: "Double-Sided Fine Polishing",
    step: "02",
    subtitle: "ORGANIC GLOSS LUSTER",
    description: "Each individual button blank and flat plate is buffed over high-speed linen wheel spindles. Utilizing natural wood waxes, our craftsmen slowly reveal the complex internal marbled swirls without adding artificial synthetics."
  },
  {
    image: rawimage3,
    title: "Strict Micro-Gauge Audit",
    step: "03",
    subtitle: "EXPORT EXCELLENCE",
    description: "Every production batch destined for international export ports is visually and structurally inspected under magnification. We verify moisture compliance (8%-12%) to ensure seamless drill operations on high-speed factory lines."
  }
];

export const PARTNER_BRANDS: PartnerBrand[] = [
  { name: "SAVILE ROW", location: "EST. 1806 • LONDON", style: "serif-classic" },
  { name: "ATELIER MILANO", location: "HAUTE COUTURE", style: "sans-minimal" },
  { name: "MAISON COUTURE", location: "CHAMPS-ÉLYSÉES PARIS", style: "serif-italic" },
  { name: "GIEVES & HAWKES", location: "NO. 1 SAVILE ROW", style: "serif-bold" },
  { name: "SARTORIA NAPOLI", location: "HANDMADE IN ITALY", style: "serif-crest" },
  { name: "KYOTO HERITAGE", location: "FINE SILKS & WEAVES", style: "mono-clean" },
  { name: "HUNTSMAN LONDON", location: "BESPOKE TAILORS", style: "serif-heavy" },
  { name: "TOKYO GINZA GUILD", location: "NIPPON SEWING", style: "sans-wide" }
];

export const MANUFACTURING_PROCESS: ManufacturingStep[] = [
  {
    step: "01",
    title: "Ethical Sourcing",
    description: "Raw horn and bone materials are collected strictly as post-consumer and agricultural by-products from certified farms in India, ensuring absolutely zero harm to animals."
  },
  {
    step: "02",
    title: "Sorting & Selection",
    description: "Each raw horn and bone is sorted manually by Master Artisans based on width, fiber density, and natural color variations (deep black, ivory cream, rare white spots)."
  },
  // {
  //   step: "03",
  //   title: "Heat & Press Flattening",
  //   description: "For plates, the raw horns are split and gently heated over charcoal fires to soften them, then flattened under highly controlled mechanical press plates with zero chemical additives."
  // },
  {
    step: "03",
    title: "Precision Cutting & Shaving",
    description: "Using advanced circular cutting saws, blanks are punched accurately from 12mm to 31mm, then shaved to exact uniform thickness ranging from 2mm to 8mm according to export demands."
  },
  {
    step: "04",
    title: "Double-Stage Quality Audit",
    description: "Every single batch undergoes standard structural sanity tests and moisture level optimization, followed by strict cosmetic review to guarantee premium B2B grade exports."
  }
];

export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Vision's buffalo horn blanks are of incredible consistency. We've sourced over 500,000 units for our Italian tailoring lines, and the density is simply flawless.",
    author: "Marcello V.",
    role: "Lead Procurement Director",
    company: "Sartoria Milano, Italy"
  },
  {
    quote: "Sourcing pink cattle horn blanks with exact color matching was a nightmare until we partnered with Vision Import & Export. Their precision and sustainable credentials are world-class.",
    author: "Elena R.",
    role: "Sustainability & Materials Manager",
    company: "Eco-Lux Apparel, France"
  },
  {
    quote: "The White Spot buffalo plates are absolutely gorgeous. Our custom eyewear collection sold out immediately. We appreciate their transparent WhatsApp communications.",
    author: "Kenji T.",
    role: "Founder & Creative Director",
    company: "Ocular Craft, Japan"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Are your horn and bone products sourced ethically and legally?",
    answer: "Absolutely. All materials are certified agricultural by-products of regional livestock. We operate under strict compliance with Indian government export regulations, and absolutely no animals are harmed for their horn or bone."
  },
  {
    question: "What is your Minimum Order Quantity (MOQ) for global bulk orders?",
    answer: "Our standard B2B wholesale MOQ is 5,000 units for button blanks and 200 units for premium horn plates. However, we support smaller trial shipments for serious buyers looking to audit quality first."
  },
  {
    question: "Do you supply customized thickness, sizes, and colors?",
    answer: "Yes, we specialize in bespoke custom manufacturing. We can cut blanks from 12mm up to 31mm, customize thickness from 2mm to 8mm, and use organic non-toxic coloring agents to match custom color sheets."
  },
  {
    question: "How long does shipping and custom clearance take?",
    answer: "We export worldwide from India via air freight (DHL/FedEx, 5-7 business days) and ocean freight (25-45 days depending on the port). We provide full legal certificate documentation including Veterinary Health Certificates and Certificates of Origin."
  },
  {
    question: "Can we test custom pre-filled WhatsApp templates directly?",
    answer: "Yes! Use our interactive 'Partner Settings' bar in the header to enter your actual phone number, and all 'Inquire on WhatsApp' CTAs will dynamically route to your number instantly."
  }
];

export const ARCHITECTURE_SPECS: Record<string, ArchitectureSpec> = {
  "Horn Button Blanks": {
    name: "Horn Button Blanks",
    category: "BUFFALO & CATTLE HORN",
    scientificName: "Bubalus bubalis",
    moistureContent: "8.5% - 10.5%",
    density: "1.32 - 1.38 g/cm³",
    hardness: "Mohs 2.5",
    availableSizes: "14L (9.0mm), 16L (10.0mm), 20L (13.0mm), 24L (15.0mm), 30L (19.0mm), 36L (23.0mm), 40L (25.0mm), 48L (30.0mm), 54L (34.0mm), 60L (38.0mm)",
    tolerances: "Thickness: ±0.15mm, Outer Diameter: ±0.20mm",
    primaryApplications: ["Luxury coat & suit buttons", "Artisanal jewelry disks", "Premium watch dial inlay blank sheets"],
    industrialGrade: "Sartorial AA-Grade Calibration",
    artisanTechnique: "Thermal pressure extraction with water-cooled micro-edge diamond core turning",
    description: "Hand-sorted water buffalo horn cores are thermoplastically flattened, cooled for 14 days under constant 5-ton presses to release structural tension, and cored using high-precision diamond hole-saws. Optimized for luxury high-speed laser branding.",
    blueprintSvgType: "button"
  },
  "Horn Plates": {
    name: "Horn Plates",
    category: "BUFFALO & CATTLE HORN",
    scientificName: "Bubalus bubalis",
    moistureContent: "9.0% - 11.0%",
    density: "1.34 - 1.39 g/cm³",
    hardness: "Mohs 2.6",
    availableSizes: "120x60mm, 150x70mm, 180x85mm, 200x90mm, 220x100mm",
    tolerances: "Thickness calibration: ±0.10mm, Flatness deflection: <0.25mm",
    primaryApplications: ["High-end optical eyewear frames", "Luxury hair combs", "Fine musical instrument bindings"],
    industrialGrade: "Optical Grade Flat Stock",
    artisanTechnique: "Hydraulic temperature-controlled mechanical press flattening, oil-bath curing",
    description: "Individually sorted flat plate sections, optimized for custom luxury spectacles. Subjected to deep internal annealing to eliminate thermal warping, leaving a pristine crystalline marbling pattern ready for CNC routing.",
    blueprintSvgType: "plate"
  },
  "Horn Sheets": {
    name: "Horn Sheets",
    category: "BUFFALO & CATTLE HORN",
    scientificName: "Bubalus bubalis",
    moistureContent: "8.0% - 10.0%",
    density: "1.35 g/cm³",
    hardness: "Mohs 2.5",
    availableSizes: "150x50mm, 200x60mm, 250x80mm, 300x90mm",
    tolerances: "Thickness: ±0.08mm, Width skew: < 0.5%",
    primaryApplications: ["Premium furniture marquetry", "Luxury packaging overlays", "Inlay art", "Architectural panels"],
    industrialGrade: "Micro-Calibrated Flat Sheet Stock",
    artisanTechnique: "Precision micro-planer multi-stage shaving, tension-relief moisture-stabilized baking",
    description: "Specially calibrated thin horn stock suitable for fine laminates. Offers high heat-formable flexibility when pre-heated to 130°C, bonding perfectly to wood, metal, or carbon fiber composite cores.",
    blueprintSvgType: "sheet"
  },
  "Horn Tips": {
    name: "Horn Tips",
    category: "BUFFALO & CATTLE HORN",
    scientificName: "Bubalus bubalis",
    moistureContent: "10.0% - 12.0%",
    density: "Highly dense solid keratin core",
    hardness: "Mohs 2.8",
    availableSizes: "150mm, 200mm, 250mm, 300mm, 350mm, 400mm",
    tolerances: "Graded strictly by solid tip depth (> 100mm solid depth minimum)",
    primaryApplications: ["Umbrella statement crook handles", "Premium walking sticks", "Traditional sculptural carvings"],
    industrialGrade: "Heavy Solid Grade Sourcing",
    artisanTechnique: "Hand scraping of outer rough layers, deep sanitization, core-density ultrasonic audit",
    description: "The solid base-to-tip sections of horn, selected for lack of inner marrow cavity. Features maximum density and striking black-to-amber color flows. Hand-buffed to reveal intense natural luster.",
    blueprintSvgType: "tip"
  },
  "Horn Scales": {
    name: "Horn Scales",
    category: "BUFFALO & CATTLE HORN",
    scientificName: "Bubalus bubalis",
    moistureContent: "9.0% - 11.0%",
    density: "1.36 g/cm³",
    hardness: "Mohs 2.6",
    availableSizes: "110x30mm, 120x35mm, 130x40mm, 140x45mm",
    tolerances: "Thickness: ±0.10mm, Length: ±1.00mm",
    primaryApplications: ["Custom straight razor handles", "Premium pocket knife grips", "Luxury tool scale handles"],
    industrialGrade: "Matched Dual-Symmetric Knife Stock",
    artisanTechnique: "Bilateral laser symmetry slicing, matching-grain bookmatch sorted pairing",
    description: "Supplied strictly as grain-matched book-opened pairs. Hand-sliced along identical wood grain striations to ensure that both left and right handles on bespoke pocket cutlery present identical marbling.",
    blueprintSvgType: "scale"
  },
  "Horn Blocks": {
    name: "Horn Blocks",
    category: "BUFFALO & CATTLE HORN",
    scientificName: "Bubalus bubalis",
    moistureContent: "8.5% - 10.5%",
    density: "1.37 g/cm³",
    hardness: "Mohs 2.7",
    availableSizes: "30x30x30mm, 40x40x40mm, 50x50x50mm, 60x60x60mm",
    tolerances: "Dimensional square check: ±0.30mm on all sides",
    primaryApplications: ["Industrial turning components", "Custom seal wax stamp blanks", "Machined spacer collars"],
    industrialGrade: "Machining Grade Solid Block Stock",
    artisanTechnique: "Mitered band-saw block extraction, micro-planar squared grain alignment",
    description: "Crystalline dense block sections sliced from the thickest horn tips. Highly structural, designed to endure extreme tension without shearing. Excellent for precision automatic lathe turning.",
    blueprintSvgType: "block"
  },
  "Horn Toggles": {
    name: "Horn Toggles",
    category: "BUFFALO & CATTLE HORN",
    scientificName: "Bubalus bubalis",
    moistureContent: "9.0% - 11.0%",
    density: "1.34 g/cm³",
    hardness: "Mohs 2.4",
    availableSizes: "30mm, 40mm, 50mm, 60mm, 70mm",
    tolerances: "Length: ±1.00mm, Hole diameter: ±0.15mm with polished inner rim",
    primaryApplications: ["Heavy luxury duffel coat fasteners", "Bespoke toggle hardware", "Tailoring closures"],
    industrialGrade: "Pre-polished Apparel Fastener Grade",
    artisanTechnique: "Traditional lathe turning, double-bevel drilling, chamfer-polished cord pathways",
    description: "Turned directly on small-scale spindle lathes, retaining the iconic slight curve of natural horn tips. Drills are hand-beveled and micro-buffed inside the hole to prevent cord wear over years of heavy garment use.",
    blueprintSvgType: "toggle"
  },
  "Bone Button Blanks": {
    name: "Bone Button Blanks",
    category: "BONE RAW MATERIALS",
    scientificName: "Bos taurus (Natural bovine bone)",
    moistureContent: "6.0% - 8.0%",
    density: "1.85 - 1.95 g/cm³",
    hardness: "Mohs 3.8",
    availableSizes: "14L (9.0mm), 16L (10.0mm), 18L (11.5mm), 20L (13.0mm), 24L (15.0mm), 30L (19.0mm), 40L (25.0mm)",
    tolerances: "Thickness: ±0.10mm, Outer Diameter: ±0.15mm",
    primaryApplications: ["Classic ivory buttons for suits", "Inlay dots", "Premium gaming counters & tokens"],
    industrialGrade: "Ultra-High Dense Bone Core Grade",
    artisanTechnique: "Chemical-free double degreasing, diamond-drill stamping, dry vacuum baking",
    description: "Derived purely from the dense femur core of water buffalo or cattle. Prepared via multi-stage alkaline degreasing to remove lipids completely, producing a stable ivory white slate with a deep matte finish.",
    blueprintSvgType: "button"
  },
  "Bone Plates": {
    name: "Bone Plates",
    category: "BONE RAW MATERIALS",
    scientificName: "Bos taurus",
    moistureContent: "6.5% - 8.5%",
    density: "1.88 - 1.96 g/cm³",
    hardness: "Mohs 4.0",
    availableSizes: "80x25mm, 100x30mm, 120x40mm, 140x50mm, 150x60mm",
    tolerances: "Thickness: ±0.10mm, Corner square check: <0.20mm deviation",
    primaryApplications: ["Guitar nuts, bridges, and saddle setups", "Keyboard organ key plates", "Fine box inlays"],
    industrialGrade: "Acoustic & Structural Grade Slabs",
    artisanTechnique: "Calibrated horizontal surface grinding, lipid extraction under pressurized dry steam",
    description: "Favored by world-renowned luthiers. These bone plates are selected for their dense internal calcium matrix, which transfers string vibrations with superior resonance, stability, and acoustic clarity.",
    blueprintSvgType: "plate"
  },
  "Bone Blocks": {
    name: "Bone Blocks",
    category: "BONE RAW MATERIALS",
    scientificName: "Bos taurus",
    moistureContent: "6.0% - 8.0%",
    density: "1.92 g/cm³",
    hardness: "Mohs 4.2",
    availableSizes: "40x12x12mm, 50x15x15mm, 60x18x18mm, 80x20x20mm",
    tolerances: "Dimensional width check: ±0.20mm, Angularity: 90° ±0.5°",
    primaryApplications: ["Industrial turning components", "Bespoke jewelry carved beads", "Luthier bridge pins"],
    industrialGrade: "Extreme Density Solid Turning Blocks",
    artisanTechnique: "Mechanical squaring saws, triple-boiled degreasing, micro-void scanning",
    description: "Highly structural blocks made from heavy-walled bovine bone. Free from soft marrow porosity, ensuring that turned components preserve high thread stability, structural integrity, and a glossy high-polish.",
    blueprintSvgType: "block"
  },
  "Bone Blanks": {
    name: "Bone Blanks",
    category: "BONE RAW MATERIALS",
    scientificName: "Bos taurus",
    moistureContent: "6.5% - 8.0%",
    density: "1.87 g/cm³",
    hardness: "Mohs 3.9",
    availableSizes: "80x20mm, 100x25mm, 120x30mm, 150x35mm",
    tolerances: "Slab thickness: ±0.15mm",
    primaryApplications: ["Custom craft handles", "Jewelry spacer blanks", "Artisan carving kits"],
    industrialGrade: "General Purpose Craftsman Blanks",
    artisanTechnique: "Parallel diamond-blade slot slicing, raw marrow cavity removal",
    description: "Dense, rectangular blank slabs optimized for custom hobbyist, instrument making, and historical restoration. Hand-cleaned to preserve a soft ivory coloration and natural calcium structure.",
    blueprintSvgType: "sheet"
  },
  "Carving Materials": {
    name: "Carving Materials",
    category: "BONE RAW MATERIALS",
    scientificName: "Bos taurus",
    moistureContent: "7.0% - 9.0%",
    density: "1.90 g/cm³",
    hardness: "Mohs 4.0",
    availableSizes: "100mm, 120mm, 150mm, 180mm, 200mm",
    tolerances: "Sorted according to organic bulk thickness (> 15mm solid thickness)",
    primaryApplications: ["Fine miniature sculptures", "Historical netsuke carvings", "Artisan pendant pieces"],
    industrialGrade: "Premium Fine-Grain Sculpting Stock",
    artisanTechnique: "Slow natural air seasoning over 90 days, lipid-stable organic curing",
    description: "Selected from extra-heavy bone structures, presenting a fine, isotropic calcium grain. This material won't chip or splinter under micro-chisels and handles high detail and deep undercut structures beautifully.",
    blueprintSvgType: "tip"
  },
  "Industrial Bone Components": {
    name: "Industrial Bone Components",
    category: "BONE RAW MATERIALS",
    scientificName: "Bos taurus",
    moistureContent: "5.5% - 7.5%",
    density: "1.95 g/cm³",
    hardness: "Mohs 4.3",
    availableSizes: "Bespoke spec sheet size blueprinting",
    tolerances: "Precision CNC Tolerance: ±0.05mm",
    primaryApplications: ["Electrical insulation spacers", "Textile loom sliders", "Low-speed non-static gears"],
    industrialGrade: "High-Tolerance CAD CNC Grade Components",
    artisanTechnique: "CNC mill profiling, ultrasonic structural defect scanning, high-gloss micro-buffing",
    description: "Fully customized, precision-milled bone pieces manufactured to specific industrial blueprints. Offers high natural electrical insulation, superb self-lubricating resistance, and zero static electricity.",
    blueprintSvgType: "block"
  }
};
