import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import  {useAuth}  from './hooks/useAuth';

function AdminRoute({ children }) {
  const {isAdmin} = useAuth();
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await isAdmin();
      setAdmin(result);
      setLoading(false);
    };
    checkAdmin();
  }, []);

  if (loading) return <div>Loading...</div>;

  return admin ? children : <Navigate to="/" />;
}

export default AdminRoute;
