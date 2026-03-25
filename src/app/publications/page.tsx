"use client";

import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import { motion } from "framer-motion";
import { Book, FileText, Download, ArrowRight, Eye } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const publications = [
  {
    id: 1,
    title: "Srimanta Sankaradeva Souvenir",
    year: "2023",
    type: "Annual Souvenir",
    description: "A comprehensive collection of scholarly articles on the life and philosophy of Srimanta Sankaradeva."
  },
  {
    id: 2,
    title: "AAD Newsletter - Winter Edition",
    year: "2023",
    type: "Newsletter",
    description: "Quarterly updates from the association, event highlights, and member achievements."
  },
  {
    id: 3,
    title: "Luitor Pora Jamunaloi",
    year: "2022",
    type: "Annual Magazine",
    description: "The flagship literary effort reflecting the creative expressions of the Assamese diaspora in Delhi."
  }
];

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <PageHeader 
        title="Publications" 
        description="Preserving our literary soul through magazines, souvenirs, and periodic newsletters."
        badge="Literary Heritage"
      />

      <section className="container mx-auto px-4 md:px-6 mt-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {publications.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col h-full bg-white rounded-3xl border border-border hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2 transition-all p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <Book size={28} />
              </div>
              <div className="flex items-center justify-between mb-4">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{pub.type}</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{pub.year}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4 leading-tight">{pub.title}</h3>
              <p className="text-sm text-muted-foreground flex-1 leading-relaxed mb-10">
                 {pub.description}
              </p>
              
              <div className="flex flex-col gap-3">
                 <Button className="w-full h-12 rounded-full font-bold shadow-lg shadow-primary/10">
                   <Download size={18} className="mr-2" /> Download Full PDF
                 </Button>
                 <Button variant="ghost" className="w-full h-12 rounded-full font-bold hover:bg-muted hover:text-primary transition-colors">
                   <Eye size={18} className="mr-2" /> Preview Sample
                 </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[3rem] bg-primary text-primary-foreground text-center relative overflow-hidden">
           <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-6 italic text-secondary">Call for Submissions</h2>
              <p className="text-primary-foreground/70 mb-10 leading-relaxed text-lg font-light">
                Do you have a story, poem, or research paper related to Assam? 
                We invite contributions for our upcoming annual magazine.
              </p>
              <Link 
                href="/contact"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-12 h-14 font-bold")}
              >
                Submit Your Entry <ArrowRight size={18} className="ml-2" />
              </Link>
           </div>
           
           {/* Abstract Design */}
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl p-0" />
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl p-0" />
        </div>
      </section>
    </div>
  );
}
