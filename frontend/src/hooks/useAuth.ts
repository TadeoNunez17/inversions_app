import { useState, useCallback } from 'react';

interface AuthState {
  userId: string;
  email: string;
  role: 'viewer' | 'trader' | 'admin';
  isAuthenticated: boolean;
}

export function useAuth() {
  const [auth] = useState<AuthState>({
    userId: 'demo-user-1',
    email: 'demo@inversions.app',
    role: 'trader',
    isAuthenticated: true
  });

  const login = useCallback(async (email: string) => {
    console.log('Login not implemented in demo', { email });
  }, []);

  const logout = useCallback(() => {
    console.log('Logout not implemented in demo');
  }, []);

  return { auth, login, logout };
}
