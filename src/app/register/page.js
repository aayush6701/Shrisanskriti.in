// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Vortex } from "../components/ui/Vortex";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useRouter } from "next/navigation";


// export default function RegisterPage() {
//   const router = useRouter();
//  const [loading, setLoading] = useState(true);

//  useEffect(() => {
//    const token = localStorage.getItem("token");
//    const user = localStorage.getItem("user");
//    if (!(token && user)) {
//      // ❌ Not logged in → redirect to homepage
//      router.push("/");
//    } else {
//      setLoading(false);
//    }
//  }, [router]);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-white">
//         Checking login...
//       </div>
//     );
//   }
//   return (

//     <main className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-indigo-300 via-purple-300 to-blue-200 overflow-hidden">
      
//       {/* Vortex in background */}
//       <div className="absolute inset-0 z-0">
//         <Vortex particleCount={120} baseHue={180} />
//       </div>

//       {/* Form container */}
//       <motion.div
//   initial={{ opacity: 0, y: 40 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6 }}
//   className="relative z-10 w-[90vw] max-w-md bg-white/30 backdrop-blur-xl border border-white/30 
//              shadow-2xl rounded-3xl p-8"
// >
//   {/* Title with side images */}
//   <div className="flex items-center justify-center gap-3 mb-2">
//     <img
//       src="/dan1.png"
//       alt="Dandiya Left"
//       className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
//     />
//     <h1 className="text-2xl sm:text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">
//       Navratra Utsav 2025
//     </h1>
//     <img
//       src="/dan2.png"
//       alt="Dandiya Right"
//       className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
//     />
//   </div>

//   <h4 className="text-l sm:text-xl font-bold text-center mb-6 text-yellow-300 drop-shadow-lg">
//     3 Day Garba & Dandiya Festival
//   </h4>


//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div className="flex flex-col space-y-1">
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Email */}
//           <div className="flex flex-col space-y-1">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Password */}
//           <div className="flex flex-col space-y-1">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter a password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Confirm Password */}
//           <div className="flex flex-col space-y-1">
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               placeholder="Re-enter password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-orange-400/80 text-[#54104d] rounded-lg font-bold 
//                        hover:scale-105 transition duration-300"
//           >
//             Register
//           </button>
//         </form>
//       </motion.div>
//     </main>
    
//   );
// }
