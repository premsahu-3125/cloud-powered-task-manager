#!/bin/bash
# GitHub Repository Configuration Script
# This script configures your repository with description, topics, and website

# Repository info
REPO_OWNER="premsahu-3125"
REPO_NAME="cloud-powered-task-manager"

echo "🚀 Configuring GitHub repository: $REPO_OWNER/$REPO_NAME"
echo ""

# Description
DESCRIPTION="Full-stack task manager with React, Node.js, JWT auth & cloud database. Create, prioritize, and track tasks with real persistence. Run locally or with Docker. Perfect for learning full-stack development!"

echo "📝 Setting repository description..."
gh repo edit $REPO_OWNER/$REPO_NAME --description "$DESCRIPTION"

# Add topics
echo "🏷️  Adding topics..."
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic task-manager
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic full-stack
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic javascript
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic nodejs
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic express
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic react
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic jwt-authentication
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic docker
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic web-development
gh repo edit $REPO_OWNER/$REPO_NAME --add-topic portfolio-project

# Set website (optional for now)
# gh repo edit $REPO_OWNER/$REPO_NAME --homepage "https://github.com/premsahu-3125/cloud-powered-task-manager"

echo ""
echo "✅ GitHub repository configured successfully!"
echo ""
echo "📊 Repository details updated:"
echo "   ✓ Description added"
echo "   ✓ 10 topics added"
echo ""
echo "🔗 Visit your repo: https://github.com/$REPO_OWNER/$REPO_NAME"
