import { useAuth } from '../../contexts/AuthContext';
import { BarChart, Users, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { BusinessStats, Challenge, Employee } from '../../types';

// Mock data
const mockStats: BusinessStats = {
  employeesRegistered: 87,
  activeEmployees: 64,
  activitiesCompleted: 352,
  averageSatisfaction: 4.6
};

const mockChallenges: Challenge[] = [
  {
    id: 'c1',
    name: 'Challenge de printemps',
    description: 'Cumulez des kilomètres en marchant ou en courant',
    goal: 1000,
    unit: 'km',
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    participants: 45,
    progress: 76
  },
  {
    id: 'c2',
    name: 'Défi yoga',
    description: 'Pratiquez régulièrement des exercices de relaxation',
    goal: 20,
    unit: 'hours',
    startDate: '2025-04-01',
    endDate: '2025-04-15',
    participants: 32,
    progress: 45
  }
];

const mockTopEmployees: Employee[] = [
  {
    id: 'e1',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    department: 'Marketing',
    activitiesCompleted: 24,
    lastActive: '2025-04-15'
  },
  {
    id: 'e2',
    name: 'Thomas Dupont',
    email: 'thomas.dupont@example.com',
    department: 'RH',
    activitiesCompleted: 18,
    lastActive: '2025-04-14'
  },
  {
    id: 'e3',
    name: 'Camille Leroy',
    email: 'camille.leroy@example.com',
    department: 'Finance',
    activitiesCompleted: 16,
    lastActive: '2025-04-15'
  },
  {
    id: 'e4',
    name: 'Antoine Bernard',
    email: 'antoine.bernard@example.com',
    department: 'IT',
    activitiesCompleted: 15,
    lastActive: '2025-04-13'
  }
];

export default function BusinessDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord entreprise</h1>
        <p className="text-neutral-600">Gérez le bien-être de vos employés</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Employés inscrits</p>
              <h3 className="text-2xl font-bold">{mockStats.employeesRegistered}</h3>
            </div>
          </div>
          <div className="text-xs text-secondary-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+12% ce mois-ci</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
              <Activity className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Employés actifs</p>
              <h3 className="text-2xl font-bold">{mockStats.activeEmployees}</h3>
            </div>
          </div>
          <div className="text-xs text-secondary-600">
            {((mockStats.activeEmployees / mockStats.employeesRegistered) * 100).toFixed(0)}% du total
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Activités réalisées</p>
              <h3 className="text-2xl font-bold">{mockStats.activitiesCompleted}</h3>
            </div>
          </div>
          <div className="text-xs text-secondary-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+24% vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-highlight rounded-full flex items-center justify-center mr-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Satisfaction moyenne</p>
              <h3 className="text-2xl font-bold">{mockStats.averageSatisfaction}/5</h3>
            </div>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`h-4 w-4 ${star <= Math.floor(mockStats.averageSatisfaction) ? 'text-accent-500' : 'text-neutral-300'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active challenges */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Défis en cours</h2>
            <a href="#" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
              Voir tous les défis
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="space-y-6">
            {mockChallenges.map(challenge => (
              <div key={challenge.id} className="bg-neutral-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{challenge.name}</h3>
                    <p className="text-sm text-neutral-600">{challenge.description}</p>
                  </div>
                  <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                    En cours
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 mt-4 text-sm">
                  <div>
                    <p className="text-neutral-500">Objectif</p>
                    <p className="font-medium">{challenge.goal} {challenge.unit}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Participants</p>
                    <p className="font-medium">{challenge.participants}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Fin</p>
                    <p className="font-medium">{new Date(challenge.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mb-2 mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progression</span>
                    <span className="font-medium">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <button className="btn-outline text-sm">
                Créer un nouveau défi
              </button>
            </div>
          </div>
        </div>

        {/* Top employees */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Employés les plus actifs</h2>
            <a href="#" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
              Voir tous
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="space-y-4">
            {mockTopEmployees.map((employee, index) => (
              <div key={employee.id} className="flex items-center p-3 bg-neutral-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-medium">
                  {index + 1}
                </div>
                <div className="ml-3 flex-grow">
                  <h4 className="font-medium text-sm">{employee.name}</h4>
                  <p className="text-xs text-neutral-500">{employee.department}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{employee.activitiesCompleted}</p>
                  <p className="text-xs text-neutral-500">activités</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-600">Taux de participation</span>
              <span className="font-medium">{Math.round((mockStats.activeEmployees / mockStats.employeesRegistered) * 100)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
              <div 
                className="bg-secondary-500 h-2 rounded-full" 
                style={{ width: `${(mockStats.activeEmployees / mockStats.employeesRegistered) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Activity(props: any) {
  return <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
}

function Calendar(props: any) {
  return <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
}

function Star(props: any) {
  return <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none" 
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
}