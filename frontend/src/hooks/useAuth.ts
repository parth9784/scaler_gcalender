import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../services/api';
import type { SignupData, LoginData } from '../types';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, logout: logoutStore } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(data);
      setAuth(response.user, response.token.access_token);
      toast.success(`Welcome, ${response.user.first_name || response.user.username}!`);
      return response.user;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Signup failed';
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(data);
      setAuth(response.user, response.token.access_token);
      toast.success(`Welcome back, ${response.user.first_name || response.user.username}!`);
      return response.user;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      logoutStore();
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signup,
    login,
    logout,
  };
};
