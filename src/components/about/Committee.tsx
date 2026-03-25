"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const members = [
  { name: "Dr. Hemanta Kalita", role: "President", image: "/images/placeholder-user.jpg" },
  { name: "Smti. Rita Baruah", role: "General Secretary", image: "/images/placeholder-user.jpg" },
  { name: "Shri. Pranab Gogoi", role: "Treasurer", image: "/images/placeholder-user.jpg" },
  { name: "Dr. Meera Saikia", role: "Cultural Secretary", image: "/images/placeholder-user.jpg" }
];

export default function Committee() {
  return (
    <section id="committee">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-xl">
            <span className="text-[#4b0004] font-bold tracking-widest uppercase text-xs mb-2 block">
              Governance
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19] font-[Noto_Serif]">
              Executive Committee
            </h2>

            <div className="h-1 w-20 bg-[#4b0004] mt-4"></div>
          </div>

          <p className="text-[#44474e] max-w-md text-sm sm:text-base">
            Our leadership is dedicated to fostering a sense of community and
            supporting the Assamese diaspora in Delhi through cultural and social initiatives.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-6 sm:p-8 rounded-lg text-center border border-[#e4e2dd] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full border-4 border-[#eae8e3] group-hover:border-[#4b0004]/20 transition-colors"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg sm:text-xl font-bold text-[#1b1c19] mb-1 font-[Noto_Serif]">
                {member.name}
              </h3>

              <p className="text-[#4b0004] text-sm font-medium mb-3">
                {member.role}
              </p>

              <p className="text-[#44474e] text-xs sm:text-sm leading-relaxed">
                Dedicated to strengthening the community and preserving cultural values.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}