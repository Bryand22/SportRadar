import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import DashboardHeader from '../components/layout/DashboardHeader';

export default function DashboardLayout() {
  const { isAuthenticated, isBusinessUser } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect business users to business dashboard
  if (isBusinessUser) {
    return <Navigate to="/business" />;
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}