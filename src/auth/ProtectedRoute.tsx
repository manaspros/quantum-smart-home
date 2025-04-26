import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Protected Route Component
 *
 * This component handles route protection based on authentication state.
 * It ensures that certain routes are only accessible to authenticated users.
 */
export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    // Log authentication state for debugging
    console.log("ProtectedRoute - Current path:", location.pathname);
    console.log("ProtectedRoute - Auth state:", {
      isAuthenticated,
      isLoading,
      hasError: !!error,
    });
  }, [isAuthenticated, isLoading, error, location]);

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
          {error.message ||
            "There was a problem verifying your identity. Please try logging in again."}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Navigate to="/login" replace />
        </Box>
      </Box>
    );
  }

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  console.log("User is authenticated, rendering protected content");
  // Render child routes for authenticated users
  return <Outlet />;
};
