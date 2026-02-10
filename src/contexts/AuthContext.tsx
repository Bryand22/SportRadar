import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
// On utilise UNIQUEMENT notre service centralisé
import api from '../services/API'; 

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isBusinessUser: boolean;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  error: string | null;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBusinessUser?: boolean;
  consent?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        // Utilise la méthode getMe de ton API.js
        const response = await api.getMe();
        setUser(response.data);
      } catch (err: any) {
        console.error("Erreur vérification authentification:", err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    try {
      setError(null);
      // Utilise la méthode login de ton API.js
      const response = await api.login(data);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.msg || 'Erreur de connexion';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const registerData = {
        ...data,
        consent: true,
        isBusinessUser: data.isBusinessUser || false
      };

      // ✅ C'EST ICI LA CLÉ : On utilise la fonction register définie dans API.js
      const response = await api.register(registerData);
      
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error: any) {
      console.error("Détail erreur register:", error.response);
      const serverMsg = error.response?.data?.msg || 'Erreur lors de l\'inscription';
      setError(serverMsg);
      throw new Error(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isBusinessUser: !!user?.isBusinessUser,
        isLoading,
        login,
        logout,
        register,
        error
      }}
    >
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
