@echo off
echo Starting Backend Server...
cd backend

REM Check for Global Maven
where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    mvn spring-boot:run
    goto :End
)

REM Check for Local Maven in tools
cd ..
for /d %%D in (tools\apache-maven-*) do (
    set "MAVEN_HOME=%%~fD"
    goto :FoundLocalMaven
)

echo Maven not found. Attempting to install locally...
powershell -ExecutionPolicy Bypass -File install-maven.ps1
for /d %%D in (tools\apache-maven-*) do (
    set "MAVEN_HOME=%%~fD"
)

if not defined MAVEN_HOME (
    echo Maven install failed or could not be found. Exiting.
    pause
    exit /b
)

:FoundLocalMaven
echo Using Local Maven at %MAVEN_HOME%
set "PATH=%MAVEN_HOME%\bin;%PATH%"
cd backend
mvn spring-boot:run

:End
pause
