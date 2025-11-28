import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Pen, LogOut, CheckCircle2, Clock, Activity, Flame, Award, LucideIcon } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  unlocked: boolean;
}

interface UserData {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  goals: string[];
  stats: {
    completedActivities: number;
    totalHours: number;
    avgIntensity: number;
    activeStreak: number;
  };
  badges: Badge[];
}

const StatItem: React.FC<{
  icon: LucideIcon;
  label: string;
  value: number | string;
  colorClass?: string;
}> = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex items-center">
    <Icon className={`w-6 h-6 ${colorClass || 'text-current'}`} />
    <div className="ml-2">
      <div className="text-2xl font-bold font-montserrat">{value}</div>
      <div className="text-sm font-open-sans">{label}</div>
    </div>
  </div>
);

const BadgeItem: React.FC<{ badge: Badge }> = ({ badge }) => {
  const isSportZen = badge.name === 'SportZen' && badge.unlocked;
  return (
    <div
      className={`flex items-center p-2 rounded-lg ${isSportZen ? 'bg-[#E8F5E9] border border-[#4CAF50]' : 'bg-[#F5F5F5]'
        }`}
    >
      <Award className={`w-5 h-5 ${isSportZen ? 'text-[#4CAF50]' : 'text-[#00BCD4]'}`} />
      <span className={`ml-2 font-open-sans ${isSportZen ? 'font-bold' : ''}`}>
        {badge.name}
      </span>
    </div>
  );
};

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <div className="p-4 text-center">Utilisateur non connecté.</div>;
  }

  // Préparation des données utilisateur
  const fullName = `${user.firstName} ${user.lastName}`;
  const chipColors = ['#00BCD4', '#4CAF50', '#FF9800']; // Couleurs pour les chips d'objectifs
  const hasSportZen = user.badges.some(b => b.name === 'SportZen' && b.unlocked);
  const sortedBadges = [...user.badges].sort((a, b) => {
    // Met le badge SportZen en premier s'il est débloqué
    if (a.name === 'SportZen' && a.unlocked) return -1;
    if (b.name === 'SportZen' && b.unlocked) return 1;
    return 0;
  });

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 md:p-8 text-[#424242]">
      {/* Carte d'entête : avatar et salutation */}
      <div className="bg-[#F5F5F5] p-4 rounded-lg shadow flex items-center">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="Avatar utilisateur"
            className="w-20 h-20 rounded-full mr-4"
          />
        ) : (
          <div className="w-20 h-20 bg-[#F5F5F5] flex items-center justify-center rounded-full mr-4">
            <User className="w-10 h-10 text-[#424242]" />
          </div>
        )}
        <h2 className="text-3xl font-bold font-montserrat">
          Bonjour {fullName} <span role="img" aria-label="Waving hand">👋</span>
        </h2>
      </div>

      {/* Carte des objectifs */}
      <div className="bg-[#F5F5F5] p-4 rounded-lg shadow mt-4">
        <h3 className="text-xl font-bold font-montserrat mb-2">Mes objectifs</h3>
        {user.goals && user.goals.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.goals.map((goal, index) => (
              <span
                key={goal}
                className="text-white text-sm font-open-sans px-3 py-1 rounded-full"
                style={{ backgroundColor: chipColors[index % chipColors.length] }}
              >
                {goal}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm font-open-sans">Aucun objectif défini.</p>
        )}
      </div>

      {/* Carte des statistiques personnelles */}
      <div className="bg-[#F5F5F5] p-4 rounded-lg shadow mt-4">
        <h3 className="text-xl font-bold font-montserrat mb-2">Mes statistiques</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatItem
            icon={CheckCircle2}
            label="Activités terminées"
            value={user.stats.completedActivities}
            colorClass="text-[#4CAF50]"
          />
          <StatItem
            icon={Clock}
            label="Heures actives au total"
            value={user.stats.totalHours}
            colorClass="text-[#00BCD4]"
          />
          <StatItem
            icon={Activity}
            label="Intensité moyenne"
            value={user.stats.avgIntensity}
            colorClass="text-[#FF9800]"
          />
          <StatItem
            icon={Flame}
            label="Jours actifs consécutifs"
            value={user.stats.activeStreak}
            colorClass="text-[#FF9800]"
          />
        </div>
      </div>

      {/* Carte des badges obtenus */}
      <div className="bg-[#F5F5F5] p-4 rounded-lg shadow mt-4">
        <h3 className="text-xl font-bold font-montserrat mb-2">Mes badges</h3>
        {user.badges && user.badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sortedBadges.map(badge => (
              <BadgeItem key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <p className="text-sm font-open-sans">Aucun badge obtenu pour le moment.</p>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-wrap justify-end gap-4 mt-6">
        <button
          onClick={handleEditProfile}
          className="flex items-center px-4 py-2 rounded bg-[#00BCD4] text-white font-open-sans hover:bg-[#00acc1]"
        >
          <Pen className="w-4 h-4 mr-2" />
          Modifier mon profil
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded bg-[#FF9800] text-white font-open-sans hover:bg-[#fb8c00]"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
