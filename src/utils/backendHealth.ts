// Backend health check utility
const BACKEND_URL = 'https://vizhaa-backend-1.onrender.com';

export const wakeUpBackend = async (): Promise<boolean> => {
  try {
    console.log('Waking up backend service...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    console.log('Backend wake-up response:', response.status);
    
    return response.ok;
  } catch (error) {
    console.log('Backend wake-up failed:', error);
    return false;
  }
};

export const checkBackendHealth = async (): Promise<{
  isHealthy: boolean;
  responseTime: number;
  error?: string;
}> => {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    return {
      isHealthy: response.ok,
      responseTime,
      error: response.ok ? undefined : `HTTP ${response.status}`
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return {
      isHealthy: false,
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};