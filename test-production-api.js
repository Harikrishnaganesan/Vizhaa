// Test Production API Connection
const API_BASE_URL = 'https://vizhaa-backend-1.onrender.com/api';

async function testProductionAPI() {
  console.log('🚀 Testing Production API Connection...');
  console.log(`Base URL: ${API_BASE_URL}`);
  
  try {
    // Test health endpoint
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
    
    // Test database connection
    const dbResponse = await fetch(`${API_BASE_URL}/test-db`);
    const dbData = await dbResponse.json();
    console.log('✅ Database Check:', dbData);
    
    console.log('🎉 Production API is ready!');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testProductionAPI();