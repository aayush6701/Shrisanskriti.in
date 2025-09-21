"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
 
export default function ManageEvents() {
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const [members, setMembers] = useState([]);


useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/list`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchEvents();
}, []);

const [showMemberModal, setShowMemberModal] = useState(false);
const [users, setUsers] = useState([]);
const [selectedUsers, setSelectedUsers] = useState([]);
const [selectAll, setSelectAll] = useState(false);

// Fetch unregistered users
const fetchUnregisteredUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/unregistered`);
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    setUsers(data.users || []);
  } catch (err) {
    console.error(err);
  }
};



// Delete member
const handleDeleteMember = async (userId) => {
  if (!selectedEvent || !selectedEvent._id) return;
  if (!confirm("Are you sure you want to remove this member?")) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${API_BASE_URL}/events/${selectedEvent._id}/remove-member/${userId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) throw new Error("Failed to delete member");
    const data = await res.json();
    alert(data.message);

    setMembers(members.filter((m) => m._id !== userId));
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
};



  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");

  const [showEventModal, setShowEventModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: true,
    entryFee: "",
    startDate: "",
    endDate: "",
  });

  const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

const handleAddEvent = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const url = selectedEvent
      ? `${API_BASE_URL}/events/update/${selectedEvent._id}`
      : `${API_BASE_URL}/events/add`;

    const method = selectedEvent ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to save event");
    const data = await res.json();

    if (selectedEvent) {
      // Update existing in frontend state
      setEvents(events.map((ev) => (ev._id === selectedEvent._id ? data.event : ev)));
    } else {
      // Add new
      setEvents([...events, data.event]);
    }

    setShowEventModal(false);
    setSelectedEvent(null); // reset edit state
    setFormData({ name: "", status: true, entryFee: "", startDate: "", endDate: "" });
  } catch (err) {
    alert(err.message);
  }
};


