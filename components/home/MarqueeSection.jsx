"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { Sparkles, Tag, Gift, Star, Zap, Award } from "lucide-react";

export default function MarqueeSection() {
  const items = [
    { icon: Sparkles, text: "New Arrival: The Midnight Library" },
    { icon: Tag, text: "Special Discount on Memberships" },
    { icon: Gift, text: "Free Borrowing First Month" },
    { icon: Star, text: "Top Rated: Clean Code by Robert C. Martin" },
    { icon: Zap, text: "New Arrival: Sapiens by Yuval Noah Harari" },
    { icon: Tag, text: "Premium Plans Starting at $5/month" },
    { icon: Gift, text: "Borrow 3 Books Free This Month" },
    { icon: Award, text: "Trending: A Brief History of Time" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-5 marquee-blend border-y border-white/5 overflow-hidden"
    >
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 mx-8">
              <Icon className="w-4 h-4 text-accent-300" />
              <span className="font-medium text-sm md:text-base whitespace-nowrap text-gray-200">
                {item.text}
              </span>
              <span className="text-accent-400/50 mx-2">•</span>
            </div>
          );
        })}
      </Marquee>
    </motion.section>
  );
}
