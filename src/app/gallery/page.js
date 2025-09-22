
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { X, ArrowLeft, ArrowRight, Download, Share2, Printer } from "lucide-react";
import Loader from "../components/Loader";
import * as faceapi from "face-api.js";
import { Image as ImageIcon, Filter } from "lucide-react";
import { useSwipeable } from "react-swipeable";


// 🔹 Hook to track window width
function useWindowWidth() {
  const [width, setWidth] = useState(0);
  

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState(0);
  const width = useWindowWidth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);
const [aiMode, setAiMode] = useState(false);
const [allImages, setAllImages] = useState([]);
const [uploadModalOpen, setUploadModalOpen] = useState(false);
const [uploadImage, setUploadImage] = useState(null);
const [filterModalOpen, setFilterModalOpen] = useState(false);
const [titles, setTitles] = useState([]);
const [selectedTitles, setSelectedTitles] = useState([]);
const [dateFrom, setDateFrom] = useState("");
const [dateTo, setDateTo] = useState("");
const [filterMode, setFilterMode] = useState(false);




useEffect(() => {
  const fetchImages = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery?page=${page}&limit=20`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Failed to fetch gallery");

      setImages((prev) => [...prev, ...data.images]);
      if (data.images.length < 20) setHasMore(false);
    } catch (err) {
      console.error(err);
    }
  };

  fetchImages();
}, [page]);



    useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/"); // redirect if not logged in
    }
  }, [router]);


  useEffect(() => {
  if (!hasMore) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    },
    { threshold: 1.0 }
  );
  const sentinel = document.querySelector("#loadMore");
  if (sentinel) observer.observe(sentinel);
  return () => observer.disconnect();
}, [hasMore]);

// useEffect(() => {
//   if (images.length > 0 && allImages.length < images.length) {
//     setAllImages((prev) => [...prev, ...images]);
//   }
// }, [images]);

useEffect(() => {
  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ]);
    window.faceapi = faceapi; // make available globally
  };
  loadModels();
}, []);

useEffect(() => {
  const fetchTitles = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/titles`);
      const data = await res.json();
      setTitles(data.titles || []);
    } catch (err) {
      console.error("Failed to fetch titles", err);
    }
  };
  fetchTitles();
}, []);



  // 🔹 Responsive windowSize for thumbnails
  const windowSize = width < 640 ? 2 : width < 1024 ? 4 : 5;

  const nextImage = () => {
    setDirection(1);
    setSelected((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setDirection(-1);
    setSelected((prev) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );
  };


  useEffect(() => {
  if (selected === null) return;

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") setSelected(null);
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [selected, nextImage, prevImage]);


  // 🔹 helper: centered thumbnails with placeholders
  const getVisibleThumbnails = () => {
    if (selected === null) return [];

    const start = selected - windowSize;
    const end = selected + windowSize;
    const slots = [];

    for (let i = start; i <= end; i++) {
      if (i < 0 || i >= images.length) {
        slots.push(null); // placeholder
      } else {
        slots.push(images[i]);
      }
    }

    return slots.map((src, idx) => ({
      src,
      index: start + idx,
    }));
  };

    // 🔹 Download selected image
  const handleDownload = () => {
    if (selected === null) return;
    const link = document.createElement("a");
   link.href = `${process.env.NEXT_PUBLIC_API_URL}${images[selected].url}`;
    link.download = `image-${selected + 1}.jpg`; // you can change extension
    link.click();
  };

  // 🔹 Share selected image (uses Web Share API if available)
  // 🔹 Share selected image (share actual file if supported)
const handleShare = async () => {
  if (selected === null) return;
const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${images[selected].url}`;

  const absoluteUrl = imageUrl.startsWith("http")
    ? imageUrl
    : window.location.origin + imageUrl;

  try {
    const response = await fetch(absoluteUrl);
    const blob = await response.blob();
    const file = new File([blob], `image-${selected + 1}.jpg`, {
      type: blob.type,
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Check out this image",
        text: "Sharing from gallery",
      });
    } else {
      // fallback: copy link
      await navigator.clipboard.writeText(absoluteUrl);
      alert("Your device does not support sharing files. Link copied instead!");
    }
  } catch (err) {
    console.error("Share failed:", err);
  }
};

const handleSearch = async () => {
if (aiMode || filterMode) {
  setPage(0);
  setImages([]);  // reset to album
  setHasMore(true);
  setAiMode(false);
  setFilterMode(false); // ✅ clear filter state too
  return;
}


  try {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      alert("User not found, please login again.");
      return;
    }

    // 1️⃣ Get logged-in user's embedding
    const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/embedding`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!resUser.ok) {
      alert("Failed to fetch your embedding. Please update profile.");
      return;
    }
    const { embedding: userEmbedding } = await resUser.json();
    const userVector = new Float32Array(userEmbedding);

    // 2️⃣ Fetch all gallery images with faces (paged loop)
    let allGalleryImages = [];
    let page = 0;
    const limit = 200;
    const maxPages = 30; // safeguard, prevents infinite loop

    while (page < maxPages) {
      const resGallery = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery/with-faces?page=${page}&limit=${limit}`
      );
      const { images } = await resGallery.json();

      if (!images || images.length === 0) break;

      allGalleryImages.push(...images);

      if (images.length < limit) break; // last page reached
      page++;
    }

    // 3️⃣ Compare user's embedding with each face descriptor
    const threshold = 0.35;
    const matchedImages = allGalleryImages.filter((img) =>
      img.faces?.some((face) => {
        const faceEmbedding = new Float32Array(face.descriptor.map(Number));
        const distance = window.faceapi.euclideanDistance(userVector, faceEmbedding);
        return distance < threshold;
      })
    );

    // 4️⃣ Update state
    setImages(matchedImages);
    setAiMode(true);

    // 5️⃣ Free memory
    allGalleryImages.length = 0;

  } catch (err) {
    console.error("AI Search failed:", err);
    alert("Failed to perform AI search.");
  } finally {
    setLoading(false);
  }
};


const handleImageSearch = async (file) => {
  try {
    setLoading(true);

    // Read image file into HTMLImageElement
    const img = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new window.Image(); // ✅ forces browser Image
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Detect faces
    const detections = await faceapi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (!detections.length) {
      alert("No faces detected. Please upload a clearer photo.");
      setLoading(false);
      return;
    }

    // Filter valid faces (size > 150px)
    const validFaces = detections.filter(
      (det) =>
        det.detection.box.width >= 150 && det.detection.box.height >= 150
    );

    if (validFaces.length === 0) {
      alert("No valid faces found (faces too small). Try another photo.");
      setLoading(false);
      return;
    }
    if (validFaces.length > 1) {
      alert("Multiple faces detected. Please upload a photo with only you.");
      setLoading(false);
      return;
    }

    // Extract the single valid face embedding
    const userVector = validFaces[0].descriptor;

    // Fetch all gallery images with faces
    let allGalleryImages = [];
    let page = 0;
    const limit = 200;
    const maxPages = 30;

    while (page < maxPages) {
      const resGallery = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery/with-faces?page=${page}&limit=${limit}`
      );
      const { images } = await resGallery.json();

      if (!images || images.length === 0) break;

      allGalleryImages.push(...images);

      if (images.length < limit) break;
      page++;
    }

    // Compare embeddings
    const threshold = 0.35;
    const matchedImages = allGalleryImages.filter((img) =>
      img.faces?.some((face) => {
        const faceEmbedding = new Float32Array(face.descriptor.map(Number));
        const distance = faceapi.euclideanDistance(userVector, faceEmbedding);
        return distance < threshold;
      })
    );

    // Show results
    if (matchedImages.length === 0) {
      alert("Sorry, no matches found.");
    } else {
      setImages(matchedImages);
      setAiMode(true);
      setUploadModalOpen(false); // close modal
    }

    allGalleryImages.length = 0; // free memory
  } catch (err) {
    console.error("Image Search failed:", err);
    alert("Something went wrong while processing the image.");
  } finally {
  setTimeout(() => {
    setLoading(false);        // ✅ remove loader after 1s
    setUploadModalOpen(false); // ✅ safety clear
    setUploadImage(null);      // ✅ reset file
  }, 1000);
}

};

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    trackMouse: true, // allows desktop drag
  });

  return (
   <div className="relative min-h-screen w-full overflow-hidden">
        <Navbar />
{loading && (
  <div className="fixed inset-0 flex items-center justify-center z-[9999]">
    <Loader />
  </div>
)}

      {/* Main Content */}
      <main className="flex-grow relative min-h-screen w-full overflow-hidden pt-24">
  {/* 🔹 Background Image */}
  <Image
    src="/navratri (1).png"   // same background as ProfilePage
    alt="Background"
    fill
    className="blur-lg scale-110 opacity-70 object-cover"
    priority
  />

  {/* 🔹 Frosted Glass Overlay */}
  <div className="absolute inset-0 backdrop-blur-md bg-white/20 z-10"></div>

  {/* 🔹 Content Wrapper */}
  <div className="relative z-20 p-6">

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
<div className="relative flex flex-col justify-between items-center backdrop-blur-xl bg-gradient-to-l from-[#9333ea1a] via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/30 rounded-xl p-6 text-black row-span-2 h-full shadow-lg">
  {/* 🔹 Heading */}
  <h2 className="text-2xl font-bold text-center mb-6">
    Get Your Personalized Gallery
  </h2>

 <p className="text-lg text-gray-600 text-center mt-4">
    AI Powered Search for Face Recognition
  </p>

  {/* 🔹 Push content down so video + button stay at bottom */}
  <div className="flex flex-col items-center mt-auto w-full">
    <video
      src="/Face lock.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full rounded-lg border-0 outline-none"
    />
<button
  onClick={handleSearch}
  className="mt-3 px-4 py-2 w-full bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
>
  {aiMode || filterMode ? "Back to Gallery" : "Search Image using AI"}

</button>


  </div>
</div>

  {/* 🔹 Existing Images */}
  {images.map((src, i) => (
    <div
      key={i}
      className="relative h-68 cursor-pointer overflow-hidden rounded-xl"
      onClick={() => {
        setSelected(i);
        setDirection(0);
      }}
    >
      <Image
  src={`${process.env.NEXT_PUBLIC_API_URL}${src.url}`}
  alt={src.title || `Gallery image ${i + 1}`}
  fill
  loading="lazy"
  className="object-cover hover:scale-105 transition-transform duration-300"
/>

    </div>
  ))}
  <div id="loadMore" className="h-10 col-span-full"></div>

</div>

      {/* Modal Preview */}
      {selected !== null && (
        <div   {...swipeHandlers}  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Close Button (Top Left) */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 left-4 bg-black/60 p-2 rounded-full text-white hover:bg-black/80 z-50"
          >
            <X size={22} />
          </button>

          
          {/* Action Buttons (Top Right) */}
<div className="absolute top-4 right-4 flex gap-3 z-50">
  <button
    onClick={handleDownload}   // 👈 added
    className="bg-black/60 p-2 rounded-full text-white hover:bg-black/80"
  >
    <Download size={20} />
  </button>
  <button
    onClick={handleShare}      // 👈 added
    className="bg-black/60 p-2 rounded-full text-white hover:bg-black/80"
  >
    <Share2 size={20} />
  </button>
  {/* <button className="bg-black/60 p-2 rounded-full text-white hover:bg-black/80">
    <Printer size={20} />
  </button> */}
</div>


          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 z-50"
          >
            <ArrowLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 z-50"
          >
            <ArrowRight size={28} />
          </button>

          {/* Main Image with Slide Animation */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={selected}
                custom={direction}
                initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <Image
  src={`${process.env.NEXT_PUBLIC_API_URL}${images[selected].url}`}
  alt={images[selected].title || "Selected"}
  fill
  className="object-contain"
  priority
/>

              </motion.div>
            </AnimatePresence>
          </div>

        
          {/* Thumbnails Overlay */}
<div   {...swipeHandlers}   className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 px-4 py-4">
  <AnimatePresence initial={false}>
    {getVisibleThumbnails().map(({ src, index }, i) =>
      src ? (
        <motion.div
          key={index}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: selected === index ? 1 : 0.6, scale: selected === index ? 1.15 : 1 }}
          exit={{ opacity: 0, scale: 0.8 }}   // 👈 fade/scale out
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={() => {
            setDirection(index > selected ? 1 : -1);
            setSelected(index);
          }}
          className="relative w-20 h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 rounded-lg overflow-hidden cursor-pointer"
        >
         <Image
  src={`${process.env.NEXT_PUBLIC_API_URL}${src.url}`}
  alt={src.title || `Thumbnail ${index + 1}`}
  fill
  className="object-cover rounded-lg"
/>

        </motion.div>
      ) : (
        <motion.div
          key={`empty-${i}`}
          exit={{ opacity: 0, scale: 0.8 }}  // 👈 smooth remove for placeholders too
          className="w-20 h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 rounded-lg opacity-0"
        />
      )
    )}
  </AnimatePresence>
</div>
        </div>
      )}
    </div>
    </main>
    {/* 🔹 Floating Action Buttons (bottom-right) */}
{selected === null && (
  <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
    {/* Image Search Button */}
<button
  onClick={() => setUploadModalOpen(true)}
  className="p-4 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
>
  <img src="/fcs.gif" alt="Face Search" className="w-12 h-12" />
</button>



    {/* Filter Button */}
   <button
  onClick={() => setFilterModalOpen(true)}
  className="p-4 pl-6 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition"
>
  <Filter className="w-8 h-10"  />
</button>

  </div>
)}


