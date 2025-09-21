"use client";

import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import { FaPlus } from "react-icons/fa";

export default function ManageScans() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/scan/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch scans");
      const data = await res.json();
      setScans(data.scans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/scan/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to add scan user");
      }
      await fetchScans();
      setShowModal(false);
      setFormData({ email: "", password: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="rounded-xl bg-white/20 backdrop-blur-lg p-6 shadow-lg border border-white/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Manage Scan Users ({scans.length})
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          <FaPlus /> Add Scan User
        </button>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : scans.length === 0 ? (
        <p className="text-gray-700">No scan users found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-gray-900 rounded-xl overflow-hidden">
            <thead className="bg-white/40 backdrop-blur-md text-gray-900 border-b border-white/30">
              <tr>
                <th className="p-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, idx) => (
                <tr
                  key={scan._id}
                  className={`border-b border-white/20 ${
                    idx % 2 === 0 ? "bg-purple-300/40" : "bg-indigo-300/40"
                  } hover:bg-white/20 transition`}
                >
                  <td className="p-3">{scan.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-xl w-full max-w-md p-6 border border-white/40">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Scan User</h3>
            <form onSubmit={handleSave} className="space-y-4 text-gray-900">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full rounded-lg px-3 py-2 bg-white/20 border border-white/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="w-full rounded-lg px-3 py-2 bg-white/20 border border-white/40"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-white/40 bg-white/20 hover:bg-white/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
