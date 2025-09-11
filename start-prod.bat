@echo off
echo Starting Vizhaa Frontend Production Build...
echo.
echo Environment: Production
echo API URL: https://vizhaa-backend-1.onrender.com/api
echo.
echo Building application...
npm run build
echo.
echo Starting production server...
npm start