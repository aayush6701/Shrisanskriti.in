"use client";
import { useEffect, useState } from "react";

export default function InvitationCard({ qrValue }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const generateInvitation = async () => {
      const res = await fetch("/api/generate-invitation?qr=" + encodeURIComponent(qrValue));
      const blob = await res.blob();
      setImageUrl(URL.createObjectURL(blob));
    };

    generateInvitation();
  }, [qrValue]);

  return (
    <div className="flex flex-col items-center">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Invitation with QR"
            className="rounded-xl shadow-lg max-w-full h-auto"
          />
          <a
            href={imageUrl}
            download="invitation.png"
            className="mt-4 px-6 py-2 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
          >
            Download Invitation
          </a>
        </>
      ) : (
        <p>Generating invitation...</p>
      )}
    </div>
  );
}


