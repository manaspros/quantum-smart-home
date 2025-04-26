import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Handle login button click with redirect to callback page
  const handleLogin = () => {
    console.log("Login button clicked");
    loginWithRedirect({
      appState: { returnTo: "/dashboard" },
      // The Auth0Provider now handles the redirect_uri
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Card
          elevation={5}
          sx={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 2,
            overflow: "hidden",
          }}
          className="quantum-card"
        >
          <Box
            sx={{
              padding: 3,
              background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SecurityIcon sx={{ fontSize: 56, mb: 2 }} />
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Quantum-Secured
            </Typography>
            <Typography component="h2" variant="h6" align="center">
              Smart Home System
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Typography align="center" variant="body1" sx={{ mb: 3 }}>
                  Please log in to access your quantum-secured smart home
                  dashboard.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<LockIcon />}
                  onClick={handleLogin}
                  sx={{
                    py: 1.5,
                    background:
                      "linear-gradient(90deg, #1a237e 0%, #0d47a1 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #0d47a1 0%, #1a237e 100%)",
                    },
                  }}
                >
                  Secure Sign In with Auth0
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="caption" color="text.secondary">
                    QUANTUM SECURITY
                  </Typography>
                </Divider>

                <Box sx={{ backgroundColor: "#f5f7fa", p: 2, borderRadius: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    This system uses quantum encryption technology to protect
                    your smart home data.
                  </Typography>
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
          &copy; {new Date().getFullYear()} Quantum-Secured IoT Technology
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;
