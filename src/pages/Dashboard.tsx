import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Award, Calendar, AlertTriangle, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CarbonSummaryCard from '../components/dashboard/CarbonSummaryCard';
import AchievementCard from '../components/dashboard/AchievementCard';
import RecommendationCard from '../components/dashboard/RecommendationCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for charts
  const carbonData = [
    { name: 'Mon', transport: 3.4, home: 2.1, food: 1.2, waste: 0.5 },
    { name: 'Tue', transport: 2.8, home: 2.0, food: 1.5, waste: 0.7 },
    { name: 'Wed', transport: 3.1, home: 2.3, food: 1.1, waste: 0.4 },
    { name: 'Thu', transport: 2.5, home: 2.1, food: 1.3, waste: 0.6 },
    { name: 'Fri', transport: 2.9, home: 1.9, food: 1.2, waste: 0.5 },
    { name: 'Sat', transport: 1.8, home: 2.2, food: 1.7, waste: 0.8 },
    { name: 'Sun', transport: 1.5, home: 2.4, food: 1.4, waste: 0.3 }
  ];

  const pieData = [
    { name: 'Transport', value: 42, color: '#2D6A4F' },
    { name: 'Home', value: 28, color: '#40916C' },
    { name: 'Food', value: 20, color: '#52B788' },
    { name: 'Waste', value: 10, color: '#B7E4C7' }
  ];

  const getStatusColor = (change: number) => {
    if (change > 0) return 'text-error-500';
    if (change < 0) return 'text-success-500';
    return 'text-gray-500';
  };

  const getStatusIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/calculator')}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Record Emissions
          </button>
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarbonSummaryCard 
          title="This Week"
          value="18.2 kg"
          change={-12.5}
          icon={<Calendar className="w-5 h-5 text-primary-600" />}
        />
        <CarbonSummaryCard 
          title="Monthly Average"
          value="82.7 kg"
          change={-8.3}
          icon={<TrendingDown className="w-5 h-5 text-success-500" />}
        />
        <CarbonSummaryCard 
          title="Your Rank"
          value={`#${42}`}
          change={5}
          icon={<Award className="w-5 h-5 text-warning-500" />}
          isPositiveGood={true}
        />
        <CarbonSummaryCard 
          title="Carbon Intensity"
          value="Medium"
          icon={<AlertTriangle className="w-5 h-5 text-warning-500" />}
          customColor="bg-warning-50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly trends chart */}
        <motion.div 
          className="card col-span-2 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-4">Weekly Carbon Footprint</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carbonData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value} kg`}
                />
                <Tooltip 
                  formatter={(value) => [`${value} kg`, '']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="transport" stackId="a" fill="#2D6A4F" name="Transport" />
                <Bar dataKey="home" stackId="a" fill="#40916C" name="Home" />
                <Bar dataKey="food" stackId="a" fill="#52B788" name="Food" />
                <Bar dataKey="waste" stackId="a" fill="#B7E4C7" name="Waste" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Carbon breakdown */}
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">Carbon Breakdown</h2>
          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center text-sm">
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-gray-600">{item.name}</span>
                <span className="ml-auto font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recommendations and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold">Personalized Recommendations</h2>
          <RecommendationCard 
            title="Try carpooling once this week"
            description="Sharing your commute just once can reduce your transport emissions by 7%"
            category="Transport"
            impact="Medium"
            points={50}
          />
          <RecommendationCard 
            title="Lower your thermostat by 1°C"
            description="Reducing heating temperature slightly can save energy and reduce emissions"
            category="Home"
            impact="High"
            points={75}
          />
          <RecommendationCard 
            title="Eat vegetarian for one day"
            description="Going meat-free for just one day a week can significantly reduce your food carbon footprint"
            category="Food"
            impact="High"
            points={60}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold">Recent Achievements</h2>
          <AchievementCard 
            title="Zero Waste Week"
            description="Reduced your waste to less than 1kg for an entire week"
            icon="🌱"
            earnedDate="2 days ago"
            points={150}
          />
          <AchievementCard 
            title="Green Commuter"
            description="Used public transport or biked for 5 consecutive days"
            icon="🚲"
            earnedDate="1 week ago"
            points={200}
          />
          <AchievementCard 
            title="Energy Saver"
            description="Reduced your home energy consumption by 20% from previous month"
            icon="⚡"
            earnedDate="2 weeks ago"
            points={300}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;