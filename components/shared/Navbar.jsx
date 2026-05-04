"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, LogOut, User, Sparkles } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-books", label: "All Books" },
    { href: "/profile", label: "My Profile" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-bg-primary/95 border-b border-white/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-accent-500 to-glow-purple p-2 rounded-xl shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-xl gradient-text">
                BookStore
              </span>
              <span className="text-[9px] text-gray-500 tracking-[0.3em] uppercase hidden sm:block mt-0.5">
                Digital Library
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-gradient-to-r from-accent-500 to-glow-purple rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-10 skeleton-shimmer rounded-full" />
            ) : session?.user ? (
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-accent-500 to-glow-purple flex items-center justify-center ring-2 ring-white/10">
                    {session.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium text-sm max-w-[120px] truncate text-gray-200 pr-2">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-64 glass-strong rounded-2xl shadow-2xl overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-white/5">
                          <p className="font-semibold text-sm truncate text-white">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {session.user.email}
                          </p>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition text-sm text-gray-300"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 hover:text-red-400 transition text-sm border-t border-white/5 text-gray-300"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex btn-glow text-white px-5 py-2 rounded-full font-medium text-sm shadow-lg items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-lg"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <ul className="flex flex-col gap-2 pt-4 pb-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition ${
                        isActive(link.href)
                          ? "bg-gradient-to-r from-accent-500 to-glow-purple text-white"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {!isPending && (
                  <li className="pt-2 border-t border-white/5 mt-2">
                    {session?.user ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-accent-500 to-glow-purple flex items-center justify-center">
                            {session.user.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={session.user.image}
                                alt={session.user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-white truncate">
                              {session.user.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {session.user.email}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block btn-glow text-white px-4 py-3 rounded-xl font-medium text-center"
                      >
                        Sign In
                      </Link>
                    )}
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
