import { motion } from 'framer-motion';
import React from 'react';

// ✅ Define props type
interface Category {
  title: string;
  image: string;
}

interface CategorySectionProps {
  title: string;
  buttonLabel: string;
  buttonStyle?: string;
  categories: Category[];
}

// ✅ Use props type properly
const CategorySection: React.FC<CategorySectionProps> = ({ title, buttonLabel, buttonStyle, categories }) => (
  <section className="mb-24 px-6">
    <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">{title}</h2>
      <a href="#" className="text-sm text-[#23DDC4] hover:underline">See All</a>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex gap-6 overflow-x-auto pb-2 max-w-7xl mx-auto scrollbar-hide"
    >
      {categories.map((cat, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6, scale: 1.04 }}
          transition={{ duration: 0.3 }}
          className="min-w-[200px] bg-white rounded-xl border border-transparent hover:border-[#23DDC4] shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-opacity-80"
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="w-full h-32 object-cover rounded-t-xl"
          />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-base text-[#0f172a] mb-3">{cat.title}</h3>
            <button
              className={`${buttonStyle} px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:brightness-110`}
            >
              {buttonLabel}
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default CategorySection;
