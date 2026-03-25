"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface pb-24 lg:pb-0">
      {/* Heritage Motif Overlay */}
      <div className="absolute inset-0 heritage-pattern opacity-100 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          
          {/* Left Content: Editorial Voice */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 pt-32 lg:pt-0 relative z-20"
          >
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-primary/60 italic"
              >
                The Living Archive // Est. 1968
              </motion.span>
              
              <h1 className="display-lg text-secondary mb-8 lg:-mr-32 relative">
                <span className="block text-primary">Heritage &</span>
                <span className="italic font-normal">Horizon.</span>
              </h1>
              
              <p className="body-lg text-tertiary/70 leading-relaxed mb-12 max-w-lg font-medium">
                A curated sanctuary for the Assamese diaspora. We balance the weight of tradition with the lightness of modern excellence in the heart of Delhi.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center">
                <Link 
                  href="/membership"
                  className="group relative overflow-hidden bg-primary px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all duration-500 hover:translate-y-[-2px] hover:shadow-ambient active:translate-y-0"
                >
                  <span className="relative z-10">Join the Legacy</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <Link 
                  href="/services"
                  className="ghost-border px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary hover:bg-secondary/5 transition-all duration-300"
                >
                  Explore Facilities
                </Link>
              </div>

              {/* Quick Tonal Stats - No Lines */}
              <div className="mt-24 grid grid-cols-3 gap-16 py-12 bg-surface-container-low/50 px-8 lg:-ml-8">
                <div className="flex flex-col gap-2">
                   <p className="text-4xl font-serif font-bold text-primary tracking-tighter">57</p>
                   <p className="text-[9px] uppercase tracking-widest text-tertiary/40 font-bold italic">Years of Agency</p>
                </div>
                <div className="flex flex-col gap-2">
                   <p className="text-4xl font-serif font-bold text-primary tracking-tighter">5k+</p>
                   <p className="text-[9px] uppercase tracking-widest text-tertiary/40 font-bold italic">Active Voices</p>
                </div>
                <div className="flex flex-col gap-2">
                   <p className="text-4xl font-serif font-bold text-primary tracking-tighter">120</p>
                   <p className="text-[9px] uppercase tracking-widest text-tertiary/40 font-bold italic">Annual Events</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Imagery: Physical Layers */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-end"
          >
            <div className="relative w-full aspect-[4/5] lg:w-[120%] lg:-mr-24">
               {/* Background Layer (Tonal Shift) */}
               <div className="absolute inset-0 bg-surface-container-high translate-x-8 translate-y-8" />
               
               {/* Image Layer */}
               <div className="absolute inset-0 bg-white shadow-ambient overflow-hidden">
                  <div className="absolute inset-0 bg-tertiary/5 mix-blend-multiply" />
                  <Image 
                    src="https://images.unsplash.com/photo-1582650625119-c631f742982d?q=80&w=2070&auto=format&fit=crop"
                    alt="Assam Heritage"
                    fill
                    className="object-cover grayscale-[20%] hover:scale-105 transition-transform duration-[3000ms] ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent mix-blend-overlay" />
               </div>

               {/* Overlapping Content Box */}
               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.8 }}
                 className="absolute -bottom-12 -left-12 bg-white p-10 shadow-ambient max-w-[240px]"
               >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-primary/40 font-bold mb-4 italic leading-relaxed">
                    Srimanta <br />Sankaradeva Bhawan
                  </p>
                  <p className="text-lg font-serif font-bold text-secondary tracking-tight">
                    Where tradition meets the aspiration of tomorrow.
                  </p>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Aesthetic Floating Element */}
      <div className="absolute top-1/4 -right-12 w-24 h-24 bg-primary/5 -rotate-12 blur-sm" />
    </section>
  );
}
