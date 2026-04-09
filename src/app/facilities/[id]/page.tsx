"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, Building2, Tag, Info } from "lucide-react";
import { getFacilityById } from "@/lib/api/services";
import { Facility } from "@/types";
import HeroSection from "@/components/facilities/HeroSection";
import GalleryGrid from "@/components/facilities/GalleryGrid";
import RoomCard from "@/components/facilities/RoomCard";

export default function FacilityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [facility, setFacility] = useState<Facility | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFacility() {
      try {
        const data = await getFacilityById(id);
        setFacility(data);
      } catch (error) {
        console.error("Failed to load facility:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFacility();
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-primary" size={50} />
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="bg-background min-h-[70vh] flex flex-col justify-center items-center space-y-6">
        <h1 className="text-4xl font-serif font-bold text-primary">Facility not found</h1>
        <p className="text-muted-foreground">The facility you are looking for does not exist or has been removed.</p>
        <Link href="/facilities" className="inline-flex items-center text-secondary hover:underline font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Facilities
        </Link>
      </div>
    );
  }

  let typeLabel = "Facility";
  if (facility.type === "accommodation") typeLabel = "Guest House";
  else if (facility.type === "event") typeLabel = "Event Space";

  return (
    <div className="bg-background min-h-screen">
      
      {/* MODULAR HERO SECTION */}
      <HeroSection facility={facility} />

      {/* OVERVIEW SECTION */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Description */}
            <div className="lg:col-span-8 space-y-8">
              <h2 className="text-3xl font-serif font-bold text-primary relative inline-block">
                Overview
                <div className="absolute -bottom-3 left-0 w-12 h-1 bg-secondary rounded-full" />
              </h2>
              <p 
                className="text-muted-foreground text-lg leading-relaxed pt-4"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}
              >
                {facility.description}
              </p>
            </div>
            
            {/* Quick Highlights */}
            <div className="lg:col-span-4">
              <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 shadow-md sticky top-32">
                <h3 className="text-xl font-serif font-bold text-[#1B365D] mb-8">Quick Facts</h3>
                <ul className="space-y-6">
                  {facility.type === "accommodation" && facility.rooms && (
                    <li className="flex items-center gap-4 text-on-surface-variant">
                      <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                         <Building2 size={24} />
                      </div>
                      <div>
                        <span className="block text-sm text-muted-foreground">Available Rooms</span>
                        <strong className="text-lg text-primary">{facility.rooms.length} Configurations</strong>
                      </div>
                    </li>
                  )}
                  {facility.type === "event" && facility.pricing && facility.pricing.length > 0 && (
                    <li className="flex items-center gap-4 text-on-surface-variant">
                      <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                        <Tag size={24} />
                      </div>
                      <div>
                        <span className="block text-sm text-muted-foreground">Starting From</span>
                        <strong className="text-lg text-primary">₹{facility.pricing[0].amount}</strong>
                      </div>
                    </li>
                  )}
                  <li className="flex items-center gap-4 text-on-surface-variant">
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                      <Info size={24} />
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground">Category</span>
                      <strong className="text-lg text-primary capitalize">{typeLabel}</strong>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      {facility.gallery && facility.gallery.length > 0 && (
        <section id="gallery-section" className="py-16 md:py-24 bg-muted/10 border-t border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Facility Gallery</h2>
            <GalleryGrid images={facility.gallery} />
          </div>
        </section>
      )}

      {/* DYNAMIC CONTENT based on TYPE */}

      {/* ACCOMMODATION (ROOMS) */}
      {facility.type === "accommodation" && facility.rooms && facility.rooms.length > 0 && (
        <section className="py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-primary mb-20 text-center relative">
              Accommodation Options
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-secondary rounded-full" />
            </h2>
            
            <div className="flex flex-col gap-16 md:gap-24">
              {facility.rooms.map((room, idx) => (
                <RoomCard key={idx} room={room} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENT SPACE (PRICING) */}
      {facility.type === "event" && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Event Space Tariffs & Policies</h2>
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* PRICING PLANS */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-serif font-bold text-[#1B365D] mb-6 relative inline-block">
                  Booking Rates
                  <div className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full" />
                </h3>
                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  {facility.pricing && facility.pricing.map((price, idx) => (
                    <div key={idx} className="bg-background group hover:bg-[#1B365D]/5 transition-colors p-8 shadow-md rounded-2xl border border-outline-variant flex flex-col justify-center items-center text-center">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[#1B365D]/60 mb-3">{price.duration}</h4>
                      <p className="text-3xl font-bold text-secondary group-hover:scale-110 transition-transform duration-300">₹{price.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* REMARKS & POLICIES */}
              <div className="lg:col-span-5 space-y-8">
                {facility.remarks && (
                  <div className="bg-background p-8 rounded-2xl shadow-sm border border-outline-variant relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
                    <h4 className="font-serif font-bold text-xl text-primary mb-4">Important Remarks</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{facility.remarks}</p>
                  </div>
                )}
                {facility.bookingPolicy && (
                  <div className="bg-background p-8 rounded-2xl shadow-sm border border-outline-variant">
                    <h4 className="font-serif font-bold text-xl text-primary mb-4">Space Booking Policy</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{facility.bookingPolicy}</p>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </section>
      )}

      {/* GLOBAL BOOK CTA SECTION */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-2 block">
                Reservation
              </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B365D] leading-tight max-w-2xl mx-auto">
            Ready to reserve {facility.name}?
              </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            {facility.name === "Sattriya Dance" 
              ? "For this facility, please contact us directly"
              : "Reach out to our administration to confirm availability, clear any doubts, and finalize your booking slot."}
          </p>
          <div className="pt-6">
            <Link
              href={facility.name === "Sattriya Dance" ? "/contact" : "/booking"}
              className="inline-block border border-primary px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
            >
              {facility.name === "Sattriya Dance" ? "Contact Us" : "Start Booking Process"}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
