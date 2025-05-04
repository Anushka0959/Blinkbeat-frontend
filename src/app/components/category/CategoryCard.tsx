import React from 'react';

// ✅ Define props interface
interface CategoryCardProps {
  title: string;
  image: string;
  buttonText: string;
  buttonStyle?: string; // buttonStyle can be optional
}

// ✅ Use props interface properly
const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, buttonText, buttonStyle }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300 w-48">
    <img src={image} alt={title} className="w-full h-28 object-cover" />
    <div className="p-4 text-center">
      <h3 className="font-semibold mb-2">{title}</h3>
      <button className={`px-4 py-1 rounded-full text-sm font-medium ${buttonStyle || 'bg-[#23DDC4]'}`}>
        {buttonText}
      </button>
    </div>
  </div>
);

export default CategoryCard;
