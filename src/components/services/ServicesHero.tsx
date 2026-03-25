"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center lg:text-left">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Our Facilities</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            World-class Services <br />
            <span className="text-white/70 italic">for the Community.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
            From comfortable accommodations to state-of-the-art auditoriums, 
            we provide a range of facilities catering to all your social and cultural needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
