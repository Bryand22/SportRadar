import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BusinessSidebar from '../components/layout/BusinessSidebar';
import DashboardHeader from '../components/layout/DashboardHeader';

export default function BusinessLayout() {
  const { isAuthenticated, isBusinessUser } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect non-business users to user dashboard
  if (!isBusinessUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <BusinessSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}