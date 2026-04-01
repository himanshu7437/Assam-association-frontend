"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Images } from "lucide-react";
import { Facility } from "@/types";

interface HeroSectionProps {
  facility: Facility;
}

export default function HeroSection({ facility }: HeroSectionProps) {
  let typeLabel = "Facility";
  if (facility.type === "accommodation") typeLabel = "Guest House";
  else if (facility.type === "event") typeLabel = "Event Space";

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] w-full bg-[#1b1c19] flex flex-col justify-end">
      <Image
        src={facility.image}
        alt={facility.name}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      {/* Dark gradient overlay for extreme readability - multiple gradients for distinct layering */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      
      <div className="relative z-10 w-full pb-16 md:pb-24 pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center md:items-start md:text-left">
          <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-8 text-sm font-medium transition group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Facilities
          </Link>
          
          <span className="text-white/80 text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
            {typeLabel}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight drop-shadow-2xl max-w-4xl">
            {facility.name}
          </h1>
          <p className="mt-6 text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-md line-clamp-3">
            {facility.description}
          </p>
        </div>
      </div>

      {/* HERO GALLERY OVERLAY */}
      {facility.gallery && facility.gallery.length > 0 && (
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20">
          <a 
            href="#gallery-section" 
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full transition-all duration-300 border border-white/30 shadow-2xl"
          >
            <Images size={20} />
            <span className="text-sm font-medium tracking-wide">Gallery ({facility.gallery.length})</span>
          </a>
        </div>
      )}
    </section>
  );
}
