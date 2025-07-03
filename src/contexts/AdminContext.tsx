
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: number;
  username: string;
  role: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken) {
      try {
        const userData = JSON.parse(atob(adminToken));
        if (userData.exp > Date.now() / 1000) {
          setUser(userData.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_token');
        }
      } catch (error) {
        localStorage.removeItem('admin_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Check for demo admin credentials first
      const isDemoAdmin = (
        (username === 'admin' || username === 'admin@cakesrbakes.com') && 
        password === 'admin123'
      );

      if (isDemoAdmin) {
        // Create demo admin user
        const adminUser = {
          id: 1,
          username: username === 'admin' ? 'admin' : 'admin@cakesrbakes.com',
          email: 'admin@cakesrbakes.com',
          role: 'admin'
        };

        setUser(adminUser);
        setIsAuthenticated(true);
        
        // Store admin token
        const token = btoa(JSON.stringify({
          user: adminUser,
          exp: Date.now() / 1000 + (24 * 60 * 60) // 24 hours
        }));
        localStorage.setItem('admin_token', token);
        
        return true;
      }

      // If not demo credentials, try the backend API
      const response = await fetch('/backend/api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (data.status === 'success' && data.data.user) {
        // Check if user has admin role
        const adminUser = data.data.user;
        if (adminUser.username === 'admin' || adminUser.email === 'admin@cakesrbakes.com') {
          setUser(adminUser);
          setIsAuthenticated(true);
          
          // Store admin token
          const token = btoa(JSON.stringify({
            user: adminUser,
            exp: Date.now() / 1000 + (24 * 60 * 60) // 24 hours
          }));
          localStorage.setItem('admin_token', token);
          
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Admin login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin_token');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
