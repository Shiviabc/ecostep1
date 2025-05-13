import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock API endpoint - would be replaced with real endpoint in production
  const API_URL = 'https://api.example.com';

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // For demo purposes, we'll use mock data
          // In a real app, you would verify the token with your backend
          setUser({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            points: 750,
            level: 3,
            avatarUrl: 'https://i.pravatar.cc/150?img=12'
          });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Failed to authenticate');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call here
      // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      // Mock successful login
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        points: 750,
        level: 3,
        avatarUrl: 'https://i.pravatar.cc/150?img=12'
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call here
      // const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      // Mock successful registration
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        points: 0,
        level: 1,
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};