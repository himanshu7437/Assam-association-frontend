"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitMembershipForm } from "@/lib/api/membership";
import { motion, AnimatePresence } from "framer-motion";

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
    membershipType: "general",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return "Valid email is required";
    if (!formData.phone.trim()) return "Phone number is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitMembershipForm(formData);
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        occupation: "",
        address: "",
        membershipType: "general",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-24 bg-[#F9F7F2] min-h-screen">

      {/* HEADER (UNCHANGED) */}
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="border-b border-[#e4e2dd] pb-10">
          <span className="text-xs uppercase tracking-[0.4em] text-[#B5824C] font-bold block mb-4">
            Membership
          </span>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#4b0004] mb-4">
            Join Our Community
          </h1>

          <p className="text-[#465f88] max-w-xl">
            Become a part of Assam Association Delhi and stay connected with
            culture, events, and community initiatives.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20">

        {/* LEFT INFO (UNCHANGED) */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1b1c19] mb-6">
            Why Become a Member?
          </h2>

          <p className="text-[#44474e] mb-8 leading-relaxed">
            Membership provides you access to exclusive cultural events,
            community gatherings, and the opportunity to stay rooted in Assamese
            traditions while living in Delhi.
          </p>

          <div className="space-y-6">
            {[
              "Access to cultural events & festivals",
              "Priority booking for facilities",
              "Community networking opportunities",
              "Participation in heritage programs",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#4b0004] text-white text-sm">
                  ✓
                </div>
                <p className="text-[#44474e]">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-[#465f88]">
              Membership Types
            </h3>

            <div className="space-y-3 text-sm text-[#44474e]">
              <p><strong>General:</strong> Open for all community members</p>
              <p><strong>Life:</strong> One-time membership for lifetime access</p>
              <p><strong>Student:</strong> Discounted membership for students</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-10 shadow-xl rounded-lg border border-[#e4e2dd]">

          <h2 className="text-2xl font-serif font-bold text-[#1B365D] mb-6">
            Membership Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <AnimatePresence mode="wait">
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm"
                >
                  <CheckCircle2 size={18} />
                  Your application has been submitted successfully!
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm"
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* NAME */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-[#e4e2dd] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b0004]"
                required
                disabled={loading}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#e4e2dd] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b0004]"
                required
                disabled={loading}
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-[#e4e2dd] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b0004]"
                required
                disabled={loading}
              />
            </div>

            {/* OCCUPATION */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full border border-[#e4e2dd] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b0004]"
                disabled={loading}
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-[#e4e2dd] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b0004]"
                disabled={loading}
              />
            </div>

            {/* MEMBERSHIP TYPE */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Membership Type
              </label>
              <select
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
                className="w-full border border-[#e4e2dd] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b0004]"
                disabled={loading}
              >
                <option value="general">General</option>
                <option value="life">Life</option>
                <option value="student">Student</option>
              </select>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4b0004] text-white py-4 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Submitting... <Loader2 size={18} className="animate-spin" /></>
              ) : (
                "Submit Application"
              )}
            </button>

          </form>
        </div>
      </section>
    </main>
  );
}