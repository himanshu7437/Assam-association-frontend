"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getServices } from "@/lib/api/services";
import { Service } from "@/types";
import { Loader2 } from "lucide-react";

export default function ServicesPage() {
  const [facilities, setFacilities] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getServices();
        setFacilities(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-background">

      {/* HERO / PAGE HEADING */}
      <section className="pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            
            <div className="md:col-span-8">
              <span className="text-primary text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
                Premium Amenities
              </span>

              <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary tracking-tight">
                Our Facilities
              </h1>
            </div>

            <div className="md:col-span-4">
              <p className="text-muted-foreground leading-relaxed">
                Discover curated spaces designed to preserve heritage and foster
                community engagement in the heart of the capital.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="pb-16 min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : facilities.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No facilities available at the moment.
          </div>
        ) : (
          facilities.map((facility, i) => {
            const isReverse = i % 2 !== 0;

            return (
              <div
                key={facility.id || facility.name}
                className={cn(i % 2 === 0 ? "bg-muted/30" : "bg-background")}
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* IMAGE */}
                    <div
                      className={cn(
                        "relative h-[300px] md:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden",
                        isReverse && "lg:order-2"
                      )}
                    >
                      <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/10" />
                    </div>

                    {/* CONTENT */}
                    <div
                      className={cn(
                        "flex items-center",
                        isReverse && "lg:order-1"
                      )}
                    >
                      <div className="max-w-xl space-y-5">

                        <span className="text-xs font-bold uppercase tracking-[0.35em] text-secondary">
                          {facility.category}
                        </span>

                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary leading-tight">
                          {facility.name}
                          {facility.price && (
                            <span className="block text-lg font-sans text-muted-foreground mt-2 font-normal tracking-normal capitalize">
                              Price: {facility.price}
                            </span>
                          )}
                        </h2>

                        <p className="text-muted-foreground leading-relaxed text-base">
                          {facility.description}
                        </p>

                        <Link
                          href="/booking"
                          className="inline-block text-primary font-bold text-xs uppercase tracking-[0.3em] hover:underline pt-2"
                        >
                          Explore →
                        </Link>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* BOOKING SECTION */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <span className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
                Guidelines
              </span>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B365D] mb-8 leading-tight">
                Booking Rules & Regulations
              </h2>

              <p className="text-on-surface-variant text-lg mb-6 leading-relaxed max-w-xl">
                To maintain discipline, fairness, and cultural integrity across all our
                facilities, the association follows a structured booking protocol.
              </p>

              <ul className="space-y-3 text-on-surface-variant text-sm">
                <li className="border-l-2 border-primary pl-4">
                  Preferences are given to medical patients and students appearing for examinations.
                </li>
                <li className="border-l-2 border-primary pl-4">
                  Valid identity verification is mandatory for all bookings.
                </li>
                <li className="border-l-2 border-primary pl-4">
                  Check-in: 12 PM | Check-out: 11 AM.
                </li>
                <li className="border-l-2 border-primary pl-4">
                  External catering for auditorium bookings requires prior approval.
                </li>
              </ul>
            </div>

            {/* RIGHT CARD */}
            <div className="relative">
              <div className="bg-white border border-outline-variant p-10 shadow-xl rounded-sm">

                <span className="text-xs uppercase tracking-[0.4em] text-primary/50 block mb-5">
                  Reservation
                </span>

                <h3 className="text-2xl font-serif font-bold text-[#1B365D] mb-3">
                  Plan Your Visit
                </h3>

                <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
                  Whether you're hosting an event or staying with us, our team ensures
                  a seamless booking experience tailored to your needs.
                </p>

                <Link
                  href="/booking"
                  className="inline-block border border-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Start Booking
                </Link>
              </div>

              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}