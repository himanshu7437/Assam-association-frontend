"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublications } from "@/lib/api/publications";
import { PublicationItem } from "@/types";

// ─── helpers ──────────────────────────────────────────────────────────────────

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium capitalize">
      {label}
    </span>
  );
}

function ViewButton({ url }: { url: string }) {
  return (
    <Button
      className="mt-6 w-full text-white hover:bg-primary/90"
      onClick={() => window.open(url, "_blank")}
    >
      <Download size={16} className="mr-2" />
      View / Download
    </Button>
  );
}

// ─── card ─────────────────────────────────────────────────────────────────────

function PublicationCard({
  item,
  index = 0,
  animate = false,
}: {
  item: PublicationItem;
  index?: number;
  animate?: boolean;
}) {
  const content = (
    <div className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between h-full">
      <div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
          <Book size={22} />
        </div>

        <h4 className="text-lg font-serif font-bold text-primary mb-2 leading-snug">
          {item.name}
        </h4>

        <CategoryBadge label={item.category} />
      </div>

      <ViewButton url={item.fileUrl} />
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function PublicationsPage() {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPublications();
        setPublications(data);
      } catch (error) {
        console.error("Error loading publications:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // ── derived data ──────────────────────────────────────────────────────────

  const samayikData = useMemo(
    () => publications.filter((p) => p.category === "samayik"),
    [publications]
  );

  const magazineData = useMemo(
    () => publications.filter((p) => p.category === "magazine"),
    [publications]
  );

  const otherData = useMemo(
    () => publications.filter((p) => p.category === "other"),
    [publications]
  );

  /** samayik grouped by year, years sorted descending */
  const groupedSamayik = useMemo(() => {
    const map: Record<string, PublicationItem[]> = {};
    samayikData.forEach((item) => {
      const key = item.year ?? "Unknown";
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [samayikData]);

  const sortedYears = useMemo(
    () =>
      Object.keys(groupedSamayik).sort((a, b) => Number(b) - Number(a)),
    [groupedSamayik]
  );

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="bg-background">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
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
                preserving Assam's cultural and literary heritage.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════ CONTENT ═══════════════════════ */}
      <section className="pb-16 min-h-[400px]">

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <>
            {/* ──────── SAMAYIK ──────── */}
            <div className="bg-muted/30">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12">
                  Samayik
                </h2>

                {sortedYears.length === 0 ? (
                  <p className="text-muted-foreground">No Samayik publications available.</p>
                ) : (
                  <div className="space-y-12">
                    {sortedYears.map((year) => (
                      <div key={year}>
                        <h3 className="text-xl font-bold text-secondary mb-6">
                          {year}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {groupedSamayik[year].map((item) => (
                            <PublicationCard key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* ──────── MAGAZINES ──────── */}
            <div className="bg-background">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12">
                  Magazines
                </h2>

                {magazineData.length === 0 ? (
                  <p className="text-muted-foreground">No magazines available.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {magazineData.map((item, idx) => (
                      <PublicationCard key={item.id} item={item} index={idx} animate />
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* ──────── OTHER PUBLICATIONS ──────── */}
            <div className="bg-muted/30">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12">
                  Other Publications
                </h2>

                {otherData.length === 0 ? (
                  <p className="text-muted-foreground">No other publications available.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherData.map((item, idx) => (
                      <PublicationCard key={item.id} item={item} index={idx} animate />
                    ))}
                  </div>
                )}

              </div>
            </div>
          </>
        )}

      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
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
            become part of Assam Association Delhi's literary legacy.
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