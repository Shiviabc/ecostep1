import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Home, Leaf, Trash2, Plane, Train, Bus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface EmissionsData {
  category: string;
  amount: number;
  details: {
    transportType?: string;
    distance?: number;
    energyUsage?: number;
    mealType?: string;
    wasteType?: string;
  };
}

const CarbonCalculator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('transport');
  const [formData, setFormData] = useState<EmissionsData>({
    category: 'transport',
    amount: 0,
    details: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    {
      id: 'transport',
      name: 'Transport',
      icon: <Car className="w-6 h-6" />,
      color: 'bg-primary-100 text-primary-600',
      description: 'Track emissions from different modes of transport'
    },
    {
      id: 'energy',
      name: 'Energy',
      icon: <Home className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600',
      description: 'Calculate emissions from your energy consumption'
    },
    {
      id: 'diet',
      name: 'Diet',
      icon: <Leaf className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600',
      description: 'Track emissions from your food choices'
    },
    {
      id: 'waste',
      name: 'Waste',
      icon: <Trash2 className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600',
      description: 'Monitor emissions from waste generation'
    }
  ];

  const transportOptions = [
    { id: 'car', name: 'Car', icon: <Car className="w-5 h-5" />, factor: 0.2 },
    { id: 'bus', name: 'Bus', icon: <Bus className="w-5 h-5" />, factor: 0.08 },
    { id: 'train', name: 'Train', icon: <Train className="w-5 h-5" />, factor: 0.04 },
    { id: 'plane', name: 'Plane', icon: <Plane className="w-5 h-5" />, factor: 0.25 }
  ];

  const energySources = [
    { id: 'coal', name: 'Coal', factor: 0.9 },
    { id: 'natural-gas', name: 'Natural Gas', factor: 0.4 },
    { id: 'renewable', name: 'Renewable', factor: 0.01 },
    { id: 'mixed', name: 'Mixed Sources', factor: 0.5 }
  ];

  const dietTypes = [
    { id: 'meat-heavy', name: 'Meat Heavy', factor: 3.3 },
    { id: 'balanced', name: 'Balanced', factor: 2.5 },
    { id: 'vegetarian', name: 'Vegetarian', factor: 1.7 },
    { id: 'vegan', name: 'Vegan', factor: 1.5 }
  ];

  const wasteTypes = [
    { id: 'landfill', name: 'Landfill', factor: 0.5 },
    { id: 'recycled', name: 'Recycled', factor: 0.1 },
    { id: 'composted', name: 'Composted', factor: 0.05 }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value
      }
    }));
  };

  const calculateEmissions = () => {
    let emissions = 0;
    
    switch (activeCategory) {
      case 'transport':
        const transport = transportOptions.find(t => t.id === formData.details.transportType);
        emissions = (formData.details.distance || 0) * (transport?.factor || 0);
        break;
      case 'energy':
        const source = energySources.find(s => s.id === formData.details.energySource);
        emissions = (formData.details.energyUsage || 0) * (source?.factor || 0);
        break;
      case 'diet':
        const diet = dietTypes.find(d => d.id === formData.details.mealType);
        emissions = (diet?.factor || 0);
        break;
      case 'waste':
        const waste = wasteTypes.find(w => w.id === formData.details.wasteType);
        emissions = (formData.details.amount || 0) * (waste?.factor || 0);
        break;
    }

    return Math.round(emissions * 100) / 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const emissions = calculateEmissions();
      const { data, error } = await supabase
        .from('carbon_entries')
        .insert([
          {
            category: activeCategory,
            amount: emissions,
            details: formData.details
          }
        ]);

      if (error) throw error;

      setSuccessMessage('Emissions recorded successfully!');
      setFormData({ category: activeCategory, amount: 0, details: {} });
    } catch (error) {
      console.error('Error submitting emissions:', error);
      setErrorMessage('Failed to save emissions data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (activeCategory) {
      case 'transport':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transport Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {transportOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleInputChange('transportType', option.id)}
                    className={`flex items-center p-3 rounded-lg border ${
                      formData.details.transportType === option.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {option.icon}
                    <span className="ml-2">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </label>
              <input
                type="number"
                value={formData.details.distance || ''}
                onChange={(e) => handleInputChange('distance', parseFloat(e.target.value))}
                className="input"
                placeholder="Enter distance in kilometers"
              />
            </div>
          </div>
        );

      case 'energy':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Source
              </label>
              <select
                value={formData.details.energySource || ''}
                onChange={(e) => handleInputChange('energySource', e.target.value)}
                className="input"
              >
                <option value="">Select energy source</option>
                {energySources.map(source => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Usage (kWh)
              </label>
              <input
                type="number"
                value={formData.details.energyUsage || ''}
                onChange={(e) => handleInputChange('energyUsage', parseFloat(e.target.value))}
                className="input"
                placeholder="Enter monthly energy usage"
              />
            </div>
          </div>
        );

      case 'diet':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diet Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {dietTypes.map(diet => (
                  <button
                    key={diet.id}
                    type="button"
                    onClick={() => handleInputChange('mealType', diet.id)}
                    className={`p-3 rounded-lg border ${
                      formData.details.mealType === diet.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {diet.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'waste':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waste Type
              </label>
              <select
                value={formData.details.wasteType || ''}
                onChange={(e) => handleInputChange('wasteType', e.target.value)}
                className="input"
              >
                <option value="">Select waste type</option>
                {wasteTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (kg)
              </label>
              <input
                type="number"
                value={formData.details.amount || ''}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                className="input"
                placeholder="Enter waste amount in kilograms"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Carbon Emissions Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(category.id)}
            className={`p-4 rounded-lg ${
              activeCategory === category.id
                ? `${category.color} border-2 border-primary-600`
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              {category.icon}
              <span className="mt-2 font-medium">{category.name}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card p-6"
      >
        <form onSubmit={handleSubmit}>
          {renderForm()}
          
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Saving...' : 'Calculate & Save'}
            </button>
          </div>
        </form>

        {calculateEmissions() > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Estimated Emissions</h3>
            <p className="mt-2 text-3xl font-bold text-primary-600">
              {calculateEmissions()} kg CO<sub>2</sub>e
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This is an estimate based on average emission factors
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CarbonCalculator;