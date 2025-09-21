
// "use client";

// import { motion } from "framer-motion";
// import { Vortex } from "./ui/Vortex";
// import { CometCard } from "./ui/comet-card"; // ✅ import CometCard
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b from-blue-600 to-pink-400 flex flex-col items-center justify-start">
      
//       {/* Title at top */}
//       <motion.h1
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         whileHover={{ scale: 1.05 }}
//         transition={{ duration: 0.3 }}
//         className="relative flex items-center gap-3 cursor-pointer text-yellow-200 
//                    text-3xl sm:text-5xl font-extrabold mt-8 mb-6 tracking-wide
//                    after:content-[''] after:absolute after:left-0 after:bottom-0 
//                    after:w-0 after:h-[4px] after:bg-gradient-to-r from-yellow-400 
//                    via-orange-500 to-pink-500 hover:after:w-full after:transition-all after:duration-500"
//       >
//         <div className="relative w-20 h-20">
//           <Image src="/dan2.png" alt="Dandiya" fill className="object-contain" />
//         </div>

//         Ongoing Event

//         <div className="relative w-20 h-20">
//           <Image src="/dan1.png" alt="Dandiya" fill className="object-contain" />
//         </div>
//       </motion.h1>

//       {/* Vortex + CometCard side by side */}
//       <div className="relative mx-auto w-[90vw] sm:w-[80vw] h-auto py-12 px-6 sm:py-16 sm:px-10 
//                       rounded-3xl bg-white/10 overflow-hidden shadow-2xl border border-yellow-300/30">
        
//         <div className="relative flex flex-col sm:flex-row items-center justify-center gap-8">
          
//           {/* Left side - Vortex */}
//           <div className="flex-1 flex items-center justify-center text-center">
//             <Vortex particleCount={80} baseHue={1080}>
//               <h1 className="text-white text-4xl sm:text-5xl font-bold">
//                 Namaste ✨
//               </h1>
//             </Vortex>
//           </div>

//           {/* Right side - CometCard */}
//           <CometCard className="p-8 rounded-xl text-center shadow-none bg-transparent border-none">
//             <div className="bg-gradient-to-br from-yellow-200 via-orange-400 to-pink-500 p-8 rounded-xl  ">
//   <h2 className="text-xl sm:text-2xl font-bold text-yellow-200">✨ Dandiya Night ✨</h2>
//   <p className="text-sm sm:text-base text-yellow-100 mt-2">
//     Join us for dance, music, and celebration 🎶
//   </p>
//   </div>
// </CometCard>

//         </div>
//       </div>
//     </main>
//   );
// }














"use client";

import { motion } from "framer-motion";
import { Vortex } from "./ui/Vortex";
import { CometCard } from "./ui/comet-card"; // ✅ import CometCard
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function OngoingEvent({ setShowLoginModal }) {
   const router = useRouter();
  return (
    <main className="min-h-screen pb-10 w-full bg-gradient-to-b from-blue-600 to-pink-400 flex flex-col items-center justify-start ">
      
      {/* Title at top */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative flex items-center gap-3 cursor-pointer text-yellow-200 
                   text-3xl sm:text-5xl font-extrabold mt-8 mb-6 tracking-wide
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[4px] after:bg-gradient-to-r from-yellow-400 
                   via-orange-500 to-pink-500 hover:after:w-full after:transition-all after:duration-500"
      >
        <div className="relative w-20 h-20">
          <Image src="/dan2.png" alt="Dandiya" fill className="object-contain" />
        </div>

        Ongoing Event

        <div className="relative w-20 h-20">
          <Image src="/dan1.png" alt="Dandiya" fill className="object-contain" />
        </div>
      </motion.h1>

      {/* Vortex + CometCard side by side */}
      <div className="relative mx-auto w-[90vw] sm:w-[80vw] h-auto py-12 px-6 sm:py-16 sm:px-10 
                      rounded-3xl bg-white/10 overflow-hidden shadow-2xl border border-yellow-300/30">
         <Vortex particleCount={100} baseHue={1080}></Vortex>
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-8">
          
          {/* Left side - Vortex */}
          {/* Left side - Vortex with text + image */}
<div className="flex-1 flex items-center  text-left relative ">
    
 
    
    <div className="flex flex-col justify-between h-full">
      
      {/* Text Block */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-yellow-300 drop-shadow-md">
           Inviting you To
        </h2>
        <p className="text-lg sm:text-2xl font-semibold text-white mt-2">
          The Grand 3-Day
        </p>
        <p className="text-xl sm:text-3xl font-bold text-pink-200 mt-1">
          Garba & Dandiya Festival 🎉
        </p>
        <p className="text-sm sm:text-base text-pink-100 italic mt-3 max-w-md leading-relaxed">
          Celebrate Navratri with joy, devotion, and togetherness through dance, music & tradition.
        </p>
      </div>

      {/* Image pinned bottom-left on desktop, centered on mobile */}
<div className="relative w-48 h-48 sm:w-72 sm:h-72 mx-auto sm:mx-0 sm:self-start">
  <Image
    src="/gbi-3.png"
    alt="Garba and Dandiya"
    fill
    className="object-contain"
  />
</div>

    </div>
  {/* </Vortex> */}
</div>


          {/* Right side - CometCard */}
         <CometCard className="p-8 rounded-xl w-auto h-auto text-center shadow-none bg-transparent border-none">
            
  <div
    className="p-8 rounded-xl bg-cover bg-center bg-no-repeat flex flex-col items-center text-center"
    style={{ backgroundImage: "url('/navratri (1).png')" }}
  >
    {/* Title + Subtitle (closer together) */}
    <div className="mb-4">
      <h2 className="text-xl sm:text-3xl font-extrabold text-[#54104d] drop-shadow-lg">
        Sanskriti Mahila Group
      </h2>
      <p className="text-l sm:text-2xl font-semibold text-[#54104d]">
        Navratri Raas Garba
      </p>
    </div>

    {/* Time, Dates, Place (closer as a group) */}
    <div className="flex flex-col gap-0 mb-3">
      <p className="text-base sm:text-lg font-semibold text-[#54104d]">
        Time – 7 PM onwards
      </p>
      <p className="text-base sm:text-lg font-semibold text-[#54104d]">
        Starts From 27 Sept – 29 Sept
      </p>
      <p className="text-base sm:text-lg font-semibold text-[#54104d]">
        Place – Sarasvati Shishu Mandir, Pandariya
      </p>
    </div>

    {/* Image */}
    <div className="w-30 h-30 sm:w-46 sm:h-46 mb-6">
      <img
        src="/dan3.png"
        alt="Dandiya"
        className="w-full h-full object-contain"
      />
    </div>

    {/* Button */}
    {/* <button onClick={() => router.push("/register")} className="text-[#54104d] bg-white font-bold px-8 py-3 rounded-full 
                       shadow-lg hover:scale-105 transition duration-300">
      Register Now
    </button> */}
 <button
   onClick={() => {
     const token = localStorage.getItem("token");
     const user = localStorage.getItem("user");
     if (token && user) {
       router.push("/profile");
     } else {
       setShowLoginModal(true); // open Google login modal from Navbar
     }
   }}
   className="text-[#54104d] bg-white font-bold px-8 py-3 rounded-full 
              shadow-lg hover:scale-105 transition duration-300"
 >
   Register Now
 </button>
  </div>
</CometCard>


        </div>
      </div>
    </main>
  );
}


// bg-gradient-to-br  from-yellow-200 via-orange-400 to-pink-500