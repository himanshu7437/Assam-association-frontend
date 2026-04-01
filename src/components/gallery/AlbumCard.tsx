import React from "react";
import { Album } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AlbumCard({ album }: { album: Album }) {
  const router = useRouter();

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => router.push(`/gallery/${album.id}`)}
    >
      <div className="relative overflow-hidden rounded-xl shadow-md h-[280px]">
        <Image
          src={album.coverImage}
          alt={album.title}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="bg-white text-[#4b0004] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
            {album.itemCount} items
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B5824C] font-semibold flex items-center gap-1 group-hover:text-[#4b0004] transition">
            Album <span className="opacity-0 group-hover:opacity-100 transition-opacity">→ View Album</span>
          </span>
          <h3 className="text-lg font-serif font-semibold text-[#1b1c19] mt-1 group-hover:text-[#B5824C] transition">
            {album.title}
          </h3>
        </div>
        <span className="text-xs text-gray-500">{album.date}</span>
      </div>
    </div>
  );
}
