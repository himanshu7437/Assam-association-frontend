"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  variant?: "primary" | "muted" | "secondary";
}

export default function PageHeader({ 
  title, 
  description, 
  badge,
  variant = "primary" 
}: PageHeaderProps) {
  const bgClasses = {
    primary: "bg-primary text-primary-foreground",
    muted: "bg-muted text-foreground border-b border-border",
    secondary: "bg-secondary text-secondary-foreground"
  };

  return (
    <section className={cn("relative py-24 md:py-32 overflow-hidden", bgClasses[variant])}>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-[0.03] bg-cover bg-center grayscale" />
      )}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-4xl"
        >
          {badge && (
            <span className="inline-block px-0 py-1 text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-secondary border-b border-secondary/30 italic">
              {badge}
            </span>
          )}
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-10 tracking-tighter leading-[0.9] italic">
            {title}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl opacity-60 max-w-2xl font-light leading-relaxed italic border-l-2 border-primary/20 pl-8 ml-2">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";
