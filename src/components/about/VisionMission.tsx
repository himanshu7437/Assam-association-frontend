"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Eye, ShieldCheck, Users, Landmark, TrendingUp } from "lucide-react";

export default function VisionMission() {
  const values = [
    {
      title: "Integrity",
      desc: "Honesty and transparency in all our administrative and financial operations.",
      icon: ShieldCheck,
    },
    {
      title: "Inclusivity",
      desc: "Welcoming all members of the community regardless of background or status.",
      icon: Users,
    },
    {
      title: "Heritage Preservation",
      desc: "Active commitment to keeping Assamese traditions alive for future generations.",
      icon: Landmark,
    },
    {
      title: "Community Growth",
      desc: "Fostering personal and collective advancement through shared resources.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="vision">
      <div className="max-w-7xl mx-auto">

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Rocket className="text-[#4b0004] w-8 h-8" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c19] font-[Noto_Serif]">
                Our Mission
              </h2>
            </div>

            <p className="text-[#44474e] text-base sm:text-lg leading-relaxed">
              To empower and unify the Assamese diaspora in Delhi-NCR by providing a robust platform
              for socio-cultural exchange, supporting educational pursuits, and ensuring the welfare
              of our community members in times of need.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Eye className="text-[#4b0004] w-8 h-8" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c19] font-[Noto_Serif]">
                Our Vision
              </h2>
            </div>

            <p className="text-[#44474e] text-base sm:text-lg leading-relaxed">
              To become a global beacon for Assamese culture and heritage, fostering a deep sense
              of identity and pride while building bridges between the people of Assam and the
              diverse communities of India's capital.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
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
                  className="bg-white p-8 sm:p-10 rounded-lg text-center shadow-sm border border-[#e4e2dd]"
                >
                  <Icon className="w-10 h-10 text-[#4b0004] mx-auto mb-6" />

                  <h3 className="text-lg sm:text-xl font-bold mb-3 font-[Noto_Serif]">
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