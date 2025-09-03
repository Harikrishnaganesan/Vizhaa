// Debug script to test login API
const testLogin = async () => {
  const testCredentials = {
    phone: "1234567890", // Replace with your test phone number
    password: "password123" // Replace with your test password
  };

  console.log('Testing login with:', testCredentials);

  try {
    // Test direct backend connection
    const backendUrl = 'http://localhost:4000/api/auth/login';
    console.log('Testing direct backend URL:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCredentials)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed response:', data);
    } catch (e) {
      console.log('Failed to parse JSON:', e.message);
    }

  } catch (error) {
    console.error('Network error:', error.message);
    
    // Test Next.js API proxy
    console.log('\nTesting Next.js API proxy...');
    try {
      const proxyResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCredentials)
      });
      
      console.log('Proxy response status:', proxyResponse.status);
      const proxyData = await proxyResponse.text();
      console.log('Proxy response:', proxyData);
    } catch (proxyError) {
      console.error('Proxy error:', proxyError.message);
    }
  }
};

// Run the test
testLogin();