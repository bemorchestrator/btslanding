import { Navigate } from 'react-router-dom';
import { LoginPage } from '../../components/admin/LoginPage';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    // Already logged in, redirect to dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <LoginPage onLogin={login} />;
}
