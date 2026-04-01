"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: <Landmark className="text-primary" size={32} />,
    title: "Cultural Hub",
    description: "A center for Assamese art, music, and traditional celebrations in the capital."
  },
  {
    icon: <Users className="text-primary" size={32} />,
    title: "Strong Community",
    description: "Fostering bonds among thousands of Assamese members living in Delhi NCR."
  },
  {
    icon: <Heart className="text-primary" size={32} />,
    title: "Social Service",
    description: "Dedicated to the welfare of our people through various philanthropic initiatives."
  }
];

export default function AboutPreview() {
  return (
    <section className="py-spacing-16 bg-surface-container-low overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Content: Editorial Voice */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-12 xl:col-span-5"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-8 tracking-tight">
              Our Vision <br />
              <span className="italic font-normal">& Mission</span>
            </h2>
            <p className="text-xl text-primary/80 mb-10 leading-relaxed italic border-l-4 border-primary/20 pl-8">
              "To create a vibrant platform for preserving Assamese heritage while 
              empowering our community through unity and service."
            </p>
            <p className="body-lg text-tertiary/70 mb-12 leading-relaxed">
              Assam Association Delhi has been a pillar for the Assamese community since 1968. We strive to provide a space where our traditions flourish and our people find support, far from their homeland.
            </p>
            <Link 
              href="/about"
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:text-primary-container transition-colors"
            >
              Discover Our Journey 
              <span className="w-12 h-[1px] bg-primary group-hover:w-16 transition-all" />
            </Link>
          </motion.div>

          {/* Highlights Grid: Tonal Layering */}
          <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "p-12 bg-surface-container-lowest shadow-ambient transition-all duration-500 hover:translate-y-[-4px] group",
                  index === 0 ? "md:col-span-2 flex flex-col md:flex-row gap-12 items-center" : ""
                )}
              >
                <div className={cn(
                  "flex-shrink-0 w-20 h-20 bg-surface-container-low flex items-center justify-center group-hover:bg-primary transition-colors duration-500",
                  "text-primary group-hover:text-white"
                )}>
                  {/* @ts-expect-error - Lucide icon cloning */}
                  {React.cloneElement(item.icon as React.ReactElement, { size: 36, strokeWidth: 1 })}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-secondary mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-tertiary/60 body-md leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
