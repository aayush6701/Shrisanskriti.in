"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { API_BASE_URL } from "../../config";

// ✅ Load QR Scanner dynamically (client only)
const QrScanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  { ssr: false }
);

export default function ScannerPage() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [scannerKey, setScannerKey] = useState(0); // 🔑 force re-mount

  // 🔒 Protect page — only allow access after Scan Login
  useEffect(() => {
    const token = localStorage.getItem("scanToken");
    if (!token) {
      router.replace("/scan");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // 🚀 Handle QR scan result
  const handleScan = async (detectedCodes) => {
    if (!detectedCodes.length) return;
    const data = detectedCodes[0].rawValue;

    try {
      const response = await fetch(`${API_BASE_URL}/scan/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || result.message);

      setScanResult(result);
      setError("");
    } catch (err) {
      setError(err.message);
      setScanResult(null);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Camera error: " + err.message);
  };

  const handleNextScan = () => {
    setScanResult(null);
    setError("");
    setScannerKey((prev) => prev + 1); // 🔄 remount scanner
  };

    const handleLogout = () => {
    localStorage.removeItem("scanToken"); // clear saved token
    router.replace("/scan"); // redirect back to login
  };

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-300 via-purple-200 to-blue-200">
        <p className="text-lg font-semibold text-gray-800">Checking access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-300 via-purple-200 to-blue-200 px-4">
      <div className="w-full flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold text-gray-800">QR Scanner</h1>
  <button
    onClick={handleLogout}
    className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
  >
    Logout
  </button>
</div>

      {/* Scanner */}
      <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
        <QrScanner
          key={scannerKey} // 👈 this forces reset
          onScan={handleScan}
          onError={handleError}
          className="w-full"
        />
      </div>

      {/* Success */}
      {scanResult && scanResult.status === "success" && (
        <div className="mt-6 w-full max-w-sm bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <img
            src={
              scanResult.profilePic
                ? scanResult.profilePic.startsWith("/uploads")
                  ? `${API_BASE_URL}${scanResult.profilePic}`
                  : scanResult.profilePic
                : "/default-avatar.png"
            }
            alt="User"
            className="w-24 h-24 rounded-full border-2 border-indigo-500"
          />
          <h2 className="mt-3 text-lg font-bold text-gray-800">
            {scanResult.name}
          </h2>
          <p className="text-gray-600">📱 {scanResult.mobile}</p>
          <p className="mt-2 text-green-600 font-semibold">✅ Verified</p>

          <button
            onClick={handleNextScan}
            className="mt-4 px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
          >
            Next Scan
          </button>
        </div>
      )}

      {/* Denied */}
      {scanResult && scanResult.status === "denied" && (
  <div className="mt-6 flex flex-col items-center">
    <p className="text-red-600 font-semibold">{scanResult.message}</p>
    <button
      onClick={handleNextScan}
      className="mt-4 px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
    >
      Next Scan
    </button>
  </div>
)}


      {/* Error */}
      {error && (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={handleNextScan}
            className="mt-4 px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
          >
            Try Again
          </button>
        </div>
      )}
    </main>
  );
}
