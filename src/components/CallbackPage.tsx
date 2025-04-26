import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Auth0 Callback Page
 *
 * This component handles the redirect from Auth0 after authentication.
 * It processes the authentication tokens and redirects to the dashboard.
 */
const CallbackPage: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  useEffect(() => {
    console.log("Callback page - Auth state:", {
      isAuthenticated,
      isLoading,
      hasError: !!error,
    });

    // This will execute after authentication state is processed
    if (!isLoading) {
      if (isAuthenticated) {
        console.log(
          "Callback: Authentication successful, redirecting to dashboard"
        );
        // Force navigation to dashboard
        window.location.replace("/dashboard");
      } else if (error) {
        console.error("Callback: Authentication error:", error);
        // Redirect to login on error
        window.location.replace("/login");
      } else {
        console.log("Callback: Not authenticated, redirecting to login");
        window.location.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
      <Typography variant="h6" color="text.secondary">
        Securely signing you in...
      </Typography>
    </Box>
  );
};

export default CallbackPage;
