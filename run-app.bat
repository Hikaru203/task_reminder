@echo off
echo Starting Task Reminder Application...

echo Starting Backend...
cd backend

REM Check for Global Maven
where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start "Backend Server" cmd /c "mvn spring-boot:run"
    goto :Frontend
)

REM Check for Local Maven in tools
for /d %%D in (..\tools\apache-maven-*) do (
    set "MAVEN_HOME=%%~fD"
    goto :FoundLocalMaven
)

echo Maven not found. Attempting to install locally...
cd ..
powershell -ExecutionPolicy Bypass -File install-maven.ps1
for /d %%D in (tools\apache-maven-*) do (
    set "MAVEN_HOME=%%~fD"
)
cd backend

if not defined MAVEN_HOME (
    echo Maven install failed or could not be found. Exiting.
    pause
    exit /b
)

:FoundLocalMaven
echo Using Local Maven at %MAVEN_HOME%
set "PATH=%MAVEN_HOME%\bin;%PATH%"
start "Backend Server" cmd /c "mvn spring-boot:run"

:Frontend
cd ..

echo Starting Frontend...
cd frontend
start "Frontend Client" cmd /c "npm.cmd run dev || echo Failed to start frontend. && pause"
cd ..

echo Backend and Frontend are starting in separate windows.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
pause
