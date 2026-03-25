"use client";

import React from "react";
import { Download, Calendar, Folder, Users, BookOpen } from "lucide-react";

const documents = [
  {
    title: "Constitution",
    category: "Legal & Governance",
    date: "Oct 2023",
  },
  {
    title: "Registration Certificate",
    category: "Official Records",
    date: "Aug 2022",
  },
  {
    title: "Membership Form",
    category: "Onboarding",
    date: "Jan 2024",
  },
];

export default function NoticesPage() {
  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19] min-h-screen">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-5xl font-serif font-bold text-[#4b0004] mb-4">
          Notices & Documents
        </h1>
        <div className="w-24 h-[2px] bg-[#4b0004] mb-6" />
        <p className="max-w-2xl text-lg text-gray-600">
          Access official records, meeting minutes, and annual publications of
          the Assam Association Delhi.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16">

        {/* SIDEBAR */}
        <aside className="md:w-1/4">
          <div className="sticky top-32">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">
              Repository Folders
            </p>

            <div className="space-y-2 text-sm">
              <SidebarItem icon={<Calendar size={18} />} label="Notices (Year Wise)" />
              <SidebarItem
                icon={<Folder size={18} />}
                label="Official Documents"
                active
              />
              <SidebarItem icon={<Users size={18} />} label="AGM-GBM Minutes" />
              <SidebarItem icon={<BookOpen size={18} />} label="Publications" />
            </div>

            {/* Assistance Box */}
            <div className="mt-12 p-6 bg-gray-100">
              <h4 className="font-serif font-bold text-[#465f88] mb-2">
                Need Assistance?
              </h4>
              <p className="text-xs text-gray-600">
                Contact the General Secretary for specific document requests.
              </p>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="flex-1">

          {/* TABLE CARD */}
          <div className="bg-white shadow-sm">

            {/* HEADER */}
            <div className="p-8 border-b flex justify-between">
              <h2 className="text-2xl font-serif font-semibold">
                Official Documents
              </h2>
              <span className="text-xs bg-gray-100 px-3 py-1">
                {documents.length} Documents Found
              </span>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-xs uppercase text-gray-500">
                    <th className="px-8 py-4">Document Title</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Last Updated</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {documents.map((doc, i) => (
                    <tr
                      key={i}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-8 py-6 font-semibold">
                        {doc.title}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-600">
                        {doc.category}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-600">
                        {doc.date}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="flex items-center gap-2 text-[#4b0004] text-xs font-bold hover:opacity-70">
                          DOWNLOAD PDF <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">

            {/* IMAGE CARD */}
            <div className="relative h-64 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif font-bold">
                  Latest Publication
                </h3>
                <p className="text-sm">Winter Edition 2023</p>
              </div>
            </div>

            {/* TEXT CARD */}
            <div className="border p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Historical Archive
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Explore our digitised collection of notices dating back to 1980.
              </p>
              <button className="text-[#4b0004] text-xs font-bold uppercase flex items-center gap-2">
                Explore Archive →
              </button>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

/* Sidebar Component */
function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${
        active
          ? "bg-gray-200 text-[#4b0004] font-bold"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}