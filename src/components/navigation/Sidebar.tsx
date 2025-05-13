import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, BarChart2, Trophy, Users, Calculator, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/calculator', icon: <Calculator size={20} />, label: 'Calculator' },
    { path: '/achievements', icon: <Trophy size={20} />, label: 'Achievements' },
    { path: '/leaderboard', icon: <Users size={20} />, label: 'Leaderboard' },
  ];

  return (
    <>
      {/* Mobile sidebar background overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-30 w-64 h-screen flex flex-col bg-white border-r border-gray-200 md:translate-x-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <NavLink to="/" className="flex items-center" onClick={() => onClose()}>
            <span className="text-primary-600 font-bold text-xl">EcoStep</span>
          </NavLink>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* User profile summary */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 overflow-hidden">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user?.name} className="h-full w-full object-cover" />
              ) : (
                <span className="font-medium text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-800">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.points} points</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Level {user?.level}</span>
              <span>Next: {(user?.level || 0) + 1}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: `${(user?.points || 0) % 1000 / 10}%` }}  
              />
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <NavLink
            to="/about"
            onClick={() => onClose()}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Info size={20} className="mr-3" />
            About EcoStep
          </NavLink>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;