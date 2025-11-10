import { apiClient } from '@/lib/api';
import { LoginCredentials, ILoginResponse } from '@/types/auth.types';

class AuthService {


  async login(credentials: LoginCredentials): Promise<ILoginResponse> {
    try {
      const response = await apiClient.post<ILoginResponse>(
        '/auth/login',
        credentials
      );
      if (response.data.access_token) {
        apiClient.setAuthToken(response.data.access_token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token_expires_in', response.data.expires_in);
          localStorage.setItem('token_type', response.data.token_type);
        }
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Login failed. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      apiClient.clearAuthToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    } catch (error) {
      apiClient.clearAuthToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!apiClient.getAuthToken();
  }
}

export const authService = new AuthService();

