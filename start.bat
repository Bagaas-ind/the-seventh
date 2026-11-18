@echo off
color 0C
echo ========================================================
echo    🤘 THE SEVENTH - AUTO START SCRIPT 🤘
echo ========================================================
echo.
echo [1/2] Menyalakan Backend Laravel (Port 8000)...
start "Backend - The Seventh" cmd /k "cd backend && php artisan serve"

echo [2/2] Menyalakan Frontend React (Port 5173)...
start "Frontend - The Seventh" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo ✅ SUKSES! Dua jendela CMD baru telah dibuka.
echo ✅ Silakan buka browser ke: http://localhost:5173
echo ========================================================
echo.
echo (Jendela ini akan tertutup otomatis dalam 5 detik)
timeout /t 5 >nul