"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";

// Dummy album images (map album slug → images)
const albumPhotos = {
  dan: ["dan1.png", "dan2.png", "dan3.png"],
  navratri: ["navratri.png", "navratri (1).png"],
  garba: ["garba.avif", "gb2.avif"],
};

export default function AlbumPage() {
  const { album } = useParams();
  const photos = albumPhotos[album] || [];

  return (
    <main className="min-h-screen bg-gradient-to-tr from-indigo-300 via-purple-200 to-blue-200 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        {album.charAt(0).toUpperCase() + album.slice(1)} Album
      </h1>

      <BentoGrid>
        {photos.map((photo, idx) => (
          <BentoGridItem
            key={idx}
            header={
              <img
                src={`/${photo}`}
                alt={`Photo ${idx + 1}`}
                className="rounded-lg w-full h-auto object-cover"
                loading="lazy"
              />
            }
            // Instead of title + date → "Get It Print" button
            title={
              <button className="mt-2 w-full rounded-lg bg-indigo-500 px-4 py-2 text-white font-semibold hover:bg-indigo-600">
                Get It Print
              </button>
            }
            date={""} // No date
          />
        ))}
      </BentoGrid>
    </main>
  );
}
