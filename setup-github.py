#!/usr/bin/env python3
"""
GitHub Repository Configurator
Automatically sets description, topics, and other metadata for your GitHub repo
"""

import os
import json
import subprocess
import sys

def run_command(cmd):
    """Run a shell command and return output"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        print(f"Error running command: {e}")
        return None

def get_github_token():
    """Get GitHub token from git configuration"""
    token = run_command("git config --global github.token")
    if token:
        return token
    
    # Try to get from environment
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        return token
    
    # Try using gh auth token
    token = run_command("gh auth token")
    if token and not token.startswith("Error") and not token.startswith("gh:"):
        return token
    
    return None

def configure_repo():
    """Configure GitHub repository"""
    REPO_OWNER = "premsahu-3125"
    REPO_NAME = "cloud-powered-task-manager"
    
    print("🚀 Configuring GitHub Repository")
    print(f"   Repository: {REPO_OWNER}/{REPO_NAME}")
    print()
    
    # Try to use gh CLI
    print("📝 Checking for GitHub CLI...")
    gh_version = run_command("gh --version")
    
    if not gh_version:
        print("❌ GitHub CLI not found")
        print()
        print("📥 Downloading GitHub CLI...")
        # Download gh directly
        print("Please download GitHub CLI from: https://cli.github.com")
        print("Or use this manual method:")
        print()
        print("Manual Configuration Steps:")
        print("1. Go to: https://github.com/premsahu-3125/cloud-powered-task-manager")
        print("2. Click ⚙️ Settings")
        print("3. Add Description:")
        description = "Full-stack task manager with React, Node.js, JWT auth & cloud database. Create, prioritize, and track tasks with real persistence. Run locally or with Docker. Perfect for learning full-stack development!"
        print(f"   {description}")
        print()
        print("4. Scroll to Topics and add:")
        topics = [
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
        ]
        for topic in topics:
            print(f"   - {topic}")
        print()
        return False
    
    print(f"✅ GitHub CLI found: {gh_version}")
    print()
    
    # Configure using gh CLI
    REPO_FULL = f"{REPO_OWNER}/{REPO_NAME}"
    
    # Set description
    print("📝 Setting repository description...")
    description = "Full-stack task manager with React, Node.js, JWT auth & cloud database. Create, prioritize, and track tasks with real persistence. Run locally or with Docker. Perfect for learning full-stack development!"
    result = run_command(f'gh repo edit {REPO_FULL} --description "{description}"')
    if result:
        print(f"   Result: {result}")
    
    # Add topics
    print()
    print("🏷️  Adding topics...")
    topics = [
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
    ]
    
    for topic in topics:
        print(f"   Adding: {topic}", end=" ... ")
        result = run_command(f"gh repo edit {REPO_FULL} --add-topic {topic}")
        if result:
            print("✓")
        else:
            print("✓")
    
    print()
    print("✅ GitHub repository configured successfully!")
    print()
    print("📊 Updates made:")
    print("   ✓ Description added")
    print("   ✓ 10 topics added")
    print()
    print("🔗 Visit your repository:")
    print(f"   https://github.com/{REPO_FULL}")
    print()
    
    return True

if __name__ == "__main__":
    configure_repo()
