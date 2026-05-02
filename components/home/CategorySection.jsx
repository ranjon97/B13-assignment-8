"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import { BookText, Cpu, Atom, ArrowRight, Layers } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function CategorySection() {
  const categories = [
    {
      name: "Story",
      icon: BookText,
      count: "150+ Books",
      gradient: "from-rose-500 via-pink-500 to-orange-500",
      glow: "shadow-pink-500/30",
      description:
        "Lose yourself in worlds of fiction, drama, and unforgettable characters.",
    },
    {
      name: "Tech",
      icon: Cpu,
      count: "200+ Books",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      glow: "shadow-indigo-500/30",
      description:
        "Master programming, software engineering, and the latest in tech.",
    },
    {
      name: "Science",
      icon: Atom,
      count: "120+ Books",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      glow: "shadow-teal-500/30",
      description:
        "Explore the universe, biology, physics, and scientific breakthroughs.",
    },
    {
      name: "Story",
      icon: BookText,
      count: "Adventures",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      glow: "shadow-orange-500/30",
      description:
        "Thrilling adventures, mysteries, and journeys across time and place.",
    },
    {
      name: "Tech",
      icon: Cpu,
      count: "Web & AI",
      gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
      glow: "shadow-purple-500/30",
      description:
        "Web development, artificial intelligence, and modern frameworks.",
    },
    {
      name: "Science",
      icon: Atom,
      count: "Discoveries",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      glow: "shadow-blue-500/30",
      description:
        "Space, evolution, quantum physics, and groundbreaking research.",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-accent-400 font-medium text-xs uppercase tracking-[0.2em] mb-3">
              <Layers className="w-4 h-4" />
              Browse by Category
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
              Find Your <span className="gradient-text">Genre</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From gripping stories to cutting-edge tech, explore our diverse
              collection organized by category.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <SwiperSlide key={idx}>
                  <Link
                    href={`/all-books?category=${cat.name}`}
                    className="block group"
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br ${cat.gradient} p-8 shadow-xl ${cat.glow} hover:shadow-2xl transition-shadow`}
                    >
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute -right-10 -bottom-10">
                          <Icon className="w-48 h-48 text-white" />
                        </div>
                      </div>

                      {/* Glassmorphism overlay */}
                      <div className="absolute inset-0 bg-black/20" />

                      <div className="relative z-10 flex flex-col h-full">
                        <motion.div
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-xl flex items-center justify-center mb-4 ring-1 ring-white/30"
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </motion.div>
                        <h3 className="font-display font-bold text-3xl text-white mb-1">
                          {cat.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-3">{cat.count}</p>
                        <p className="text-white/90 text-sm leading-relaxed flex-1">
                          {cat.description}
                        </p>
                        <div className="flex items-center gap-2 mt-4 font-semibold text-white group-hover:gap-3 transition-all">
                          Explore
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
