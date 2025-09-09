# Complete API Integration Guide

## Available Endpoints

### Authentication (`/api/auth`)
```javascript
import { api } from './src/services/completeApi';

// Send OTP for registration
await api.auth.sendOTP('9876543210', 'organizer');

// Verify OTP
await api.auth.verifyOTP('sessionId', '123456', '9876543210');

// Organizer signup
await api.auth.organizerSignup({
  phone: '9876543210',
  sessionId: 'sessionId',
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  companyName: 'ABC Events'
});

// Supplier signup
await api.auth.supplierSignup({
  phone: '9876543210',
  sessionId: 'sessionId',
  fullName: 'Jane Smith',
  email: 'jane@example.com',
  password: 'password123',
  services: ['catering', 'decoration']
});

// Login
await api.auth.login('9876543210', 'password123');

// Forgot password
await api.auth.forgotPassword('9876543210');

// Verify password reset OTP
await api.auth.verifyPasswordResetOTP('sessionId', '123456', '9876543210');

// Reset password
await api.auth.resetPassword('sessionId', '9876543210', 'newPassword123');
```

### Events (`/api/events`)
```javascript
// Create event
await api.events.create({
  eventName: 'Wedding Ceremony',
  eventType: 'Wedding',
  location: '123 Main St',
  numberOfSuppliers: 5,
  eventDate: '2024-06-15',
  eventTime: '18:00',
  budget: 50000
});

// Get all events
await api.events.getAll();

// Get event by ID
await api.events.getById('eventId');

// Update event
await api.events.update('eventId', { eventName: 'Updated Name' });

// Delete event
await api.events.delete('eventId');

// Get available events (for suppliers)
await api.events.getAvailable();

// Book event (supplier)
await api.events.book('eventId', 'I can provide catering services');

// Get event applications (organizer)
await api.events.getApplications('eventId');

// Update application status (organizer)
await api.events.updateApplicationStatus('bookingId', 'approved');

// Get supplier bookings
await api.events.getSupplierBookings();
```

### Organizer (`/api/organizer`)
```javascript
// Get dashboard
await api.organizer.getDashboard();

// Get profile
await api.organizer.getProfile();

// Update profile
await api.organizer.updateProfile({
  fullName: 'Updated Name',
  companyName: 'Updated Company'
});

// Get organizer events
await api.organizer.getEvents();

// Create event
await api.organizer.createEvent(eventData);

// Update event
await api.organizer.updateEvent('eventId', eventData);

// Delete event
await api.organizer.deleteEvent('eventId');

// Get event suppliers
await api.organizer.getEventSuppliers('eventId');

// Get bookings
await api.organizer.getBookings();

// Update booking status
await api.organizer.updateBookingStatus('bookingId', 'approved', 'Welcome aboard!');

// Get booking details
await api.organizer.getBookingDetails('bookingId');
```

### Supplier (`/api/supplier`)
```javascript
// Get dashboard
await api.supplier.getDashboard();

// Get profile
await api.supplier.getProfile();

// Update profile
await api.supplier.updateProfile({
  fullName: 'Updated Name',
  services: ['catering', 'decoration', 'photography']
});

// Get available events
await api.supplier.getEvents();

// Book event
await api.supplier.bookEvent('eventId', {
  message: 'I can provide excellent services',
  services: ['catering'],
  pricing: 25000
});

// Get my bookings
await api.supplier.getBookings();
```

### Users (`/api/users`)
```javascript
// Get dashboard
await api.users.getDashboard();

// Get profile
await api.users.getProfile();

// Update profile
await api.users.updateProfile({
  fullName: 'Updated Name',
  email: 'newemail@example.com'
});
```

### OTP (`/api/otp`)
```javascript
// Send OTP
await api.otp.send('9876543210', 'registration');

// Verify OTP
await api.otp.verify('sessionId', '123456');
```

## Usage in Components

### Authentication Flow
```javascript
import { api } from '../services/completeApi';

const handleLogin = async (phone, password) => {
  try {
    const response = await api.auth.login(phone, password);
    if (response.success) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userType', response.data.user.userType);
      // Redirect to dashboard
    }
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

### Event Management
```javascript
const handleCreateEvent = async (eventData) => {
  try {
    const response = await api.events.create(eventData);
    if (response.success) {
      // Event created successfully
      fetchEvents(); // Refresh events list
    }
  } catch (error) {
    console.error('Failed to create event:', error.message);
  }
};
```

### Dashboard Data
```javascript
const fetchDashboardData = async () => {
  try {
    const userType = localStorage.getItem('userType');
    let response;
    
    if (userType === 'organizer') {
      response = await api.organizer.getDashboard();
    } else if (userType === 'supplier') {
      response = await api.supplier.getDashboard();
    } else {
      response = await api.users.getDashboard();
    }
    
    if (response.success) {
      setDashboardData(response.data);
    }
  } catch (error) {
    console.error('Failed to fetch dashboard:', error.message);
  }
};
```

## Error Handling

All API calls return a response with this structure:
```javascript
{
  success: boolean,
  message: string,
  data?: any
}
```

Always check the `success` field and handle errors appropriately:
```javascript
try {
  const response = await api.events.create(eventData);
  if (response.success) {
    // Handle success
    console.log('Success:', response.message);
    return response.data;
  } else {
    // Handle API error
    throw new Error(response.message);
  }
} catch (error) {
  // Handle network or other errors
  console.error('Error:', error.message);
  // Show user-friendly error message
}
```

## Authentication Token

The API service automatically handles authentication tokens. Make sure to:
1. Store the token after successful login: `localStorage.setItem('authToken', token)`
2. The token is automatically included in all authenticated requests
3. On 401 responses, the user is automatically redirected to login

## File Uploads

For endpoints that require file uploads (like supplier signup with Aadhar card), use FormData:
```javascript
const formData = new FormData();
formData.append('phone', phone);
formData.append('fullName', fullName);
formData.append('aadharCard', file);

// Use fetch directly for file uploads
const response = await fetch('/api/auth/supplier/signup', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```