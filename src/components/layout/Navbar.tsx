"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "NOTICES", href: "/notices" },
  { name: "GALLERY", href: "/gallery" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-purple-600 to-green-500 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-[Noto_Serif] text-lg sm:text-xl font-bold text-white tracking-wide">
            Assam Association Delhi
          </span>
        </div>
      </div>
    </header>
  );

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-gradient-to-r from-purple-600 to-green-500 shadow-md py-3"
          : "bg-gradient-to-r from-purple-600 to-green-500 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* Brand Name */}
        <Link href="/" className="flex items-center">
          <span className="font-[Noto_Serif] text-lg sm:text-xl font-bold text-white tracking-wide">
            Assam Association Delhi
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-all duration-300 relative",
                pathname === item.href
                  ? "text-white font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white"
                  : "text-white/80 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/membership"
            className="bg-white text-purple-700 px-5 py-2 text-sm rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-sm"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t mt-3 px-6 py-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-base text-gray-700 hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/membership"
            className="block bg-indigo-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Join Us
          </Link>
        </div>
      )}
    </header>
  );
}