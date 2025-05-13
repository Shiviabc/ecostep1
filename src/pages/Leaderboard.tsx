import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  level: number;
  points: number;
  badges: number;
  footprint: number;
  change: number;
  isCurrentUser?: boolean;
}

const Leaderboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<'points' | 'footprint'>('points');
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'allTime'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock leaderboard data
  const leaderboardData: User[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      level: 8,
      points: 3250,
      badges: 14,
      footprint: 42,
      change: -12,
    },
    {
      id: '2',
      name: 'Liam Wilson',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      level: 7,
      points: 2860,
      badges: 11,
      footprint: 56,
      change: -8,
    },
    {
      id: '3',
      name: 'Olivia Martinez',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      level: 9,
      points: 3780,
      badges: 17,
      footprint: 38,
      change: -15,
    },
    {
      id: '4',
      name: 'Noah Thompson',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
      level: 6,
      points: 2340,
      badges: 9,
      footprint: 63,
      change: -4,
    },
    {
      id: '5',
      name: 'John Doe',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      level: 3,
      points: 750,
      badges: 5,
      footprint: 78,
      change: -7,
      isCurrentUser: true,
    },
    {
      id: '6',
      name: 'Sophia Lee',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
      level: 5,
      points: 1850,
      badges: 8,
      footprint: 67,
      change: -6,
    },
    {
      id: '7',
      name: 'Ava Rodriguez',
      avatarUrl: 'https://i.pravatar.cc/150?img=9',
      level: 4,
      points: 1450,
      badges: 6,
      footprint: 72,
      change: -5,
    },
    {
      id: '8',
      name: 'Benjamin Clark',
      avatarUrl: 'https://i.pravatar.cc/150?img=11',
      level: 6,
      points: 2100,
      badges: 10,
      footprint: 61,
      change: -9,
    },
    {
      id: '9',
      name: 'Charlotte White',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
      level: 7,
      points: 2550,
      badges: 12,
      footprint: 53,
      change: -10,
    },
    {
      id: '10',
      name: 'Isabella Hall',
      avatarUrl: 'https://i.pravatar.cc/150?img=16',
      level: 8,
      points: 3050,
      badges: 15,
      footprint: 45,
      change: -11,
    },
  ];
  
  // Sort leaderboard data
  const sortedData = [...leaderboardData]
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'points') {
        return b.points - a.points;
      } else {
        return a.footprint - b.footprint;
      }
    });
  
  // Find current user ranking
  const currentUserRank = sortedData.findIndex((user) => user.isCurrentUser) + 1;
  
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-yellow-700" />;
      default:
        return <span className="font-bold text-gray-500">{rank}</span>;
    }
  };
  
  const getTimeFrameLabel = () => {
    switch (timeFrame) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'allTime':
        return 'All Time';
      default:
        return 'This Week';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Leaderboard</h1>
          <p className="text-sm text-gray-500 mt-1">See how you compare to others in our community</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeFrame('week')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                timeFrame === 'week'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeFrame('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                timeFrame === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeFrame('allTime')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                timeFrame === 'allTime'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>
      
      {/* Your ranking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6 mb-6"
      >
        <h2 className="text-lg font-semibold">Your Ranking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <span className="text-lg font-bold text-primary-600">#{currentUserRank}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Your position</span>
              <p className="font-medium">#{currentUserRank} of {sortedData.length}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Points earned</span>
              <p className="font-medium">750 points</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Achievements</span>
              <p className="font-medium">5 unlocked</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Search and sort options */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        
        <div className="flex space-x-2 items-center">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">Sort by:</span>
          <button
            onClick={() => setSortBy('points')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              sortBy === 'points'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Points
          </button>
          <button
            onClick={() => setSortBy('footprint')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              sortBy === 'footprint'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Low Footprint
          </button>
        </div>
      </div>
      
      {/* Leaderboard table */}
      <div className="overflow-hidden card">
        <div className="sm:rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carbon Footprint
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((user, index) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={user.isCurrentUser ? 'bg-primary-50' : 'hover:bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getMedalIcon(index + 1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-primary-100 text-primary-600 font-medium">
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {user.name}
                          {user.isCurrentUser && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-700">You</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{user.badges} achievements</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Level {user.level}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.points.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.footprint} kg/week</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${user.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {user.change < 0 ? (
                        <ChevronDown className="w-4 h-4 mr-1" />
                      ) : (
                        <ChevronUp className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(user.change)}%
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;