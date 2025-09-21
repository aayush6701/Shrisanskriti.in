

// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";
import Background from "./components/Background";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Sanskriti NGO",
  description: "Empowering Women, Protecting Nature, Promoting Culture",
  icons: {
  icon: "/logoc.png",
  shortcut: "/logoc.png",
  apple: "/logoc.png",
},

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Background />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
