// API Connection Test
export const testAPIConnection = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/health');
    const data = await response.json();
    console.log('API Connection Test:', data);
    return { success: true, data };
  } catch (error) {
    console.error('API Connection Failed:', error);
    return { success: false, error: error.message };
  }
};

// Test all endpoints
export const testAllEndpoints = async () => {
  const endpoints = [
    { name: 'Health Check', url: '/health' },
    { name: 'Auth Login', url: '/auth/login', method: 'POST' },
    { name: 'Events List', url: '/events' },
    { name: 'Available Events', url: '/events/available/events' }
  ];

  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`http://localhost:4000/api${endpoint.url}`, {
        method: endpoint.method || 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      results.push({
        name: endpoint.name,
        status: response.status,
        success: response.ok
      });
    } catch (error) {
      results.push({
        name: endpoint.name,
        status: 'ERROR',
        success: false,
        error: error.message
      });
    }
  }
  
  console.table(results);
  return results;
};