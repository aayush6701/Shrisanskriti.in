
"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";
import Loader from "./Loader";


const navItems = [
  { id: 1, text: "Home", link: "/" },
  // { id: 2, text: "About", link: "/about" },
  { id: 3, text: "About Us", link: "/#about-us" },
  { id: 4, text: "Our Initiatives", link: "/#initiatives" },
  { id: 5, text: "Blogs", link: "/#blogs" },
  { id: 6, text: "Contact", link: "/#contact" },
];

export default function Navbar({ showLoginModal, setShowLoginModal }) {
  const [openNavbar, setOpenNavbar] = useState(false);
  const toggleNavbar = () => setOpenNavbar((prev) => !prev);
const [user, setUser] = useState(null);
const router = useRouter();
const [loadingAction, setLoadingAction] = useState(null); // "profile" | "logout" | null

// const [showLoginModal, setShowLoginModal] = useState(false);


  // Google login popup hook
  const login = useGoogleLogin({
    flow: "implicit", // use "auth-code" if backend exchange needed
    onSuccess: async (tokenResponse) => {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenResponse.access_token}`,
    },
  });
  const profile = await res.json();

  // send to backend
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  const data = await backendRes.json();

if (data.access_token) {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data));
setUser(data);

  setUser({
  name: data.name,
  email: data.email,
  picture: data.picture, // add this line
  google: true,
});

  router.push("/profile");
}


},

    onError: (error) => console.error("Google Login Failed", error),
  });

  const handleGoogleSignup = useCallback(() => {
    login(); // opens popup
  }, [login]);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

  return (
    <>
    <header className="absolute left-0 top-0 w-full shadow-lg flex items-center h-24 z-20">
      <nav className="relative mx-auto lg:max-w-7xl w-full px-2 sm:px-4 md:px-6 lg:px-2 flex items-center justify-between">
      
        {/* Logo */}
        <div className="flex items-center min-w-max relative ml-0">
          <Link href="/" className="flex items-center gap-x-2 font-semibold">
            <img
              src="/logo2.png"
              alt="Sanskriti Logo"
              className="h-25 w-25 object-contain"
            />
            <span className="text-xl text-gray-900 ">
              Sanskriti
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        {/* --- CENTER: Nav Links --- */}
<div
  className={`fixed inset-x-0 h-[100dvh] lg:h-max top-0 lg:opacity-100 left-0 
  bg-white lg:!bg-transparent py-32 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 
  w-full lg:top-0 lg:relative lg:flex lg:justify-center duration-300 ease-linear
  ${openNavbar ? "" : "-translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0"}`}
>
  <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-900">
    {navItems.map((navItem) => (
      <li key={navItem.id}>
        <Link
          href={navItem.link}
          className="relative py-2.5 text-lg duration-300 ease-linear hover:text-purple-700"
        >
          {navItem.text}
        </Link>
      </li>
    ))}
  </ul>
</div>

{/* --- RIGHT: Auth Buttons --- */}
<div className="hidden lg:flex items-center gap-4 min-w-max">
  {!user ? (
    <>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowLoginModal(true);
        }}
        className="h-10 flex items-center justify-center rounded-full px-5 
        border-2 border-gray-400 text-purple-600"
      >
        Login
      </Link>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleGoogleSignup();
        }}
        className="h-10 flex items-center justify-center rounded-full px-5 
        bg-purple-600 text-white"
      >
        Sign-up
      </Link>
    </>
  ) : (
//     <Link href="/profile" className="h-10 w-10">
//       <img
//   src={ "/gb2.avif"}
//   alt={user.name || "Profile"}
//   className="h-12 w-16 rounded-full border border-gray-300 object-cover"
// />

//     </Link>
//  <Link href="/profile" className="flex items-center justify-center">
//     <User
//       className="h-12 w-12 text-indigo-600 border border-white/60 rounded-full p-1 bg-indigo-300/40 hover:bg-indigo-300/60 transition"
//     />
//   </Link>
<>
  {/* Profile Button */}
  <button
    onClick={async () => {
      setLoadingAction("profile");
      await new Promise((r) => setTimeout(r, 800)); // fake delay
      router.push("/profile");
      setLoadingAction(null);
    }}
    disabled={loadingAction === "profile"}
    className="flex items-center justify-center"
  >
    {loadingAction === "profile" ? (
      <Loader /> // ✅ your Loader component
    ) : user?.picture ? (
      <img
        src={user.picture}
        alt={user.name || "Profile"}
        className="h-12 w-12 rounded-full border border-gray-300 object-cover"
      />
    ) : (
      <User className="h-12 w-12 text-indigo-600 border border-white/60 rounded-full p-1 bg-indigo-300/40" />
    )}
  </button>

  {/* Logout Button */}
  <button
    onClick={async () => {
      setLoadingAction("logout");
      await new Promise((r) => setTimeout(r, 800)); // fake delay
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
      setLoadingAction(null);
    }}
    disabled={loadingAction === "logout"}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
  >
    {loadingAction === "logout" ? (
      <Loader /> // ✅ your Loader component
    ) : (
      <>
        <FaSignOutAlt />
        Logout
      </>
    )}
  </button>
</>
  )}
</div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleNavbar}
            className="outline-none border-l border-l-purple-100  pl-3 relative py-3"
          >
            <span className="sr-only">Toggle navbar</span>
            <span
              aria-hidden="true"
              className={`flex h-0.5 w-6 rounded bg-gray-900  transition duration-300 
              ${openNavbar ? "rotate-45 translate-y-[0.33rem]" : ""}`}
            />
            <span
              aria-hidden="true"
              className={`flex mt-2 h-0.5 w-6 rounded bg-gray-900  transition duration-300 
              ${openNavbar ? "-rotate-45 -translate-y-[0.33rem]" : ""}`}
            />
          </button>
        </div>
      </nav>
      {/* Login Modal */}
{showLoginModal && (
  <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
    <div className="backdrop-blur-xl bg-gradient-to-l from-[#9333ea1a] via-[#e9d5ff]/40 to-[#93c5fd]/40 border border-white/30  rounded-2xl shadow-xl w-full max-w-md p-8 ">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Sign In
      </h3>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-3 bg-white/60 backdrop-blur-xl text-gray-900 font-medium py-2.5 rounded-lg shadow hover:bg-gray-100 transition mb-6"
      >
        <img
          src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-gray-600 text-sm">or continue with email</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Manual Form */}
      <form
  className="space-y-4 text-gray-900"
  onSubmit={async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");

      // ✅ Save token & user in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          address: data.address,
          profilePic: data.profilePic,
          google: false,
        })
      );

      setUser({
  name: data.name,
  email: data.email,
  mobile: data.mobile,
  address: data.address,
  picture: data.profilePic, // rename here for consistency
  google: false,
});


      setShowLoginModal(false);
      router.push("/profile");
    } catch (err) {
      alert(err.message);
    }
  }}
>
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-900">
      Email
    </label>
    <input
      type="email"
      name="email"
      required
      placeholder="Enter email"
      className="w-full rounded-lg px-3 py-2 bg-white/30 backdrop-blur-xl border border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-900">
      Password
    </label>
    <input
      type="password"
      name="password"
      required
      placeholder="Enter password"
      className="w-full rounded-lg px-3 py-2 bg-white/30 backdrop-blur-xl border border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
    />
  </div>
  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={() => setShowLoginModal(false)}
      className="px-4 py-2 rounded-lg border border-white/60 bg-white/60 backdrop-blur-xl hover:bg-white/80 text-gray-900"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
    >
      Login
    </button>
  </div>
</form>

    </div>
  </div>
)}

    </header>
    {loadingAction && (
  <div className="fixed inset-0 flex items-center justify-center  z-[9999]">
    <Loader /> {/* ✅ Your existing Loader component */}
  </div>
)}
</>
  );
}
