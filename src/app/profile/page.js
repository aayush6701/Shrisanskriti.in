"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatedTestimonials } from "../components/ui/AnimatedTestimonials";
import InvitationCard from "../components/InvitationCard";
import { AnimatedGallery } from "../components/ui/AnimatedGallery";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import NextImage from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import * as faceapi from "face-api.js";
import { loadFaceModels } from "../../../lib/faceApiLoader.";
import Loader from "../components/Loader"; 



async function processImage(file) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      // Step 1: Resize if either side > 1200px
      if (width > 1200 || height > 1200) {
        if (width > height) {
          height = Math.round((height * 1200) / width);
          width = 1200;
        } else {
          width = Math.round((width * 1200) / height);
          height = 1200;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Step 2: Export blob
      canvas.toBlob(
        (blob) => {
          // Step 3: If >800KB, compress JPEG
          if (blob.size > 800 * 1024) {
            canvas.toBlob(
              (compressedBlob) => {
                const newFile = new File([compressedBlob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(newFile);
              },
              "image/jpeg",
              0.8 // compression quality
            );
          } else {
            const newFile = new File([blob], file.name, {
              type: blob.type,
              lastModified: Date.now(),
            });
            resolve(newFile);
          }
        },
        file.type,
        0.95
      );
    };
    img.src = URL.createObjectURL(file);
  });
}


export default function ProfilePage() {
    const router = useRouter();
const [user, setUser] = useState(null);
// below: const [showProfileModal, setShowProfileModal] = useState(false);
const [selectedFileName, setSelectedFileName] = useState("");
const [previewUrl, setPreviewUrl] = useState(null);
const [croppedUrl, setCroppedUrl] = useState(null);
const [loading, setLoading] = useState(false);
const [rawFile, setRawFile] = useState(null);


useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  } else {
    router.push("/"); // redirect if not logged in
  }
}, [router]);

  // Example events
const [orders, setOrders] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to fetch orders");
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  fetchOrders();
}, []);

useEffect(() => {
  loadFaceModels();
}, []);

const [showOrderModal, setShowOrderModal] = useState(false);
const [products, setProducts] = useState([]);
const [newOrder, setNewOrder] = useState([]);


// Fetch products once
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProducts();
}, []);


 const [expandedOrder, setExpandedOrder] = useState(null);
const [showProfileModal, setShowProfileModal] = useState(false);

const handleFileChange = async (e) => {
  const file = e.target.files?.[0];

  // Clear old state
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  setPreviewUrl(null);
  setCroppedUrl(null);
  setSelectedFileName("");

  if (!file) return;

  try {
    // Convert file to image
    const img = await faceapi.bufferToImage(file);

    // Run detection
    const detections = await faceapi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (detections.length === 0) {
      alert("❌ No face found in the image. Please upload a clear face photo.");
      return false;
    }

    // Filter by size
    const validFaces = detections.filter(det => {
      const box = det.detection.box;
      return box.width >= 150 || box.height >= 150;
    });

    if (validFaces.length === 0) {
      alert("❌ No valid face found (face too small). Please upload a clearer/larger photo.");
      return false;
    }
    if (validFaces.length > 1) {
      alert("❌ Multiple valid faces detected. Please upload an image with only your face.");
      return false;
    }

    // ✅ Exactly one valid face
    const face = validFaces[0];

    // Save embedding
    const embedding = Array.from(face.descriptor);
    localStorage.setItem("faceEmbedding", JSON.stringify(embedding));

    // Crop face for preview
    const box = face.detection.box;
    const canvas = document.createElement("canvas");
    canvas.width = box.width;
    canvas.height = box.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      box.x, box.y, box.width, box.height,
      0, 0, box.width, box.height
    );

    const croppedUrl = canvas.toDataURL("image/jpeg");
    setCroppedUrl(croppedUrl); // preview for testing

    // Save filename for reference
    setSelectedFileName(file.name);

    // Note: do NOT overwrite previewUrl with full image here,
    // because we only want to show cropped face for embedding testing.
    setPreviewUrl(croppedUrl);
     return true; 

  } catch (err) {
    console.error("Face detection failed:", err);
    alert("⚠️ Something went wrong while processing the image.");
    return false;
  }
};

