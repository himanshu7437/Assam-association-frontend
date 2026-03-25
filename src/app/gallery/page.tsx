"use client";

import React, { useState } from "react";

const galleryItems = [
  {
    id: 1,
    title: "Bihu Celebration 2025",
    tag: "Event",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0edANRDMxjWgu9MOSse6j7FbmtpQSC6KAn3IPiYiQZwx129bOaLsO5w2m4dCxAVZ7r8ZGlytDVQyek7GzRcq5lQXIaJElDErXSKwqnTmvv_dt-rGJTJP0aFxD9AurqUmGJsTHN2CDOxpoAz-jTLeSXhMtaNPHRutUsNYQ-qqgAAAx00qX2X_aTC5V_2KTx6Q_09-eBX3QMuBjES6ZCRvVLLc7U6wN87nblHniRrQH99GK3TkTUetS5r6jqGdFiga8Ta-bIpQP5U8"
  },
  {
    id: 2,
    title: "Annual General Meet 2024",
    tag: "Meeting",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt96VuQO9RDg4xwk9fx29C3CH-5k13QfzerSV5TNT3i4Ei2YGzh4FXfo0JMP0mYrU0i891l-iSXMbDA2Yr4lp9e6juPw2-TBm-Ayl3pUou_bxwwASbFq7O3vq50VrMFTNlskm17ggBWROraFMCmfykj3OKTxLukxBe2aV-lKeSf8pDsUZR8AB9h1hbQPNZhJgLzJfbK7s7mIAbXxhW2v65-d7sPSHDEAPOB-6AXn4HuVIuauJiMI9s0L97MUMAAtAlT68oTP34I3k"
  },
  {
    id: 3,
    title: "Handicraft Expo",
    tag: "Workshop",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA15Nn_waTOvWVbvRmjfzcw_X6uCBqthi4IWwFkAMDiX-mTmyLg1SzcQ9Kthh8TC9A2cwHzhi12xfR7j8h65fgFilkpqsSAgjFdsc1kZi4P-yOhO0rFFg49yLMZqil5lOam8wTh5LP2xUgHjMeh_rpYFmWO1qBDjKR-nJiGwRstQZANujYQ4xEF2XnF2kPfe-lHYjOd323RtpiT30b4QGnXMpR_Yr2p7iPx9Dx-FABpq27z41fN2YhlgoGSWJ6zGAWeKnlkig6Hz08"
  },
];

const videoItems = [
  {
    id: 1,
    title: "Bihu Performance Highlights",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U"
  },
  {
    id: 2,
    title: "Cultural Night Recap",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/jNQXAC9IVRw"
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos");

  return (
    <main className="pt-28 pb-24 min-h-screen bg-[#F9F7F2]">

      {/* HEADER (UNCHANGED) */}
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#e4e2dd] pb-10">
          
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#4b0004] mb-4">
              Cultural Gallery
            </h1>
            <p className="text-[#465f88] max-w-xl">
              A visual journey through heritage, celebrations, and community life.
            </p>
          </div>

          {/* WORKING TABS */}
          <div className="flex gap-2 p-1 bg-[#f0eee9] rounded-lg">
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                activeTab === "photos"
                  ? "bg-white text-[#4b0004] shadow"
                  : "text-gray-500"
              }`}
            >
              Photos
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                activeTab === "videos"
                  ? "bg-white text-[#4b0004] shadow"
                  : "text-gray-500"
              }`}
            >
              Videos
            </button>
          </div>
        </div>
      </section>

      {/* PHOTOS VIEW */}
      {activeTab === "photos" && (
        <section className="max-w-7xl mx-auto px-8">

          {/* FEATURED IMAGE */}
          <div className="mb-16">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={galleryItems[0].img}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-0 p-10 text-white">
                <span className="text-xs uppercase tracking-widest text-[#B5824C]">
                  Featured Event
                </span>
                <h2 className="text-3xl font-serif font-bold mt-2">
                  {galleryItems[0].title}
                </h2>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {galleryItems.slice(1).map((item) => (
              <div key={item.id} className="group">

                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <img
                    src={item.img}
                    className="w-full h-[280px] object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase tracking-widest text-[#B5824C] font-semibold">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-serif font-semibold text-[#1b1c19] mt-1">
                    {item.title}
                  </h3>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

      {/* VIDEOS VIEW */}
      {activeTab === "videos" && (
        <section className="max-w-7xl mx-auto px-8">

          <div className="grid md:grid-cols-2 gap-10">

            {videoItems.map((video) => (
              <div key={video.id} className="group">

                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={video.url}
                    className="w-full h-[300px]"
                    allowFullScreen
                  />
                </div>

                <h3 className="mt-4 font-serif text-lg font-semibold text-[#1b1c19]">
                  {video.title}
                </h3>

              </div>
            ))}

          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 mt-24">
        <div className="bg-[#1B365D] p-14 flex flex-col md:flex-row items-center justify-between gap-10 rounded-lg">

          <div>
            <h2 className="text-3xl font-serif text-white mb-2">
              Stay Connected
            </h2>
            <p className="text-white/70">
              Follow us for more cultural moments and events.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 text-white">
              Facebook
            </button>
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 text-white">
              YouTube
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}