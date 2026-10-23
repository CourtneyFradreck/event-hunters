import { createContext, useContext, useState, ReactNode } from 'react';
import { logger } from '@/utils/logger';

type Role = 'organiser' | 'caterer';

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  login: (role?: Role) => void;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>('organiser');

  const login = (r: Role = 'organiser') => {
    setRole(r);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = () => {
    if (!__DEV__ || !isAuthenticated) return;
    const next = role === 'organiser' ? 'caterer' : 'organiser';
    setRole(next);
    logger.trackEvent('Demo Role Switched', { from: role, to: next });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
