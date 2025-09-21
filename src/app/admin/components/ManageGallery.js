"use client";

import React, { useState, useEffect } from "react";
import { FaTrash, FaUpload, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as faceapi from "face-api.js";
import axios from "axios";


export default function ManageGallery() {
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "", images: [] });
  const [processing, setProcessing] = useState(false);
// State for preview modal
const [previewImage, setPreviewImage] = useState(null);
const [matches, setMatches] = useState({});

  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  // ✅ Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      console.log("✅ Face-api models loaded");
    };
    loadModels();
  }, []);


 useEffect(() => {
   const handleKeyDown = (e) => {
     if (albums.length === 0) return;
     if (e.key === "ArrowLeft" && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
     } else if (
       e.key === "ArrowRight" &&
       currentImageIndex < albums[0].images.length - 1
    ) {
       setCurrentImageIndex((prev) => prev + 1);
     }
   };

   window.addEventListener("keydown", handleKeyDown);
   return () => window.removeEventListener("keydown", handleKeyDown);
 }, [albums, currentImageIndex]);



  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 10) {
      alert("⚠️ You can upload a maximum of 10 images.");
      return;
    }
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleRemoveImageBeforeProcess = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // ✅ Process images
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    let processedImages = [];

    for (const file of formData.images) {
      const img = await faceapi.bufferToImage(file);
      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();

      let faces = [];
      for (const det of detections) {
        const box = det.detection.box;

        // ❌ Reject too small faces
        if (box.width < 200 || box.height < 200) continue;

        // ✅ Crop with padding
        const padding = 20;
        const x = Math.max(0, box.x - padding);
        const y = Math.max(0, box.y - padding);
        const w = Math.min(img.width - x, box.width + padding * 2);
        const h = Math.min(img.height - y, box.height + padding * 2);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
        const croppedUrl = canvas.toDataURL("image/jpeg");

        faces.push({
          image: croppedUrl,
          descriptor: det.descriptor,
          score: det.detection.score,
        });
      }

      faces.sort((a, b) => b.score - a.score);

      processedImages.push({
        id: Date.now() + Math.random(),
        original: URL.createObjectURL(file),
        faces,
        type: faces.length <= 1 ? "Single" : "Group", // auto mark
      });
    }

    setAlbums([
      ...albums,
      {
        id: Date.now(),
        title: formData.title,
        date: formData.date,
        images: processedImages,
      },
    ]);
    setFormData({ title: "", date: "", images: [] });
    setProcessing(false);
  };

  // ✅ Remove a single face
  const handleRemoveFace = (albumId, imgIndex, faceIndex) => {
    setAlbums((prev) =>
      prev.map((alb) =>
        alb.id === albumId
          ? {
              ...alb,
              images: alb.images.map((img, i) =>
                i === imgIndex
                  ? { ...img, faces: img.faces.filter((_, fi) => fi !== faceIndex) }
                  : img
              ),
            }
          : alb
      )
    );
  };

  // ✅ Remove whole image with faces
const handleRemoveProcessedImage = (albumId, imgIndex) => {
  setAlbums((prev) =>
    prev.map((alb) => {
      if (alb.id === albumId) {
        const newImages = alb.images.filter((_, i) => i !== imgIndex);

        // Adjust current index if needed
        if (imgIndex === currentImageIndex && currentImageIndex > 0) {
          setCurrentImageIndex(currentImageIndex - 1);
        } else if (currentImageIndex >= newImages.length) {
          setCurrentImageIndex(newImages.length - 1);
        }

        return { ...alb, images: newImages };
      }
      return alb;
    })
  );
};


  // ✅ Change Single/Group type manually
  const handleTypeChange = (albumId, imgIndex, newType) => {
    setAlbums((prev) =>
      prev.map((alb) =>
        alb.id === albumId
          ? {
              ...alb,
              images: alb.images.map((img, i) =>
                i === imgIndex ? { ...img, type: newType } : img
              ),
            }
          : alb
      )
    );
  };


  // ✅ Check if form is valid
  const isFormValid =
    formData.title.trim() !== "" &&
    formData.date.trim() !== "" &&
    formData.images.length > 0;

