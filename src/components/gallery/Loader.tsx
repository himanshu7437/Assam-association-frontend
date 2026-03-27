import React from "react";

export default function Loader() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="animate-pulse space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {/* Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-[280px] bg-gray-200 rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
