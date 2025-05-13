import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  description: string;
  category: string;
  impact: 'Low' | 'Medium' | 'High';
  points: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  category,
  impact,
  points,
}) => {
  const getImpactColor = () => {
    switch (impact) {
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="card p-4"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transition: { duration: 0.2 } 
      }}
    >
      <div className="flex justify-between">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <div className="flex items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor()}`}>
            {impact} Impact
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">Category: {category}</span>
        <div className="flex items-center">
          <span className="text-sm font-medium text-primary-600 mr-1">+{points} points</span>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;