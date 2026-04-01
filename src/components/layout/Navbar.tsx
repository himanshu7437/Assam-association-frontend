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
    <header className="fixed top-0 w-full z-50 h-16 bg-gradient-to-r from-purple-600 to-green-500 shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between">

        {/* BRAND */}
        <Link href="/" className="flex items-center gap-2">

          <Image
            src="https://res.cloudinary.com/disniu3hn/image/upload/v1775053126/AAD_LOGO_red_qwrjb9.svg"
            alt="Assam Association Delhi Logo"
            width={36}
            height={36}
            className="object-contain shrink-0"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />

          {/* ✅ MOBILE → FULL TEXT (WRAPS, NO CUT) */}
          <span className="font-[Noto_Serif] text-sm font-bold text-white leading-tight break-words md:hidden">
            Assam Association Delhi
          </span>

          {/* ✅ TABLET → AAD */}
          <span className="hidden md:block lg:hidden font-[Noto_Serif] text-lg font-bold text-white">
            AAD
          </span>

          {/* ✅ DESKTOP → FULL */}
          <span className="hidden lg:block font-[Noto_Serif] text-lg font-bold text-white whitespace-nowrap">
            Assam Association Delhi
          </span>

        </Link>

        {/* DESKTOP NAV (SHIFTED TO LG) */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">

          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium whitespace-nowrap transition",
                  active
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="/membership"
            className="bg-white text-purple-700 px-4 py-2 text-sm rounded-md font-semibold hover:bg-gray-100 transition shrink-0"
          >
            Join Us
          </Link>
        </div>

        {/* MOBILE / TABLET MENU BUTTON */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t shadow-lg">
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