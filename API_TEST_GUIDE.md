# API Testing Guide for Organizer Registration

## Current Issues & Solutions

### 1. **Backend Connection Test**
Visit: `http://localhost:3000/api/test`
- Should show backend connectivity status
- If fails: Backend server not running on port 4000

### 2. **Start Backend Server**
```bash
# Navigate to your backend directory
cd path/to/your/backend
npm start
# or
node server.js
```

### 3. **Test OTP Flow Manually**

#### Send OTP Test:
```javascript
fetch('/api/auth/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: "1234567890",
    userType: "organizer"
  })
})
.then(r => r.json())
.then(console.log)
```

#### Verify OTP Test:
```javascript
fetch('/api/auth/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: "your-session-id",
    otp: "123456",
    phone: "1234567890"
  })
})
.then(r => r.json())
.then(console.log)
```

### 4. **Backend Requirements**

Your backend should have these endpoints:
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp` 
- `POST /api/auth/organizer/signup`

### 5. **Expected Response Format**

#### Send OTP Response:
```json
{
  "success": true,
  "sessionId": "unique-session-id",
  "message": "OTP sent successfully"
}
```

#### Verify OTP Response:
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

#### Registration Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "user-id",
    "phone": "1234567890",
    "userType": "organizer"
  }
}
```

### 6. **Common Fixes**

#### If "Network connection failed":
1. Check if backend is running: `curl http://localhost:4000/api/test`
2. Check CORS settings in backend
3. Verify API endpoints exist

#### If "Invalid response":
1. Check backend response format
2. Ensure `success: true` in responses
3. Check console for detailed errors

### 7. **Debug Steps**

1. Open browser DevTools → Console
2. Try registration flow
3. Check console logs for:
   - API call URLs
   - Request/response data
   - Error messages

### 8. **Temporary Mock Solution**

If backend issues persist, you can temporarily mock the APIs:

```javascript
// In organizer registration, replace API calls with:
const mockSendOTP = () => {
  setSessionId('mock-session-123');
  setStep(2);
  setMessage('OTP sent successfully!');
};

const mockVerifyOTP = () => {
  setStep(3);
  setMessage('OTP verified successfully!');
};

const mockRegister = () => {
  setMessage('Registration successful!');
  setTimeout(() => router.push('/auth/user-login'), 2000);
};
```

This will allow you to test the UI flow while fixing backend issues.