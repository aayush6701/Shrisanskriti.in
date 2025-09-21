// "use client";
// import { useState } from "react";
// import Link from "next/link";


// const FooterItem = ({ text, link }) => {
//   return (
//     <li>
//       <Link
//         href={link}
//         className="duration-200 hover:text-blue-600"
//       >
//         {text}
//       </Link>
//     </li>
//   )
// }


// const FooterBlockItem = ({ title, items }) => {
//   const [email, setEmail] = useState("");
// const [loading, setLoading] = useState(false);
// const [success, setSuccess] = useState("");

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setSuccess("");

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     if (!res.ok) throw new Error("Failed to send message");

//     setEmail("");
//     setSuccess("✅ Thank you! Your message has been saved.");
//   } catch (err) {
//     alert(err.message);
//   } finally {
//     setLoading(false);
//   }
// };



//   return (
//     <div className="rounded-2xl bg-white/40 backdrop-blur-md shadow-lg p-6 h-full flex flex-col justify-between">
//       <h1 className="text-lg font-semibold text-gray-900 mb-4">{title}</h1>
//       <ul className="space-y-3">
//         {items.map((item) => (
//           <FooterItem key={item.id} {...item} />
//         ))}
//       </ul>
//     </div>
//   )
// }

// const footerBlocks = [
//   {
//     id: 1,
//     title: "Links",
//     items: [
//       { id: 1, text: "About", link: "#" },
//       { id: 2, text: "Career", link: "#" },
//       { id: 3, text: "Contact", link: "#" },
//       { id: 4, text: "Associates", link: "#" },
//       { id: 5, text: "Services", link: "#" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Resources",
//     items: [
//       { id: 1, text: "Blog", link: "#" },
//       { id: 2, text: "Privacy", link: "#" },
//       { id: 3, text: "Terms", link: "#" },
//       { id: 4, text: "FAQ", link: "#" },
//       { id: 5, text: "Links", link: "#" },
//     ],
//   },
// ]

// const Footer = () => {
//   return (
//     <footer className="text-gray-700 bg-gradient-to-tr from-indigo-300 via-purple-200 to-blue-200">
//       <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-20">
        
//         {/* Brand / About Section */}
//         <div className="col-span-2">
//           <div className="rounded-2xl bg-white/40 backdrop-blur-md shadow-lg p-6 h-full">
//             <Link href="#">
//               <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-800 to-indigo-400 font-bold text-2xl">
//                 Sanskriti
//               </span>
//               {/* Unify-Ui */}
//             </Link>
//             <p className="mt-4">
//              We are Sanskriti - Shakti · Samman · Sanskar . As our moto signify  our name and motto signify culture, strength, respect, and values. Our works are dedicated to pass on a bright future with preserved tradition to next generations. 
//             </p>
//           </div>
//         </div>

//         {/* Dynamic Blocks */}
//         {footerBlocks.map((footerBlock) => (
//           <FooterBlockItem key={footerBlock.id} {...footerBlock} />
//         ))}

//         {/* Newsletter Section */}
//         <div className="col-span-2 ">
//           <div className="rounded-2xl bg-white/40 backdrop-blur-md shadow-lg pt-6 pb-12 pl-6 pr-6 h-full">
//             <h1 className="text-lg font-semibold text-gray-900 mb-4">Send Email</h1>
//             <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
//   <input
//     type="email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     placeholder="Enter your email"
//     required
//     className="px-5 py-2.5 rounded-md outline-none flex-1 bg-white"
//   />
//   <button
//     type="submit"
//     disabled={loading}
//     className="outline-none w-full py-2.5 px-5 sm:w-max bg-blue-600 text-white rounded-md flex items-center justify-center"
//   >
//     {loading ? "Sending..." : "Send"}
//   </button>
// </form>
// {success && <p className="text-green-600 mt-3">{success}</p>}

//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
//         <div className="w-full flex flex-col md:flex-row gap-4 items-center sm:justify-between py-3 border-t border-white/40 text-gray-700">
//           <div className="flex text-center sm:text-left sm:min-w-max">
//             <p> © 2025 Sanskriti Mahila Group. All right reserved </p>
//           </div>
//           <div className="flex justify-center sm:justify-end w-full gap-3">
//             {/* social links */}
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer


"use client";
import { useState } from "react";
import Link from "next/link";

const FooterItem = ({ text, link }) => {
  return (
    <li>
      <Link
        href={link}
        className="duration-200 hover:text-blue-600"
      >
        {text}
      </Link>
    </li>
  );
};

const FooterBlockItem = ({ title, items }) => {
  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur-md shadow-lg p-6 h-full flex flex-col justify-between">
      <h1 className="text-lg font-semibold text-gray-900 mb-4">{title}</h1>
      <ul className="space-y-3">
        {items.map((item) => (
          <FooterItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

const footerBlocks = [
  {
    id: 1,
    title: "Links",
    items: [
      { id: 1, text: "About", link: "#" },
      { id: 2, text: "Career", link: "#" },
      { id: 3, text: "Contact", link: "#" },
      { id: 4, text: "Associates", link: "#" },
      { id: 5, text: "Services", link: "#" },
    ],
  },
  {
    id: 2,
    title: "Resources",
    items: [
      { id: 1, text: "Blog", link: "#" },
      { id: 2, text: "Privacy", link: "#" },
      { id: 3, text: "Terms", link: "#" },
      { id: 4, text: "FAQ", link: "#" },
      { id: 5, text: "Links", link: "#" },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setEmail("");
      setSuccess("✅ Thank you! Your message has been saved. We will contact you soon.");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="text-gray-700 bg-gradient-to-tr from-indigo-300 via-purple-200 to-blue-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-20">
        
        {/* Brand / About Section */}
        <div className="col-span-2">
          <div className="rounded-2xl bg-white/40 backdrop-blur-md shadow-lg p-6 h-full">
            <Link href="#">
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-800 to-indigo-400 font-bold text-2xl">
                Sanskriti
              </span>
            </Link>
            <p className="mt-4">
              We are Sanskriti - Shakti · Samman · Sanskar. As our motto signifies, our name and values represent culture, strength, respect, and traditions. Our work is dedicated to passing on a bright future with preserved heritage to the next generations.
            </p>
          </div>
        </div>

        {/* Dynamic Blocks */}
        {footerBlocks.map((footerBlock) => (
          <FooterBlockItem key={footerBlock.id} {...footerBlock} />
        ))}

        {/* Newsletter Section */}
        <div className="col-span-2">
          <div className="rounded-2xl bg-white/40 backdrop-blur-md shadow-lg pt-6 pb-12 pl-6 pr-6 h-full">
            <h1 className="text-lg font-semibold text-gray-900 mb-4">Talk Us</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-5 py-2.5 rounded-md outline-none flex-1 bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="outline-none w-full py-2.5 px-5 sm:w-max bg-blue-600 text-white rounded-md flex items-center justify-center"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
            {success && <p className="text-green-600 mt-3">{success}</p>}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="w-full flex flex-col md:flex-row gap-4 items-center sm:justify-between py-3 border-t border-white/40 text-gray-700">
          <div className="flex text-center sm:text-left sm:min-w-max">
            <p> © 2025 Sanskriti Mahila Group. All rights reserved </p>
          </div>
          <div className="flex justify-center sm:justify-end w-full gap-3">
            {/* social links */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
