"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  User,
  Tag,
  Calendar,
  CheckCircle,
  Library,
  Heart,
  Share2,
  X,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function BookDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, isPending } = useSession();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [borrowed, setBorrowed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/books/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setBook(data.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const handleBorrowClick = () => {
    if (!session?.user) {
      toast.error("Please login to borrow this book");
      router.push(`/login?redirect=/books/${params.id}`);
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmBorrow = () => {
    setModalOpen(false);
    setBorrowing(true);
    setTimeout(() => {
      setBorrowing(false);
      setBorrowed(true);
      toast.success(`"${book.title}" borrowed successfully!`);
    }, 800);
  };

  if (loading || isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="spinner-glow" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl mb-2 text-white">
            Book Not Found
          </h2>
          <Link
            href="/all-books"
            className="btn-glow text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12 mesh-bg relative">
      <div className="container mx-auto px-4 relative z-10">
        <Link
          href="/all-books"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 font-medium glass px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Books
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10">
              {/* Left - Book Image */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-bg-tertiary to-bg-elevated shadow-2xl shadow-accent-500/20 max-w-md mx-auto relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={book.image_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/400x533/1a1a26/a5b6fc?text=${encodeURIComponent(
                          book.title
                        )}`;
                      }}
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-white/30 to-transparent" />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6 max-w-md mx-auto">
                    {[
                      { Icon: Library, label: "Available", value: book.available_quantity },
                      { Icon: Tag, label: "Category", value: book.category },
                      { Icon: Calendar, label: "Loan", value: "14 days" },
                    ].map((stat, idx) => (
                      <div key={idx} className="glass rounded-xl p-3 text-center">
                        <stat.Icon className="w-5 h-5 text-accent-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">{stat.label}</p>
                        <p className="font-bold text-white text-sm">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Details */}
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 self-start glass-card px-4 py-1.5 rounded-full text-sm font-semibold mb-4 text-accent-300">
                  <Tag className="w-4 h-4" />
                  {book.category}
                </div>

                <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 text-white">
                  {book.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 mb-6">
                  <User className="w-5 h-5" />
                  <span className="text-lg">
                    by{" "}
                    <span className="font-semibold text-gray-200">
                      {book.author}
                    </span>
                  </span>
                </div>

                <div
                  className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
                    book.available_quantity > 0
                      ? "bg-emerald-500/10 border border-emerald-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                  }`}
                >
                  <BookOpen
                    className={`w-6 h-6 ${
                      book.available_quantity > 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-white">
                      {book.available_quantity > 0
                        ? `${book.available_quantity} ${
                            book.available_quantity === 1 ? "copy" : "copies"
                          } available`
                        : "Currently unavailable"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {book.available_quantity > 0
                        ? "Borrow now and enjoy reading"
                        : "Check back later"}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="font-display font-bold text-xl mb-3 text-white">
                    About this book
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="flex gap-3">
                  {borrowed ? (
                    <div className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                      Successfully Borrowed!
                    </div>
                  ) : (
                    <button
                      onClick={handleBorrowClick}
                      disabled={borrowing || book.available_quantity === 0}
                      className="flex-1 btn-glow text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {borrowing ? (
                        <>
                          <span className="loading loading-spinner loading-sm" />
                          Borrowing...
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-5 h-5" />
                          Borrow This Book
                        </>
                      )}
                    </button>
                  )}

                  <button
                    className="glass border border-white/10 hover:border-accent-500/50 w-14 rounded-xl flex items-center justify-center transition"
                    aria-label="Like"
                  >
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    className="glass border border-white/10 hover:border-accent-500/50 w-14 rounded-xl flex items-center justify-center transition"
                    aria-label="Share"
                  >
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  {session?.user
                    ? `Logged in as ${session.user.email}`
                    : "Please login to borrow this book"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal (Framer Motion - lighter) */}
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-2xl gradient-text">
                Confirm Borrow
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">
                You're about to borrow{" "}
                <span className="font-bold text-white">"{book.title}"</span> by{" "}
                {book.author}.
              </p>
              <div className="glass-card rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Loan Period:</span>
                  <span className="text-white font-semibold">14 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available copies:</span>
                  <span className="text-white font-semibold">
                    {book.available_quantity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 glass border border-white/10 hover:bg-white/5 py-3 rounded-xl font-semibold transition text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBorrow}
                  className="flex-1 btn-glow text-white py-3 rounded-xl font-semibold"
                >
                  Confirm Borrow
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
