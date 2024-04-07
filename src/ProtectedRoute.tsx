import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    isLoggedIn: boolean;
    children: ReactNode;
}

export function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
    if (!isLoggedIn) {
        // User not logged in, redirect to login page
        return <Navigate to="/Auth/Login" />;
    }

    // User is logged in, allow access to the route
    return <>{children}</>;
}