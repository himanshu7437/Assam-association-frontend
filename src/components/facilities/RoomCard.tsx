import { Room } from "@/types";
import ImageCarousel from "./ImageCarousel";
import { Check, Clock, Info } from "lucide-react";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-background border border-outline-variant/20 rounded-[2.5rem] overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col lg:flex-row">
        
        {/* ROOM IMAGES CAROUSEL - Larger area for "Complete Image" */}
        <div className="lg:w-[55%] relative h-[300px] sm:h-[400px] lg:h-[500px] p-4 sm:p-6 lg:p-8 bg-muted/5">
          <ImageCarousel media={room.media} />
        </div>

        {/* ROOM DETAILS - Paragraph Style */}
        <div className="lg:w-[45%] p-8 sm:p-10 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-outline-variant/10">
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-serif font-bold text-primary leading-tight">
                  {room.name}
                </h3>
                <div className="text-2xl font-bold text-secondary bg-secondary/5 px-4 py-1.5 rounded-full">
                  ₹{room.price}
                  <span className="text-xs text-muted-foreground font-medium ml-1">/ night</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
                {room.description}
              </p>
            </div>

            {/* FEATURES & DETAILS */}
            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-outline-variant/10">
              {room.inclusions && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Check size={18} className="text-secondary" />
                    <strong className="text-sm font-bold uppercase tracking-wider">Inclusions</strong>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {room.inclusions}
                  </p>
                </div>
              )}
              
              {room.bookingPolicy && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Info size={18} className="text-secondary" />
                    <strong className="text-sm font-bold uppercase tracking-wider">Policy</strong>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {room.bookingPolicy}
                  </p>
                </div>
              )}
            </div>

            {/* CHECK IN/OUT */}
            {(room.checkIn || room.checkOut) && (
              <div className="flex gap-6 pt-4">
                {room.checkIn && (
                  <div className="flex items-center gap-3 bg-muted/30 px-5 py-3 rounded-2xl border border-outline-variant/10">
                    <Clock size={16} className="text-primary/60" />
                    <div>
                      <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Check-in</span>
                      <span className="text-sm font-bold text-primary">{room.checkIn}</span>
                    </div>
                  </div>
                )}
                {room.checkOut && (
                  <div className="flex items-center gap-3 bg-muted/30 px-5 py-3 rounded-2xl border border-outline-variant/10">
                    <Clock size={16} className="text-primary/60" />
                    <div>
                      <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Check-out</span>
                      <span className="text-sm font-bold text-primary">{room.checkOut}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
