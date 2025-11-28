import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!password) throw new Error('Le mot de passe est requis');
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      setError(err?.message || "Impossible de se connecter");
    } finally {
      setLoading(false);
    }
  };

  // For demo purpose, provide quick login options
  const handleDemoLogin = async (type: 'user' | 'business') => {
    setLoading(true);
    try {
      if (type === 'user') {
        await login({ email: 'user@example.com', password: 'password' });
      } else {
        await login({ email: 'business@example.com', password: 'password' });
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-card">
        <div className="text-center">
          <div className="flex justify-center">
            <Activity className="h-12 w-12 text-primary-500" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-neutral-800">
            Connexion
          </h2>
          <p className="mt-2 text-neutral-600">
            Accédez à votre espace personnel
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : null}
              Se connecter
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">
                Ou pour une démonstration
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
              className="btn-outline text-sm py-2"
            >
              Compte utilisateur
            </button>
            <button
              onClick={() => handleDemoLogin('business')}
              disabled={loading}
              className="btn-outline text-sm py-2"
            >
              Compte entreprise
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-neutral-600">
            Pas encore de compte ?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}