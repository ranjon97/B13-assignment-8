"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  User,
  Edit,
  BookOpen,
  Award,
  TrendingUp,
  Sparkles,
  LogOut,
  Settings,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/profile");
    }
  }, [session, isPending, router]);

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

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="spinner-glow" />
      </div>
    );
  }

  const user = session.user;
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  const stats = [
    { Icon: BookOpen, label: "Books Borrowed", value: "12", color: "from-blue-500 to-cyan-500" },
    { Icon: Award, label: "Reading Score", value: "850", color: "from-purple-500 to-pink-500" },
    { Icon: TrendingUp, label: "This Month", value: "3", color: "from-emerald-500 to-teal-500" },
    { Icon: Sparkles, label: "Achievements", value: "8", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen py-12 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-gray-400">
            Manage your account and view your reading journey
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="glass-strong rounded-3xl p-6 md:p-10 mb-6 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-glow-purple/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-500 to-glow-purple flex items-center justify-center ring-4 ring-white/10 shadow-glow-lg">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-400 ring-4 ring-bg-secondary" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display font-bold text-3xl text-white mb-1">
                    {user.name}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-4">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                    <span className="glass px-3 py-1 rounded-full text-xs font-medium text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active Member
                    </span>
                    <span className="glass px-3 py-1 rounded-full text-xs font-medium text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      Joined {memberSince}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                  <Link href="/profile/update">
                    <div className="btn-glow text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                      <Edit className="w-4 h-4" />
                      Update Info
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="glass border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10 text-red-400 px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.Icon;
              return (
                <div
                  key={idx}
                  className="glass rounded-2xl p-5 group cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-display font-bold text-2xl gradient-text mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="glass-strong rounded-3xl p-6 md:p-8">
              <h3 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-accent-400" />
                Quick Actions
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/all-books">
                  <div className="glass-card rounded-xl p-4 flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">Browse Books</h4>
                      <p className="text-sm text-gray-400">
                        Explore our entire collection
                      </p>
                    </div>
                  </div>
                </Link>

                <Link href="/profile/update">
                  <div className="glass-card rounded-xl p-4 flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Edit className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">Edit Profile</h4>
                      <p className="text-sm text-gray-400">
                        Update your information
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
