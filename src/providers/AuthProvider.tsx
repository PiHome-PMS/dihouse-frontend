import type { LoginCredentials, User } from '@/types';
import { type ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth provider - manages user state
 * Uses HttpOnly cookies for token storage (secure)
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('auth_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (credentials.email === 'admin@gmail.com' && credentials.password === '123456') {
      const mockUser: User = {
        id: '1',
        email: 'admin@gmail.com',
        name: 'Administrator',
        role: 'admin',
        permissions: ['admin:all'],
        createdAt: new Date().toISOString(),
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
