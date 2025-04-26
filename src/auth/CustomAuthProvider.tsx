import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authService } from "./auth-service";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  error: null,
  user: null,
  login: async () => false,
  logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component to wrap the application with auth context
export const CustomAuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Function to handle login with email and password
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });

      if (
        response.success &&
        response.accessToken &&
        response.idToken &&
        response.expiresIn
      ) {
        // Store tokens
        authService.storeTokens({
          accessToken: response.accessToken,
          idToken: response.idToken,
          expiresIn: response.expiresIn,
        });

        // Decode user info from ID token
        const userInfo = parseJwt(response.idToken);
        setUser(userInfo);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(response.error || "Authentication failed");
        return false;
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle logout
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  // Helper function to parse JWT token
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error parsing JWT token", e);
      return null;
    }
  };

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoading(true);

      // Check if user is authenticated
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      // If authenticated, try to get user info from stored token
      if (authenticated) {
        const idToken = localStorage.getItem("id_token");
        if (idToken) {
          const userInfo = parseJwt(idToken);
          setUser(userInfo);
        }
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Create the context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    error,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
