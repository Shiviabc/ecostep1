import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Award, User, Mail, Calendar, MapPin, Trash2, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: 'San Francisco, CA',
    joinDate: 'April 2023',
    bio: 'Passionate about sustainability and reducing my carbon footprint. I enjoy hiking, cycling, and exploring nature.',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile data logic would go here
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      location: 'San Francisco, CA',
      joinDate: 'April 2023',
      bio: 'Passionate about sustainability and reducing my carbon footprint. I enjoy hiking, cycling, and exploring nature.',
    });
    setIsEditing(false);
  };
  
  // Recent activities
  const recentActivities = [
    {
      id: '1',
      type: 'achievement',
      title: 'Earned "Zero Waste Week" achievement',
      icon: <Award className="w-5 h-5 text-primary-600" />,
      date: '2 days ago',
    },
    {
      id: '2',
      type: 'calculation',
      title: 'Completed carbon footprint calculation',
      icon: <Calendar className="w-5 h-5 text-green-600" />,
      date: '3 days ago',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Earned "Green Commuter" achievement',
      icon: <Award className="w-5 h-5 text-primary-600" />,
      date: '1 week ago',
    },
    {
      id: '4',
      type: 'level',
      title: 'Reached Level 3',
      icon: <Award className="w-5 h-5 text-yellow-600" />,
      date: '2 weeks ago',
    },
  ];
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card overflow-hidden"
          >
            {/* Cover image */}
            <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            
            {/* Profile info */}
            <div className="p-6 relative">
              {/* Avatar */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-4 border-white bg-primary-100 flex items-center justify-center text-primary-600 overflow-hidden">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user?.name} className="h-full w-full object-cover" />
                    ) : (
                      <User size={40} />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1 rounded-full bg-primary-600 text-white shadow-sm">
                    <Camera size={14} />
                  </button>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-500 text-sm">Level {user?.level} Eco Warrior</p>
                
                <div className="mt-4 flex justify-center">
                  <div className="px-3 py-1 bg-primary-50 rounded-full text-primary-700 text-sm font-medium">
                    {user?.points} Points
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-xs mb-1">
                    <span>To Level {(user?.level || 0) + 1}</span>
                    <span>{user?.points}/1000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(user?.points || 0) % 1000 / 10}%` }}  
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Joined April 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="card p-6 mt-6"
          >
            <h3 className="text-lg font-semibold mb-4">My Impact</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Carbon Reduction</span>
                  <span className="text-green-600">-124 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-3/4" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Achievements</span>
                  <span>5/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-1/3" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Community Rank</span>
                  <span>#42</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right column */}
        <div className="lg:col-span-2">
          {/* Profile details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Profile Details</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-primary-600 text-sm font-medium"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                  <p className="mt-1">{formData.name}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                  <p className="mt-1">{formData.email}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="mt-1">{formData.location}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                  <p className="mt-1 text-gray-600">{formData.bio}</p>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card p-6 mt-6"
          >
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="ml-4 flex-1 border-b border-gray-100 pb-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="card p-6 mt-6 border-red-100"
          >
            <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
              </div>
              <button className="flex items-center px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-md hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;