// optional: revoke blob URL when component/modal unmounts
useEffect(() => {
  return () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };
}, [previewUrl]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content (push down so it won’t overlap navbar) */}
      <main className="flex-grow pt-24 relative w-full overflow-hidden">
      {/* Blurred background fill */}
      <Image
        src="/g3.jpg"
        alt="User Background"
        layout="fill"
        objectFit="cover"
        className="blur-lg scale-110 opacity-70"
        priority
      />

      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/20 z-10"></div>

      {/* Content Grid */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-screen">
        {/* Profile Info (left) */}
<div className="md:col-span-1 flex flex-col justify-between rounded-3xl backdrop-blur-xl bg-gradient-to-tr from-[#9333ea1a] via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/30 shadow-lg p-6 text-white min-h-[650px]">
  {/* Top Row: Image + Welcome */}
  <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-4">
  {/* Profile Image */}
  <div className="relative shrink-0">
   <Image
  src={
    user?.profilePic
      ? `${process.env.NEXT_PUBLIC_API_URL}${user.profilePic.startsWith("/") ? "" : "/"}${user.profilePic}`
      : "/gbi.png"
  }
  alt="User Photo"
  width={150}
  height={150}
  className="rounded-full object-cover"
/>


    {/* <button className="absolute bottom-2 right-2 bg-white/70 p-2 rounded-full shadow hover:bg-white">
      ✏️
    </button> */}
  </div>

  {/* Welcome Text */}
  <div className="mt-4 lg:mt-12 lg:ml-6">
    <h2 className="text-xl lg:text-2xl font-bold text-white [text-shadow:_2px_2px_6px_rgba(0,0,0,0.5)]">
      Welcome, {user?.name || "N/A"} 👋
    </h2>
    <p className="mt-2 text-sm lg:text-base text-white [text-shadow:_2px_2px_6px_rgba(0,0,0,0.7)]">
      Sanskriti Mahila Group Member
    </p>
  </div>
</div>

  {/* User Details */}
  <div className="mt-6 space-y-3 text-white [text-shadow:_2px_2px_6px_rgba(0,0,0,0.5)]">
<p><span className="font-bold">Name: </span>{user?.name || "N/A"}</p>
<p><span className="font-bold">Email: </span>{user?.email || "N/A"}</p>
<p><span className="font-semibold">Mobile: </span>{user?.mobile || "N/A"}</p>
<p><span className="font-semibold">Address: </span>{user?.address || "N/A"}</p>

  </div>

{/* Gallery */}
<div>

{/* Gallery or Update Box */}
<div>
  {user?.profilePic ? (
    <AnimatedTestimonials
      images={["/ai1.webp", "/i1.jpg","/i3.jpg", "/i4.jpg", "/i5.jpg", "/i6.jpg"]}
      autoplay={true}
    />
  ) : (
    <div
  onClick={() => setShowProfileModal(true)}
  className="cursor-pointer flex items-center justify-center p-6 rounded-xl bg-white/70 border border-dashed border-red-400 text-red-600 text-center font-semibold hover:bg-white transition"
>
  Update your profile to access all features
</div>

  )}
</div>


</div>



  {/* Logout */}
  <div className="flex justify-center mt-6">
  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/"); // redirect to homepage
    }}
    className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition shadow-md text-white font-semibold"
  >
    Logout
  </button>
</div>

</div>

        {/* Right Column (2 stacked sections) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Invitation Card */}
          {/* <div className="rounded-3xl backdrop-blur-xl bg-gradient-to-l from-[#9333ea1a] via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/30 shadow-lg p-6  text-white">
           <div className="p-1">
      <h1 className="text-2xl [text-shadow:_2px_2px_6px_rgba(0,0,0,0.7)] font-bold mb-4">Your Invitation</h1>
     <InvitationCard />
    </div>
          </div> */}

