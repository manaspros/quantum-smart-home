import { authConfig } from "./auth-config";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  accessToken?: string;
  idToken?: string;
  expiresIn?: number;
}

/**
 * Service to handle custom Auth0 authentication
 * This allows direct username/password authentication with Auth0
 */
export const authService = {
  /**
   * Login with username and password directly against Auth0
   * @param credentials User credentials (email and password)
   * @returns Authentication response with tokens or error
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log("Attempting to authenticate with Auth0...");

      // First attempt with simplified parameters - no connection specified
      const requestBody = {
        grant_type: "password",
        username: credentials.email,
        password: credentials.password,
        client_id: authConfig.clientId,
        scope: authConfig.scope,
        // Removed audience and connection which are causing the 500 error
      };

      console.log(
        "Auth0 request URL:",
        `https://${authConfig.domain}/oauth/token`
      );
      console.log(
        "Auth0 request body:",
        JSON.stringify({
          ...requestBody,
          password: "********", // Don't log actual password
        })
      );

      const response = await fetch(`https://${authConfig.domain}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Auth0 response status:", response.status);
      console.log("Auth0 response data:", data);

      if (response.ok) {
        console.log("Auth0 authentication successful");
        return {
          success: true,
          accessToken: data.access_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
        };
      } else {
        // Provide more specific error information from Auth0
        const errorMessage =
          data.error_description ||
          (data.error === "invalid_grant"
            ? "Invalid username or password"
            : "Login failed");
        console.error("Auth0 authentication failed:", errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      }
    } catch (error) {
      console.error("Auth service exception:", error);
      return {
        success: false,
        error:
          "An unexpected error occurred during authentication. Please try again later.",
      };
    }
  },

  /**
   * Store tokens in local storage
   * @param tokens Auth tokens to store
   */
  storeTokens: (tokens: {
    accessToken: string;
    idToken: string;
    expiresIn: number;
  }) => {
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("id_token", tokens.idToken);

    // Store expiration time
    const expiresAt = JSON.stringify(
      tokens.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("expires_at", expiresAt);
  },

  /**
   * Check if the user is authenticated based on token expiration
   * @returns boolean indicating if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const expiresAt = localStorage.getItem("expires_at");
    return expiresAt ? new Date().getTime() < JSON.parse(expiresAt) : false;
  },

  /**
   * Get the stored access token
   * @returns The stored access token or null
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem("access_token");
  },

  /**
   * Log out the user by removing stored tokens
   */
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    // Redirect to Auth0 logout to completely sign out
    window.location.href = `https://${authConfig.domain}/v2/logout?client_id=${
      authConfig.clientId
    }&returnTo=${encodeURIComponent(window.location.origin)}`;
  },
};
