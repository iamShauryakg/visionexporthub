import { Product } from "../types";
import Buffolo1 from "../images/Buffalo Button/12MM & 14MM.png"
import Buffolo2 from "../images/Buffalo Button/16MM.png"
import Buffolo3 from "../images/Buffalo Button/19MM.png"
import Buffolo4 from "../images/Buffalo Button/21MM.png"
import Buffolo5 from "../images/Buffalo Button/23MM.png"
import Buffolo6 from "../images/Buffalo Button/26MM.png"
import Buffolo7 from "../images/Buffalo Button/29MM.png"
import Buffolo8 from "../images/Buffalo Button/31MM.png"
import CattleHorn1 from "../images/Button blanks/Cattle Color Button/Color No 3.png"
import CattleHorn2 from "../images/Button blanks/Cattle Color Button/Color No 2.png"
import CattleHorn3 from "../images/Button blanks/Cattle Color Button/Color No 5.png"
import DarkPink1 from "../images/Button blanks/Cattle Color Button/Dark Pink.png"
import DarkPink2 from "../images/Button blanks/Cattle Color Button/dark pink1.png"
import LightPink from "../images/Button blanks/Cattle Color Button/Light Pink.png"
import LightPink1 from "../images/Button blanks/Cattle Color Button/Light Pink1.png"
import MediumPink from "../images/Button blanks/Cattle Color Button/Medium Pink.png"
import BuffaloPlate from "../images/Horn and Bone Plates/Buffalo Black plate/Buffalo plate.png"
import BuffaloPlate1 from "../images/Horn and Bone Plates/Buffalo Black plate/Buffalo plate1.png"
import BonePlate1 from "../images/Horn and Bone Plates/Bone Plate/Bone Plate.png"
import BonePlate2 from "../images/Horn and Bone Plates/Bone Plate/Bone Plate2.png"

import bone_button1 from "../images/Button blanks/Bone Button blanks/1.png"
import bone_button2 from "../images/Button blanks/Bone Button blanks/2.png"

