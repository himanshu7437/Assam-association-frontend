"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "../../../public/images/AAD_LOGO red.png"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Notices", href: "/notices" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
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
        "fixed top-0 w-full z-50 border-t-2 border-[#4b0004] transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-white/70 backdrop-blur-md py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Logo" className="w-12 h-12" />
          <span className="font-[Noto_Serif] text-lg sm:text-xl font-bold text-[#1b1c19]">
            ASSAM ASSOCIATION DELHI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                pathname === item.href
                  ? "text-[#4b0004] font-semibold border-b-2 border-[#4b0004] pb-1"
                  : "text-gray-600 hover:text-[#4b0004]"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/membership"
            className="bg-[#4b0004] text-white px-5 py-2 text-sm rounded-sm hover:bg-[#73000a] transition"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#4b0004]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t mt-3 px-6 py-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-base text-gray-700 hover:text-[#4b0004]"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/join"
            className="block bg-[#4b0004] text-white text-center py-2 rounded-sm"
            onClick={() => setIsOpen(false)}
          >
            Join Us
          </Link>
        </div>
      )}
    </header>
  );
}