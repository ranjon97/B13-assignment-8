import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen mesh-bg grid-pattern flex flex-col">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-accent-500 to-glow-purple p-2 rounded-xl shadow-glow group-hover:shadow-glow-lg transition-shadow">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl gradient-text">
            Lumen
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition glass px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-8 relative z-10">
        {children}
      </div>
    </div>
  );
}
