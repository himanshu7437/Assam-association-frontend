"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getCommitteeMembers } from "@/lib/api/committee";
import { Member } from "@/types";
import { Loader2 } from "lucide-react";

export default function Committee() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await getCommitteeMembers();
        setMembers(data);
      } catch (error) {
        console.error("Failed to fetch committee members", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadMembers();
  }, []);

  return (
    <section id="committee" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-[#4b0004]" size={40} />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No committee members announced yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {members.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white p-6 sm:p-8 rounded-3xl text-center border border-[#e4e2dd] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Profile Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-6">
                  <Image
                    src={member.image || "/images/placeholder-user.jpg"}
                    alt={member.fullName}
                    fill
                    sizes="(max-width: 768px) 100px, 128px"
                    className="object-cover rounded-2xl border-4 border-[#eae8e3] group-hover:border-[#4b0004]/20 transition-colors"
                  />
                </div>

                {/* Info */}
                <h3 className="text-lg sm:text-xl font-bold text-[#1b1c19] mb-1 font-[Noto_Serif]">
                  {member.fullName}
                </h3>

                <p className="text-[#4b0004] text-sm font-medium mb-1">
                  {member.role}
                </p>

                {member.email && (
                  <p className="text-[#465f88] text-xs mb-3 truncate px-2">
                    {member.email}
                  </p>
                )}

                <p className="text-[#44474e] text-xs sm:text-sm leading-relaxed">
                  Dedicated to strengthening the community and preserving cultural values.
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}