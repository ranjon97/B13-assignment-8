"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote, Star, MessageCircle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Avid Reader",
      avatar: "SA",
      rating: 5,
      message:
        "Lumen transformed how I read. The collection is incredible and borrowing is seamless. I've discovered so many new authors!",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      name: "Rakib Hassan",
      role: "Software Engineer",
      avatar: "RH",
      rating: 5,
      message:
        "As a developer, I love their tech book section. The interface is clean, fast, and intuitive. Highly recommended for any tech enthusiast.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      name: "Nusrat Jahan",
      role: "Student",
      avatar: "NJ",
      rating: 5,
      message:
        "The science category helped me through my studies. Free borrowing saved me hundreds of dollars. Best library platform out there!",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      name: "Mahfuz Khan",
      role: "Teacher",
      avatar: "MK",
      rating: 5,
      message:
        "I recommend Lumen to all my students. The diverse collection and user-friendly design make reading accessible for everyone.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Tania Rahman",
      role: "Book Blogger",
      avatar: "TR",
      rating: 5,
      message:
        "I've tried many digital libraries, and Lumen is by far the best. The curation is top-notch and the user experience is delightful.",
      gradient: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-accent-400 font-medium text-xs uppercase tracking-[0.2em] mb-3">
              <MessageCircle className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
              What Readers <span className="gradient-text">Say</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from our community of book lovers about their experience.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass-card rounded-2xl p-8 h-full relative overflow-hidden group"
                >
                  {/* Background glow */}
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${t.gradient} group-hover:opacity-30 transition-opacity`}
                  />

                  <div className="relative z-10">
                    <Quote className="w-10 h-10 text-accent-400/50 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6 italic">
                      "{t.message}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold ring-2 ring-white/10`}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
