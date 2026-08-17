import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, allowedRoles}) => {
    const sessionData = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    const auth = sessionData && token ? { ...JSON.parse(sessionData), token } : null;

    // Si no hay token, al login
    if (!auth || !auth.token) {
        return <Navigate to="/login" replace />;
    }

    // Validar por rol
    if (allowedRoles && !allowedRoles.includes(auth.rol)) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoute