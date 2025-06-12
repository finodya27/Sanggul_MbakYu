// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function ProtectedRoute({ element }) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Memuat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!user) {
    // If not authenticated, redirect to login page
    return <Navigate to="/admin-login" replace />;
  }

  return element;
}

export default ProtectedRoute;