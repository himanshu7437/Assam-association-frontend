"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryGridProps {
  images?: string[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* CAROUSEL */}
      <div className="relative w-full max-w-5xl mx-auto">

        {/* IMAGE */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setSelectedImage(images[currentIndex])}
            sizes="100vw"
            priority
          />
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={next}
          className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 transition"
        >
          <ChevronRight size={20} />
        </button>

        {/* DOTS */}
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition ${
                i === currentIndex
                  ? "bg-primary scale-110"
                  : "bg-gray-300"
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

          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Lightbox"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}