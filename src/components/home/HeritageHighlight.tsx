"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HeritageHighlight() {
  const timeline = [
    { year: "1968", event: "Foundation", desc: "A vision born to unite the Assamese community in Delhi." },
    { year: "1980", event: "Inauguration", desc: "Completion of the iconic Srimanta Sankaradeva Bhawan." },
    { year: "2018", event: "Golden Jubilee", desc: "Celebrating 50 years of community service and cultural excellence." }
  ];

  return (
    <section className="py-spacing-16 bg-surface overflow-hidden relative">
      {/* Subtle Motif Background */}
      <div className="absolute inset-0 heritage-pattern opacity-100 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-32">
          {/* Content Column: Editorial Archive */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:col-span-6"
          >
            <span className="text-primary/60 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block italic">
              Live Heritage // Historical Record
            </span>
            <h2 className="display-lg text-secondary mb-10">
              A Home <br />
              <span className="font-normal italic">Away from Home</span>
            </h2>
            <p className="body-lg text-tertiary/70 leading-relaxed mb-12 max-w-xl">
              The Srimanta Sankaradeva Bhawan stands as more than just a building; it is a sanctuary.
              Designed with the architectural ethos of Assam&apos;s Namghars, it serves as the spiritual
              and cultural hub where Bihu songs resonate and Sattriya dance finds a stage in the capital.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-secondary/10">
              <div className="p-8 bg-surface-container-low">
                <h4 className="font-serif font-bold text-primary mb-4 italic text-xl tracking-tight">Linguistic Root</h4>
                <p className="body-md text-tertiary/60">Dedicated to the preservation of our unique linguistic roots and traditional literature.</p>
              </div>
              <div className="p-8 bg-surface-container-low">
                <h4 className="font-serif font-bold text-primary mb-4 italic text-xl tracking-tight">Spiritual Center</h4>
                <p className="body-md text-tertiary/60">Following the profound philosophical teachings of Mahapurush Srimanta Sankaradeva.</p>
              </div>
            </div>
          </motion.div>

          {/* Image Column: Asymmetrical Layers */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:col-span-6 relative"
          >
            {/* Background Layer Shift */}
            <div className="absolute inset-0 bg-primary/5 translate-x-12 translate-y-12" />

            <div className="relative aspect-[4/5] bg-white shadow-ambient overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1626082896492-766af4eb6501?q=80&w=2070&auto=format&fit=crop"
                alt="Shankaradeva Bhawan Editorial"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent mix-blend-multiply" />

              {/* Ghost Border Overlay */}
              <div className="absolute inset-8 border border-white/20 pointer-events-none" />
            </div>

            {/* Floating Information Block */}
            <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-ambient border-l-4 border-primary">
              <p className="text-[9px] uppercase tracking-[0.4em] text-primary/40 font-bold mb-2 italic">Architecture</p>
              <p className="text-sm font-serif font-bold text-secondary">
                Inspired by the Namghars <br />of the Brahmaputra Valley.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section: No-Line Rule */}
        <div className="mt-32 pt-24 bg-surface-container-low/30 px-8 lg:px-20 pb-24">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20">
            <h3 className="text-4xl font-serif font-bold text-secondary italic tracking-tight">
              The Journey through decades
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/30">Archives // Records</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={cn(
                  "p-12 relative transition-colors duration-500 hover:bg-white flex flex-col items-start gap-4",
                  index !== 2 ? "md:border-r border-secondary/5" : ""
                )}
              >
                <p className="text-5xl font-serif font-bold text-primary tracking-tighter mb-4 opacity-80">{item.year}</p>
                <h4 className="text-sm font-bold text-secondary uppercase tracking-[0.3em]">{item.event}</h4>
                <p className="text-tertiary/60 body-md leading-relaxed">{item.desc}</p>

                {/* Asymmetric accent */}
                <div className="w-8 h-[2px] bg-primary/20 group-hover:w-12 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
