import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
// 1. On importe l'instance 'api' que nous venons de configurer
import apiService from '../services/API'; 

// Note : Comme apiService exporte un objet avec des méthodes, 
// on va utiliser les méthodes de l'objet pour les appels, 
// ou l'instance axios interne si besoin.
// Pour simplifier, on va extraire l'instance axios pour les appels directs.
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://sportradar2.onrender.com/api',
});

// Ré-application des intercepteurs pour la sécurité locale au contexte
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
        // Utilise l'URL corrigée
        const response = await api.get('/auth/me');
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
      const response = await api.post('/auth/login', data);
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

      // Appel vers le backend Render
      const response = await api.post('/auth/register', registerData);
      
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error: any) {
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
