"use client";

import { motion } from "framer-motion";
import { BookText, Cpu, Atom, Library, Filter } from "lucide-react";

export default function CategorySidebar({ selectedCategory, onSelect }) {
  const categories = [
    { name: "All", icon: Library, color: "from-accent-500 to-glow-purple" },
    { name: "Story", icon: BookText, color: "from-rose-500 to-pink-500" },
    { name: "Tech", icon: Cpu, color: "from-blue-500 to-indigo-500" },
    { name: "Science", icon: Atom, color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <aside className="glass rounded-2xl p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
        <Filter className="w-5 h-5 text-accent-400" />
        <h3 className="font-display font-bold text-xl text-white">Categories</h3>
      </div>

      <ul className="space-y-2">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <motion.li
              key={cat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(cat.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all relative overflow-hidden ${
                  isActive
                    ? "text-white shadow-glow"
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className={`absolute inset-0 bg-gradient-to-r ${cat.color} -z-10`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{cat.name}</span>
              </motion.button>
            </motion.li>
          );
        })}
      </ul>

      {/* Info Card */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="glass-card rounded-xl p-4">
          <h4 className="font-display font-bold text-base mb-1 text-white">
            Need Help?
          </h4>
          <p className="text-sm text-gray-400 mb-3">
            Can't find what you're looking for?
          </p>
          <button
            onClick={() => onSelect("All")}
            className="text-sm font-semibold gradient-text hover:opacity-80"
          >
            View All Books →
          </button>
        </div>
      </div>
    </aside>
  );
}
