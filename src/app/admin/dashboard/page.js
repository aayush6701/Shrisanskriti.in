"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaImages,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import ManageAdmins from "../components/ManageAdmins"; // ✅ Import the component
import ManageUsers from "../components/ManageUsers"; 
import ManageEvents from "../components/ManageEvents";
import ManageScans from "../components/ManageScans";
import ManageOrders from "../components/ManageOrders";
import ManageGallery from "../components/ManageGallery";


export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // ✅ Validate token and fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin");
      return;
    }

    fetch(`${API_BASE_URL}/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data?.profile?.name) {
          setAdminName(data.profile.name);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/admin");
      })
      .finally(() => setLoading(false));
  }, [router]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/admin");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-300 via-purple-200 to-blue-200">
        <p className="text-lg font-semibold text-gray-800">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-indigo-300 via-purple-200 to-blue-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/30 backdrop-blur-lg border-b md:border-r border-white/40 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 font-medium ${
                activeTab === "dashboard"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              <FaImages /> Gallery / Albums
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-3 font-medium ${
                activeTab === "users"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              <FaUsers /> Manage Users
            </button>

            <button
              onClick={() => setActiveTab("admins")}
              className={`flex items-center gap-3 font-medium ${
                activeTab === "admins"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              <FaUserShield /> Manage Admins
            </button>
 <button
   onClick={() => setActiveTab("events")}
   className={`flex items-center gap-3 font-medium ${
    activeTab === "events"
       ? "text-indigo-600"
      : "text-gray-700 hover:text-indigo-600"
   }`}
 >
   📅 Manage Events
 </button>

 <button
  onClick={() => setActiveTab("scans")}
  className={`flex items-center gap-3 font-medium ${
    activeTab === "scans"
      ? "text-indigo-600"
      : "text-gray-700 hover:text-indigo-600"
  }`}
>
  🔍 Manage Scans
</button>

<button
  onClick={() => setActiveTab("orders")}
  className={`flex items-center gap-3 font-medium ${
    activeTab === "orders"
      ? "text-indigo-600"
      : "text-gray-700 hover:text-indigo-600"
  }`}
>
  🛒 Manage Orders
</button>

<button
  onClick={() => setActiveTab("Gallery")}
  className={`flex items-center gap-3 font-medium ${
    activeTab === "orders"
      ? "text-indigo-600"
      : "text-gray-700 hover:text-indigo-600"
  }`}
>
 <FaImages /> Manage Gallery
</button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 font-medium ${
                activeTab === "settings"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >

              <FaCog /> Settings
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 font-semibold hover:underline"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
     <section className="flex-1 p-4 md:p-8 w-full">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {adminName}</span>
            <img
              src="/admin-avatar.png"
              alt="Admin"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
        </header>

        {/* Dynamic Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white/30 backdrop-blur-lg p-6 shadow-lg border border-white/40">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Albums
              </h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">12</p>
            </div>

            <div className="rounded-xl bg-white/30 backdrop-blur-lg p-6 shadow-lg border border-white/40">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Photos
              </h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">245</p>
            </div>

            <div className="rounded-xl bg-white/30 backdrop-blur-lg p-6 shadow-lg border border-white/40">
              <h3 className="text-lg font-semibold text-gray-800">Users</h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">34</p>
            </div>
          </div>
        )}

      {activeTab === "users" && <ManageUsers />}

{activeTab === "scans" && <ManageScans />}

        {activeTab === "admins" && <ManageAdmins />} {/* ✅ Show ManageAdmins */}
{activeTab === "events" && <ManageEvents />}

{activeTab === "orders" && <ManageOrders />}
{activeTab === "Gallery" && <ManageGallery />}

        {activeTab === "settings" && (
          <p className="text-gray-700">⚙️ Settings component will render here.</p>
        )}
      </section>
    </main>
  );
}
