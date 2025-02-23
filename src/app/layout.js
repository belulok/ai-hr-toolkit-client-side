import "./globals.css";
import Image from "next/image";
import React from "react";
import Link from "next/link"; // 1) import Link

export const metadata = {
  title: "AI HR Toolkit",
  description: "AI-powered HR tools for job matching and analysis",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">

          {/* -- The Global Nav -- */}
          <nav className="bg-black/50 backdrop-blur-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">

                {/* 2) Use Link instead of <a> */}
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="AI HR Toolkit Logo"
                    width={40}
                    height={40}
                  />
                  <span className="ml-2 text-xl font-regular text-white">
                    AI HR Toolkit
                  </span>
                </Link>

              </div>
            </div>
          </nav>

          {children}

          <footer className="bg-black/50 backdrop-blur-lg border-t border-gray-800 py-4">
            <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sebastian Belulok. All rights reserved.
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}
