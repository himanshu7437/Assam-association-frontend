"use client";

import React from "react";
import Link from "next/link";
import { Landmark, Mail, MapPin, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#4b0004] text-white mt-20">

      {/* Top Divider Gradient */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Subtle Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="text-white" />
              <span className="font-[Noto_Serif] text-xl font-semibold">
                ASSAM ASSOCIATION DELHI
              </span>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Serving the Assamese community in the Delhi-NCR region since 1968,
              promoting cultural exchange and social welfare.
            </p>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">
              Information
            </h3>

            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                <MapPin size={16} />
                RK Puram, New Delhi
              </li>

              <li className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <Mail size={16} />
                info@assamasociationdelhi.org
              </li>

              <li className="hover:translate-x-1 transition-transform">
                Quick Links: News, Events, Membership
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">
              Stay Connected
            </h3>

            <div className="flex gap-4">
              <Link
                href="#"
                className="text-white/70 hover:text-white hover:scale-110 transition-all"
              >
                <Facebook size={20} />
              </Link>

              <Link
                href="#"
                className="text-white/70 hover:text-white hover:scale-110 transition-all"
              >
                <Youtube size={20} />
              </Link>

              <Link
                href="#"
                className="text-white/70 hover:text-white hover:scale-110 transition-all"
              >
                <Mail size={20} />
              </Link>
            </div>

            <p className="text-xs text-white/60">
              Follow us on social platforms
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/60">
            © {currentYear} Assam Association Delhi. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}