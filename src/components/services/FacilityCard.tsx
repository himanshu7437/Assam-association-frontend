"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Users, BookOpen, Coffee, Landmark, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Facility {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
  capacity: string;
  availability: "Available" | "Limited" | "Booking Only";
}


export default function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl"
    >
      <div className="relative h-72 overflow-hidden bg-muted">
        {/* Image Placeholder */}
        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary/10 group-hover:scale-110 transition-transform duration-[2s]">
          <Landmark size={100} strokeWidth={1} />
        </div>
        <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 text-[10px] uppercase tracking-widest font-bold z-10">
          {facility.availability}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-10 border-t border-primary/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/5 text-primary">
             {facility.icon}
          </div>
          <h3 className="text-3xl font-serif font-bold text-primary tracking-tight">{facility.name}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          {facility.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-10">
          {facility.features.map(feature => (
            <span key={feature} className="text-[10px] px-3 py-1 bg-muted/50 font-bold text-muted-foreground uppercase tracking-widest italic">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-8 border-t border-primary/5">
          <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold italic">
            Capacity: <span className="text-primary">{facility.capacity}</span>
          </div>
          <Link 
            href="/booking"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
          >
            Check Availability <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