import horntip1 from "../images/Horn Tip/file_00000000b0f87208afbd1f708047ec51.png"
import horntip2 from "../images/Horn Tip/file_000000007ff8720b934d9f1bb97a34d5.png"
import horntip3 from "../images/Horn Tip/file_0000000091f472089ccd043faaad335e.png"
import whitespot1 from "../images/packing/file_00000000b3a0720b8f53cd2463770e7e.png"
import whitespot2 from "../images/packing/file_00000000003c71faaca0cda90c529dc1.png"


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Buffalo Horn Button Blanks (12mm-31mm)",
    category: "Button Blanks",
    dimensions: "12mm - 31mm (Custom thickness options: 2mm to 6mm)",
    material: "Buffalo Horn (Bubalus bubalis)",
    origin: "Sambhal, India (Global Craft Hub)",
    description: "Superior strength and classic deep black tones, selectively marbled. Features high-temperature tolerance and pristine surface smoothness designed for premium suiting and bespoke overcoats.",
    texture: "High-gloss polish, dense structural fibers, natural dark variations.",
    sustainable: "100% natural, ethical by-product of regional organic agriculture.",
    imageAlt: "Circular black polished buffalo horn button blanks",
    grainPattern: "Solid Deep Black"
  },
  {
    id: 2,
    name: "Premium Bone Button Blanks",
    category: "Button Blanks",
    dimensions: "14mm - 30mm (Tailored thickness)",
    material: "Natural Bovine Bone (Ethically salvaged)",
    origin: "Sambhal, India",
    description: "An elegant, matte-polished ivory alternative with rich, solid density. Highly preferred by premium denim brands and sustainable luxury designers seeking a rustic yet highly refined finish.",
    texture: "Creamy white, fine porous grain, smooth tactile touch.",
    sustainable: "Completely biodegradable, eco-friendly carbon-neutral manufacturing process.",
    imageAlt: "Natural cream-white bone button blanks",
    grainPattern: "Ivory Matte"
  },
  {
    id: 3,
    name: "Cattle Horn Button Blanks (Black & Cream)",
    category: "Button Blanks",
    dimensions: "15mm - 28mm",
    material: "Sustainably sourced Indian Cattle Horn",
    origin: "Uttar Pradesh, India",
    description: "Stunning high-contrast marbled horn blanks showing deep charcoal blacks swirling into creamy white accents. Each blank is entirely unique, providing immediate visual luxury to any garment.",
    texture: "Variable marbling, high gloss translucency, premium fiber density.",
    sustainable: "Sourced strictly from certified ethical agricultural by-products.",
    imageAlt: "Two-toned marbled black and cream cattle horn blanks",
    grainPattern: "Marbled Black & Cream"
  },
  {
    id: 4,
    name: "Buffalo Horn Color Button Blanks",
    category: "Button Blanks",
    dimensions: "12mm - 26mm",
    material: "Buffalo Horn with organic luxury dyes",
    origin: "Sambhal, India",
    description: "Naturally light horn blanks deeply infused with organic, safe colorants to retain the natural fibrous grain underneath. Yields rich, saturated luxury tones unmatched by synthetic plastic buttons.",
    texture: "Saturated translucent color overlays, delicate natural fiber visibility.",
    sustainable: "Non-toxic certified organic coloring agents used.",
    imageAlt: "Colorful dyed buffalo horn button blanks",
    grainPattern: "Vibrant Dyed Matte"
  },
  {
    id: 5,
    name: "Cattle Horn Button Blanks (Light Pink)",
    category: "Button Blanks",
    dimensions: "14mm - 25mm",
    material: "Cattle Horn (Lightly pigment-infused)",
    origin: "Sambhal, India",
    description: "Exquisite pastel rose blanks featuring delicate translucence. Created specifically for high-end boutique ladies' apparel, summer blazers, and luxury knitwear collections.",
    texture: "Ultra-smooth pastel finish with hints of underlying warm horn fibers.",
    sustainable: "Cruelty-free, ecologically processed to maximize natural luster.",
    imageAlt: "Elegant light pink dyed cattle horn blanks",
    grainPattern: "Blush Rose Hue"
  },
  {
    id: 6,
    name: "Cattle Horn Button Blanks (Medium Pink)",
    category: "Button Blanks",
    dimensions: "14mm - 25mm",
    material: "Cattle Horn (Medium pigment-infused)",
    origin: "Sambhal, India",
    description: "A gorgeous magenta-toned blank that bridges classic horn luxury with contemporary high-fashion color blocks. Delivers an elegant semi-translucent shine under studio lighting.",
    texture: "Vibrant medium pink, hand-polished edges, rich internal light-play.",
    sustainable: "Responsibly prepared using closed-loop zero-waste water processing.",
    imageAlt: "Exquisite medium pink dyed horn button blanks",
    grainPattern: "Rosy Magenta Hue"
  },
  {
    id: 7,
    name: "Cattle Horn Button Blanks (Dark Pink)",
    category: "Button Blanks",
    dimensions: "14mm - 25mm",
    material: "Cattle Horn (Deeply pigment-infused)",
    origin: "Sambhal, India",
    description: "Deep, passionate rose-crimson blanks that present highly sophisticated dark-red hues while preserving the organic micro-layering of genuine cattle horn fibers.",
    texture: "Rich dark pink, glossy outer shine, sophisticated fiber density.",
    sustainable: "Artisanally crafted, ensuring fair wages and healthy environment in India.",
    imageAlt: "Luxurious deep pink cattle horn button blanks",
    grainPattern: "Crimson Rose Hue"
  },
  {
    id: 8,
    name: "Cow Horn Color Button Blanks",
    category: "Button Blanks",
    dimensions: "12mm - 30mm",
    material: "Indian Zebu Cow Horn (Ethically sourced)",
    origin: "Uttar Pradesh, India",
    description: "Multitude of natural earthy color blanks dyed with advanced non-toxic B2B coloring protocols. Excellent strength-to-weight ratio making them highly versatile across light & heavy textiles.",
    texture: "Earthy dyed gradients, natural horn striations visible.",
    sustainable: "Naturally sourced with minimal mechanical processing footprint.",
    imageAlt: "Earthy-colored dyed cow horn button blanks",
    grainPattern: "Earthy Dyed Tones"
  },
  {
    id: 9,
    name: "Natural Black Buffalo Horn Plates",
    category: "Flat Plates",
    dimensions: "50mm x 150mm up to 80mm x 200mm (Thickness: 3mm - 8mm)",
    material: "Water Buffalo Horn (Dense Core section)",
    origin: "Sambhal, India",
    description: "Premium large-format flat horn plates selected for premium optical frames, high-end knife handles, luxury combs, jewelry, and luxury architectural inlay work. Solid, deep black obsidian-like finish.",
    texture: "Ultra-flat, thick, dense structure, polished to mirror-like sheen.",
    sustainable: "100% natural, hand-split and flattened using gentle natural heat.",
    imageAlt: "Large flat polished black buffalo horn plate",
    grainPattern: "Polished Obsidian"
  },
  {
    id: 10,
    name: "White Spot Buffalo Horn Plates",
    category: "Flat Plates",
    dimensions: "50mm x 150mm up to 80mm x 200mm (Thickness: 3mm - 8mm)",
    material: "Water Buffalo Horn (Specially selected marbled section)",
    origin: "Sambhal, India",
    description: "Extremely rare and visually striking buffalo plates with milky white speckles and snowy marbling scattered on a jet-black background. Favored by boutique artisans and premium designers globally.",
    texture: "High contrast spotted patterns, dense interior structural composition.",
    sustainable: "Artisanally selected and precision-shaved with zero chemicals.",
    imageAlt: "Spotted white and black natural buffalo horn plate",
    grainPattern: "Speckled White & Onyx"
  }
];

