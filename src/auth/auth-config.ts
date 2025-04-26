/**
 * Auth0 Configuration Settings
 *
 * This file contains the configuration parameters required for integrating
 * with Auth0 authentication services using the standard login flow.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create an Auth0 account at https://auth0.com if you don't have one
 * 2. Create a new Single Page Application in your Auth0 dashboard
 * 3. In your Auth0 application settings, add the following to "Allowed Callback URLs":
 *    http://localhost:3000/callback
 * 4. Add the following to "Allowed Web Origins":
 *    http://localhost:3000
 * 5. Add the following to "Allowed Logout URLs":
 *    http://localhost:3000, http://localhost:3000/login
 * 6. Copy your Auth0 domain and client ID below
 */

export const authConfig = {
  // Your Auth0 application domain
  domain: "dev-kb5tbifrd145c4lz.us.auth0.com",

  // Your Auth0 client ID
  clientId: "DSLzzKxWUutNQtqk2tM5gi1uZyVZpNlD",

  // Scopes to request
  scope: "openid profile email",
};
