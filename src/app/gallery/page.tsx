"use client";

import React, { useState, useEffect } from "react";
import { getAlbums } from "@/lib/api/albums";
import { Album } from "@/types";
import AlbumCard from "@/components/gallery/AlbumCard";
import Loader from "@/components/gallery/Loader";
import EmptyState from "@/components/gallery/EmptyState";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const albumsData = await getAlbums();
        setAlbums(albumsData);
      } catch (error) {
        console.error("Error loading gallery:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="pt-28 pb-24 min-h-screen bg-[#F9F7F2]">
      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#e4e2dd] pb-10">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#4b0004] mb-4">
              Cultural Gallery
            </h1>
            <p className="text-[#465f88] max-w-xl">
              A visual journey through heritage, celebrations, and community life.
            </p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <Loader />
      ) : (
        <section className="max-w-7xl mx-auto px-8">
          {albums.length === 0 ? (
            <EmptyState message="No albums available at the moment." />
          ) : (
            <>
              {/* FEATURED IMAGE */}
              {albums.length > 0 && (
                <div 
                  className="mb-16 cursor-pointer group"
                  onClick={() => router.push(`/gallery/${albums[0].id}`)}
                >
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={albums[0].coverImage}
                      alt={albums[0].title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                    <div className="absolute bottom-0 p-10 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-xs uppercase tracking-widest text-[#B5824C] font-semibold">
                        Featured Album • {albums[0].itemCount} items
                      </span>
                      <h2 className="text-3xl font-serif font-bold mt-2 hover:text-[#B5824C] transition">
                        {albums[0].title}
                      </h2>
                      <p className="text-sm mt-1 opacity-80">{albums[0].date}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* GRID */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {albums.slice(1).map((item) => (
                  <AlbumCard key={item.id} album={item} />
                ))}
              </div>
            </>
          )}
        </section>
      )}

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