"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-500 via-glow-purple to-glow-pink"
        >
          <div className="px-8 py-16 md:py-20 md:px-16 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 text-white border border-white/30">
              <Sparkles className="w-4 h-4" />
              Ready to start reading?
            </div>

            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 max-w-3xl mx-auto leading-tight">
              Join thousands of readers
              <br />
              exploring infinite worlds
            </h2>

            <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
              Create your free account today and unlock access to our entire
              collection of books across every genre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-accent-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-2xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/all-books"
                className="bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                Explore Library
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
