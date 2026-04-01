import { Room } from "@/types";
import ImageCarousel from "./ImageCarousel";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-background border border-outline-variant/50 shadow-md rounded-[2rem] flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      
      {/* ROOM IMAGES CAROUSEL */}
      {room.images && room.images.length > 0 && (
        <div className="w-full relative h-[260px] bg-muted/20">
          <ImageCarousel images={room.images} />
        </div>
      )}

      {/* ROOM DETAILS */}
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-bold text-[#1B365D] mb-4 group-hover:text-primary transition-colors">{room.name}</h3>
        <div className="text-2xl font-bold text-secondary mb-6">
          ₹{room.price} <span className="text-sm text-muted-foreground font-medium">/ night</span>
        </div>
        <p className="text-muted-foreground mb-8 flex-grow leading-relaxed text-[1.05rem]">{room.description}</p>
        
        <div className="space-y-4 text-sm text-on-surface-variant border-t border-outline-variant pt-6 mt-auto">
          {room.inclusions && (
            <div>
              <strong className="block text-primary mb-1">Inclusions:</strong>
              <span className="leading-relaxed">{room.inclusions}</span>
            </div>
          )}
          {room.bookingPolicy && (
            <div className="pt-2">
              <strong className="block text-primary mb-1">Policy:</strong>
              <span className="leading-relaxed">{room.bookingPolicy}</span>
            </div>
          )}
          {(room.checkIn || room.checkOut) && (
            <div className="flex justify-between bg-muted/50 p-4 rounded-lg mt-4 border border-outline-variant/50">
              {room.checkIn && <div><span className="text-xs text-muted-foreground block mb-1">Check-in</span><span className="font-semibold text-primary">{room.checkIn}</span></div>}
              {room.checkOut && <div><span className="text-xs text-muted-foreground block mb-1">Check-out</span><span className="font-semibold text-primary">{room.checkOut}</span></div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
