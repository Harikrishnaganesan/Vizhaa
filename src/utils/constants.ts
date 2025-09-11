export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? 'https://vizhaa-backend-1.onrender.com/api'
    : 'http://localhost:4000/api');

export const FRONTEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://vizhaa.in'
  : 'http://localhost:3000';