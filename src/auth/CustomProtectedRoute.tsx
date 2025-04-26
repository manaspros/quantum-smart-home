import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./CustomAuthProvider";

/**
 * Custom Protected Route Component for use with custom Auth0 login
 *
 * This component handles route protection based on custom authentication state.
 * It ensures that certain routes are only accessible to authenticated users.
 */
export const CustomProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth();

  // Display loading indicator while checking authentication status
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
        <Typography variant="h6" color="text.secondary">
          Verifying secure access...
        </Typography>
      </Box>
    );
  }

  // Handle authentication errors
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: 3,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Authentication Error
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {error}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Navigate to="/login" replace />
        </Box>
      </Box>
    );
  }

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes for authenticated users
  return <Outlet />;
};
