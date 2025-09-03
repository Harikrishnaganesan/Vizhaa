# Login Issue Troubleshooting Guide

## Problem
Login page returns "Invalid credentials" even with correct mobile number and password.

## Debugging Steps

### 1. Check Backend Server
```bash
# Verify backend is running on port 4000
curl http://localhost:4000/api/test
```

### 2. Test API Connectivity
Visit: `http://localhost:3000/api/test`

### 3. Check Browser Console
Open browser DevTools → Console tab and look for:
- Network errors
- API call logs
- Response data

### 4. Common Issues & Solutions

#### Backend Not Running
```bash
# Start your backend server
cd path/to/backend
npm start
# or
node server.js
```

#### Wrong API Endpoint
Check if backend expects:
- `/api/auth/login` or `/auth/login`
- Different request format

#### Database Connection
Verify backend can connect to database and users exist.

#### CORS Issues
Backend should allow requests from `http://localhost:3000`

### 5. Test Login Manually

#### Create Test User
```javascript
// In backend, create a test user
{
  phone: "1234567890",
  password: "password123", // hashed
  userType: "organizer"
}
```

#### Test Direct API Call
```javascript
fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: "1234567890",
    password: "password123"
  })
})
.then(r => r.json())
.then(console.log)
```

### 6. Updated Login Component
The login page now includes detailed console logging. Check browser console for:
- Request data
- Response status
- Error details

### 7. Quick Fixes

#### Temporary Mock Login
Replace login function with:
```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  // Mock successful login
  localStorage.setItem('authToken', 'mock-token');
  localStorage.setItem('userType', 'organizer');
  localStorage.setItem('userId', '1');
  router.push('/user-dashboard');
};
```

#### Check Environment Variables
Verify `.env` files have correct backend URL.

### 8. Backend Requirements
Ensure backend returns:
```javascript
{
  success: true,
  token: "jwt-token",
  user: {
    id: "user-id",
    userType: "organizer" // or "supplier"
  }
}
```