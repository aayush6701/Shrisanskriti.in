"use client";

import React, { useState } from "react";
import { API_BASE_URL } from "../config";

export default function ScanLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/scan/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Invalid email or password");
      }

      const data = await response.json();
     localStorage.setItem("scanToken", data.access_token);
 localStorage.setItem("scannerUser", JSON.stringify(data));
      alert("Scanner login successful!");
      window.location.href = "/scan/scanner"; // redirect to scanner page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/30 backdrop-blur-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Scanner Login
        </h1>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="scanner@example.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-white font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-600 text-center mt-6">
          © {new Date().getFullYear()} Sanskriti NGO
        </p>
      </div>
    </main>
  );
}
