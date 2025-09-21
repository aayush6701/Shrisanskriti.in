




"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API = process.env.NEXT_PUBLIC_API_URL; // e.g. http://127.0.0.1:8000

export default function ManageOrders() {
  const [products, setProducts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showProductModal, setShowProductModal] = useState(false);
  const [formData, setFormData] = useState({ _id: undefined, name: "", price: "" });

  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [showOrderModal, setShowOrderModal] = useState(false);
const [users, setUsers] = useState([]);
const [orderForm, setOrderForm] = useState({
  user: null, // store full user object
  items: [{ product: null, quantity: 1 }], // store full product object
});

const [userSearch, setUserSearch] = useState("");

  // ---------- Helpers ----------
  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    setProducts(data.products || []);
  };

  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    // Backend returns {orders: [{ orderId, name, email, mobile, orders: items, taken }]}
    setUserOrders(data.orders || []);
  };

  const refetchAll = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchOrders()]);
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchAll();
const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found, please login again");
    setUsers([]);
    return;
  }

  const res = await fetch(`${API}/users/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    setUsers(data.users || []);
  } else {
    console.error("Failed to fetch users", res.status, await res.text());
    setUsers([]);
  }
};


fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Product CRUD ----------
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        name: (formData.name || "").trim(),
        price: Number(formData.price),
      };
      if (!body.name || Number.isNaN(body.price)) {
        throw new Error("Please provide a valid name and price");
      }

      if (formData._id) {
        // Update
        const res = await fetch(`${API}/products/${formData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Failed to update product");
      } else {
        // Create
        const res = await fetch(`${API}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Failed to add product");
      }

      await fetchProducts();
      setShowProductModal(false);
      setFormData({ _id: undefined, name: "", price: "" });
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  // ---------- Order actions ----------
  const toggleTaken = async (orderId) => {
    const ok = confirm("Are you sure you want to update this order status?");
    if (!ok) return;
    try {
      const res = await fetch(`${API}/orders/${encodeURIComponent(orderId)}/toggle-taken`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to update order status");
      // Optimistic local update
      setUserOrders((prev) =>
        prev.map((u) => (u.orderId === orderId ? { ...u, taken: !u.taken } : u))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const clearTakenOrders = async () => {
    if (!confirm("Are you sure you want to clear all taken orders?")) return;
    try {
      const res = await fetch(`${API}/orders/clear-taken`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to clear taken orders");
      await fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  const clearAllOrders = async () => {
    if (!confirm("Are you sure you want to clear ALL orders?")) return;
    try {
      const res = await fetch(`${API}/orders/clear-all`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to clear all orders");
      await fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  // ---------- Search (apply/clear with buttons) ----------
  const filteredOrders = useMemo(() => {
    const q = (appliedSearch || "").trim().toLowerCase();
    if (!q) return userOrders;
    return userOrders.filter((u) =>
      [u.orderId, u.name, u.email, u.mobile, ...(u.orders || []).map((o) => o.product)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [appliedSearch, userOrders]);

  if (loading) {
    return (
      <div className="rounded-xl bg-white/30 backdrop-blur-lg p-6 shadow-lg border border-white/50">
        <p className="text-gray-900">Loading…</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white/30 backdrop-blur-lg p-6 shadow-lg border border-white/50 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-black">Orders & Products</h2>
        <button
          onClick={() => setShowProductModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <FaPlus /> Add Product
        </button>
        <button
  onClick={() => setShowOrderModal(true)}
  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
>
  <FaPlus /> Add Order
</button>

      </div>

      {/* Products Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Products</h3>
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-gray-900">
            <thead className="bg-indigo-100 text-gray-900">
              <tr>
                <th className="p-3 text-left">Product Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-indigo-50">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        setFormData({ _id: p._id, name: p.name, price: p.price });
                        setShowProductModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDeleteProduct(p._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-600">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Orders Table */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-900">User Orders</h3>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-900 w-64"
            />
            <button
              onClick={() => setAppliedSearch(searchInput)}
              className="px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Search
            </button>
            {appliedSearch && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setAppliedSearch("");
                }}
                className="px-3 py-2 rounded-lg bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={clearTakenOrders}
              className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
            >
              Clear Taken Orders
            </button>
            <button
              onClick={clearAllOrders}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Clear All Orders
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-gray-900">
            <thead className="bg-indigo-100 text-gray-900">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Orders</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((u, idx) => (
                <tr
                  key={u.orderId}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-purple-100/40" : "bg-indigo-100/40"
                  }`}
                >
                  <td className="p-3 ">{u.orderId}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.mobile}</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1">
                      {(u.orders || []).map((o, i) => (
                        <li key={i}>
                          {o.product} —{" "}
                          <span className="font-semibold text-indigo-700">
                            {o.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleTaken(u.orderId)}
                      className={`px-3 py-1 rounded-lg text-white font-semibold transition ${
                        u.taken
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {u.taken ? "Taken ✅" : "Mark as Taken"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-600">
                    No user orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl w-full max-w-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {formData._id ? "Edit Product" : "Add Product"}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-900 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowProductModal(false);
                    setFormData({ _id: undefined, name: "", price: "" });
                  }}
                  className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOrderModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Create New Order
      </h3>
      <form
        onSubmit={async (e) => {
  e.preventDefault();
  try {
    const payload = {
      orderId: "ORD-" + Date.now(), // generate unique orderId
      name: orderForm.user.name,
      email: orderForm.user.email,
      mobile: orderForm.user.mobile,
      items: orderForm.items.map((i) => ({
        product: i.product.name,  // backend expects product name
        quantity: i.quantity,
      })),
    };

    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create order");

    await fetchOrders();
    setShowOrderModal(false);
    setOrderForm({ user: null, items: [{ product: null, quantity: 1 }] });
  } catch (err) {
    alert(err.message);
  }
}}
        className="space-y-6"
      >
        {/* User selection */}
<div>
  <label className="block text-sm text-gray-900 mb-1">Select User</label>
  <input
    type="text"
    placeholder="Search user by name or mobile..."
    className="w-full text-gray-800 border border-gray-300 px-3 py-2 rounded-lg mb-2"
    value={userSearch}
    onChange={(e) => setUserSearch(e.target.value.toLowerCase())}
  />
  <select
    value={orderForm.user?._id || ""}
    onChange={(e) => {
      const selected = users.find((u) => u._id === e.target.value);
      setOrderForm({ ...orderForm, user: selected });
    }}
    required
    className="w-full text-gray-800 border border-gray-300 px-3 py-2 rounded-lg"
  >
    <option value="">-- Select User --</option>
    {users
      .filter((u) =>
        [u.name, u.mobile].join(" ").toLowerCase().includes(userSearch)
      )
      .map((u) => (
        <option key={u._id} value={u._id}>
          {u.name} ({u.mobile})
        </option>
      ))}
  </select>
</div>

        {/* Products & Quantity */}
        <div className="space-y-4">
          {orderForm.items.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <select
  value={item.product?._id || ""}
  onChange={(e) => {
    const selected = products.find((p) => p._id === e.target.value);
    const newItems = [...orderForm.items];
    newItems[idx].product = selected;
    setOrderForm({ ...orderForm, items: newItems });
  }}

                required
                className="flex-1 border text-gray-800 border-gray-300 px-3 py-2 rounded-lg"
              >
                <option value="">-- Select Product --</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} (₹{p.price})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...orderForm.items];
                  newItems[idx].quantity = Number(e.target.value);
                  setOrderForm({ ...orderForm, items: newItems });
                }}
                className="w-24 text-gray-800 border border-gray-300 px-3 py-2 rounded-lg"
              />
              <button
                type="button"
                onClick={() =>
                  setOrderForm({
                    ...orderForm,
                    items: orderForm.items.filter((_, i) => i !== idx),
                  })
                }
                className="text-red-600 font-bold"
                disabled={orderForm.items.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setOrderForm({
                ...orderForm,
                items: [...orderForm.items, { product: null, quantity: 1 }],
              })
            }
            className="text-indigo-600 font-semibold hover:underline"
          >
            + Add Another Product
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowOrderModal(false)}
            className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            Save Order
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
