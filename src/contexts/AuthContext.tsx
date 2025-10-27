import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import type { AuthState, User } from '../types/admin';

interface AuthContextType extends AuthState {
  login: (token: string, username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'bts_admin_token';
const USER_KEY = 'bts_admin_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const hasVerified = useRef(false);

  // Verify token on mount ONCE
  useEffect(() => {
    const verifyToken = async () => {
      // Prevent multiple verification calls
      if (hasVerified.current) {
        return;
      }

      hasVerified.current = true;

      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        try {
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            // Token is valid
            setAuthState({
              isAuthenticated: true,
              user: JSON.parse(storedUser),
              token: storedToken,
            });
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
          }
        } catch (error) {
          console.error('Token verification error:', error);
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      }

      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = useCallback((token: string, username: string) => {
    const user: User = { username, role: 'admin' };

    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Update state
    setAuthState({
      isAuthenticated: true,
      user,
      token,
    });
  }, []);

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Update state
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      token: authState.token,
      login,
      logout,
      isLoading,
    }),
    [authState.isAuthenticated, authState.user, authState.token, login, logout, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
