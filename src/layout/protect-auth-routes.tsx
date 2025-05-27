import { useAdminDetails } from '@/store/admin-details-store';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectAuthRoutes: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAdminDetails();

  React.useEffect(() => {
    if (user && token) {
      navigate('/dashboard');
    }
  }, [user, token, location.pathname]);

  return children;
};

export default ProtectAuthRoutes;