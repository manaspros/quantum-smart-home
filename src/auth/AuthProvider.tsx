import { Auth0Provider } from "@auth0/auth0-react";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authConfig } from "./auth-config";

// Wrapper component to access useNavigate hook
const Auth0ProviderWithNavigate = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    // Use React Router's navigate function to handle redirects
    navigate(appState?.returnTo || "/dashboard");
  };

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: authConfig.scope,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

// Export the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Wrap children in a React Fragment to return a valid ReactElement
  return <>{children}</>;
};
