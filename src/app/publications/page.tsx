"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDocuments } from "@/lib/api/documents";
import { DocumentItem } from "@/types";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDocuments();
        setPublications(data);
      } catch (error) {
        console.error("Error loading publications:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const samayikData = publications.filter(p => p.category === "samayik");
  const otherData = publications.filter(p => p.category !== "samayik");

  const groupedSamayik = samayikData.reduce((acc: Record<string, DocumentItem[]>, item) => {
    const year = item.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-background">

      {/* ================= HERO ================= */}
      <section className="pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-end">

            <div className="md:col-span-8">
              <span className="text-primary text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
                Literary Archive
              </span>

              <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary tracking-tight">
                Publications
              </h1>
            </div>

            <div className="md:col-span-4">
              <p className="text-muted-foreground leading-relaxed">
                Explore our curated collection of Samayik editions, magazines, and books
                preserving Assam’s cultural and literary heritage.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="pb-16 min-h-[400px]">

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <>
            {/* ================= SAMAYIK ================= */}
            <div className="bg-muted/30">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12">
                  Samayik
                </h2>

                {Object.keys(groupedSamayik).length === 0 ? (
                  <p className="text-muted-foreground">
                    No Samayik available.
                  </p>
                ) : (
                  <div className="space-y-12">
                    {Object.keys(groupedSamayik)
                      .sort((a, b) => Number(b) - Number(a))
                      .map((year) => (
                        <div key={year}>
                          <h3 className="text-xl font-bold text-secondary mb-6">
                            {year}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {groupedSamayik[year].map((item: DocumentItem) => (
                              <div
                                key={item.id}
                                className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between"
                              >
                                <div>
                                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Book size={22} />
                                  </div>

                                  <h4 className="text-lg font-serif font-bold text-primary mb-2">
                                    {item.name}
                                  </h4>

                                  <p className="text-sm text-muted-foreground">
                                    Samayik Publication
                                  </p>
                                </div>

                                {item.url && (
                                  <Button
                                    className="mt-6 w-full"
                                    onClick={() => window.open(item.url, "_blank")}
                                  >
                                    <Download size={16} className="mr-2" />
                                    PDF
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

              </div>
            </div>

            {/* ================= OTHER PUBLICATIONS ================= */}
            <div className="bg-background">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12">
                  Other Books & Magazines
                </h2>

                {otherData.length === 0 ? (
                  <p className="text-muted-foreground">
                    No publications available.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {otherData.map((pub, idx) => (
                      <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-muted/30 border border-border rounded-2xl p-8 hover:shadow-xl transition flex flex-col"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                          <Book size={26} />
                        </div>

                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                          {pub.name}
                        </h3>

                        <p className="text-sm text-muted-foreground flex-1 mb-6">
                          No description provided.
                        </p>

                        {pub.url && (
                          <Button
                            className="w-full"
                            onClick={() => window.open(pub.url, "_blank")}
                          >
                            <Download size={18} className="mr-2" />
                            Download PDF
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

              </div>
            </div>

          </>
        )}

      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">

          <span className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
            Contributions
          </span>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B365D] mb-8">
            Submit Your Work
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Share your stories, research, or creative writings with our community and
            become part of Assam Association Delhi’s literary legacy.
          </p>

          <Link
            href="/contact"
            className="inline-block border border-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Get In Touch
          </Link>

        </div>
      </section>

    </div>
  );
}