"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, BookOpen, X, Filter, Sparkles } from "lucide-react";
import BookCard from "@/components/books/BookCard";
import CategorySidebar from "@/components/books/CategorySidebar";

function AllBooksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "All";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [search, selectedCategory]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      const res = await fetch(`/api/books?${params.toString()}`);
      const data = await res.json();
      if (data.success) setBooks(data.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMobileFilterOpen(false);
    if (category === "All") router.push("/all-books");
    else router.push(`/all-books?category=${category}`);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="relative py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-medium mb-6">
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span className="text-gray-300">Browse our entire collection</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
              Explore Our <span className="gradient-text">Library</span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
              Browse our complete collection. Search by title or filter by
              category to find your perfect read.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by book title..."
                className="w-full pl-14 pr-12 py-4 rounded-2xl glass-strong text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-500/50 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden container mx-auto px-4 mt-6">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="w-full glass rounded-xl py-3 px-4 flex items-center justify-between font-semibold text-white"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-accent-400" />
            <span>
              Filter:{" "}
              <span className="gradient-text">{selectedCategory}</span>
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {mobileFilterOpen ? "Hide" : "Show"}
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className={`${mobileFilterOpen ? "block" : "hidden"} lg:block`}>
            <CategorySidebar
              selectedCategory={selectedCategory}
              onSelect={handleCategorySelect}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                {loading
                  ? "Loading..."
                  : `Showing ${books.length} ${
                      books.length === 1 ? "book" : "books"
                    }${
                      selectedCategory !== "All"
                        ? ` in ${selectedCategory}`
                        : ""
                    }${search ? ` matching "${search}"` : ""}`}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
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
            ) : books.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl mb-2 text-white">
                  No Books Found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search or category filter
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    handleCategorySelect("All");
                  }}
                  className="btn-glow text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner-glow" />
        </div>
      }
    >
      <AllBooksContent />
    </Suspense>
  );
}
