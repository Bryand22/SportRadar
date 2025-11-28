import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import BusinessLayout from './layouts/BusinessLayout';

// Public pages
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const DiscoverPage = lazy(() => import('./pages/Public/DiscoverPage'));
const BusinessInfoPage = lazy(() => import('./pages/Public/BusinessInfoPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const PolitiqueRGPD = lazy(() => import('./pages/Public/PolitiqueRGPD'));
const MentionsLegales = lazy(() => import('./pages/Public/MentionsLegales'));
const FAQ = lazy(() => import('./pages/Public/FAQ'));

// User dashboard pages
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const UserProfile = lazy(() => import('./pages/user/UserProfile'));
const UserPlanning = lazy(() => import('./pages/user/UserPlanning'));

// Business dashboard pages
const BusinessDashboard = lazy(() => import('./pages/business/BusinessDashboard'));
const BusinessEmployees = lazy(() => import('./pages/business/BusinessEmployees'));
const BusinessChallenges = lazy(() => import('./pages/business/BusinessChallenges'));

// Auth pages
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/business-info" element={<BusinessInfoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/politique-confidentialite" element={<PolitiqueRGPD />} />
              {/* alias possible */}
              <Route path="/politique-rgpd" element={<PolitiqueRGPD />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>

            {/* User dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="planning" element={<UserPlanning />} />
            </Route>

            {/* Business dashboard routes */}
            <Route path="/business" element={<BusinessLayout />}>
              <Route index element={<BusinessDashboard />} />
              <Route path="employees" element={<BusinessEmployees />} />
              <Route path="challenges" element={<BusinessChallenges />} />
            </Route>

            {/* Auth routes */}
            <Route path="/reset-password" element={<ForgotPassword />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;