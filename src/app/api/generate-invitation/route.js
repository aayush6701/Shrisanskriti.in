import { NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const qr = searchParams.get("qr") || "https://example.com";

  // 🔹 Set smaller canvas size (4:3 ratio preserved)
  const width = 540;  // Half of 1080
  const height = 384; // Half of 768
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ✅ Load base invitation
  const baseImage = await loadImage(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/Pass.png`);

  ctx.drawImage(baseImage, 0, 0, width, height);

  // ✅ Generate QR Code
  const qrDataUrl = await QRCode.toDataURL(qr);
  const qrImage = await loadImage(qrDataUrl);

  // ✅ Place QR proportionally (adjusted to new scale)
  ctx.drawImage(qrImage, 330, 130, 135, 135); // Half of original values

  const buffer = canvas.toBuffer("image/png");
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "inline; filename=invitation.png",
    },
  });
}

