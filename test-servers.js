const fetch = require('node-fetch');

async function testServer(url, name) {
  console.log(`\n🔍 Testing ${name} server: ${url}`);
  
  try {
    const startTime = Date.now();
    const response = await fetch(`${url}/health`, {
      method: 'GET',
      timeout: 10000,
    });
    const responseTime = Date.now() - startTime;
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${name} server is online`);
      console.log(`   Response time: ${responseTime}ms`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Data:`, data);
      return true;
    } else {
      console.log(`❌ ${name} server responded with error`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Response time: ${responseTime}ms`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name} server is offline`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function testLoginEndpoint(url, name) {
  console.log(`\n🔐 Testing ${name} login endpoint: ${url}/api/auth/login`);
  
  try {
    const response = await fetch(`${url}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: 'test',
        password: 'test'
      }),
      timeout: 10000,
    });
    
    console.log(`   Login endpoint status: ${response.status}`);
    
    if (response.status === 400 || response.status === 401) {
      console.log(`✅ ${name} login endpoint is working (expected auth error)`);
      return true;
    } else if (response.status === 404) {
      console.log(`❌ ${name} login endpoint not found`);
      return false;
    } else {
      console.log(`⚠️  ${name} login endpoint returned unexpected status`);
      return true; // Still working, just unexpected response
    }
  } catch (error) {
    console.log(`❌ ${name} login endpoint failed`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Vizhaa Frontend & Backend Servers');
  console.log('=' .repeat(50));
  
  const localUrl = 'http://localhost:4000';
  const prodUrl = 'https://vizhaa-backend-1.onrender.com';
  
  // Test health endpoints
  const localHealth = await testServer(localUrl, 'Local');
  const prodHealth = await testServer(prodUrl, 'Production');
  
  // Test login endpoints
  const localLogin = await testLoginEndpoint(localUrl, 'Local');
  const prodLogin = await testLoginEndpoint(prodUrl, 'Production');
  
  console.log('\n📊 Summary:');
  console.log('=' .repeat(30));
  console.log(`Local Server Health: ${localHealth ? '✅ Online' : '❌ Offline'}`);
  console.log(`Local Login Endpoint: ${localLogin ? '✅ Working' : '❌ Failed'}`);
  console.log(`Production Server Health: ${prodHealth ? '✅ Online' : '❌ Offline'}`);
  console.log(`Production Login Endpoint: ${prodLogin ? '✅ Working' : '❌ Failed'}`);
  
  console.log('\n🎯 Recommendations:');
  if (!localHealth) {
    console.log('• Start your local backend server on port 4000');
  }
  if (!prodHealth) {
    console.log('• Production server may be sleeping (Render free tier)');
    console.log('• Try accessing https://vizhaa-backend-1.onrender.com/health directly');
  }
  if (localHealth && localLogin) {
    console.log('• Local development environment is ready');
  }
  if (prodHealth && prodLogin) {
    console.log('• Production environment is ready');
  }
  
  console.log('\n🔧 Frontend URLs:');
  console.log('• Local: http://localhost:3000/auth/login');
  console.log('• Production: [Your deployed frontend URL]/auth/login');
}

main().catch(console.error);