const handleSearchMatches = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/embeddings`);
    const data = await res.json();
    const dbEmbeddings = data.embeddings || [];

    let newMatches = {};

    albums.forEach((album) => {
      album.images.forEach((img, imgIndex) => {
        img.faces.forEach((face, faceIndex) => {
          // Ensure face.descriptor is a Float32Array
          const queryEmbedding = new Float32Array(Object.values(face.descriptor));

          dbEmbeddings.forEach((dbItem) => {
            if (!dbItem.embedding) return;

            // Convert stored embedding safely
            const dbEmbedding = new Float32Array(dbItem.embedding.map(Number));

            // Euclidean distance
            const distance = faceapi.euclideanDistance(queryEmbedding, dbEmbedding);

            // ✅ Try tighter threshold
            if (distance < 0.35) {
              if (!newMatches[`${album.id}-${imgIndex}-${faceIndex}`]) {
                newMatches[`${album.id}-${imgIndex}-${faceIndex}`] = [];
              }
              newMatches[`${album.id}-${imgIndex}-${faceIndex}`].push(
                `${process.env.NEXT_PUBLIC_API_URL}${dbItem.profilePic}`
              );
            }
          });
        });
      });
    });

    setMatches(newMatches);
  } catch (err) {
    console.error("❌ Error fetching embeddings:", err);
  }
};

const handleSaveAlbum = async (album) => {
  try {
    const formData = new FormData();
    formData.append("title", album.title);
    formData.append("date", album.date);

    for (const img of album.images) {
      // Load the image as Blob
      const response = await fetch(img.original);
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);

      let { width, height } = imageBitmap;
      let scale = 1;

      if (width > 2100 || height > 2100) {
        scale = 2100 / Math.max(width, height);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

      // Default compression
      let quality = 0.92;
      let compressedBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality)
      );

      if (compressedBlob.size > 1_000_000) {
        // Retry with stronger compression
        compressedBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", 0.8)
        );
      }

      const file = new File([compressedBlob], `album_${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      formData.append("images", file);

      const meta = {
        type: img.type,
        faces: img.faces.map((f) => ({
          descriptor: Array.from(f.descriptor), // convert Float32Array → JSON
        })),
      };

      formData.append("metadata", JSON.stringify(meta));
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/save`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to save album");
    const data = await res.json();

    alert("✅ Album saved successfully!");
    console.log("Saved:", data);
   // 🔥 Clear album from state after save
   setAlbums((prev) => prev.filter((a) => a.id !== album.id));
   setFormData({ title: "", date: "", images: [] });
   setCurrentImageIndex(0);
  } catch (err) {
    console.error("❌ Error saving album:", err);
    alert("Failed to save album.");
  }
};


  return (
    <div className="rounded-xl bg-white/20 backdrop-blur-lg p-6 shadow-lg border border-white/30 space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
        <h2 className="text-2xl font-bold text-gray-900">Add New Album</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full rounded-lg px-3 py-2 bg-white/40 border border-gray-300 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full rounded-lg px-3 py-2 bg-white/40 border border-gray-300 text-sm sm:text-base"
          />
        </div>

        {/* Upload box */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Images (max 10)
          </label>
          <div className="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-indigo-400 rounded-lg p-6 bg-white/30 cursor-pointer hover:bg-indigo-50 transition">
            <FaUpload className="text-indigo-500 text-3xl mb-2" />
            <p className="text-gray-700 font-medium">Click to Upload</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {formData.images.length > 0 && (
           <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

              {formData.images.map((file, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shadow-md bg-white border"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImageBeforeProcess(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Start Processing */}
        <button
          type="submit"
          disabled={!isFormValid || processing}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isFormValid && !processing
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {processing ? "Processing…" : "Start Processing"}
        </button>
      </form>

      {/* Album Display */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Albums</h3>
        {albums.length === 0 ? (
          <p className="text-gray-700">No albums added yet.</p>
        ) : (
          albums.map((album) => {
            const img = album.images[currentImageIndex] || {};
            return (
              <div
                key={album.id}
                className="rounded-lg bg-white/40 p-4 shadow-md space-y-4"
              >
                <h4 className="font-semibold text-gray-900">{album.title}</h4>
                <p className="text-sm text-gray-600">{album.date}</p>

<button
  onClick={handleSearchMatches}
  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
>
  🔍 Search Matches
</button>

<button
  onClick={() => handleSaveAlbum(album)}
  className="mt-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700"
>
  💾 Save Album
</button>

                {/* Original Image with nav + remove */}
                {album.images.length > 0 && (
                  <div className="relative w-full flex justify-center">
                    <img
                      src={img.original}
                      alt="Original"
                    className="max-h-[50vh] sm:max-h-96 w-full object-contain rounded-lg shadow cursor-pointer hover:scale-105 transition"     onClick={() => setPreviewImage(img.original)} // open modal
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveProcessedImage(album.id, currentImageIndex)
                      }
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 text-xs shadow-md"
                    >
                      <FaTrash />
                    </button>

                    {album.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(currentImageIndex - 1)
                          }
                          disabled={currentImageIndex === 0}
                          className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                            currentImageIndex === 0
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-black/50 text-white hover:bg-black/70"
                          }`}
                        >
                          <FaArrowLeft />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(currentImageIndex + 1)
                          }
                          disabled={currentImageIndex === album.images.length - 1}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                            currentImageIndex === album.images.length - 1
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-black/50 text-white hover:bg-black/70"
                          }`}
                        >
                          <FaArrowRight />
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Mark Single/Group */}
             <div className="flex items-center gap-3">
  <span className="text-gray-700 font-medium">Type:</span>

  <select
    value={img.type}
    onChange={(e) =>
      handleTypeChange(album.id, currentImageIndex, e.target.value)
    }
    className={`px-3 py-1 rounded-full text-white font-bold cursor-pointer appearance-none ${
      img.type === "Single" ? "bg-green-600" : "bg-blue-600"
    }`}
  >
    <option
      value="Single"
      className="bg-white text-black font-medium"
    >
      Single
    </option>
    <option
      value="Group"
      className="bg-white text-black font-medium"
    >
      Group
    </option>
  </select>
</div>


                {/* Faces */}
                <div className="flex gap-4 overflow-x-auto">
                 {img.faces?.length > 0 ? (
  img.faces.map((face, idx) => (
    <div
      key={idx}
      className="relative flex-shrink-0 w-24 sm:w-40 h-auto rounded-lg overflow-hidden shadow-md"
    >
      <img
        src={face.image}
        alt={`Face ${idx}`}
        className="w-40 h-40 object-cover rounded-md"
      />
      <button
        type="button"
        onClick={() =>
          handleRemoveFace(album.id, currentImageIndex, idx)
        }
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
      >
        <FaTrash />
      </button>

      {/* ✅ Show matches if found */}
      {matches[`${album.id}-${currentImageIndex}-${idx}`]?.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-semibold text-gray-700">Matches:</p>
          <div className="flex gap-2 overflow-x-auto">
            {matches[`${album.id}-${currentImageIndex}-${idx}`].map((m, i) => (
              <img
                key={i}
                src={m}
                alt="Match"
                className="w-16 h-16 rounded-md object-cover border-2 border-green-500"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  ))
) : (
  <p className="text-gray-600">No valid faces for this image.</p>
)}

                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Zoom Preview Modal */}
{previewImage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
    <img
      src={previewImage}
      alt="Zoom Preview"
      className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
    />
    <button
      onClick={() => setPreviewImage(null)}
      className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow"
    >
      Close
    </button>
  </div>
)}

    </div>
  );
}


