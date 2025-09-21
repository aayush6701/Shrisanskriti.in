"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ user, setShowLoginModal }) {
  return (
    <section className="min-h-max bg-purple-50 relative">
      {/* Background glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br from-purple-300 opacity-90 blur-lg" />
      <div className="w-full flex items-center relative">
        <div className="absolute top-3/11 left-1/2  -translate-y-1/2 -translate-x-1/2 w-4/9 aspect-[3/0.5] bg-gradient-to-br from-purple-600/50 to-pink-400 rounded-full opacity-50 blur-2xl" />

        {/* Hero Content */}
        <div className="min-h-max relative mx-auto pt-40 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-10">
          {/* <Link
            href="#"
            className="flex items-center gap-x-2 text-gray-900 mx-auto w-max px-2 pr-1 py-1 rounded-full bg-gray-100 border border-gray-300"
          >
            mySto v2.1 is out
            <span className="px-1 rounded-full bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link> */}

          <h1 className="text-gray-900 mx-auto max-w-5xl font-semibold text-3xl sm:text-4xl lg:text-5xl">
            Welcome to Sanskriti Mahila Group!

          </h1>

          <p className="text-gray-700 font-semibold mx-auto max-w-2xl">
            We are a women-led NGO dedicated to celebrating India’s rich culture and festivals, while also working for environmental protection and community welfare. Through art, traditions, and seva, we bring people together to create harmony, joy, and a sustainable future.

          </p>


          {/* Email Form */}
          {/* <div className="flex sm:flex-row flex-col gap-5 w-full mx-auto max-w-lg">
            <form
              action="#"
              className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-600 shadow-lg shadow-gray-200/20
                border border-gray-200 bg-gray-100 rounded-full ease-linear 
                focus-within:bg-white focus-within:border-purple-600"
            >
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full py-3 outline-none bg-transparent"
              />
              <button
                className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                  after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:top-0 after:left-0 after:bg-purple-700 hover:after:opacity-100 hover:after:scale-[2.5] bg-purple-600 border-transparent hover:border-[#172554]"
              >
                <span className="hidden sm:flex relative z-[5]">Sign up</span>
                <span className="flex sm:hidden relative z-[5]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </span>
              </button>
            </form>
          </div> */}

{/* Join Us Button */}
<div className="flex justify-center w-full mx-auto max-w-lg">
  <button
     onClick={() => {
            if (user) {
              // ✅ Already logged in → redirect to profile
              window.location.href = "/profile";
            } else {
              // ❌ Not logged in → show login modal
              setShowLoginModal(true);
            }
          }}
    className="flex text-white justify-center items-center w-max px-10 h-12 rounded-full 
               bg-purple-600 border border-transparent
               transition-transform duration-300 ease-out
               hover:scale-110"
  >
    <span className="relative z-[5] font-medium">Join Us</span>
  </button>
</div>


          {/* Hero Image */}
          {/* <div className="mb-6 mx-auto max-w-6xl rounded-t-2xl aspect-[5/2.3] overflow-hidden px-2 pt-2 bg-gradient-to-tr from-indigo-300 via-purple-200 to-pink-200 
                  ">
            <Image
              src="/gp.jpg"
              width={1440}
              height={1024}
              alt="product image"
              className="rounded-t-lg object-contain w-full h-auto"
            />
          </div> */}

{/* Hero Image with blurred glowing gradient strip */}
<div className="mb-6 mx-auto max-w-6xl relative p-6 rounded-2xl overflow-hidden 
                group transition-all duration-500 ease-out shadow-lg hover:shadow-xl hover:-translate-y-2">

  {/* Blurred gradient strip */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl
                  from-indigo-300 via-purple-200 to-pink-400 
                blur-2xl" />

  {/* Image itself */}
  <Image
    src="/gp.jpg"
    width={1440}
    height={1024}
    alt="product image"
    className="rounded-2xl object-contain w-full h-auto relative 
               transition-transform duration-700 ease-out group-hover:-translate-y-1"
  />
</div>
        </div>
      </div>
    </section>
  );
}
