# Vizhaa Frontend Server Setup Guide

## Overview
This guide helps you set up both local and production environments for the Vizhaa frontend application.

## Environment Configuration

### Local Development
- **Frontend URL**: http://localhost:3000
- **Backend URL**: http://localhost:4000
- **API Endpoints**: http://localhost:4000/api

### Production
- **Backend URL**: https://vizhaa-backend-1.onrender.com
- **API Endpoints**: https://vizhaa-backend-1.onrender.com/api

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development
```bash
# Option 1: Use the startup script
start-dev.bat

# Option 2: Use npm command
npm run dev
```

### 3. Build for Production
```bash
# Option 1: Use the startup script
start-prod.bat

# Option 2: Use npm commands
npm run build:prod
npm run start:prod
```

## Testing Server Connectivity

### Test Both Servers
```bash
node test-servers.js
```

### Manual Testing
- **Local Health Check**: http://localhost:4000/health
- **Production Health Check**: https://vizhaa-backend-1.onrender.com/health
- **Frontend Login**: http://localhost:3000/auth/login

## Environment Variables

The application automatically detects the environment:

### Development (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
NODE_ENV=development
```

### Production (.env.production)
```
NEXT_PUBLIC_API_URL=https://vizhaa-backend-1.onrender.com/api
NEXT_PUBLIC_BACKEND_URL=https://vizhaa-backend-1.onrender.com
NODE_ENV=production
```

## Available Routes

### Authentication
- `/auth/login` - Login page (redirects to `/auth/user-login`)
- `/auth/user-login` - Actual login page
- `/auth/role-selection` - User role selection
- `/auth/organizer-registration` - Organizer signup
- `/auth/supplier-registration` - Supplier signup

### Dashboards
- `/event-organizers` - Event organizer dashboard
- `/supplier-dashboard` - Supplier dashboard
- `/user-dashboard` - Regular user dashboard

## Troubleshooting

### 404 Error on /auth/login
✅ **Fixed**: Added route redirect in `next.config.js`

### Backend Connection Issues
1. **Local Server**: Ensure backend is running on port 4000
2. **Production Server**: May take 30-60 seconds to wake up (Render free tier)
3. **CORS Issues**: Backend is configured to allow frontend requests

### Server Status Monitoring
The application includes a real-time server status indicator in the bottom-right corner showing:
- Local server status (port 4000)
- Production server status
- Response times
- Active server configuration

## Scripts

### Development
- `npm run dev` - Start development server
- `npm run dev:local` - Start with explicit local environment

### Production
- `npm run build` - Build for production
- `npm run build:prod` - Build with production environment
- `npm run start` - Start production server
- `npm run start:prod` - Start with production environment

### Testing
- `node test-servers.js` - Test both local and production servers

## Backend Requirements

Ensure your backend server has these endpoints:
- `GET /health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP
- All other API endpoints as defined in `completeApi.ts`

## Support

If you encounter issues:
1. Check the server status indicator
2. Run the server test script
3. Verify environment variables
4. Check browser console for errors
5. Ensure backend server is running and accessible