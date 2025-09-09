// Test script to verify API integration
const API_BASE_URL = 'http://localhost:4000/api';

async function testAPIIntegration() {
  console.log('🧪 Testing API Integration...\n');

  // Test 1: Health Check
  try {
    console.log('1. Testing Health Check...');
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();
    console.log('✅ Health Check:', result.status === 'ok' ? 'PASSED' : 'FAILED');
  } catch (error) {
    console.log('❌ Health Check: FAILED -', error.message);
  }

  // Test 2: Send OTP
  try {
    console.log('\n2. Testing Send OTP...');
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '9876543210', userType: 'organizer' })
    });
    const result = await response.json();
    console.log('✅ Send OTP:', result.success ? 'PASSED' : 'FAILED');
    if (result.sessionId) {
      console.log('   Session ID:', result.sessionId);
    }
  } catch (error) {
    console.log('❌ Send OTP: FAILED -', error.message);
  }

  // Test 3: Login (should fail without valid credentials)
  try {
    console.log('\n3. Testing Login (should fail)...');
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '9876543210', password: 'testpassword' })
    });
    const result = await response.json();
    console.log('✅ Login Test:', !result.success ? 'PASSED (Expected failure)' : 'UNEXPECTED SUCCESS');
  } catch (error) {
    console.log('❌ Login Test: FAILED -', error.message);
  }

  console.log('\n🎯 API Integration Test Complete!');
  console.log('\nNext Steps:');
  console.log('1. Start the backend server: cd Vizhaa-backend && npm start');
  console.log('2. Start the frontend server: cd vizha-frontend/Vizhaa && npm run dev');
  console.log('3. Test the registration and login flows in the browser');
}

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
  testAPIIntegration().catch(console.error);
}

module.exports = { testAPIIntegration };