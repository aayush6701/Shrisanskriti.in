// // import Image from "next/image"
 
// // const TestimonialSection = () => {
// //   return (
// //     <section className="py-20 relative overflow-hidden">
// //       {/* Gradient Blobs */}
// //       <div className="absolute inset-0 -z-10">
// //         <div className="absolute w-32 h-32 bg-purple-500/30 blur-3xl rounded-full top-20 left-10" />
// //         <div className="absolute w-32 h-32 bg-pink-400/30 blur-3xl rounded-full bottom-20 right-10" />
// //       </div>

// //       <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 relative">
// //         {/* Header */}
// //         <div className="space-y-4 max-w-2xl">
// //           <span className="rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 px-3 py-1 text-xs font-semibold tracking-wide text-white">
// //             Testimonials
// //           </span>
// //           <h1 className="text-3xl font-bold text-gray-900">
// //             What they say about us
// //           </h1>
// //         </div>

// //         {/* Testimonial Content */}
// //         <div className="grid md:grid-cols-3 lg:grid-cols-2 md:gap-6 relative">
// //           {/* Background image → only visible on desktop */}
// //           <div className="hidden md:block absolute -left-10 md:left-0 inset-y-0 w-3/5 z-0">
// //             <Image 
// //               src="/creative-agency-production.webp" 
// //               alt="woman write" 
// //               width={1800} 
// //               height={1800} 
// //               className="w-full h-full object-cover rounded-2xl" 
// //             />
// //           </div>

// //           <div className="flex col-span-1" />

// //           {/* Card */}
// //           <div className="w-full col-span-1 md:col-span-2 lg:col-span-1 relative flex flex-col gap-8 z-[5] py-10 md:py-14">
// //             <div 
// //               className="relative h-auto rounded-2xl border border-white/30 
// //                          bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 
// //                          backdrop-blur-lg shadow-lg shadow-gray-200/40 overflow-hidden"
// //             >
// //               {/* Mobile background image inside card */}
// //               <div className="absolute inset-0 md:hidden">
// //                 <Image
// //                   src="/creative-agency-production.webp"
// //                   alt="testimonial bg"
// //                   width={1200}
// //                   height={800}
// //                   className="w-full h-full object-cover rounded-2xl"
// //                 />
// //                 {/* Overlay gradient for readability */}
// //                 <div className="absolute inset-0  bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 backdrop-blur-sm rounded-2xl" />
// //               </div>

// //               <div className="relative h-full">
// //                 {/* Flex layout: column on mobile, row on larger screens */}
// //                 <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-center sm:items-start">
// //                   <div className="flex-shrink-0">
// //                     <Image 
// //                       src="/sidebiew.webp" 
// //                       alt="Author Avatar" 
// //                       width={500} 
// //                       height={500} 
// //                       className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-2xl" 
// //                     />
// //                   </div>
// //                   <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 text-center sm:text-left">
// //                     <div className="flex flex-col">
// //                       <span className="text-xl md:text-2xl font-semibold text-black">
// //                         John Doe
// //                       </span>
// //                       <span className="text-gray-700">
// //                         UI Designer
// //                       </span>
// //                     </div>
// //                     <p className="text-gray-800 leading-relaxed">
// //                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
// //                       Quidem non nemo vel corrupti ipsum corporis a, ea eligendi dolor 
// //                       accusantium dignissimos facilis suscipit magnam tenetur reprehenderit 
// //                       praesentium temporibus aspernatur. Rem!
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Navigation Buttons */}
// //             <div className="flex justify-center md:justify-end">
// //               <div className="flex items-center gap-4 w-max p-1.5 rounded-full bg-white shadow-lg shadow-gray-200/30 border border-gray-200/40">
// //                 <button 
// //                   aria-label="prev" 
// //                   className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
// //                     <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
// //                   </svg>
// //                 </button>
// //                 <div className="flex w-max min-w-max items-center">
// //                   <div className="flex items-center gap-1">
// //                     <span className="cursor-pointer w-4 h-2 rounded-full bg-blue-600 transition" />
// //                     <span className="cursor-pointer w-2 h-2 rounded-full bg-gray-400 transition" />
// //                     <span className="cursor-pointer w-2 h-2 rounded-full bg-gray-400 transition" />
// //                   </div>
// //                 </div>
// //                 <button 
// //                   aria-label="next" 
// //                   className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
// //                     <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
// //                   </svg>
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }
// // export default TestimonialSection




// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// const testimonials = [
//   {
//     id: 1,
//     name: "John Doe",
//     role: "UI Designer",
//     avatar: "/sidebiew.webp",
//     bg: "/creative-agency-production.webp",
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem non nemo vel corrupti ipsum corporis a.",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     role: "Product Manager",
//     avatar: "/sidebiew.webp",
//     bg: "/t1.jpg",
//     text: "Dolor sit amet consectetur adipisicing elit. Tempora sapiente repellendus molestias sed, laboriosam dolore.",
//   },
//   {
//     id: 3,
//     name: "Michael Lee",
//     role: "Software Engineer",
//     avatar: "/sidebiew.webp",
//     bg: "/creative-agency-production.webp",
//     text: "Eligendi dolor accusantium dignissimos facilis suscipit magnam tenetur reprehenderit praesentium temporibus aspernatur.",
//   },
// ];

// const TestimonialSection = () => {
//   const [current, setCurrent] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   // detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const prevTestimonial = () => {
//     setDirection(-1);
//     setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
//   };

//   const nextTestimonial = () => {
//     setDirection(1);
//     setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
//   };

//   const active = testimonials[current];

//   // Variants for desktop (card slides, bg fades)
//   const cardVariants = {
//     enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
//     center: { x: 0, opacity: 1 },
//     exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
//   };

//   // Variants for mobile (card+bg slide together)
//   const mobileVariants = {
//     enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
//     center: { x: 0, opacity: 1 },
//     exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
//   };

//   return (
//     <section className="py-20 relative overflow-hidden">
//       {/* Gradient Blobs */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute w-32 h-32 bg-purple-500/30 blur-3xl rounded-full top-20 left-10" />
//         <div className="absolute w-32 h-32 bg-pink-400/30 blur-3xl rounded-full bottom-20 right-10" />
//       </div>

//       <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 relative">
//         {/* Header */}
//         <div className="space-y-4 max-w-2xl">
//           <span className="rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 px-3 py-1 text-xs font-semibold tracking-wide text-white">
//             Testimonials
//           </span>
//           <h1 className="text-3xl font-bold text-gray-900">
//             What they say about us
//           </h1>
//         </div>

//         {/* Testimonial Content */}
//         <div className="grid md:grid-cols-3 lg:grid-cols-2 md:gap-6 relative">
//           {/* Desktop background image (fades only) */}
//           {!isMobile && (
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={active.bg}
//                 custom={direction}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="hidden md:block absolute -left-10 md:left-0 inset-y-0 w-3/5 z-0"
//               >
//                 <Image
//                   src={active.bg}
//                   alt="testimonial bg"
//                   width={1800}
//                   height={1800}
//                   className="w-full h-full object-cover rounded-2xl"
//                 />
//               </motion.div>
//             </AnimatePresence>
//           )}

//           <div className="flex col-span-1" />

//           {/* Card */}
//           <div className="w-full col-span-1 md:col-span-2 lg:col-span-1 relative flex flex-col gap-8 z-[5] py-10 md:py-14">
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={active.id}
//                 custom={direction}
//                 variants={isMobile ? mobileVariants : cardVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.6 }}
//                 className="relative h-auto rounded-2xl border border-white/30 
//                            bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 
//                            backdrop-blur-lg shadow-lg shadow-gray-200/40 overflow-hidden"
//               >
//                 {/* Mobile background */}
//                 {isMobile && (
//                   <div className="absolute inset-0">
//                     <Image
//                       src={active.bg}
//                       alt="testimonial bg"
//                       width={1200}
//                       height={800}
//                       className="w-full h-full object-cover rounded-2xl"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 backdrop-blur-sm rounded-2xl" />
//                   </div>
//                 )}

//                 <div className="relative h-full">
//                   <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-center sm:items-start">
//                     <div className="flex-shrink-0">
//                       <Image
//                         src={active.avatar}
//                         alt={active.name}
//                         width={500}
//                         height={500}
//                         className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-2xl"
//                       />
//                     </div>
//                     <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 text-center sm:text-left">
//                       <div className="flex flex-col">
//                         <span className="text-xl md:text-2xl font-semibold text-black">
//                           {active.name}
//                         </span>
//                         <span className="text-gray-700">{active.role}</span>
//                       </div>
//                       <p className="text-gray-800 leading-relaxed">
//                         {active.text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center md:justify-end">
//               <div className="flex items-center gap-4 w-max p-1.5 rounded-full bg-white shadow-lg shadow-gray-200/30 border border-gray-200/40">
//                 {/* Prev */}
//                 <button
//                   onClick={prevTestimonial}
//                   aria-label="prev"
//                   className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>

