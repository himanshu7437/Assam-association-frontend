"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "FACILITIES", href: "/facilities" },
  { name: "NOTICES", href: "/notices" },
  { name: "PUBLICATIONS", href: "/publications" },
  { name: "GALLERY", href: "/gallery" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-purple-600 to-green-500",
        scrolled ? "py-2 shadow-md backdrop-blur-md" : "py-4"
      )}
    >
      {/* 🔥 Wider container for better spacing */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={"https://res.cloudinary.com/disniu3hn/image/upload/v1775053126/AAD_LOGO_red_qwrjb9.svg"}
            alt="Assam Association Delhi Logo"
            width={42}
            height={42}
            className="object-contain"
            style={{ filter: "brightness(0) invert(1)", width: "42px", height: "auto" }}
            priority
          />
          <span className="font-[Noto_Serif] text-lg md:text-xl font-bold text-white tracking-wide">
            Assam Association Delhi
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center">

          {/* 🔥 Better spacing group */}
          <div className="flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition",
                    active
                      ? "text-white font-semibold"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.name}

                  {/* underline */}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* 🔥 Proper CTA spacing */}
          <div className="ml-10 lg:ml-12">
            <Link
              href="/membership"
              className="bg-white text-purple-700 px-5 py-2.5 text-sm rounded-md font-semibold hover:bg-gray-100 transition shadow-sm"
            >
              Join Us
            </Link>
          </div>

        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU (unchanged) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t shadow-lg">
          <div className="px-6 py-5 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block text-base font-medium py-2 px-2 rounded-md transition",
                  pathname === item.href
                    ? "text-purple-700 bg-purple-100"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/membership"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-gradient-to-r from-purple-600 to-green-500 text-white py-3 rounded-md font-semibold mt-4 shadow"
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}