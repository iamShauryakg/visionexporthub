import React from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  dimensions: string;
  material: string;
  origin: string;
  description: string;
  texture: string;
  sustainable: string;
  imageAlt: string;
  grainPattern: string;
}

export interface ManufacturingStep {
  step: string | number;
  phase?: string;
  title: string;
  description: string;
}

export interface ArchitectureSpec {
  id?: number;
  name: string;
  category: string;
  scientificName: string;
  moistureContent: string;
  density: string;
  hardness: string;
  availableSizes: string;
  tolerances: string;
  primaryApplications: string[];
  industrialGrade: string;
  artisanTechnique: string;
  description: string;
  blueprintSvgType: "button" | "plate" | "sheet" | "tip" | "scale" | "block" | "toggle";
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Hero3DMaterial {
  id?: string;
  name: string;
  subtitle: string;
  grain: string;
  finish: string;
  b2bMoq: string;
  source: string;
  image?: string;
  colors: {
    front: string;
    back: string;
    side: string;
    accent: string;
  };
  shadingClass: string;
  specularPower: number;
  description: string;
}

export interface VisionGalleryItem {
  id?: number;
  image: string;
  title: string;
  description: string;
  tag?: string;
  step?: string;
  subtitle?: string;
}

export interface PartnerBrand {
  id?: number;
  name: string;
  location: string;
  style: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

export interface TiltContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
}
