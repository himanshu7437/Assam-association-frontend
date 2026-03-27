import OrgSection from "@/components/about/OrgSection";
import VisionMission from "@/components/about/VisionMission";
import Committee from "@/components/about/Committee";

export default function AboutPage() {
  return (
    <main className="bg-[#fbf9f4] text-[#1b1c19] font-[Inter]">

      {/* Executive Committee */}
      <section className="py-16 md:py-24 bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Committee />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-[#fbf9f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VisionMission />
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrgSection />
        </div>
      </section>

    </main>
  );
}