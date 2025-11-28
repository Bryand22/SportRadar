import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { Home, User, Calendar, Award, LogOut } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  
  const navigationItems = [
    {
      name: 'Tableau de bord',
      path: '/dashboard',
      icon: <Home size={20} />,
    },
    {
      name: 'Mon profil',
      path: '/dashboard/profile',
      icon: <User size={20} />,
    },
    {
      name: 'Mon planning',
      path: '/dashboard/planning',
      icon: <Calendar size={20} />,
    },
    {
      name: 'Mes badges',
      path: '/dashboard/badges',
      icon: <Award size={20} />,
    },
  ];

  return (
    <aside className="w-64 hidden md:block bg-white border-r border-neutral-200 overflow-y-auto">
      <div className="p-4">
        <div className="py-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors',
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-700 hover:bg-neutral-100'
              )}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 my-4"></div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}