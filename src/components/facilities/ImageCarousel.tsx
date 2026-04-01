"use client";

import Image from "next/image";

interface ImageCarouselProps {
  images?: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  if (!images || images.length === 0) {
    return null;
  }

  // If there's only one image, don't use a carousel pattern, just display it.
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video">
        <Image
          src={images[0]}
          alt="Room image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide relative group">
      {images.map((img, idx) => (
        <div key={idx} className="relative w-full aspect-video flex-none snap-center">
          <Image
            src={img}
            alt={`Carousel image ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {/* Subtle indicator of current image index out of total could be added here if desired */}
        </div>
      ))}
      {/* Optional Gradient fade on the right side indicating more scrollable content */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
    </div>
  );
}
