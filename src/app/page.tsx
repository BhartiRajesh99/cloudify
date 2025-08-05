"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter()
  return (
    <main className="bg-[#000]">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
        <h1 className="text-5xl text-purple-500 md:text-7xl font-extrabold leading-tight max-w-4xl">
          Compress & Deliver Videos Effortlessly
        </h1>
        <p className="mt-6 text-lg md:text-2xl max-w-2xl opacity-90">
          Cloudify helps creators, teams, and platforms reduce video size,
          preview faster, and deliver smoother — all powered by Cloudinary.
        </p>
        <div className="mt-8 flex gap-4">
          <button onClick={() => router.push('/home')} className="px-6 py-3 bg-blue-600 text-white hover:cursor-pointer rounded-full text-lg hover:opacity-90 transition">
            Get Started
          </button>
          
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-[#d9ad7c]/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Cloudify?
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              {
                title: "Smart Compression",
                desc: "Reduce file size up to 70% with near-lossless quality.",
              },
              {
                title: "Instant Preview",
                desc: "Generate fast-loading preview clips automatically.",
              },
              {
                title: "One-Click Delivery",
                desc: "Stream and download full HD videos in one click.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white text-black p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-md opacity-80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#a2836e] text-white py-6 text-center">
        <p>© {new Date().getFullYear()} Cloudify. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
