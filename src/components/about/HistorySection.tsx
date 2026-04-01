"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import historyImg from "../../../public/images/about.jpeg";

export default function HistorySection() {
    return (
        <section id="history" className="py-20 md:py-28 bg-[#fbf9f4]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT → TEXT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-[#4b0004] font-bold tracking-widest uppercase text-xs">
                            Our History
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1c19] font-[Noto_Serif] leading-tight">
                            A Legacy Rooted in Unity & Culture
                        </h2>

                        <div className="h-1 w-20 bg-[#4b0004]" />

                        <p className="text-[#44474e] text-base sm:text-lg leading-relaxed">
                            Assam Sangha was constituted at the very dawn of Independence in 1947
                            under the presidency of Late Mahendra Mohan Chaudhury, with Late
                            Deven Pal Das serving as General Secretary.
                        </p>

                        <p className="text-[#44474e] text-base sm:text-lg leading-relaxed">
                            The organization was formally registered as Assam Association, Delhi
                            (Reg. No. 3414) on 17th August 1967 under the Societies Registration Act.
                        </p>

                        <p className="text-[#44474e] text-base sm:text-lg leading-relaxed">
                            In 1966, the Association adopted a Memorandum of Association, laying
                            down a structured vision to transform collective aspirations into
                            meaningful initiatives for the community.
                        </p>

                        {/* AIMS */}
                        <div className="pt-4">
                            <h3 className="text-lg font-bold text-[#1b1c19] mb-3">
                                Aims & Objectives
                            </h3>

                            <ul className="space-y-2 text-[#44474e] text-sm sm:text-base list-disc pl-5">
                                <li>
                                    To provide a platform for Assamese residents in Delhi-NCR for
                                    social and cultural engagement.
                                </li>
                                <li>
                                    To organize cultural events, meetings, lectures, and symposiums.
                                </li>
                                <li>
                                    To build relationships with similar organizations across regions.
                                </li>
                                <li>
                                    To promote awareness of social, cultural, and economic issues
                                    related to Assam and the North East.
                                </li>
                            </ul>
                        </div>

                    </motion.div>

                    {/* RIGHT → IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Border Frame Effect */}
                        <div className="absolute top-0 left-0 w-full h-full border-2 border-[#B5824C] rounded-xl -z-10 translate-x-[-12px] translate-y-[-12px]" />

                        <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] w-full rounded-xl overflow-hidden shadow-xl">

                            <Image
                                src={historyImg}
                                alt="Assam Association History"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />

                            {/* ✅ MINIMAL OVERLAY */}
                            <div className="absolute inset-0 bg-black/10" />

                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}