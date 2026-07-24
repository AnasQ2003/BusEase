@echo off
echo 🌐 Starting BusEase Frontend...
cd /d "%~dp0frontend"
if not exist node_modules (
    echo 📦 Installing frontend dependencies with bun...
    C:\Users\anasq\.bun\bin\bun.exe install
)
C:\Users\anasq\.bun\bin\bun.exe run dev
pause
