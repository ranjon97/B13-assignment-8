"use client";

import Link from "next/link";
import { Eye, BookOpen } from "lucide-react";

export default function BookCard({ book }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden group h-full flex flex-col hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image_url}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x400/1a1a26/a5b6fc?text=${encodeURIComponent(
              book.title
            )}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />

        <div className="absolute top-3 right-3 glass-strong px-3 py-1 rounded-full text-xs font-semibold text-accent-300">
          {book.category}
        </div>
        <div className="absolute top-3 left-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          {book.available_quantity} left
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg line-clamp-1 mb-1 text-white group-hover:gradient-text transition-all">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">
          by {book.author}
        </p>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
          {book.description}
        </p>
        <Link
          href={`/books/${book.id}`}
          className="mt-auto btn-glow text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 text-sm"
        >
          <Eye className="w-4 h-4" />
          Details
        </Link>
      </div>
    </div>
  );
}
