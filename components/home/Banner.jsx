"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Library, Star } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative min-h-[85vh] flex items-center mesh-bg">
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              <span className="text-gray-300">10,000+ books available now</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-6 tracking-tight"
            >
              <span className="text-white block">Find Your</span>
              <span className="gradient-text block">Next Read</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Discover stories that move you, knowledge that empowers you.
              Browse our curated collection and borrow your favorite books
              digitally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/all-books"
                className="group btn-glow text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                Browse Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="glass text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition"
              >
                <Sparkles className="w-5 h-5" />
                Join Free
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mt-14 max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: "10K+", label: "Books" },
                { value: "5K+", label: "Readers" },
                { value: "50+", label: "Categories" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Static books */}
          <div className="relative h-[500px] hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative w-64 h-80 z-30 animate-float"
              >
                <div className="w-64 h-80 gradient-border rounded-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 via-glow-purple/20 to-glow-pink/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <Library className="w-16 h-16 mb-4 text-accent-300" />
                    <h3 className="font-display font-bold text-2xl mb-2 text-center gradient-text">
                      BooksStore
                    </h3>
                    <p className="text-sm text-gray-400 text-center mb-4">
                      Digital Library
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute left-0 top-1/4 w-48 h-64 z-20"
                style={{ transform: "rotate(-12deg)" }}
              >
                <div className="w-48 h-64 bg-gradient-to-br from-glow-blue to-glow-cyan rounded-2xl shadow-xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute right-0 bottom-1/4 w-48 h-64 z-20"
                style={{ transform: "rotate(12deg)" }}
              >
                <div className="w-48 h-64 bg-gradient-to-br from-glow-pink to-glow-purple rounded-2xl shadow-xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
