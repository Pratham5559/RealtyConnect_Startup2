import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import Waitlist from './pages/Waitlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminWaitlist from './pages/AdminWaitlist';
import SuperadminPanel from './pages/SuperadminPanel';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';

// Components
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Waitlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              element={(
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              )}
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/admin"
                element={(
                  <AdminRoute>
                    <AdminWaitlist />
                  </AdminRoute>
                )}
              />
              <Route
                path="/superadmin"
                element={(
                  <AdminRoute requireSuperadmin allowAdminFallback>
                    <SuperadminPanel />
                  </AdminRoute>
                )}
              />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:slug" element={<PropertyDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/market" element={<Market />} />
              <Route path="/profile" element={<div className="p-8 text-center text-gray-500 font-medium mt-10">User Profile Settings (Prototype)</div>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