{/* Upload Modal */}
{uploadModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="backdrop-blur-xl bg-gradient-to-tl from-[#9333ea]/40 via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/60 rounded-2xl p-6 w-96 shadow-2xl relative">
      {/* Close modal button */}
      <button
        onClick={() => setUploadModalOpen(false)}
        className="absolute top-2 right-2 text-gray-700 hover:text-black"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Upload an Image
      </h2>

      {/* Upload Input */}
      <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl w-full h-56 overflow-hidden relative bg-white/20 backdrop-blur-md hover:border-blue-500 hover:text-blue-600 transition">
        {!uploadImage ? (
          <>
            <div className="flex flex-col items-center text-gray-600">
              <ImageIcon size={40} className="mb-2 opacity-70" />
              <span className="text-sm">Click to upload or drag and drop</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setUploadImage(file);
                }
              }}
            />
          </>
        ) : (
          <div className="w-full h-full relative">
            <img
              src={URL.createObjectURL(uploadImage)}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* X Button to remove image */}
            <button
              onClick={() => setUploadImage(null)}
              className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        )}
      </label>

      {/* Search Button */}
      <button
  onClick={async () => {
    if (!uploadImage) {
      alert("Please upload an image first.");
      return;
    }
    setUploadModalOpen(false);  // ✅ close modal immediately
    await handleImageSearch(uploadImage);
    setUploadImage(null);       // ✅ reset file input
  }}

        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  </div>
)}

{filterModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="backdrop-blur-xl bg-gradient-to-tl from-purple-500/40 via-pink-200/40 to-blue-300/40 border border-white/60 rounded-2xl p-6 w-96 shadow-2xl relative">
      
      {/* Close Button */}
      <button
        onClick={() => setFilterModalOpen(false)}
        className="absolute top-2 right-2 text-gray-700 hover:text-black"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Apply Filters
      </h2>

      {/* Title Checkboxes */}
      <div className="max-h-40 overflow-y-auto mb-4">
        {titles.map((title) => (
          <label key={title} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={selectedTitles.includes(title)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTitles((prev) => [...prev, title]);
                } else {
                  setSelectedTitles((prev) => prev.filter((t) => t !== title));
                }
              }}
            />
            <span>{title}</span>
          </label>
        ))}
      </div>

      {/* Date Range */}
      <div className="flex flex-col gap-3 mb-4">
        <label>
          From:
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
      </div>

      {/* Submit Button */}
      <button
        onClick={async () => {
          if (selectedTitles.length === 0 && !dateFrom && !dateTo) {
            alert("Please select at least one filter.");
            return;
          }

          setLoading(true);
          setFilterModalOpen(false);

          try {
            const body = { titles: selectedTitles, dateFrom, dateTo };
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/filter`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });

            const data = await res.json();
            setImages(data.images || []);
            setFilterMode(true); // ✅ mark that filters are applied

          } catch (err) {
            console.error("Filter failed", err);
            alert("Failed to apply filters.");
          } finally {
            setTimeout(() => setLoading(false), 2000); // loader +2s
          }
        }}
        className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Apply Filters
      </button>
      <button
  onClick={() => {
    setSelectedTitles([]);
    setDateFrom("");
    setDateTo("");
    setImages([]);      // reset gallery
    setPage(0);
    setHasMore(true);
    setFilterMode(false); // ✅ clear filter mode
    setFilterModalOpen(false);
  }}
  className="mt-2 w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
>
  Clear All
</button>

    </div>
  </div>
)}

<Footer/>    
     </div> 
  );
}

