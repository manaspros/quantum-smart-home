import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useAuth } from "../auth/CustomAuthProvider";

const CustomLoginPage: React.FC = () => {
  const { isAuthenticated, isLoading, login, error } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic form validation
    if (!email || !password) {
      setFormError("Please enter both email and password");
      return;
    }

    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call login function from auth context
      const success = await login(email, password);

      if (!success) {
        setFormError(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (err) {
      setFormError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simple email validation helper
  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
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
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Typography align="center" variant="body1" sx={{ mb: 3 }}>
                  Please log in to access your quantum-secured smart home
                  dashboard.
                </Typography>

                {(error || formError) && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {formError || error}
                  </Alert>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />,
                  }}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
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
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Secure Sign In"
                  )}
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
              </Box>
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

export default CustomLoginPage;
