import { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Buffalo Horn Button Blanks (12mm-31mm)",
    category: "Button Blanks",
    dimensions: "12mm - 31mm (Custom thickness options: 2mm to 6mm)",
    material: "Water Buffalo Horn (Bubalus bubalis)",
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
        url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80",
        label: "Polished Black Button Specimen"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80",
        label: "Dense Obsidian Grain"
      });
    } else if (product.grainPattern === "Ivory Matte") {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1590534244455-c9940687705b?auto=format&fit=crop&w=800&q=80",
        label: "Pristine Bone Craft Discs"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        label: "Polished Bovine Bone Grain"
      });
    } else if (product.grainPattern === "Marbled Black & Cream") {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
        label: "Marbled Horn Button Specimen"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=800&q=80",
        label: "High Contrast Swirled Fibers"
      });
    } else if (product.grainPattern === "Vibrant Dyed Matte") {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
        label: "Saturated Organic Crafted Blanks"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
        label: "Infused Natural Grain Sheen"
      });
    } else if (product.grainPattern === "Blush Rose Hue") {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
        label: "Blush Rose Suit Fabric Context"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        label: "Delicate Pastel Rose Finish"
      });
    } else if (product.grainPattern === "Rosy Magenta Hue") {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
        label: "Vibrant Rosy Magenta Textiles"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
        label: "Deep Hand-Polished Magenta Grain"
      });
    } else if (product.grainPattern === "Crimson Rose Hue") {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
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
        url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
        label: "Earthy Brown Crafted Specimen"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
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
        url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80",
        label: "Polished Obsidian Horn Plate"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80",
        label: "Flat-Shaved Black Horn Slab"
      });
    } else if (product.grainPattern === "Speckled White & Onyx") {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
        label: "Spotted Onyx Plate Specimen"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        label: "Speckled White Marble Core Plate"
      });
    } else {
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80",
        label: "Premium Flattened Core Slab"
      });
      images.push({
        type: "photo",
        url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        label: "Polished Horn Veneer"
      });
    }
  }

  images.push({ type: "vector", label: "3D Digital Spec" });

  images.push({
    type: "photo",
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    label: "Export Grade Packaging"
  });

  images.push({
    type: "photo",
    url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    label: "Quality Craft Workbench"
  });

  // Automatically attach a descriptive alt tag based on product name, material, and label to assist search engine indexing and screen readers
  return images.map(img => ({
    ...img,
    alt: `${product.name} - ${img.label} (Genuine ${product.material} sourced ethically in Sambhal, India) - Premium B2B ${product.category} Export specimen`
  }));
};
