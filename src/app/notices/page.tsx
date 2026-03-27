"use client";

import React, { useEffect, useState } from "react";
import { Download, Calendar, Folder, Users, BookOpen, Loader2, Pin } from "lucide-react";
import { getPublicNotices } from "@/lib/api/notices";
import { getDocuments } from "@/lib/api/documents";
import { Notice, DocumentItem } from "@/types";

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState<"notices" | "documents">("notices");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        if (activeTab === "notices" && notices.length === 0) {
          const data = await getPublicNotices();
          setNotices(data);
        } else if (activeTab === "documents" && documents.length === 0) {
          const data = await getDocuments();
          setDocuments(data);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [activeTab]);

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
              <SidebarItem 
                icon={<Calendar size={18} />} 
                label="Notices (Year Wise)" 
                active={activeTab === "notices"}
                onClick={() => setActiveTab("notices")}
              />
              <SidebarItem
                icon={<Folder size={18} />}
                label="Official Documents"
                active={activeTab === "documents"}
                onClick={() => setActiveTab("documents")}
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
        <section className="flex-1 min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-48 bg-white shadow-sm border">
               <Loader2 className="animate-spin text-[#4b0004]" size={40} />
            </div>
          ) : (
            <>
              {/* TABLE CARD */}
              <div className="bg-white shadow-sm border">
                {/* HEADER */}
                <div className="p-8 border-b flex justify-between">
                  <h2 className="text-2xl font-serif font-semibold">
                    {activeTab === "notices" ? "Public Notices" : "Official Documents"}
                  </h2>
                  <span className="text-xs bg-gray-100 px-3 py-1">
                    {activeTab === "notices" ? notices.length : documents.length} {activeTab === "notices" ? "Notices found" : "Documents Found"}
                  </span>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-100 text-xs uppercase text-gray-500">
                        <th className="px-8 py-4">Title</th>
                        <th className="px-8 py-4">Category</th>
                        <th className="px-8 py-4">Last Updated</th>
                        <th className="px-8 py-4 text-right">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {activeTab === "notices" && notices.length === 0 && (
                        <tr><td colSpan={4} className="text-center py-10 text-gray-500">No notices found.</td></tr>
                      )}
                      {activeTab === "documents" && documents.length === 0 && (
                        <tr><td colSpan={4} className="text-center py-10 text-gray-500">No documents found.</td></tr>
                      )}

                      {/* Render Notices */}
                      {activeTab === "notices" && notices.map((notice) => (
                        <tr
                          key={notice.id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-8 py-6 font-semibold flex items-center gap-2">
                            {notice.pinned && <Pin size={16} className="text-[#4b0004]" fill="currentColor" />}
                            {notice.title}
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded uppercase tracking-wider">
                              {notice.category}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm text-gray-600">
                            {notice.date}
                          </td>
                          <td className="px-8 py-6 text-right">
                            {notice.url ? (
                               <button 
                                 className="flex items-center gap-2 text-[#4b0004] text-xs font-bold hover:opacity-70 ml-auto"
                                 onClick={() => window.open(notice.url, "_blank")}
                               >
                                 DOWNLOAD PDF <Download size={16} />
                               </button>
                            ) : (
                               <span className="text-gray-400 text-xs">No Attachment</span>
                            )}
                          </td>
                        </tr>
                      ))}

                      {/* Render Documents */}
                      {activeTab === "documents" && documents.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-8 py-6 font-semibold">
                            {doc.title}
                          </td>
                          <td className="px-8 py-6 text-sm text-gray-600">
                            {doc.type || "Document"}
                          </td>
                          <td className="px-8 py-6 text-sm text-gray-600">
                            {doc.year}
                          </td>
                          <td className="px-8 py-6 text-right">
                            {doc.url ? (
                              <button 
                                className="flex items-center gap-2 text-[#4b0004] text-xs font-bold hover:opacity-70 ml-auto"
                                onClick={() => window.open(doc.url, "_blank")}
                              >
                                DOWNLOAD PDF <Download size={16} />
                              </button>
                            ) : (
                              <span className="text-gray-400 text-xs">No Attachment</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

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
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
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