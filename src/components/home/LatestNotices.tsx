"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const notices = [
  {
    id: 1,
    date: "Dec 15, 2023",
    title: "Annual General Meeting 2024",
    category: "Official",
    description: "Notice regarding the upcoming AGM scheduled at Sankaradeva Bhawan Auditorium. All members are requested to attend."
  },
  {
    id: 2,
    date: "Jan 05, 2024",
    title: "Bhogali Bihu Celebrations 2025",
    category: "Event",
    description: "Volunteer registration and stall booking now open for the upcoming harvest festival celebrations."
  },
  {
    id: 3,
    date: "Feb 10, 2024",
    title: "New Membership Drive",
    category: "General",
    description: "Inviting life membership applications for Assamese residents and students in Delhi-NCR. Join our growing community."
  }
];

export default function LatestNotices() {
  return (
    <section className="py-spacing-16 bg-surface-container-high relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-xl">
             <span className="text-secondary/40 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block italic">
               Official Dispatches // News
             </span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary tracking-tight leading-none italic">
               The Living <br /><span className="text-primary not-italic">Archive.</span>
             </h2>
          </div>
          <div className="flex flex-col items-end gap-6 h-full pb-2">
            <p className="text-tertiary/60 body-md max-w-[280px] text-right font-medium leading-relaxed">
              Official updates, event announcements, and community bulletins from the heart of the association.
            </p>
            <Link 
              href="/notices"
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:text-primary-container transition-all"
            >
              Consult the Records <span className="w-12 h-[1px] bg-primary group-hover:w-16 transition-all" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {notices.map((notice, idx) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={cn(
                "p-12 transition-all duration-500 hover:bg-surface-container-lowest hover:shadow-ambient group",
                idx !== notices.length - 1 && "md:border-r border-secondary/5"
              )}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-8 h-[1px] bg-primary/20" />
                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-tertiary/40">{notice.date}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-secondary mb-6 group-hover:text-primary transition-colors leading-tight tracking-tight">
                  {notice.title}
                </h3>
                <p className="body-md text-tertiary/60 leading-relaxed mb-10 line-clamp-3">
                  {notice.description}
                </p>
                <div className="mt-auto pt-8 border-t border-secondary/5 flex justify-between items-center bg-transparent group-hover:bg-surface-container-low/20 transition-colors -mx-4 px-4">
                   <Link href={`/notices/${notice.id}`} className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                     View Record <ArrowRight size={14} strokeWidth={1.5} />
                   </Link>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-tertiary/20 italic">{notice.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
