# Quantum-Secured IoT-Based Smart Home System

A modern single-page application (SPA) for managing and monitoring a quantum-secured smart home system. This application provides a secure interface for viewing smart home events with Auth0 authentication integration.

## Features

- **Secure Authentication**: Implemented using Auth0 for robust user authentication
- **Protected Dashboard**: Accessible only to authenticated users
- **Event Log Display**: View smart home events in a clear, organized table format
- **Quantum Security**: Built with consideration for quantum-secure encryption methods

## Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Configure Auth0:

   - Sign up for an Auth0 account at https://auth0.com if you don't have one
   - Create a new Auth0 application (Single Page Web Application)
   - Update the Auth0 configuration in `src/auth/auth-config.ts` with your credentials:
     ```typescript
     export const authConfig = {
       domain: "YOUR_AUTH0_DOMAIN",
       clientId: "YOUR_AUTH0_CLIENT_ID",
       redirectUri: window.location.origin,
       audience: "https://quantum-smart-home-api",
       scope: "openid profile email read:events",
     };
     ```

4. Start the development server:

```bash
npm start
```

5. Open your browser to `http://localhost:3000`

## Connecting to a Backend

To connect this application to a real backend API:

1. Create an API server to handle event data
2. Update the fetch logic in `Dashboard.tsx` to make real API calls instead of using mock data
3. Ensure your API is protected with Auth0 and accepts the Bearer token

## Technologies Used

- React.js
- TypeScript
- Auth0 Authentication
- Material UI
- React Router

## License

MIT
