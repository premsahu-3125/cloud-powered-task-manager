@echo off
REM GitHub Repository Configuration Script for Windows
REM This script automatically configures your GitHub repository

setlocal enabledelayedexpansion

echo.
echo 🚀 Cloud-Powered Task Manager - GitHub Configuration
echo ═══════════════════════════════════════════════════════
echo.

REM Repository details
set REPO_OWNER=premsahu-3125
set REPO_NAME=cloud-powered-task-manager
set REPO_FULL=%REPO_OWNER%/%REPO_NAME%

echo 📍 Repository: %REPO_FULL%
echo.

REM Add GitHub CLI to PATH
set PATH=%PATH%;C:\Program Files\GitHub CLI

REM Check if gh is available
where gh >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ GitHub CLI not found in PATH
    echo 📥 GitHub CLI is installed but needs PATH update
    echo.
    echo Run this in PowerShell as Administrator:
    echo   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\GitHub CLI", [EnvironmentVariableTarget]::User)
    echo.
    echo Or manually set PATH to include: C:\Program Files\GitHub CLI
    pause
    exit /b 1
)

echo ✅ GitHub CLI found
echo.

REM Check authentication
echo 🔐 Checking GitHub authentication...
gh auth status >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Not authenticated with GitHub
    echo.
    echo Running: gh auth login
    gh auth login
    if %errorlevel% neq 0 (
        echo ❌ Authentication failed
        pause
        exit /b 1
    )
)

echo ✅ Authenticated with GitHub
echo.

REM Set description
echo 📝 Setting repository description...
gh repo edit %REPO_FULL% --description "Full-stack task manager with React, Node.js, JWT auth and cloud database. Create, prioritize, and track tasks with real persistence. Run locally or with Docker. Perfect for learning full-stack development!"

if %errorlevel% equ 0 (
    echo ✅ Description updated
) else (
    echo ⚠️  Failed to update description
)

echo.
echo 🏷️  Adding topics...

set topics=task-manager full-stack javascript nodejs express react jwt-authentication docker web-development portfolio-project

for %%T in (%topics%) do (
    echo   Adding topic: %%T
    gh repo edit %REPO_FULL% --add-topic %%T
)

echo.
echo ✅ All topics added successfully!
echo.
echo 📊 Configuration Complete!
echo ═══════════════════════════════════════════════════════
echo.
echo Your repository has been configured with:
echo   ✓ Professional description
echo   ✓ 10 relevant topics
echo.
echo 🔗 Visit your repository:
echo   https://github.com/%REPO_FULL%
echo.
echo 📖 Documentation files created:
echo   ✓ README.md - Main documentation
echo   ✓ GETTING_STARTED.md - Setup guide
echo   ✓ CONTRIBUTING.md - Contribution guidelines
echo   ✓ GITHUB_SETUP.md - GitHub configuration guide
echo   ✓ FINAL_SETUP.md - This guide
echo.
echo 🚀 Next Steps:
echo   1. Check your GitHub repository
echo   2. Share the link on social media
echo   3. Deploy your project online (optional)
echo   4. Start accepting contributions!
echo.

pause
