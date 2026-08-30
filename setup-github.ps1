# GitHub Repository Configuration Script (PowerShell)
# Cloud-Powered Task Manager - Automatic GitHub Setup

Write-Host ""
Write-Host "🚀 Cloud-Powered Task Manager - GitHub Configuration" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Repository info
$REPO_OWNER = "premsahu-3125"
$REPO_NAME = "cloud-powered-task-manager"
$REPO_FULL = "$REPO_OWNER/$REPO_NAME"

Write-Host "📍 Repository: $REPO_FULL" -ForegroundColor Yellow
Write-Host ""

# Add GitHub CLI to PATH
$env:Path = $env:Path + ";C:\Program Files\GitHub CLI"

# Check if GitHub CLI is installed
Write-Host "🔍 Checking for GitHub CLI..." -ForegroundColor Yellow
try {
    $ghVersion = gh --version 2>$null
    Write-Host "✅ GitHub CLI found: $ghVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub CLI is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://cli.github.com" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check authentication
Write-Host "🔐 Checking GitHub authentication..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not authenticated with GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Running: gh auth login" -ForegroundColor Yellow
    Write-Host "Follow the browser prompts to authenticate..." -ForegroundColor Gray
    Write-Host ""
    gh auth login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Authentication failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Authenticated with GitHub" -ForegroundColor Green
Write-Host ""

# Set description
Write-Host "📝 Setting repository description..." -ForegroundColor Yellow
$DESCRIPTION = "Full-stack task manager with React, Node.js, JWT auth and cloud database. Create, prioritize, and track tasks with real persistence. Run locally or with Docker. Perfect for learning full-stack development!"
gh repo edit $REPO_FULL --description $DESCRIPTION

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Description updated" -ForegroundColor Green
} else {
    Write-Host "⚠️  Failed to update description" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🏷️  Adding topics..." -ForegroundColor Yellow
Write-Host ""

# Add topics
$topics = @(
    "task-manager",
    "full-stack",
    "javascript",
    "nodejs",
    "express",
    "react",
    "jwt-authentication",
    "docker",
    "web-development",
    "portfolio-project"
)

$count = 0
foreach ($topic in $topics) {
    Write-Host "   Adding topic: $topic" -ForegroundColor Gray -NoNewline
    gh repo edit $REPO_FULL --add-topic $topic 2>$null
    Write-Host " ✓" -ForegroundColor Green
    $count++
}

Write-Host ""
Write-Host "✅ All $count topics added successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Configuration Complete!" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your repository has been configured with:" -ForegroundColor Cyan
Write-Host "  ✓ Professional description" -ForegroundColor Green
Write-Host "  ✓ 10 relevant topics" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Visit your repository:" -ForegroundColor Blue
Write-Host "   https://github.com/$REPO_FULL" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Documentation files created:" -ForegroundColor Blue
Write-Host "  ✓ README.md - Main documentation" -ForegroundColor Green
Write-Host "  ✓ GETTING_STARTED.md - Setup guide" -ForegroundColor Green
Write-Host "  ✓ CONTRIBUTING.md - Contribution guidelines" -ForegroundColor Green
Write-Host "  ✓ GITHUB_SETUP.md - GitHub configuration guide" -ForegroundColor Green
Write-Host "  ✓ FINAL_SETUP.md - Complete setup instructions" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Check your GitHub repository (refresh the page)" -ForegroundColor Yellow
Write-Host "  2. Share the link on social media / LinkedIn" -ForegroundColor Yellow
Write-Host "  3. Deploy your project online (Heroku, Vercel, Railway)" -ForegroundColor Yellow
Write-Host "  4. Start accepting contributions from others!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to close..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
