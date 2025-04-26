import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";

// Import Auth0 components and configuration
import { Auth0Provider } from "@auth0/auth0-react";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import CallbackPage from "./components/CallbackPage";
import { authConfig } from "./auth/auth-config";

import theme from "./theme/theme";

function App() {
  // Get the current URL for redirect handling
  const origin = window.location.origin;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Provider
        domain={authConfig.domain}
        clientId={authConfig.clientId}
        authorizationParams={{
          redirect_uri: `${origin}/callback`,
          scope: authConfig.scope,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected routes - only accessible after authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;
