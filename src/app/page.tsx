import Link from "next/link";
import Image from "next/image";
import sectionImg from "../../public/images/section-home.jpeg";
import logo from "../../public/images/AAD_LOGO red.svg";
import pillar1 from "../../public/images/pillar-1.jpeg";
import pillar2 from "../../public/images/pillar-2.jpeg";
import pillar3 from "../../public/images/pillar-3.jpeg";

export default function Home() {
  const notices = [
    {
      date: "24 Oct",
      title: "Annual General Meeting 2024",
      desc: "Notice regarding the upcoming AGM scheduled at Sankaradeva Bhawan Auditorium.",
    },
    {
      date: "12 Oct",
      title: "Bhogali Bihu Celebrations 2025",
      desc: "Volunteer registration and stall booking now open for the upcoming harvest festival celebrations.",
    },
    {
      date: "05 Oct",
      title: "New Membership Drive",
      desc: "Inviting life membership applications for Assamese residents and students in Delhi-NCR.",
    },
  ];

  return (
    <div className="flex flex-col bg-[#F9F7F2] text-[#1b1c19] relative">

      {/* Wrap content above pattern */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-80px)] items-center">

          {/* LEFT SIDE */}
          <div className="flex items-center justify-center p-6 md:p-12 lg:p-16">
            <div className="max-w-lg">

              {/* LOGO */}
              <Image
                src={logo}
                alt="AAD Logo"
                width={150}
                height={150}
                className="mb-5 w-[170px] text-white"
              />

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4b0004] mb-5 font-serif leading-tight">
                Assam Association Delhi
              </h1>

              <p className="text-xl md:text-2xl text-[#465f88] mb-8 font-serif">
                Preserving Heritage, Fostering Community in Delhi
              </p>

              <Link
                href="/about"
                className="bg-[#B5824C] text-white px-8 py-3 rounded text-base font-semibold hover:scale-105 transition inline-block"
              >
                Explore Our Legacy
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE → FIXED PILLARS */}
          <div className="flex justify-center items-center gap-4 px-6 md:px-10 h-[580px]">

            {/* PILLAR 1 */}
            <div className="relative w-1/3 h-full rounded-2xl overflow-hidden shadow-xl">
              <Image src={pillar1} alt="pillar1" fill className="object-cover" />
            </div>

            {/* PILLAR 2 */}
            <div className="relative w-1/3 h-full rounded-2xl overflow-hidden shadow-xl">
              <Image src={pillar2} alt="pillar2" fill className="object-cover" />
            </div>

            {/* PILLAR 3 */}
            <div className="relative w-1/3 h-full rounded-2xl overflow-hidden shadow-xl">
              <Image src={pillar3} alt="pillar3" fill className="object-cover" />
            </div>

          </div>
        </section>

        {/* LEGACY */}
        <section className="py-24 bg-[#f5f3ee]">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#4b0004] mb-8 font-bold">
                A Gateway to Assamese Culture
              </h2>
              <p className="text-[#44474e] text-lg mb-4">
                Established as a cornerstone for the Assamese diaspora in Delhi, connecting heritage with modern life.
              </p>
              <p className="text-[#44474e] text-lg">
                We preserve language, arts, and the teachings of Srimanta Sankaradeva.
              </p>
            </div>
          </div>
        </section>

        {/* NOTICES */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-[#465f88] mb-12">Recent Notices</h2>

            <div className="grid gap-4">
              {notices.map((n, i) => (
                <div key={i} className="group bg-white p-6 flex flex-col md:flex-row gap-6 rounded-lg shadow hover:bg-gray-100">
                  <div className="font-bold text-[#465f88] min-w-[100px] border-r pr-6">
                    {n.date}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl group-hover:text-[#4b0004]">
                      {n.title}
                    </h3>
                    <p className="text-gray-600">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HERITAGE FEATURE */}
        <section className="py-24 bg-[#f0eee9]">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative w-full max-w-[600px] aspect-square rounded-3xl shadow-2xl overflow-hidden">
              <Image
                src={sectionImg}
                alt="Heritage Center"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div>
              <span className="text-[#4b0004] font-bold uppercase text-sm">
                Cultural Center
              </span>
              <h2 className="text-4xl font-bold mb-6">
                The Heartbeat of the Diaspora
              </h2>
              <p className="text-gray-600 mb-8">
                A spiritual and cultural hub for Assamese traditions in Delhi.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-[#4b0004] pl-4">
                  <div className="font-bold text-[#465f88]">Library</div>
                  <div className="text-sm text-gray-500">Literature collection</div>
                </div>
                <div className="border-l-4 border-[#4b0004] pl-4">
                  <div className="font-bold text-[#465f88]">Auditorium</div>
                  <div className="text-sm text-gray-500">300 seats</div>
                </div>
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
                <Image src={logo} alt="logo" width={150} height={150} />
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <p className="font-serif italic text-2xl md:text-3xl text-[#1b1c19] leading-relaxed">
                  "The Association is not just an organization; it's the fragrance of the Kopou flower and the warmth of a Bihu fire in the cold Delhi winters."
                </p>
                <p className="mt-6 text-[#465f88] font-semibold text-sm">
                  — Dr. Hemanta Baruah, Life Member since 1985
                </p>
              </div>

              <div>
                <p className="font-serif italic text-2xl md:text-3xl text-[#1b1c19] leading-relaxed">
                  "Finding a piece of home at Sankaradeva Bhawan helped me stay rooted while navigating my career in this vast city."
                </p>
                <p className="mt-6 text-[#465f88] font-semibold text-sm">
                  — Priya Hazarika, Youth Member
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}