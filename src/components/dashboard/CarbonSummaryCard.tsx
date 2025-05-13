import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CarbonSummaryCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  customColor?: string;
  isPositiveGood?: boolean;
}

const CarbonSummaryCard: React.FC<CarbonSummaryCardProps> = ({
  title,
  value,
  change,
  icon,
  customColor,
  isPositiveGood = false,
}) => {
  const getStatusColor = (change: number) => {
    if (isPositiveGood) {
      return change > 0 ? 'text-success-500' : 'text-error-500';
    } else {
      return change > 0 ? 'text-error-500' : 'text-success-500';
    }
  };

  const getStatusIcon = (change: number) => {
    if (isPositiveGood) {
      return change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
    } else {
      return change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`card p-5 shadow-sm ${customColor || ''}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-xl font-bold mt-1">{value}</h3>
          {change !== undefined && (
            <div className={`flex items-center mt-1 text-sm ${getStatusColor(change)}`}>
              <span className="mr-1">{getStatusIcon(change)}</span>
              <span>{Math.abs(change)}%</span>
              <span className="ml-1 text-gray-500">vs. last period</span>
            </div>
          )}
        </div>
        <div className="p-2 rounded-lg bg-gray-100">{icon}</div>
      </div>
    </motion.div>
  );
};

export default CarbonSummaryCard;