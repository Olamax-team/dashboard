import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAdminDetails } from '@/store/admin-details-store';

const ProtectRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const authRoutes = ['/', '/authenticate', '/passphrase'];

  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAdminDetails();

  React.useEffect(() => {
    if (!user || !token) {
      localStorage.setItem('intendedRoute', location.pathname);
      navigate('/');
    }
  }, [user, token, location.pathname]);

  if (user && token) {
    if (authRoutes.includes(location.pathname)) {
      const intendedRoute = localStorage.getItem('intendedRoute') || '/dashboard';
      <Navigate to={intendedRoute} replace/>
    };

    return children
  }

  return <Loader2 className='animate-spin'/>;
};

export default ProtectRoute;