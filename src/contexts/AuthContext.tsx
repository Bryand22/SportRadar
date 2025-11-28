import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isBusinessUser: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
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

// Configuration Axios unique
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (err: any) {
        console.error("Erreur vérification authentification:", err);
        localStorage.removeItem('token');
        setUser(null);

        // Message d'erreur plus spécifique
        if (err.response?.status === 401) {
          setError('Session expirée, veuillez vous reconnecter');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    // validation basique avant appel réseau
    if (!data || typeof data.password !== 'string' || data.password.length === 0) {
      throw new Error('Mot de passe manquant');
    }

    try {
      const response = await api.post('/auth/login', data);
      const userData = response.data.user;
      setUser(userData); // <-- point-virgule ajouté
      return response.data;
    } catch (error: any) {
      console.error('Erreur de connexion détaillée:', error);
      const errorMessage = error.response?.data?.msg || error.message || 'Erreur de connexion';
      throw new Error(errorMessage);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Tentative d'inscription avec:", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      });

      // S'assurer que consent est true
      const registerData = {
        ...data,
        consent: true, // Forcer le consentement
        isBusinessUser: data.isBusinessUser || false
      };

      // data.password doit être le mot de passe brut — le serveur le hashera
      const response = await api.post('/auth/register', data);
      console.log("Réponse register:", response.data);

      // Stocker le token et connecter l'utilisateur
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);

      return response.data;
    } catch (error: any) {
      console.error("Erreur d'inscription détaillée:", error);

      const serverMsg = error.response?.data?.msg ||
        error.response?.data?.message ||
        'Erreur lors de l\'inscription';

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