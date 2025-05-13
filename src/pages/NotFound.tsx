import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-bold text-gray-700">Page Not Found</h2>
        <p className="mt-2 text-base text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go back home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;