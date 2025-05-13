import React from 'react';
import { motion } from 'framer-motion';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  points: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  title, 
  description, 
  icon, 
  earnedDate, 
  points 
}) => {
  return (
    <motion.div 
      className="card p-4 flex items-center"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="bg-primary-50 p-3 rounded-lg mr-4 text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{earnedDate}</span>
          <span className="text-xs font-medium text-primary-600">+{points} points</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;