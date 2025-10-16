import React, { useState, useEffect } from 'react';
import Admin from '../pages/Admin';
import Login from '../pages/Login';

const ProtectedAdmin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('adminLoggedIn') === 'true');
    };

    // Check initially
    checkAuth();

    // Listen for storage changes (for cross-tab updates)
    window.addEventListener('storage', checkAuth);

    // Listen for custom login event
    window.addEventListener('adminLoginChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('adminLoginChange', checkAuth);
    };
  }, []);

  return isLoggedIn ? <Admin /> : <Login />;
};

export default ProtectedAdmin;