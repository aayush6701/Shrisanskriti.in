// app/layout.js
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./components/Loader"; // your spinner

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathname) return;

    // Start loader on every route change
    setLoading(true);

    // Ensure loader stays at least 2s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[9999]">
            <Loader />
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
