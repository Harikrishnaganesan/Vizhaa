#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production deployment...');

// Check if .env.production exists
const envProdPath = path.join(__dirname, '..', '.env.production');
if (!fs.existsSync(envProdPath)) {
  console.log('⚠️  Creating .env.production file...');
  fs.writeFileSync(envProdPath, `NODE_ENV=production
NEXT_PUBLIC_API_URL=https://vizhaa-backend-1.onrender.com/api
`);
}

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // Run build
  console.log('🔨 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Production build completed successfully!');
  console.log('📁 Build output is in .next directory');
  console.log('🌐 Ready for deployment to Vercel, Netlify, or any hosting platform');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}