//                 {/* Dots */}
//                 <div className="flex w-max min-w-max items-center">
//                   <div className="flex items-center gap-1">
//                     {testimonials.map((t, index) => (
//                       <span
//                         key={t.id}
//                         onClick={() => {
//                           setDirection(index > current ? 1 : -1);
//                           setCurrent(index);
//                         }}
//                         className={`cursor-pointer rounded-full transition-all duration-300 ${
//                           current === index
//                             ? "w-4 h-2 bg-purple-600"
//                             : "w-2 h-2 bg-purple-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Next */}
//                 <button
//                   onClick={nextTestimonial}
//                   aria-label="next"
//                   className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//               <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />

//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;















// import Image from "next/image"
 
// const TestimonialSection = () => {
//   return (
//     <section className="py-20 relative overflow-hidden">
//       {/* Gradient Blobs */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute w-32 h-32 bg-purple-500/30 blur-3xl rounded-full top-20 left-10" />
//         <div className="absolute w-32 h-32 bg-pink-400/30 blur-3xl rounded-full bottom-20 right-10" />
//       </div>

//       <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 relative">
//         {/* Header */}
//         <div className="space-y-4 max-w-2xl">
//           <span className="rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 px-3 py-1 text-xs font-semibold tracking-wide text-white">
//             Testimonials
//           </span>
//           <h1 className="text-3xl font-bold text-gray-900">
//             What they say about us
//           </h1>
//         </div>

//         {/* Testimonial Content */}
//         <div className="grid md:grid-cols-3 lg:grid-cols-2 md:gap-6 relative">
//           {/* Background image → only visible on desktop */}
//           <div className="hidden md:block absolute -left-10 md:left-0 inset-y-0 w-3/5 z-0">
//             <Image 
//               src="/creative-agency-production.webp" 
//               alt="woman write" 
//               width={1800} 
//               height={1800} 
//               className="w-full h-full object-cover rounded-2xl" 
//             />
//           </div>

//           <div className="flex col-span-1" />

//           {/* Card */}
//           <div className="w-full col-span-1 md:col-span-2 lg:col-span-1 relative flex flex-col gap-8 z-[5] py-10 md:py-14">
//             <div 
//               className="relative h-auto rounded-2xl border border-white/30 
//                          bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 
//                          backdrop-blur-lg shadow-lg shadow-gray-200/40 overflow-hidden"
//             >
//               {/* Mobile background image inside card */}
//               <div className="absolute inset-0 md:hidden">
//                 <Image
//                   src="/creative-agency-production.webp"
//                   alt="testimonial bg"
//                   width={1200}
//                   height={800}
//                   className="w-full h-full object-cover rounded-2xl"
//                 />
//                 {/* Overlay gradient for readability */}
//                 <div className="absolute inset-0  bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 backdrop-blur-sm rounded-2xl" />
//               </div>

//               <div className="relative h-full">
//                 {/* Flex layout: column on mobile, row on larger screens */}
//                 <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-center sm:items-start">
//                   <div className="flex-shrink-0">
//                     <Image 
//                       src="/sidebiew.webp" 
//                       alt="Author Avatar" 
//                       width={500} 
//                       height={500} 
//                       className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-2xl" 
//                     />
//                   </div>
//                   <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 text-center sm:text-left">
//                     <div className="flex flex-col">
//                       <span className="text-xl md:text-2xl font-semibold text-black">
//                         John Doe
//                       </span>
//                       <span className="text-gray-700">
//                         UI Designer
//                       </span>
//                     </div>
//                     <p className="text-gray-800 leading-relaxed">
//                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
//                       Quidem non nemo vel corrupti ipsum corporis a, ea eligendi dolor 
//                       accusantium dignissimos facilis suscipit magnam tenetur reprehenderit 
//                       praesentium temporibus aspernatur. Rem!
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center md:justify-end">
//               <div className="flex items-center gap-4 w-max p-1.5 rounded-full bg-white shadow-lg shadow-gray-200/30 border border-gray-200/40">
//                 <button 
//                   aria-label="prev" 
//                   className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//                     <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//                 <div className="flex w-max min-w-max items-center">
//                   <div className="flex items-center gap-1">
//                     <span className="cursor-pointer w-4 h-2 rounded-full bg-blue-600 transition" />
//                     <span className="cursor-pointer w-2 h-2 rounded-full bg-gray-400 transition" />
//                     <span className="cursor-pointer w-2 h-2 rounded-full bg-gray-400 transition" />
//                   </div>
//                 </div>
//                 <button 
//                   aria-label="next" 
//                   className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//                     <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
// export default TestimonialSection




