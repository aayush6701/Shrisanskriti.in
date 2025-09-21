"use client";
import Link from "next/link"

const FooterItem = ({ text, link }) => {
  return (
    <li>
      <Link href={link}>
        {text}
      </Link>
    </li>
  )
}

const footerItems = [
  { id: 1, text: "Term of services", link: "#" },
  { id: 2, text: "Company", link: "#" },
  { id: 3, text: "Portfolio", link: "#" },
]

const FooterBlock = ({ id }) => {
  return (
    <section id={id} className="pb-12 ">
      <div className="px-2 sm:px-0">
        {/* Gradient Background Box similar to ContentSection right box */}
        <div className="relative mx-auto w-full max-w-6xl py-12 px-6 sm:py-16 sm:px-10 rounded-3xl 
           gradient-motion grade bg-gradient-to-tr from-purple-600/10 via-purple-200/30 to-purple-100 overflow-hidden ">

 <div className="absolute inset-0 animate-shimmer rounded-3xl pointer-events-none"></div>

          {/* Gradient Blobs (lighter, softer than content section) */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-purple-400/40 blur-3xl rounded-full animate-blob"></div>
<div className="absolute -bottom-12 left-0 w-64 h-64 bg-pink-300/40 blur-3xl rounded-full animate-blob [animation-delay:2s]"></div>
<div className="absolute bottom-0 right-1/3 w-52 h-52 bg-indigo-300/40 blur-3xl rounded-full animate-blob [animation-delay:4s]"></div>


          {/* Content */}
          <div className="relative flex flex-col items-center text-center space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
              Let’s work on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500">
                something great
              </span>{" "}
              together
            </h1>
            <p className="text-base text-gray-700 max-w-xl">
              Join us in journey towards a brighter future.Your support can light the path to a better world — one rooted in Shakti, Samman, and Sanskar.
            </p>
            <div className="flex justify-center">
              <Link
                href="https://www.instagram.com/sanskritimahilagroup?igsh=MWh4bW4zbDBvc2lyeg=="
                className="gap-x-3 font-medium bg-purple-600 hover:bg-purple-700 text-white px-8 h-12 rounded-full flex items-center shadow-md"
              >
                Follow Us 
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 20" className="w-5 h-5">
                  <path fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* <div className="bg-gray-100 mt-10 px-4 sm:px-10 md:px-12 lg:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-y-5 py-3 border-t border-t-gray-300">
          <p className="text-gray-700">
            © 2023 unifyUi. All rights reserved
          </p>
          <nav>
            <ul className="flex items-center gap-x-5 text-gray-800">
              {footerItems.map((footerItem) => (
                <FooterItem key={footerItem.id} {...footerItem} />
              ))}
            </ul>
          </nav>
        </div> */}
      {/* </div> */}
    </section>
  )
}

export default FooterBlock
