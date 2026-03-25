"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BookingHero() {
  return (
    <section className="relative py-24 md:py-32 bg-primary overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" />

      {/* Overlay Gradient (IMPORTANT for visibility) */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* Tag */}
          <span className="inline-block mb-6 px-4 py-1.5 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white border border-white/40 rounded-full backdrop-blur-sm">
            Hassle-Free Booking
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Reserve Your Space
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-white/80 max-w-2xl font-light leading-relaxed mx-auto">
            Book guest rooms, auditoriums, or meeting halls with ease.
            Submit your request and our team will confirm availability shortly.
          </p>

        </motion.div>
      </div>
    </section>
  );
}