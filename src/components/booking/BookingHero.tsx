"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BookingHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* 🔥 Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/booking-hero.jpeg')", // 👈 change image here
          }}
        />
      </div>

      {/* 🔥 Dark Overlay (MAIN FIX for readability) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ✨ Gradient Overlay (adds depth & premium feel) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Optional subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* CONTENT */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >

          {/* Tag */}
          <span className="inline-block mb-6 px-4 py-1.5 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white border border-white/40 rounded-full backdrop-blur-md">
            Hassle-Free Booking
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Reserve Your Space
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
            Book guest rooms, auditoriums, or meeting halls with ease.
            Submit your request and our team will confirm availability shortly.
          </p>

        </motion.div>
      </div>
    </section>
  );
}