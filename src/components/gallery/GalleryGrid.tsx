import { MediaItem } from "@/types";
import Image from "next/image";

export default function GalleryGrid({ media }: { media: MediaItem[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {media.map((item) => (
        <div key={item.id} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
          {item.type === "image" ? (
            <Image
              src={item.url}
              alt="Gallery Image"
              width={800}
              height={800}
              sizes="(max-width: 768px) 100vw, 500px"
              className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="relative w-full aspect-video">
              <iframe
                src={item.url}
                allowFullScreen
                className="w-full h-full border-0 absolute top-0 left-0"
                title="Video Player"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
