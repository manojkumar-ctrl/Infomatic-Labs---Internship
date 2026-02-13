# IronLedger - Gym Management System

IronLedger is a MERN stack application for managing gym memberships, users, and plans.

## Project Structure

- `server/`: Node.js/Express Backend
- `client/`: React/Vite Frontend

## Setup Steps

### 1. Initialization
- **Root**: Initialized `package.json` and installed `concurrently` for running both servers.
- **Server**: Initialized `package.json` and installed `express`, `mongoose`, `dotenv`, `cors`, `bcryptjs`, `jsonwebtoken`, `nodemon`.
- **Client**: Initialized React app using Vite and installed `react-router-dom`, `axios`, `lucide-react`.

### 2. Installation
To get started:

1.  **Install Root Dependencies**:
    ```bash
    npm install
    ```

2.  **Install Server Dependencies**:
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies**:
    ```bash
    cd client
    npm install
    ```

### 3. Running the App
- **Development**:
    ```bash
    npm run dev
    ```
    (This will start both client and server concurrently - *Configuration pending*)

## Features (MVP)
- **Authentication**: Admin & Member Login/Signup (JWT).
- **Admin Dashboard**: Manage members, plans, and subscriptions.
- **Member Dashboard**: View profile and subscription status.
- **Membership Management**: Auto-expiry, status tracking (Active/Expired/Frozen).
