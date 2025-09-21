"use client";

import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  mobile: "",
  address: "",
});


  // ✅ Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/users/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
      setFilteredUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search users
  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower) ||
          u.mobile.includes(lower)
      )
    );
  }, [search, users]);

  // ✅ Open modal
  // ✅ Open modal
const handleOpenModal = (user = null) => {
  if (user) {
    // Editing existing user
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: "",
      address: user.address || "",
    });
  } else {
    // Adding new user
    setEditUser(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      address: "",
    });
  }
  setShowModal(true);
};

  // ✅ Save user
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = editUser
        ? `${API_BASE_URL}/users/update/${editUser._id}`
        : `${API_BASE_URL}/users/register`;
      const method = editUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save user");
      await fetchUsers();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/users/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="rounded-xl bg-white/30 backdrop-blur-lg p-6 shadow-lg border border-white/40">
      {/* Top Bar with Count + Search + Add */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Users ({users.length})
        </h2>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white/60 text-gray-900 placeholder-gray-500"
            />
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-gray-700">No users found.</p>
      ) : (
        <table className="w-full border border-gray-300 text-left text-sm rounded-lg overflow-hidden">
          <thead className="bg-indigo-200/50">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <tr
                key={user._id}
                className={`${
                  i % 2 === 0 ? "bg-purple-200/40" : "bg-indigo-200/40"
                }`}
              >
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.mobile}</td>
                <td className="p-2 border flex gap-3">
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 border border-white/30">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        {editUser ? "Edit User" : "Add User"}
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
            placeholder="Enter name"
            className="w-full rounded-lg px-3 py-2 bg-white/30 border border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
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
            placeholder="Enter email"
            className="w-full rounded-lg px-3 py-2 bg-white/30 border border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
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
            placeholder="Enter mobile number"
            className="w-full rounded-lg px-3 py-2 bg-white/30 border border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Password field (required for Add, optional for Edit) */}
<div>
  <label className="block text-sm font-medium mb-1">Password</label>
  <input
    type="password"
    value={formData.password || ""}
    onChange={(e) =>
      setFormData({ ...formData, password: e.target.value })
    }
    placeholder={editUser ? "Leave blank to keep current password" : "Enter password"}
    className="w-full rounded-lg px-3 py-2 bg-white/30 border border-white/50 
               text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
    required={!editUser} // ✅ only required when adding new user
  />
</div>


<div>
  <label className="block text-sm font-medium mb-1">Address</label>
  <textarea
    value={formData.address}
    onChange={(e) =>
      setFormData({ ...formData, address: e.target.value })
    }
    placeholder="Enter address"
    className="w-full rounded-lg px-3 py-2 bg-white/30 border border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
  />
</div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 hover:bg-white/50 text-gray-900"
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
