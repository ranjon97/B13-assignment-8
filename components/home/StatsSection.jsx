"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, TrendingUp, Award } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { Icon: BookOpen, value: "10,000+", label: "Books Available", color: "from-blue-500 to-cyan-500" },
    { Icon: Users, value: "5,000+", label: "Active Readers", color: "from-purple-500 to-pink-500" },
    { Icon: TrendingUp, value: "50,000+", label: "Books Borrowed", color: "from-emerald-500 to-teal-500" },
    { Icon: Award, value: "4.9", label: "Average Rating", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-gray-400">Numbers that speak for themselves</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.Icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass rounded-2xl p-6 text-center group hover:-translate-y-1 transition-transform"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
