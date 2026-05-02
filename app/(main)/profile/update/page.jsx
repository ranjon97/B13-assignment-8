"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Image as ImageIcon,
  Save,
  CheckCircle,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/profile/update");
    }
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.length < 2) newErrors.name = "Min 2 characters";
    if (image && !/^https?:\/\/.+/.test(image))
      newErrors.image = "Must be a valid URL";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name,
        image:
          image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=6366f1&color=fff`,
      });

      if (error) {
        toast.error(error.message || "Update failed");
      } else {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          router.push("/profile");
          router.refresh();
        }, 800);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="spinner-glow" />
      </div>
    );
  }

  const previewImage =
    image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "U"
    )}&background=6366f1&color=fff&size=256`;

  return (
    <div className="min-h-screen py-12 relative">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 font-medium glass px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-strong rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-glow-purple/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
                  Update <span className="gradient-text">Profile</span>
                </h1>
                <p className="text-gray-400">
                  Keep your information up to date
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-500 to-glow-purple flex items-center justify-center ring-4 ring-white/10 shadow-glow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={previewImage}
                      src={previewImage}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          name || "U"
                        )}&background=6366f1&color=fff&size=256`;
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-accent-500 to-glow-purple p-2 rounded-xl shadow-glow">
                    <ImageIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className={`w-full pl-11 pr-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none transition text-white placeholder:text-gray-600 ${
                        errors.name
                          ? "border-red-500/50"
                          : "border-white/10 focus:border-accent-500/50"
                      }`}
                      disabled={loading}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Profile Image URL{" "}
                    <span className="text-gray-500">(optional)</span>
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className={`w-full pl-11 pr-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none transition text-white placeholder:text-gray-600 ${
                        errors.image
                          ? "border-red-500/50"
                          : "border-white/10 focus:border-accent-500/50"
                      }`}
                      disabled={loading}
                    />
                  </div>
                  {errors.image && (
                    <p className="text-red-400 text-xs mt-1">{errors.image}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Leave empty to use auto-generated avatar
                  </p>
                </div>

                <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-accent-300 mb-0.5">
                      Email cannot be changed
                    </p>
                    <p className="text-gray-400">
                      Your email{" "}
                      <span className="text-gray-300">
                        ({session.user.email})
                      </span>{" "}
                      is permanent.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/profile" className="flex-1">
                    <div className="w-full glass border border-white/10 hover:bg-white/5 py-3 rounded-xl font-semibold transition text-gray-300 flex items-center justify-center cursor-pointer">
                      Cancel
                    </div>
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-glow text-white py-3 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
