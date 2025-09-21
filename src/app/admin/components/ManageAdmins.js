"use client";

import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/admin/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch admins");
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (admin = null) => {
    if (admin) {
      setEditAdmin(admin);
      setFormData({
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        password: "",
      });
    } else {
      setEditAdmin(null);
      setFormData({ name: "", email: "", mobile: "", password: "" });
    }
    setShowModal(true);
  };

// ✅ Save (Add or Update)
const handleSave = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const url = editAdmin
      ? `${API_BASE_URL}/admin/update/${editAdmin._id}`
      : `${API_BASE_URL}/admin/register`;
    const method = editAdmin ? "PUT" : "POST";

    // Copy form data
    const payload = { ...formData };

    // 🚫 Don’t send empty password during update
    if (editAdmin && !formData.password) {
      delete payload.password;
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save admin");

    await fetchAdmins();
    setShowModal(false);
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
};


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/admin/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete admin");
      await fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="rounded-xl bg-white/20 backdrop-blur-lg p-6 shadow-lg border border-white/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Manage Admins ({admins.length})
        </h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          <FaPlus /> Add Admin
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : admins.length === 0 ? (
        <p className="text-gray-700">No admins found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-gray-900 rounded-xl overflow-hidden">
            <thead className="bg-white/40 backdrop-blur-md text-gray-900 border-b border-white/30">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, idx) => (
                <tr
                  key={admin._id}
                  className={`border-b border-white/20 ${
                    idx % 2 === 0
                      ? "bg-purple-300/40"
                      : "bg-indigo-300/40"
                  } hover:bg-white/20 transition`}
                >
                  <td className="p-3">{admin.name}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3">{admin.mobile}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleOpenModal(admin)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-xl w-full max-w-md p-6 border border-white/40">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {editAdmin ? "Edit Admin" : "Add Admin"}
      </h3>
      <form onSubmit={handleSave} className="space-y-4 text-gray-900">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="w-full rounded-lg px-3 py-2 bg-white/20 border border-white/40 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full rounded-lg px-3 py-2 bg-white/20 border border-white/40 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile No.</label>
          <input
            type="text"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
            className="w-full rounded-lg px-3 py-2 bg-white/20 border border-white/40 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter mobile number"
          />
        </div>
        {!editAdmin && (
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full rounded-lg px-3 py-2 bg-white/20 border border-white/40 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
            />
          </div>
        )}
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