{/* Invitation Card */}
<div className="rounded-3xl backdrop-blur-xl bg-gradient-to-l from-[#9333ea1a] via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/30 shadow-lg p-6 text-white">
  <div className="p-1">
    <h1 className="text-2xl [text-shadow:_2px_2px_6px_rgba(0,0,0,0.7)] font-bold mb-4">
      Your Invitation
    </h1>

    {/* ✅ Logic for profile + event pass */}
    {user?.profilePic && user?.mobile && user?.address ? (
     user?.event ? (
  // ✅ User already registered → show pass with token in QR
  <InvitationCard qrValue={localStorage.getItem("token")} />
) : (

        // 🚫 Not registered for event → show "Get Pass" box
        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-white/70 text-gray-900 shadow border border-dashed border-indigo-400">
          <p className="text-lg font-semibold">🎟 Get your pass now!</p>
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register-event`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.detail || "Failed to register");

                // ✅ Update local user object
                const updatedUser = { ...user, event: true };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);

                alert("Pass registered successfully 🎉");
              } catch (err) {
                alert(err.message);
              }
            }}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Register Now
          </button>
        </div>
      )
    ) : (
      // 🚫 Profile not updated
      <div
        onClick={() => setShowProfileModal(true)}
        className="cursor-pointer flex items-center justify-center p-6 rounded-xl bg-white/70 border border-dashed border-red-400 text-red-600 text-center font-semibold hover:bg-white transition"
      >
        Update your profile to access Invitation
      </div>
    )}
  </div>
</div>

{/* Orders Section */}
<div className="rounded-3xl backdrop-blur-xl bg-gradient-to-r from-purple-500/20 via-pink-400/30 to-blue-400/20 
                border border-white/30 shadow-lg p-6 text-white">
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-lg [text-shadow:_2px_2px_6px_rgba(0,0,0,0.7)] font-semibold">Your Orders</h3>
   <button
  onClick={() => setShowOrderModal(true)}
  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700 transition"
>
  + New Order
</button>

  </div>
<div className="max-h-[200px] overflow-y-auto space-y-2 pr-1">
  {orders.length === 0 ? (
    <div className="p-4 rounded-lg bg-white/60 text-gray-900 text-center font-semibold shadow-sm">
      🍔 No orders yet...  
      <br />
      “Don’t wait! Great food tastes better when it’s ordered 😋”
    </div>
  ) : (
    orders.map((order) => (
      <div
        key={order._id || order.orderId}
        className="p-3 rounded-lg bg-white/60 text-gray-900 shadow-sm cursor-pointer"
        onClick={() =>
          setExpandedOrder(expandedOrder === order._id ? null : order._id)
        }
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">
            Order #{order.orderId}
          </span>

          <div className="flex items-center gap-2">
            {/* Status Badge */}
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                order.taken
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {order.taken ? "Completed" : "Pending"}
            </span>

            {/* Created Date */}
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                : "N/A"}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {expandedOrder === order._id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-1 overflow-hidden text-sm bg-white/80 rounded-lg p-2"
            >
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Status:</strong> {order.taken ? "Completed" : "Pending"}</p>
              <p><strong>Items:</strong></p>
              <ul className="list-disc pl-4">
                {(order.items || order.orders || []).map((i, idx) => (
                  <li key={idx}>{i.product} × {i.quantity}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ))
  )}
</div>
</div>
{/* Profile Update Modal */}
{showProfileModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
      <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">
        Update Profile
      </h3>

      <form
        className="space-y-5"
//       onSubmit={async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   const formData = new FormData(e.target);
//   const token = localStorage.getItem("token");

//   const fileInput = e.target.profilePic.files[0];
//   if (fileInput) {
//     const processedFile = await processImage(fileInput);
//     formData.set("profilePic", processedFile);
//   }

//   const embedding = localStorage.getItem("faceEmbedding");
//   if (embedding) {
//     formData.set("embedding", embedding);
//   }

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData,
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.detail || "Update failed");

//     const updatedUser = { ...user, ...data.updates };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);

//     alert("Profile updated successfully!");
//     localStorage.removeItem("faceEmbedding");

//     setShowProfileModal(false);
//   } catch (err) {
//     alert(err.message);
//   } finally {
//     setLoading(false);
//   }
// }}
onSubmit={async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.target);
  const token = localStorage.getItem("token");

  try {
    if (rawFile) {
      // ✅ Run your existing handleFileChange here
     const valid = await handleFileChange({ target: { files: [rawFile] } });
  if (!valid) {
    setLoading(false);
    return; // ⛔ stop form submit if no valid face
  }

      // compress/resize before sending
      const processedFile = await processImage(rawFile);
      formData.set("profilePic", processedFile);

      // get embedding saved by handleFileChange
      const embedding = localStorage.getItem("faceEmbedding");
      if (embedding) {
        formData.set("embedding", embedding);
      }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Update failed");

    const updatedUser = { ...user, ...data.updates };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    alert("Profile updated successfully!");
    localStorage.removeItem("faceEmbedding");
    setShowProfileModal(false);
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
}}


      >
{loading && (
  <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl z-50">
    <Loader />   {/* ✅ your custom loader */}
  </div>
)}

        {/* Show Mobile field ONLY if missing */}
        {!user?.mobile && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              required
              placeholder="Enter your mobile number"
              className="w-full rounded-lg px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {/* Show Address field ONLY if missing */}
        {!user?.address && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              required
              placeholder="Enter your address"
              rows={3}
              className="w-full rounded-lg px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {/* Profile Picture Upload Box */}
       {/* Profile Picture Upload Box */}
<div>
  <label className="block text-sm font-semibold mb-2 text-gray-700">
    Profile Picture
  </label>

  <div className="relative w-full h-40 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden bg-gray-50">
    {/* The clickable file input overlay */}
    <input
  type="file"
  name="profilePic"
  accept="image/*"
  capture="environment"
  required
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file)); // just preview original
    setRawFile(file); // <-- add rawFile state earlier
  }}                
      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
    />

    {/* Preview if selected; else show helper text */}
    {previewUrl ? (
      <>
        {/* image preview fills the box */}
        <img
          src={previewUrl}
          alt="Selected preview"
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* subtle filename tag */}
        <div className="absolute bottom-2 left-2 right-2 z-30 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {selectedFileName}
        </div>
      </>
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
        <span className="text-gray-600 text-sm">
          Please upload your image of your face to get your personalized gallery
        </span>
        <span className="mt-2 text-sm text-red-600 font-bold">
          Image must contain your clear face
        </span>
      </div>
    )}
  </div>
</div>


        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
  type="button"
  onClick={() => setShowProfileModal(false)}
  disabled={loading}
  className="px-5 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium disabled:opacity-50"
>
  Cancel
</button>
<button
  type="submit"
  disabled={loading}
  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow disabled:opacity-50"
>
  Save
</button>

        </div>
      </form>
    </div>
  </div>
)}
{showOrderModal && (
  <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4">
    <div className="w-full max-w-2xl rounded-3xl shadow-2xl 
                    backdrop-blur-xl bg-gradient-to-l from-[#9333ea1a] via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/30  p-8 text-white relative">
      
      {/* Header */}
      <h3 className="text-2xl font-bold text-center mb-6 [text-shadow:_2px_2px_6px_rgba(0,0,0,0.5)]">
        ✨ New Order
      </h3>

      {/* Product Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-h-60 overflow-y-auto pr-2">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => {
              const existing = newOrder.find((i) => i.product?._id === p._id);
              if (existing) {
                setNewOrder(
                  newOrder.map((i) =>
                    i.product._id === p._id ? { ...i, quantity: i.quantity + 1 } : i
                  )
                );
              } else {
                setNewOrder([...newOrder, { product: p, quantity: 1 }]);
              }
            }}
            className="cursor-pointer rounded-xl p-4 shadow-lg 
                       bg-white/50 hover:bg-white/60 transition 
                       border border-white/30 backdrop-blur-lg"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold [text-shadow:_2px_2px_6px_rgba(0,0,0,0.8)] text-white">{p.name}</span>
              <span className="text-indigo-600 font-bold">₹{p.price}</span>
            </div>
          </div>
        ))}
      </div>
{/* Selected Items */}
<div className="bg-white/50 backdrop-blur-lg rounded-xl p-4 border border-white/50 max-h-40 overflow-y-auto">
  {newOrder.length === 0 ? (
    <p className="text-sm text-gray-600 text-center">No items selected yet</p>
  ) : (
    <ul className="space-y-3">
      {newOrder.map((item, idx) => (
        <li key={idx} className="flex justify-between items-center">
          {/* Item name */}
          <div className="flex-1">
            <p className="font-medium [text-shadow:_2px_2px_6px_rgba(0,0,0,0.8)]">{item.product.name}</p>
          </div>

          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (item.quantity > 1) {
                  const updated = [...newOrder];
                  updated[idx].quantity -= 1;
                  setNewOrder(updated);
                }
              }}
              className="px-2 py-1 text-gray-600 bg-white/60 rounded hover:bg-white/50 border border-gray-400"
            >
              −
            </button>
            <span className="px-3 [text-shadow:_2px_2px_6px_rgba(0,0,0,0.8)] font-semibold">{item.quantity}</span>
            <button
              onClick={() => {
                const updated = [...newOrder];
                updated[idx].quantity += 1;
                setNewOrder(updated);
              }}
              className="px-2 py-1 bg-white/60 rounded hover:bg-white/70 border text-gray-600 border-gray-400"
            >
              +
            </button>
          </div>

          {/* Price */}
          <span className="w-20 text-right font-semibold text-indigo-600">
            ₹{item.product.price * item.quantity}
          </span>

          {/* Remove button */}
          <button
            onClick={() => setNewOrder(newOrder.filter((_, i) => i !== idx))}
            className="ml-3 text-red-600 border  hover:text-red-700 px-2 py-1 rounded-full text-sm"
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  )}
</div>


      {/* Total */}
      <div className="mt-4 flex justify-between items-center text-lg font-bold">
        <span className="[text-shadow:_2px_2px_6px_rgba(0,0,0,0.8)]">Total:</span>
        <span className="text-green-600">
          ₹{newOrder.reduce((sum, i) => sum + i.product.price * i.quantity, 0)}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowOrderModal(false)}
          className="px-5 py-2 rounded-lg [text-shadow:_2px_2px_6px_rgba(0,0,0,0.8)] bg-white/50 border border-white/30 hover:bg-white/60 transition"
        >
          Cancel
        </button>
        <button
          disabled={newOrder.length === 0}
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");
              const user = JSON.parse(localStorage.getItem("user"));
              const payload = {
                orderId: "ORD-" + Date.now(),
                name: user?.name,
                email: user?.email,
                mobile: user?.mobile,
                items: newOrder.map((i) => ({
                  product: i.product?.name || "Unknown",
                  quantity: i.quantity,
                })),
              };

              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
              });

              const data = await res.json();
              if (!res.ok) throw new Error(data.detail || "Failed to place order");

              alert("Order placed ✅");
              setShowOrderModal(false);
              setNewOrder([]);
              setOrders((prev) => [...prev, data.order]);
            } catch (err) {
              alert(err.message);
            }
          }}
          className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow disabled:opacity-40"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}







// const handleFileChange = async (e) => {
//   const file = e.target.files?.[0];
//   // clear old state
//   if (previewUrl) URL.revokeObjectURL(previewUrl);
//   setPreviewUrl(null);
//   setSelectedFileName("");

//   if (!file) return;

//   // Convert to image
//   const img = await faceapi.bufferToImage(file);

//   // Run detection
//   const detections = await faceapi
//     .detectAllFaces(img)
//     .withFaceLandmarks()
//     .withFaceDescriptors();

//   if (detections.length === 0) {
//     alert("❌ No face found in the image. Please upload a clear face photo.");
//     return;
//   }
//   if (detections.length > 1) {
//     alert("❌ Multiple faces detected. Please upload an image with only your face.");
//     return;
//   }
//   // Save face embedding (128D vector)
// const embedding = Array.from(detections[0].descriptor);
// localStorage.setItem("faceEmbedding", JSON.stringify(embedding));


//   // If valid, allow preview
//   setSelectedFileName(file.name);
//   const url = URL.createObjectURL(file);
//   setPreviewUrl(url);
// };

