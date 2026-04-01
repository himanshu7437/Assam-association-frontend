"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Eye,
  ShieldCheck,
  Users,
  Landmark,
  TrendingUp,
} from "lucide-react";

export default function VisionMission() {
  const values = [
    {
      title: "Integrity",
      desc: "We uphold honesty and transparency in all administrative and financial matters.",
      icon: ShieldCheck,
    },
    {
      title: "Inclusivity",
      desc: "We welcome every member of the community, fostering unity beyond differences.",
      icon: Users,
    },
    {
      title: "Heritage Preservation",
      desc: "We actively preserve and promote Assamese traditions for future generations.",
      icon: Landmark,
    },
    {
      title: "Community Growth",
      desc: "We encourage collective progress through shared support and opportunities.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="vision">
      <div className="max-w-7xl mx-auto">

        {/* ===== MISSION & VISION ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">

          {/* MISSION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-2xl border border-[#e4e2dd] shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="text-[#4b0004] w-7 h-7" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#1b1c19] font-[Noto_Serif]">
                Our Mission
              </h2>
            </div>

            <p className="text-[#44474e] text-base md:text-lg leading-relaxed">
              To empower and unify the Assamese diaspora in Delhi-NCR by creating
              a vibrant platform for socio-cultural exchange, supporting education,
              and ensuring the welfare of community members.
            </p>
          </motion.div>

          {/* VISION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 md:p-10 rounded-2xl border border-[#e4e2dd] shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-[#4b0004] w-7 h-7" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#1b1c19] font-[Noto_Serif]">
                Our Vision
              </h2>
            </div>

            <p className="text-[#44474e] text-base md:text-lg leading-relaxed">
              To be a leading cultural institution representing Assamese heritage,
              fostering identity, pride, and meaningful connections across diverse
              communities in India and beyond.
            </p>
          </motion.div>

        </div>

        {/* ===== CORE VALUES ===== */}
        <div>
          <div className="text-center mb-16">
            <span className="text-[#4b0004] font-bold tracking-widest uppercase text-xs mb-2 block">
              The Pillars of our Organization
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19] font-[Noto_Serif]">
              Our Core Values
            </h2>

            <div className="h-1 w-20 bg-[#4b0004] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-xl text-center shadow-sm border border-[#e4e2dd] hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <Icon className="w-10 h-10 text-[#4b0004] mx-auto mb-5" />

                  <h3 className="text-lg font-bold mb-2 font-[Noto_Serif]">
                    {value.title}
                  </h3>

                  <p className="text-[#44474e] text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}