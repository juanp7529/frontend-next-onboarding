'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { LoginCredentials } from '@/types/auth.types';

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      console.log(response);
      if (response.data.access_token) {
        return { success: true, ...response };
      } else {
        setError('Login failed');
        return { success: false, error: 'Login failed' };
      }
    } catch (err) {
      console.log(err);
      const errorMessage = 'Las credenciales son incorrectas';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
      router.push('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    logout,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

