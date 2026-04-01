"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Download,
  Calendar,
  Loader2,
  Pin,
  Eye,
  FileText,
  ExternalLink,
} from "lucide-react";
import { getPublicNotices } from "@/lib/api/notices";
import { getDocuments } from "@/lib/api/documents";
import { Notice, DocumentItem } from "@/types";

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState<"notices" | "documents">("documents");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        if (activeTab === "notices" && notices.length === 0) {
          setNotices(await getPublicNotices());
        } else if (activeTab === "documents" && documents.length === 0) {
          setDocuments(await getDocuments());
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [activeTab]);

  /* ================= FILTERS ================= */
  const categories = useMemo(() => {
    const set = new Set(documents.map((d) => d.category));
    return ["All", ...Array.from(set)];
  }, [documents]);

  const years = useMemo(() => {
    const set = new Set(documents.map((d) => d.year));
    return ["All", ...Array.from(set)];
  }, [documents]);

  const filteredDocs = useMemo(() => {
    return documents
      .filter((doc) => {
        return (
          (category === "All" || doc.category === category) &&
          (year === "All" || doc.year === year)
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [documents, category, year]);

  const pinnedNotices = notices.filter((n) => n.pinned);
  const normalNotices = notices.filter((n) => !n.pinned);

  const getDownloadUrl = (url: string) => {
    return url.replace("upload/", "upload/fl_attachment/");
  };
  return (
    <div className="bg-[#fbf9f4] min-h-screen text-[#1b1c19]">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#4b0004]">
          Notices & Documents
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl">
          Official repository of documents, certificates, reports, and public notices.
        </p>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-6 mb-6 flex gap-3">
        <TabBtn active={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
          Documents
        </TabBtn>
        <TabBtn active={activeTab === "notices"} onClick={() => setActiveTab("notices")}>
          Notices
        </TabBtn>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* LOADING */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#4b0004]" size={40} />
          </div>
        )}

        {/* ================= DOCUMENTS ================= */}
        {!isLoading && activeTab === "documents" && (
          <>
            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-3 mb-8">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm bg-white"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm bg-white"
              >
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* DOCUMENT LIST */}
            <div className="space-y-4">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-4 md:p-5 rounded-xl border hover:shadow-sm transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* LEFT */}
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                      <FileText size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {doc.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {doc.category} • {doc.year} • {doc.size}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT ACTIONS */}
                  <div className="flex gap-4 text-sm font-semibold">
                    <button
                      onClick={() => {
                        setPreviewUrl(doc.url!);
                        setPreviewTitle(doc.name);
                      }}
                      className="flex items-center gap-2 text-[#465f88]"
                    >
                      <Eye size={16} /> Preview
                    </button>

                    <a
                      href={getDownloadUrl(doc.url!)}
                      download
                      className="flex items-center gap-2 text-[#4b0004]"
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                </div>
              ))}

              {filteredDocs.length === 0 && (
                <p className="text-gray-500">No documents found.</p>
              )}
            </div>
          </>
        )}

        {/* ================= NOTICES ================= */}
        {!isLoading && activeTab === "notices" && (
          <div className="space-y-10">

            {/* PINNED */}
            {pinnedNotices.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#4b0004]">
                  Pinned Notices
                </h2>

                <div className="space-y-4">
                  {pinnedNotices.map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} setPreviewUrl={setPreviewUrl} setPreviewTitle={setPreviewTitle} pinned />
                  ))}
                </div>
              </div>
            )}

            {/* ALL */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                All Notices
              </h2>

              <div className="space-y-4">
                {normalNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} setPreviewUrl={setPreviewUrl} setPreviewTitle={setPreviewTitle} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= PDF MODAL ================= */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl overflow-hidden flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
              <h3 className="font-semibold text-sm truncate">{previewTitle}</h3>

              <div className="flex items-center gap-4">
                <a
                  href={previewUrl}
                  target="_blank"
                  className="text-sm flex items-center gap-1"
                >
                  <ExternalLink size={14} /> Open
                </a>

                <button onClick={() => setPreviewUrl(null)}>✕</button>
              </div>
            </div>

            {/* PDF */}
            <iframe src={previewUrl} className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
}

/* NOTICE CARD */
function NoticeCard({ notice, setPreviewUrl, setPreviewTitle, pinned = false }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border hover:shadow-sm">

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {pinned && <Pin size={16} />}
          {notice.title}
        </h3>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {notice.category}
        </span>
      </div>

      <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
        <Calendar size={14} /> {notice.date}
      </p>

      <p className="text-gray-700 mb-3 line-clamp-3">
        {notice.description || "No description available."}
      </p>

      {notice.url && (
        <div className="flex gap-4 text-sm font-semibold">
          <button
            onClick={() => {
              setPreviewUrl(notice.url);
              setPreviewTitle(notice.title);
            }}
            className="text-[#465f88] flex items-center gap-2"
          >
            <Eye size={16} /> Preview
          </button>

          <a
            href={notice.url}
            target="_blank"
            className="text-[#4b0004] flex items-center gap-2"
          >
            <Download size={16} /> Download
          </a>
        </div>
      )}
    </div>
  );
}

/* TAB */
function TabBtn({ children, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-sm rounded-full ${active ? "bg-[#4b0004] text-white" : "bg-gray-200"
        }`}
    >
      {children}
    </button>
  );
}