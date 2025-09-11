// Server health check utility
export interface ServerStatus {
  isOnline: boolean;
  responseTime: number;
  error?: string;
}

export async function checkServerHealth(url: string): Promise<ServerStatus> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${url}/health`, {
      method: 'GET',
      mode: 'cors',
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    const responseTime = Date.now() - startTime;
    
    if (response.ok) {
      return {
        isOnline: true,
        responseTime,
      };
    } else {
      return {
        isOnline: false,
        responseTime,
        error: `Server responded with status ${response.status}`,
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      isOnline: false,
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function checkProductionServer(): Promise<ServerStatus> {
  return checkServerHealth('https://vizhaa-backend-1.onrender.com');
}

export function getActiveServerUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'https://vizhaa-backend-1.onrender.com/api';
}