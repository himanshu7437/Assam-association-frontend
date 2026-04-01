"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import footerBg from "../../../public/images/footer2.png";

export default function Footer() {
  return (
    <footer className="relative w-full text-white mt-20 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src={footerBg}
            alt="Footer Background"
            fill
            sizes="100vw"
            className="object-cover object-[5.2%_center] md:object-left"
            priority
          />
        </div>
      </div>

      {/* PROFESSIONAL OVERLAY (FIXED) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-900/60 to-green-900/60 backdrop-blur-[0.1px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-28">

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