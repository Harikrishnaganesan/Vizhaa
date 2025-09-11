@echo off
echo 🚀 Building Vizhaa for Production...

echo 📋 Environment: Production
echo 🌐 API URL: https://vizhaa-backend-1.onrender.com/api

echo 🧹 Cleaning previous build...
rmdir /s /q .next 2>nul

echo 📦 Installing dependencies...
npm install

echo 🏗️ Building production bundle...
npm run build:prod

echo ✅ Production build complete!
echo 🚀 Run 'npm run start:prod' to start production server

pause