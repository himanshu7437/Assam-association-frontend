"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { GalleryItem } from "@/types";

interface GalleryGridProps {
  images?: GalleryItem[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  if (!images || images.length === 0) return null;

  const normalizedGallery = images.map((item) =>
    typeof item === "string" ? { url: item, type: "image" as const } : item
  );

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % normalizedGallery.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? normalizedGallery.length - 1 : prev - 1
    );
  };

  const currentItem = normalizedGallery[currentIndex];

  return (
    <>
      {/* CAROUSEL */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* MEDIA */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black cursor-pointer" onClick={() => setSelectedImage(currentItem)}>
          {currentItem.type === "video" ? (
             <video
              src={currentItem.url}
              controls
              controlsList="nodownload"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={currentItem.url}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 z-10 transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={next}
          className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 z-10 transition"
        >
          <ChevronRight size={20} />
        </button>

        {/* DOTS */}
        <div className="flex justify-center mt-4 gap-2">
          {normalizedGallery.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition ${
                i === currentIndex ? "bg-primary scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50"
          >
            <X size={32} />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
             {(typeof selectedImage === "string" ? {url: selectedImage, type: "image"} : selectedImage).type === "video" ? (
               <video
                 src={(typeof selectedImage === "string" ? {url: selectedImage, type: "image"} : selectedImage).url}
                 controls
                 className="max-w-full max-h-[90vh] object-contain"
                 autoPlay
               />
             ) : (
              <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
                <Image
                  src={(typeof selectedImage === "string" ? {url: selectedImage, type: "image"} : selectedImage).url}
                  alt="Lightbox"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
             )}
          </div>
        </div>
      )}
    </>
  );
}