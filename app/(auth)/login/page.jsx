"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await signIn.email({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        toast.error(error.message || "Invalid credentials");
        setErrors({ general: error.message || "Login failed" });
      } else {
        toast.success("Welcome back!");
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: redirectTo });
    } catch {
      toast.error("Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-strong rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-glow-purple/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-glow-purple rounded-2xl mb-4 shadow-glow">
                <LogIn className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-display font-bold text-3xl text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Sign in to continue your reading journey
              </p>
            </div>

            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none transition text-white placeholder:text-gray-600 ${
                      errors.email
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-accent-500/50"
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-11 py-3 bg-bg-tertiary border rounded-xl focus:outline-none transition text-white placeholder:text-gray-600 ${
                      errors.password
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-accent-500/50"
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-glow text-white py-3 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                Or
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full glass border border-white/10 hover:border-white/20 hover:bg-white/5 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-3 disabled:opacity-50 text-gray-200"
            >
              {googleLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400 mt-8">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold gradient-text hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <div className="spinner-glow" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
