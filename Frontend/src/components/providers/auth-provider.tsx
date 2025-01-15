'use client';
import { REFRESH_TOKEN_INTERVAL } from '@/constants/refresh-token';
import axios from 'axios';
import { createContext, useEffect } from 'react';

type AuthContextProps = {};
export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  useEffect(() => {
    const refreshInterval = REFRESH_TOKEN_INTERVAL;

    const refreshToken = async () => {
      try {
        const response = await axios.post('/api/auth/refresh-token');

        if (!response.data.success) {
          throw new Error('Failed to refresh token');
        }

        console.log('Token refreshed successfully');
      } catch (error) {
        console.error('Error refreshing token:', error);
        window.location.href = '/login';
      }
    };

    refreshToken();

    const intervalId = setInterval(refreshToken, refreshInterval);

    return () => clearInterval(intervalId);
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
