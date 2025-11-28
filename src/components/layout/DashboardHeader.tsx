import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, Menu, X, Bell, User } from 'lucide-react';

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, isBusinessUser } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const dashboardRoot = isBusinessUser ? '/business' : '/dashboard';

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              className="mr-2 md:hidden text-neutral-700"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to={dashboardRoot} className="flex items-center space-x-2">
              <Activity className="h-7 w-7 text-primary-500" />
              <span className="text-lg font-montserrat font-bold text-neutral-800">
                Sport<span className="text-primary-500">Radar</span>
              </span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors"
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>
              
              {/* Notification dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-neutral-200 z-50">
                  <div className="px-4 py-2 border-b border-neutral-200">
                    <h6 className="font-medium">Notifications</h6>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100">
                      <p className="text-sm font-medium">Nouvelle activité proche de chez vous</p>
                      <p className="text-xs text-neutral-500 mt-1">Il y a 2 heures</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100">
                      <p className="text-sm font-medium">Badge débloqué !</p>
                      <p className="text-xs text-neutral-500 mt-1">Hier</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-neutral-200 text-center">
                    <a href="#" className="text-sm text-primary-500 hover:text-primary-600">Voir toutes les notifications</a>
                  </div>
                </div>
              )}
            </div>
            
            {/* User */}
            <div className="flex items-center space-x-3">
              <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
              <Link to={`${dashboardRoot}/profile`} className="flex-shrink-0">
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User size={20} className="text-primary-600" />
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-neutral-200 py-3 px-4">
          <div className="flex flex-col space-y-2">
            {isBusinessUser ? (
              <>
                <Link 
                  to="/business" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Tableau de bord
                </Link>
                <Link 
                  to="/business/employees" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Employés
                </Link>
                <Link 
                  to="/business/challenges" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Défis
                </Link>
                <Link 
                  to="/business/reports" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Rapports
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Tableau de bord
                </Link>
                <Link 
                  to="/dashboard/profile" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Mon profil
                </Link>
                <Link 
                  to="/dashboard/planning" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Mon planning
                </Link>
                <Link 
                  to="/dashboard/badges" 
                  className="px-3 py-2 rounded-md text-neutral-700 hover:bg-neutral-100"
                  onClick={toggleMobileMenu}
                >
                  Mes badges
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}