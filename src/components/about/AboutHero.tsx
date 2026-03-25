"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4b0004] to-[#73000a] opacity-95" />

      {/* Jaapi Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M30 0l30 30-30 30-30-30z%22 fill=%22%23ffffff%22 fill-opacity=%220.03%22/%3E%3C/svg%3E')]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight font-[Noto_Serif]">
            Our Story & Leadership
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-[Inter] leading-relaxed">
            Preserving the vibrant heritage of Assam in the heart of the national capital since 1968.
          </p>
        </motion.div>
      </div>
    </section>
  );
}