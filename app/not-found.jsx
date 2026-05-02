"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-bg grid-pattern flex items-center justify-center p-4">
      <div className="text-center max-w-2xl relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <h1 className="font-display font-bold text-[150px] md:text-[200px] leading-none gradient-text">
              404
            </h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-accent-500 to-glow-purple rounded-full blur-xl opacity-50"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-glow-purple rounded-2xl mb-6 shadow-glow">
            <BookOpen className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
            The page you're looking for seems to have wandered off into another
            dimension.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Home className="w-5 h-5" />
                Go Home
              </motion.div>
            </Link>
            <Link href="/all-books">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass border border-white/10 hover:bg-white/5 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Search className="w-5 h-5" />
                Browse Books
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
