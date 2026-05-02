"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import BookCard from "@/components/books/BookCard";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBooks(data.data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 relative">
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-glow-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-accent-400 font-medium text-xs uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-4 h-4" />
              Curated Selection
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white">
              Featured <span className="gradient-text">Books</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl">
              Handpicked must-reads from our collection. Discover stories that
              inspire, educate, and entertain.
            </p>
          </div>
          <Link
            href="/all-books"
            className="group flex items-center gap-2 text-accent-400 font-semibold hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden">
                <div className="aspect-[3/4] skeleton-shimmer" />
                <div className="p-5 space-y-3">
                  <div className="h-5 skeleton-shimmer rounded" />
                  <div className="h-4 w-2/3 skeleton-shimmer rounded" />
                  <div className="h-10 skeleton-shimmer rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
