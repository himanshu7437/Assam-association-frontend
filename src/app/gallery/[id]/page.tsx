"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAlbumById } from "@/lib/api/albums";
import { Album } from "@/types";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Loader from "@/components/gallery/Loader";
import EmptyState from "@/components/gallery/EmptyState";
import { ArrowLeft } from "lucide-react";

export default function AlbumDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAlbum() {
      if (!id || typeof id !== "string") return;
      try {
        const data = await getAlbumById(id);
        setAlbum(data);
      } catch (error) {
        console.error("Error loading album details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAlbum();
  }, [id]);

  if (isLoading) {
    return <div className="pt-28 min-h-screen bg-[#F9F7F2]"><Loader /></div>;
  }

  if (!album) {
    return (
      <main className="pt-28 pb-24 min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center px-8 text-center">
        <EmptyState message="Album not found or has been removed." />
        <button 
          onClick={() => router.push("/gallery")}
          className="mt-8 px-6 py-3 bg-[#4b0004] text-white rounded-lg flex items-center gap-2 hover:bg-[#3a0003] transition"
        >
          <ArrowLeft size={18} /> Back to Gallery
        </button>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-24 min-h-screen bg-[#F9F7F2]">
      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-8 mb-16">
        <button 
          onClick={() => router.push("/gallery")}
          className="flex items-center gap-2 text-sm uppercase tracking-widest text-[#465f88] hover:text-[#4b0004] transition mb-8 font-semibold"
        >
          <ArrowLeft size={16} /> Back to Albums
        </button>

        <div className="border-b border-[#e4e2dd] pb-10">
          <span className="text-xs uppercase tracking-widest text-[#B5824C] font-semibold">
            {album.date} • {album.itemCount} items
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#4b0004] mt-2 mb-4">
            {album.title}
          </h1>
        </div>
      </section>

      {/* MEDIA GRID */}
      <section className="max-w-7xl mx-auto px-8">
        {!album.media || album.media.length === 0 ? (
          <EmptyState message="This album currently has no media." />
        ) : (
          <GalleryGrid media={album.media} />
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 mt-24">
        <div className="bg-[#1B365D] p-14 flex flex-col md:flex-row items-center justify-between gap-10 rounded-lg">
          <div>
            <h2 className="text-3xl font-serif text-white mb-2">
              Stay Connected
            </h2>
            <p className="text-white/70">
              Follow us for more cultural moments and events.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 text-white transition">
              Facebook
            </button>
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 text-white transition">
              YouTube
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
