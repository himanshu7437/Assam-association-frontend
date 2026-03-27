"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import footerBg from "../../../public/images/footer.jpeg";

  export default function Footer() {
    return (
      <footer className="relative w-full text-white mt-20 overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={footerBg}
            alt="Footer Background"
            fill
            className="object-cover"
          />
        </div>

      {/* PROFESSIONAL OVERLAY (FIXED) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-green-900/50 to-green-600/50 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Spacer */}
          <div className="hidden md:block" />

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white">
              Assam Association Delhi
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              Dedicated to promoting the cultural, literary, and social heritage
              of Assam in the National Capital Region.
            </p>
            <p className="text-sm mt-2 text-white/80">
              info@assamassociationdelhi.org
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="#" className="hover:underline hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-white">
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white">
              Contact Us
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              Srimanta Sankaradeva Bhawan,<br />
              Satsang Vihar Marg,<br />
              Qutab Institutional Area,<br />
              New Delhi - 110067
            </p>
            <p className="text-sm mt-3 text-white font-medium">
              +91 11 2696 0541
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}