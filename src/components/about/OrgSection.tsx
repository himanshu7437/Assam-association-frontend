"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";

export default function OrgSection() {
  return (
    <section id="org" className="py-20 md:py-24 bg-[#fbf9f4]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <BookOpenText className="w-12 h-12 text-[#4b0004] mx-auto mb-6 opacity-20" />

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1c19] mb-6 font-[Noto_Serif] leading-tight">
            A Legacy of Service
          </h2>

          {/* Quote */}
          <p className="text-[#44474e] text-base sm:text-lg md:text-xl leading-relaxed italic max-w-2xl mx-auto">
            “Since our founding, the Assam Association Delhi has remained steadfast in its
            commitment to the welfare of our people. Through decades of change, our dedication
            to service and the promotion of Assamese identity in the heart of the national capital
            remains unchanged.”
          </p>

          {/* Footer Line */}
          <div className="mt-10 flex justify-center items-center gap-3 sm:gap-4">
            <div className="h-[1px] w-10 sm:w-12 bg-[#c4c6cf]" />
            <p className="text-[#4b0004] font-bold uppercase tracking-widest text-xs sm:text-sm">
              Established 1968
            </p>
            <div className="h-[1px] w-10 sm:w-12 bg-[#c4c6cf]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}