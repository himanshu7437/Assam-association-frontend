import HistorySection from "@/components/about/HistorySection";
import VisionMission from "@/components/about/VisionMission";
import Committee from "@/components/about/Committee";

export default function AboutPage() {
  return (
    <main className="bg-[#fbf9f4] text-[#1b1c19] font-[Inter]">

      {/* 1. HISTORY */}
      <HistorySection />

      {/* 2. MISSION & VISION */}
      <section className="py-16 md:py-24 bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VisionMission />
        </div>
      </section>

      {/* 3. COMMITTEE */}
      <section className="py-16 md:py-24 bg-[#fbf9f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Committee />
        </div>
      </section>

    </main>
  );
}