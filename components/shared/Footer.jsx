"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import FadeIn from "@/components/animations/FadeIn";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-glow-purple/10 rounded-full blur-3xl" />

      <div className="relative bg-bg-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <FadeIn>
              <div>
                <Link href="/" className="flex items-center gap-3 mb-4 group">
                  <div className="bg-gradient-to-br from-accent-500 to-glow-purple p-2 rounded-xl shadow-glow group-hover:shadow-glow-lg transition-shadow">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl gradient-text">
                      Lumen
                    </h3>
                    <p className="text-[9px] text-gray-500 tracking-[0.3em] uppercase">
                      Digital Library
                    </p>
                  </div>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Your gateway to thousands of books. Reimagining the library
                  experience for the modern reader.
                </p>
                <div className="flex gap-2">
                  {[
                    { Icon: Facebook, href: "https://facebook.com" },
                    { Icon: Twitter, href: "https://twitter.com" },
                    { Icon: Instagram, href: "https://instagram.com" },
                    { Icon: Linkedin, href: "https://linkedin.com" },
                    { Icon: Github, href: "https://github.com" },
                  ].map(({ Icon, href }, idx) => (
                    <motion.a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:border-accent-500/50 hover:shadow-glow transition-all"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Quick Links */}
            <FadeIn delay={0.1}>
              <div>
                <h4 className="font-display font-bold text-lg mb-5 text-white">
                  Navigation
                </h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Home", href: "/" },
                    { label: "All Books", href: "/all-books" },
                    { label: "My Profile", href: "/profile" },
                    { label: "Sign In", href: "/login" },
                    { label: "Register", href: "/register" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white inline-flex items-center gap-2 group transition"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-500 group-hover:w-4 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Contact */}
            <FadeIn delay={0.2}>
              <div>
                <h4 className="font-display font-bold text-lg mb-5 text-white">
                  Contact Us
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-1 text-accent-400 shrink-0" />
                    <span className="text-gray-400">
                      123 Library Street, Dhaka, Bangladesh
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                    <a
                      href="tel:+8801700000000"
                      className="text-gray-400 hover:text-white"
                    >
                      +880 1700-000000
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                    <a
                      href="mailto:hello@lumen.com"
                      className="text-gray-400 hover:text-white"
                    >
                      hello@lumen.com
                    </a>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Newsletter */}
            <FadeIn delay={0.3}>
              <div>
                <h4 className="font-display font-bold text-lg mb-5 text-white">
                  Stay Updated
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Get notified about new arrivals and exclusive offers.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 pr-12 glass rounded-xl text-sm placeholder:text-gray-500 focus:outline-none focus:border-accent-500/50 focus:shadow-glow transition"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-accent-500 to-glow-purple p-2 rounded-lg"
                      aria-label="Subscribe"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              © {new Date().getFullYear()} Lumen. Crafted with{" "}
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />{" "}
              by readers, for readers.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
