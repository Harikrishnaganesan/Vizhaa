'use client';

import { useState, useEffect } from 'react';
import { checkBothServers, getActiveServerUrl, ServerStatus } from '../../utils/serverHealth';

export default function ServerStatusComponent() {
  const [status, setStatus] = useState<{
    local: ServerStatus;
    production: ServerStatus;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState<string>('');

  useEffect(() => {
    setActiveServer(getActiveServerUrl());
    
    const checkStatus = async () => {
      setLoading(true);
      try {
        const result = await checkBothServers();
        setStatus(result);
      } catch (error) {
        console.error('Failed to check server status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Checking servers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-3 shadow-lg max-w-sm">
      <div className="text-xs font-semibold text-gray-700 mb-2">Server Status</div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Local (4000):</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${status?.local.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs">
              {status?.local.isOnline ? `${status.local.responseTime}ms` : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Production:</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${status?.production.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs">
              {status?.production.isOnline ? `${status.production.responseTime}ms` : 'Offline'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Active: {activeServer.includes('localhost') ? 'Local' : 'Production'}
        </div>
      </div>
    </div>
  );
}