useEffect(() => {
  if (!selectedEvent?._id) return;

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/events/${selectedEvent._id}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      setMembers(data.members || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchMembers();
}, [selectedEvent]);

  return (
    <div className="rounded-xl bg-white/20 backdrop-blur-lg p-6 shadow-lg border border-white/30 space-y-8">
      {/* Header with Search + Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-600"
        />

        <div className="flex gap-3">
          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <FaPlus /> Add Event
          </button>

          
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="w-full text-sm text-gray-900 rounded-xl overflow-hidden">
          <thead className="bg-white/40 backdrop-blur-md text-gray-900 border-b border-white/30">
            <tr>
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Entry Fee</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
         <tbody>
  {loading ? (
    <tr>
      <td colSpan="6" className="p-4 text-center text-gray-600">
        Loading events...
      </td>
    </tr>
  ) : events.length === 0 ? (
    <tr>
      <td colSpan="6" className="p-4 text-center text-gray-600">
        No events found.
      </td>
    </tr>
  ) : (
    filteredEvents.map((event, idx) => (
      <tr
        key={event._id || idx}
        className={`border-b border-white/20 cursor-pointer ${
          idx % 2 === 0 ? "bg-purple-300/40" : "bg-indigo-300/40"
        } hover:bg-white/20 transition`}
        onClick={() => {
          setSelectedEvent(event);   // ✅ Now row click selects event
        }}
      >
        <td className="p-3">{event.name}</td>
        <td className="p-3">{event.status ? "Active ✅" : "Inactive ❌"}</td>
        <td className="p-3">₹{event.entryFee}</td>
        <td className="p-3">{event.startDate}</td>
        <td className="p-3">{event.endDate}</td>
        <td className="p-3 flex gap-3">
          {/* ✏️ Edit Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ stop triggering row click
              setFormData({
                name: event.name,
                status: event.status,
                entryFee: event.entryFee,
                startDate: event.startDate,
                endDate: event.endDate,
              });
              setSelectedEvent(event);
              setShowEventModal(true);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>

          {/* 🗑️ Delete Button */}
          <button
            onClick={async (e) => {
              e.stopPropagation(); // ✅ stop triggering row click
              if (!confirm("Are you sure you want to delete this event?")) return;

              try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/events/${event._id}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to delete event");
                const data = await res.json();
                alert(data.message);

                setEvents(events.filter((e) => e._id !== event._id));
                if (selectedEvent?._id === event._id) {
                  setSelectedEvent(null);
                  setMembers([]);
                }
              } catch (err) {
                console.error(err);
                alert("Error: " + err.message);
              }
            }}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>


  </table>
      </div>

      {/* Members Table */}
      {selectedEvent && (
  <div className="overflow-x-auto rounded-xl shadow-md">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-gray-900">
        Members Registered for:{" "}
        <span className="text-indigo-600">{selectedEvent.name}</span>
      </h3>

      <div className="flex items-center gap-4">
        <span className="text-gray-800 font-medium">
          Total Registered: {members.length}
        </span>
        <button
          onClick={() => {
            fetchUnregisteredUsers();
            setShowMemberModal(true);
          }}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <FaUsers /> Register Members
        </button>
      </div>
    </div>

    <table className="w-full text-sm text-gray-900 rounded-xl overflow-hidden">
      <thead className="bg-white/40 backdrop-blur-md text-gray-900 border-b border-white/30">
        <tr>
          <th className="p-3 text-left">S. No.</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Mobile</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m, idx) => (
          <tr
            key={m._id}
            className={`border-b border-white/20 ${
              idx % 2 === 0 ? "bg-green-300/40" : "bg-yellow-300/40"
            }`}
          >
            <td className="p-3">{idx + 1}</td>
            <td className="p-3">{m.name}</td>
            <td className="p-3">{m.mobile}</td>
            <td className="p-3">
              <button
                onClick={() => handleDeleteMember(m._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/30 backdrop-blur-2xl rounded-xl shadow-2xl w-full max-w-lg p-8 border border-white/40">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Add Event
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-4 text-gray-900">
              <div>
                <label className="block text-sm font-medium mb-1">Event Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter event name"
                  className="w-full rounded-lg px-3 py-2 bg-white/50 border border-gray-400 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value === "true" })}
                  className="w-full rounded-lg px-3 py-2 bg-white/50 border border-gray-400 text-gray-900"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Entry Fee (₹)</label>
                <input
                  type="number"
                  value={formData.entryFee}
                  onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
                  placeholder="Enter entry fee"
                  className="w-full rounded-lg px-3 py-2 bg-white/50 border border-gray-400 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="w-full rounded-lg px-3 py-2 bg-white/50 border border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  className="w-full rounded-lg px-3 py-2 bg-white/50 border border-gray-400 text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 hover:bg-white/50 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showMemberModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-xl w-full max-w-4xl p-6 border border-white/40">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Register Members</h3>

      {/* Select All + Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => {
              setSelectAll(e.target.checked);
              setSelectedUsers(
                e.target.checked ? users.map((u) => u._id) : []
              );
            }}
          />
          Select All
        </label>

        <input
          type="text"
          placeholder="Search by name or mobile"
          className="px-3 py-2 rounded-lg border border-white/40 bg-white/20 placeholder-gray-700 text-gray-900 focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="font-semibold text-gray-800">
          Selected: {selectedUsers.length}
        </span>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl shadow-md max-h-96 overflow-y-auto">
        <table className="w-full text-sm text-gray-900 rounded-xl overflow-hidden">
          <thead className="bg-white/40 backdrop-blur-md text-gray-900 border-b border-white/30">
            <tr>
              <th className="p-3 text-left">Select</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                [user.name, user.mobile]
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((user, idx) => (
                <tr
                  key={user._id}
                  className={`border-b border-white/20 ${
                    idx % 2 === 0 ? "bg-purple-300/40" : "bg-indigo-300/40"
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user._id]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter((id) => id !== user._id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.mobile}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setShowMemberModal(false)}
          className="px-4 py-2 rounded-lg border border-white/40 bg-white/20 hover:bg-white/30"
        >
          Cancel
        </button>
        <button
          type="button"
            onClick={async () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
     if (!selectedEvent || !selectedEvent._id) {
  alert("No event selected!");
  return;
}

const res = await fetch(`${API_BASE_URL}/events/${selectedEvent._id}/register-members`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ user_ids: selectedUsers }),
});


      if (!res.ok) throw new Error("Failed to register members");
      const data = await res.json();

     alert(data.message);

// ✅ Refetch members instantly
try {
  const token = localStorage.getItem("token");
  const resMembers = await fetch(`${API_BASE_URL}/events/${selectedEvent._id}/members`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (resMembers.ok) {
    const memberData = await resMembers.json();
    setMembers(memberData.members || []);
  }
} catch (err) {
  console.error("Failed to refresh members:", err);
}

setShowMemberModal(false);
setSelectedUsers([]);
setSelectAll(false);

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  }}
          className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
        >
          Register Selected
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );
}
