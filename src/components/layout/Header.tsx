import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Activity } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isBusinessUser } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateToDashboard = () => {
    if (isBusinessUser) {
      navigate('/business');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-montserrat font-bold text-neutral-800">
              Sport<span className="text-primary-500">Radar</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-500 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/discover" className="text-neutral-700 hover:text-primary-500 transition-colors font-medium">
              Découvrir
            </Link>
            <Link to="/business-info" className="text-neutral-700 hover:text-primary-500 transition-colors font-medium">
              Entreprise
            </Link>
            
            {isAuthenticated ? (
              <button 
                onClick={navigateToDashboard}
                className="btn-primary"
              >
                Mon Espace
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-primary-500 hover:text-primary-600 transition-colors font-medium">
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary">
                  Je m'inscris
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-neutral-700"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-neutral-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={toggleMobileMenu}
            >
              Accueil
            </Link>
            <Link 
              to="/discover" 
              className="text-neutral-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={toggleMobileMenu}
            >
              Découvrir
            </Link>
            <Link 
              to="/business-info" 
              className="text-neutral-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={toggleMobileMenu}
            >
              Entreprise
            </Link>
            
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  navigateToDashboard();
                  toggleMobileMenu();
                }}
                className="btn-primary w-full"
              >
                Mon Espace
              </button>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/login" 
                  className="text-primary-500 hover:text-primary-600 transition-colors font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary w-full text-center"
                  onClick={toggleMobileMenu}
                >
                  Je m'inscris
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}