"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "International Women's Day",
    role: "",
    avatar: "/Logo SMG.png",
    bg: "/n1-min.png",
    text: "This celebration is our way of acknowledging the strength, achievements, and contributions of women of our society",
  },
  {
    id: 2,
    name: "Sawan Milan Samaroh",
    role: "",
    avatar: "/Logo SMG.png",
    bg: "/n2-min.png",
    text: "The event was not just a celebration, but also an opportunity to bring our community together, strengthen bonds of unity, and share moments of joy.",
  },
  {
    id: 3,
    name: "Environment Conservation",
    role: "",
    avatar: "/Logo SMG.png",
    bg: "/n3-min.png",
    text: "we aimed to contribute to a greener and healthier environment. This initiative not only strengthened our bond with nature but also united the community in a meaningful way.",
  },
];

const TestimonialSection = ({ id }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[current];

  // Variants for desktop (card slides, bg fades)
  const cardVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  // Variants for mobile (card+bg slide together)
  const mobileVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id={id} className="py-20 relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-32 h-32 bg-purple-500/30 blur-3xl rounded-full top-20 left-10" />
        <div className="absolute w-32 h-32 bg-pink-400/30 blur-3xl rounded-full bottom-20 right-10" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 relative">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 px-3 py-1 text-xs font-semibold tracking-wide text-white">
            Blogs
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            What they say about us
          </h1>
        </div>

        {/* Testimonial Content */}
        <div className="grid md:grid-cols-3 lg:grid-cols-2 md:gap-6 relative">
          {/* Desktop background image (fades only) */}
          {/* Desktop background image with blurred fill */}
{!isMobile && (
  <AnimatePresence mode="wait" custom={direction}>
    <motion.div
      key={active.bg}
      custom={direction}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden md:block absolute -left-10 md:left-0 inset-y-0 w-3/5 z-0 rounded-2xl overflow-hidden"
    >
      {/* Blurred background */}
      <Image
        src={active.bg}
        alt="testimonial bg blurred"
        fill
        className="object-cover blur-2xl scale-110"
      />

      {/* Actual contained image */}
      <Image
        src={active.bg}
        alt="testimonial bg"
        fill
        className="object-contain"
      />
    </motion.div>
  </AnimatePresence>
)}


          <div className="flex col-span-1" />

          {/* Card */}
          <div className="w-full col-span-1 md:col-span-2 lg:col-span-1 relative flex flex-col gap-8 z-[5] py-10 md:py-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={isMobile ? mobileVariants : cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
                className="relative h-auto rounded-2xl border border-white/30 
                           bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 
                           backdrop-blur-lg shadow-lg shadow-gray-200/40 overflow-hidden"
              >
                {/* Mobile background */}
                {isMobile && (
                  <div className="absolute inset-0">
                    <Image
                      src={active.bg}
                      alt="testimonial bg"
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/50 via-purple-200/30 to-purple-600/10 backdrop-blur-sm rounded-2xl" />
                  </div>
                )}

                <div className="relative h-full">
                  <div className="flex flex-col sm:flex-row gap-4 pl-3 md:gap-6 items-center sm:items-start">
                    <div className="flex-shrink-0">
                      <Image
                        src={active.avatar}
                        alt={active.name}
                        width={500}
                        height={500}
                        className="w-24 h-24 pl-2 pt-2 mt-10 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-2xl"
                      />
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 text-center sm:text-left">
                      <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-semibold text-black">
                          {active.name}
                        </span>
                        <span className="text-gray-700">{active.role}</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed">
                        {active.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center md:justify-end">
              <div className="flex items-center gap-4 w-max p-1.5 rounded-full bg-white shadow-lg shadow-gray-200/30 border border-gray-200/40">
                {/* Prev */}
                <button
                  onClick={prevTestimonial}
                  aria-label="prev"
                  className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex w-max min-w-max items-center">
                  <div className="flex items-center gap-1">
                    {testimonials.map((t, index) => (
                      <span
                        key={t.id}
                        onClick={() => {
                          setDirection(index > current ? 1 : -1);
                          setCurrent(index);
                        }}
                        className={`cursor-pointer rounded-full transition-all duration-300 ${
                          current === index
                            ? "w-4 h-2 bg-purple-600"
                            : "w-2 h-2 bg-purple-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Next */}
                <button
                  onClick={nextTestimonial}
                  aria-label="next"
                  className="outline-none text-gray-700 transition hover:text-blue-600 p-2 md:p-2.5 hover:bg-blue-100 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />

                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;















