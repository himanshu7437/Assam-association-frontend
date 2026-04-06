"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublicNotices } from "@/lib/api/notices";
import sectionImg from "../../public/images/section-home2.png"
import pillar1 from "../../public/images/pillar-1-2.png"
import pillar2 from "../../public/images/pillar-2-2.png"
import pillar3 from "../../public/images/pillar-3-2.png"

export default function Home() {

  const [showModal, setShowModal] = useState(false);
  const [notices, setNotices] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lastShown = localStorage.getItem("aad_modal_last_shown");
    const today = new Date().toDateString();

    if (lastShown !== today) {
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem("aad_modal_last_shown", today);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const data = await getPublicNotices();
        setNotices(data);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, []);



  const getDisplayNotices = (allNotices: any[]) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const today = new Date();

    // Normalize today (remove time)
    today.setHours(0, 0, 0, 0);

    const upcoming = allNotices.filter((n) => {
      const d = new Date(n.date);
      return d >= today;
    });

    const sortedUpcoming = [...upcoming].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // If upcoming exists → take first 3
    if (sortedUpcoming.length > 0) {
      return sortedUpcoming.slice(0, 3);
    }

    // Else fallback to latest past 3
    const past = [...allNotices].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return past.slice(0, 3);
  };

  const displayNotices = React.useMemo(() => {
    return getDisplayNotices(notices);
  }, [notices]);

  useEffect(() => {
    if (!showModal || displayNotices.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayNotices.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [showModal, displayNotices]);

  const formatDate = (dateValue: string | Date | number) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayNotices.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayNotices.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (currentIndex >= displayNotices.length) {
      setCurrentIndex(0);
    }
  }, [displayNotices, currentIndex]);

  return (
    <div className="flex flex-col bg-[#fbf9f4] text-[#1b1c19] relative">
      <div className="relative z-10">

        {/* HERO (UNCHANGED) */}
        <section className="flex justify-center bg-[#fbf9f4]">

          {/* CONTAINER CONTROL */}
          <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[minmax(420px,42%)_1fr] min-h-[100dvh]">

            {/* LEFT */}
            <div className="flex items-center px-6 sm:px-10 lg:px-16 xl:px-24 py-12">

              <div className="max-w-xl w-full">

                {/* LOGO */}
                <Image
                  src={"https://res.cloudinary.com/disniu3hn/image/upload/v1775053126/AAD_LOGO_red_qwrjb9.svg"}
                  alt="AAD Logo"
                  width={200}
                  height={200}
                  className="mb-5 w-[180px] sm:w-[200px] md:w-[220px] h-auto"
                  style={{
                    filter: "hue-rotate(220deg) brightness(1.2) saturate(1.5)",
                  }}
                  priority
                />

                {/* HEADING */}
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#4b0004] mb-4 font-serif leading-tight">
                  Assam <br />
                  Association <br />
                  Delhi
                </h1>

                {/* SUBTITLE */}
                <p className="text-lg sm:text-xl text-[#465f88] mb-6 font-serif font-medium">
                  Preserving Heritage, Fostering Community in Delhi
                </p>

                {/* BUTTON */}
                <Link
                  href="/about"
                  className="bg-[#B5824C] text-white px-6 py-3 rounded text-base font-semibold hover:scale-105 transition shadow-sm inline-block"
                >
                  Explore Our Legacy
                </Link>

              </div>
            </div>

            {/* RIGHT - PILLARS */}
            <div className="flex gap-2 px-2 sm:px-3 h-[260px] sm:h-[320px] md:h-[420px] lg:h-auto max-h-[900px]">

              <div className="relative w-1/3 h-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={pillar1}
                  alt="pillar1"
                  fill
                  className="object-cover"
                  sizes="33vw"
                  priority
                />
              </div>

              <div className="relative w-1/3 h-full rounded-xl overflow-hidden shadow-lg scale-105">
                <Image
                  src={pillar2}
                  alt="pillar2"
                  fill
                  className="object-cover"
                  sizes="33vw"
                  priority
                />
              </div>

              <div className="relative w-1/3 h-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={pillar3}
                  alt="pillar3"
                  fill
                  className="object-cover object-top"
                  sizes="33vw"
                  priority
                />
              </div>

            </div>

          </div>
        </section>

        {/* NOTICES */}
        <section className="py-20 bg-[#f5f3ee]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4b0004] mb-12">
              Recent Notices
            </h2>

            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-500">Loading notices...</p>
              ) : notices.length === 0 ? (
                <p className="text-gray-500">No notices available.</p>
              ) : (
                <div className="space-y-4 text-left">
                  {displayNotices.map((n, i) => (
                    <div
                      key={n.id || i}
                      className="bg-white p-6 flex flex-col md:flex-row gap-6 rounded-lg shadow hover:bg-gray-100"
                    >
                      <div className="font-bold text-[#465f88] min-w-[100px] border-r pr-6">
                        {formatDate(n.date)}
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-bold text-xl text-[#4b0004]">
                          {n.title}
                        </h3>
                        <p className="text-gray-600">{n.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* GATEWAY */}
        <section className="py-28 text-center">
          <div className="max-w-4xl mx-auto px-6">

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4b0004] mb-6">
              A Gateway to Assamese Culture
            </h2>

            <div className="w-20 h-[2px] bg-[#B5824C] mx-auto mb-10"></div>

            <p className="text-lg md:text-xl text-[#44474e] leading-relaxed mb-6">
              Assam Association Delhi stands as a cultural bridge connecting the Assamese diaspora with their roots.
              Established with a vision to preserve identity in a fast-evolving urban landscape, the association has
              become a home away from home for generations.
            </p>

            <p className="text-lg text-[#44474e] leading-relaxed">
              Through festivals like Bihu, literary gatherings, and community initiatives, we celebrate the spirit of Assam
              while fostering unity, belonging, and cultural pride among members across Delhi-NCR.
            </p>

          </div>
        </section>

        {/* VISION */}
        <section className="py-24 bg-[#f5f3ee]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div className="relative pl-4 pb-4">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[#B5824C] rounded-lg -z-10 translate-x-[-15px] translate-y-[-15px]"></div>
                <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={sectionImg}
                    alt="Vision"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4b0004] mb-8">
                  Our Vision
                </h2>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed border-l-4 border-[#B5824C] pl-6">
                  We envision a vibrant, connected community where the rich tapestry of Assamese heritage thrives globally.
                </p>

                <p className="text-gray-600 mb-8">
                  By bridging tradition and modernity, we empower future generations to carry forward our identity with pride.
                </p>

                <Link
                  href="/about"
                  className="text-[#4b0004] font-bold border-b-2 border-[#4b0004] pb-1 hover:text-[#B5824C] hover:border-[#B5824C] transition"
                >
                  Read Full Vision Statement →
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-24 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-serif font-bold mb-4 text-[#1b1c19]">
              A Journey Through Decades
            </h2>
            <div className="w-16 h-[2px] bg-[#4b0004] mx-auto mb-16"></div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "1968 Foundation",
                  desc: "A vision born from the need to unite the small Assamese community in Delhi under one umbrella.",
                  icon: "⏳",
                },
                {
                  title: "Inauguration",
                  desc: "Completion of the iconic Sankaradeva Bhawan, providing a permanent home for heritage.",
                  icon: "🏛️",
                },
                {
                  title: "Golden Jubilee",
                  desc: "Celebrating 50 years of community service and cultural excellence in the national capital.",
                  icon: "✨",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#f5f3ee] p-10 rounded-lg shadow-sm hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#465f88] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#44474e] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="py-24 bg-[#f5f3ee]">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="mb-10 flex justify-center">
              <div className="w-30 h-30 rounded-full border border-[#e4e2dd] flex items-center justify-center">
                <Image src={"https://res.cloudinary.com/disniu3hn/image/upload/v1775053126/AAD_LOGO_red_qwrjb9.svg"} alt="logo" width={150} height={150} style={{ width: "150px", height: "auto" }} />
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <p className="font-serif italic text-2xl md:text-3xl text-[#1b1c19] leading-relaxed">
                  &quot;The Association is not just an organization; it&apos;s the fragrance of the Kopou flower and the warmth of a Bihu fire in the cold Delhi winters.&quot;
                </p>
                <p className="mt-6 text-[#465f88] font-semibold text-sm">
                  — Dr. Hemanta Baruah, Life Member since 1985
                </p>
              </div>

              <div>
                <p className="font-serif italic text-2xl md:text-3xl text-[#1b1c19] leading-relaxed">
                  &quot;Finding a piece of home at Sankaradeva Bhawan helped me stay rooted while navigating my career in this vast city.&quot;
                </p>
                <p className="mt-6 text-[#465f88] font-semibold text-sm">
                  — Priya Hazarika, Youth Member
                </p>
              </div>
            </div>
          </div>
        </section>

        {showModal && displayNotices.length > 0 && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4">

            <div className="relative w-full max-w-5xl h-[450px] rounded-3xl overflow-hidden shadow-2xl">

              {/* SLIDER */}
              <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {displayNotices.map((n, i) => (
                  <div key={i} className="min-w-full h-full relative">

                    {/* IMAGE */}
                    <Image
                      src={n.thumbnailUrl || "/fallback.jpg"}
                      alt={n.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className="object-cover"
                      priority
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* CONTENT */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">

                      <p className="text-sm text-[#f2d3a1] font-medium drop-shadow">
                        {formatDate(n.date)}
                      </p>

                      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] leading-snug">
                        {n.title}
                      </h2>

                      <p className="text-sm md:text-base max-w-2xl text-white/90 drop-shadow">
                        {n.description}
                      </p>

                      {n.hasPdf && (
                        <a
                          href={n.pdfUrl}
                          target="_blank"
                          className="inline-block mt-3 text-[#f2d3a1] underline"
                        >
                          View Details →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* LEFT ARROW */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/40 transition z-20"
              >
                ◀
              </button>

              {/* RIGHT ARROW */}
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/40 transition z-20"
              >
                ▶
              </button>

              {/* DOTS */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {displayNotices.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition ${i === currentIndex
                      ? "bg-white scale-110"
                      : "bg-white/40"
                      }`}
                  />
                ))}
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition"
              >
                ✕
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}