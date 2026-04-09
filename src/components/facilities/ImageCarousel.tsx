"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { GalleryItem } from "@/types";

interface ImageCarouselProps {
  media?: GalleryItem[];
}

export default function ImageCarousel({ media }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="w-full h-full bg-muted/20 flex items-center justify-center rounded-2xl">
        <span className="text-muted-foreground text-sm font-medium">No media available</span>
      </div>
    );
  }

  const normalizedGallery = media.map((item) =>
    typeof item === "string" ? { url: item, type: "image" as const } : item
  );

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + normalizedGallery.length) % normalizedGallery.length);
  };

  const currentItem = normalizedGallery[currentIndex];

  return (
    <div className="relative w-full h-full flex flex-col gap-4">
      {/* MAIN CAROUSEL IMAGE AREA */}
      <div className="relative flex-grow overflow-hidden rounded-2xl shadow-lg bg-black group h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
             className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            {currentItem.type === "video" ? (
              <video
                src={currentItem.url}
                controls
                controlsList="nodownload"
                className="w-full h-full object-cover"
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag conflict with video controls
              />
            ) : (
               <Image
                src={currentItem.url}
                alt={`Room media ${currentIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover select-none pointer-events-none"
                priority={currentIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION CONTROLS */}
        {normalizedGallery.length > 1 && (
          <>
            {/* LEFT BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 scale-90 group-hover:scale-100"
              aria-label="Previous media"
            >
              <ChevronLeft size={22} />
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 scale-90 group-hover:scale-100"
              aria-label="Next media"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* DOT INDICATORS */}
      {normalizedGallery.length > 1 && (
        <div className="flex justify-center gap-2.5 pb-2">
          {normalizedGallery.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-primary scale-125 shadow-sm"
                  : "bg-outline-variant hover:bg-primary/50"
              }`}
              aria-label={`Go to media ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