export const getProductImages = (product: Product) => {
  const images: { type: "vector" | "photo"; url?: string; label: string }[] = [];
  
  if (product.category === "Button Blanks") {
    if (product.grainPattern === "Solid Deep Black") {
      images.push({
        type: "photo",
        url: Buffolo1,
        label: "Polished Black Button Specimen"
      });
      images.push({
        type: "photo",
        url: Buffolo2,
        label: "Dense Obsidian Grain"
      });
      images.push({
        type: "photo",
        url: Buffolo3,
        label: "Dense Obsidian Grain button"
      });
    } else if (product.grainPattern === "Ivory Matte") {
      images.push({
        type: "photo",
        url: bone_button1,
        label: "Pristine Bone Craft Discs"
      });
      images.push({
        type: "photo",
        url: bone_button2,
        label: "Polished Bovine Bone Grain"
      });
    } else if (product.grainPattern === "Marbled Black & Cream") {
      images.push({
        type: "photo",
        url: Buffolo5,
        label: "Marbled Horn Button Specimen"
      });
      images.push({
        type: "photo",
        url: Buffolo6,
        label: "High Contrast Swirled Fibers"
      });
    } else if (product.grainPattern === "Vibrant Dyed Matte") {
      images.push({
        type: "photo",
        url: Buffolo7,
        label: "Saturated Organic Crafted Blanks"
      });
      images.push({
        type: "photo",
        url: Buffolo8,
        label: "Saturated Organic Crafted Blanks"
      });
    } else if (product.grainPattern === "Blush Rose Hue") {
      images.push({
        type: "photo",
        url: LightPink,
        label: "Blush Rose Suit Fabric Context"
      });
      images.push({
        type: "photo",
        url: CattleHorn3,
        label: "Delicate Pastel Rose Finish"
      }); 
      images.push({
        type: "photo",
        url: LightPink1,
        // url: CattleHorn6,
        label: "Quality Craft Workbench"
      });
      } else if (product.grainPattern === "Rosy Magenta Hue") {
      images.push({
        type: "photo",
        url: MediumPink,
        label: "Vibrant Rosy Magenta Textiles"
      });
      images.push({
        type: "photo",
        url: CattleHorn1,
        label: "Deep Hand-Polished Magenta Grain"
      });
    } else if (product.grainPattern === "Crimson Rose Hue") {
      images.push({
        type: "photo",
        url: DarkPink1,
        label: "Bespoke Crimson Fabric Backdrop"
      });
      images.push({
        type: "photo",
        url: DarkPink2,
        label: "Deep Hand-Polished Magenta Grain"
      });
    } else if (product.grainPattern === "Crimson Rose Hue") {
      images.push({
        type: "photo",
        url: horntip1,
        label: "Bespoke Crimson Fabric Backdrop"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
        label: "Polished Crimson Obsidian Shell"
      });
    } else if (product.grainPattern === "Earthy Dyed Tones") {
      images.push({
        type: "photo",
        url: CattleHorn1,
        label: "Earthy Brown Crafted Specimen"
      });
      images.push({
        type: "photo",
        url: CattleHorn2,
        label: "Swirling Amber Natural Veins"
      });
    } else {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
        label: "Standard Polished Blank"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
        label: "Artisan Selection"
      });
    }
  } else {
    if (product.grainPattern === "Polished Obsidian") {
      images.push({
        type: "photo",
        url: BuffaloPlate,
        label: "Polished Obsidian Horn Plate"
      });
      images.push({
        type: "photo",
        url: BuffaloPlate1,
        label: "Flat-Shaved Black Horn Slab"
      });
    } else if (product.grainPattern === "Speckled White & Onyx") {
      images.push({
        type: "photo",
        url: BonePlate2,
        label: "Spotted Onyx Plate Specimen"
      });
      images.push({
        type: "photo",
        url: BonePlate1,
        label: "Speckled White Marble Core Plate"
      });
    } else {
      images.push({
        type: "photo",
        url: horntip2,
        label: "Premium Flattened Core Slab"
      });
      images.push({
        type: "photo",
        url: horntip3,
        label: "Polished Horn Veneer"
      });
    }
  }

  // images.push({ type: "vector", label: "3D Digital Spec" });

  // images.push({
  //   type: "photo",
  //   url: cattleHorn5,
  //   label: "Export Grade Packaging"
  // });

 

  // Automatically attach a descriptive alt tag based on product name, material, and label to assist search engine indexing and screen readers
  return images.map(img => ({
    ...img,
    alt: `${product.name} - ${img.label} (Genuine ${product.material} sourced ethically in Sambhal, India) - Premium B2B ${product.category} Export specimen`
  }));
};
