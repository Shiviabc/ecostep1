import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Medal, Trophy, Award, Zap, Leaf, Star, Heart, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  category: string;
  unlocked: boolean;
  progress?: number;
  date?: string;
}

const Achievements: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first carbon footprint calculation',
      icon: <Leaf className="w-6 h-6" />,
      points: 50,
      category: 'beginner',
      unlocked: true,
      date: '2023-04-15',
    },
    {
      id: '2',
      title: 'Profile Perfectionist',
      description: 'Complete your profile with all details',
      icon: <Star className="w-6 h-6" />,
      points: 25,
      category: 'beginner',
      unlocked: true,
      date: '2023-04-16',
    },
    {
      id: '3',
      title: 'Carbon Conscious',
      description: 'Calculate your footprint 5 days in a row',
      icon: <TrendingUp className="w-6 h-6" />,
      points: 100,
      category: 'regular',
      unlocked: true,
      date: '2023-05-02',
    },
    {
      id: '4',
      title: 'Zero Waste Week',
      description: 'Reduce your waste to less than 1kg for a week',
      icon: <Zap className="w-6 h-6" />,
      points: 150,
      category: 'waste',
      unlocked: true,
      date: '2023-05-17',
    },
    {
      id: '5',
      title: 'Green Commuter',
      description: 'Use eco-friendly transportation for 10 days',
      icon: <Heart className="w-6 h-6" />,
      points: 200,
      category: 'transport',
      unlocked: false,
      progress: 60,
    },
    {
      id: '6',
      title: 'Energy Saver',
      description: 'Reduce energy consumption by 20% from your baseline',
      icon: <Zap className="w-6 h-6" />,
      points: 250,
      category: 'home',
      unlocked: false,
      progress: 45,
    },
    {
      id: '7',
      title: 'Plant-Based Pioneer',
      description: 'Choose plant-based meals for 7 consecutive days',
      icon: <Leaf className="w-6 h-6" />,
      points: 175,
      category: 'food',
      unlocked: false,
      progress: 30,
    },
    {
      id: '8',
      title: 'Climate Champion',
      description: 'Maintain a carbon footprint 30% below average for a month',
      icon: <Trophy className="w-6 h-6" />,
      points: 500,
      category: 'advanced',
      unlocked: false,
      progress: 10,
    },
    {
      id: '9',
      title: 'Eco Influencer',
      description: 'Invite 5 friends to join EcoStep',
      icon: <Medal className="w-6 h-6" />,
      points: 300,
      category: 'social',
      unlocked: false,
      progress: 20,
    },
  ];
  
  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return achievement.category === filter;
  });
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'unlocked', name: 'Unlocked' },
    { id: 'locked', name: 'Locked' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'transport', name: 'Transport' },
    { id: 'home', name: 'Home' },
    { id: 'food', name: 'Food' },
    { id: 'waste', name: 'Waste' },
    { id: 'advanced', name: 'Advanced' },
  ];
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'transport':
        return 'bg-purple-100 text-purple-800';
      case 'home':
        return 'bg-yellow-100 text-yellow-800';
      case 'food':
        return 'bg-green-100 text-green-800';
      case 'waste':
        return 'bg-gray-100 text-gray-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      case 'social':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-primary-100 text-primary-800';
    }
  };
  
  const totalUnlocked = achievements.filter((a) => a.unlocked).length;
  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((total, a) => total + a.points, 0);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h1>
      
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">{totalUnlocked}</div>
            <div className="text-sm text-gray-500 mt-1">Achievements Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">{achievements.length}</div>
            <div className="text-sm text-gray-500 mt-1">Total Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">{totalPoints}</div>
            <div className="text-sm text-gray-500 mt-1">Points Earned</div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{Math.round((totalUnlocked / achievements.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${(totalUnlocked / achievements.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </motion.div>
      
      {/* Filter */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
                filter === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Achievements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`card p-5 ${
              !achievement.unlocked ? 'opacity-70' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${getCategoryColor(achievement.category)}`}>
                {achievement.icon}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(achievement.category)}`}>
                {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg">
              {achievement.title}
              {achievement.unlocked && (
                <span className="ml-2 text-yellow-500">
                  <Award size={16} className="inline" />
                </span>
              )}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
            
            {achievement.unlocked ? (
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Achieved on {new Date(achievement.date!).toLocaleDateString()}
                </span>
                <span className="text-primary-600 font-medium text-sm">+{achievement.points} pts</span>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary-500 h-1.5 rounded-full" 
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-gray-600 font-medium text-sm">+{achievement.points} pts</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;