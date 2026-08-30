# 🤝 Contributing to Cloud-Powered Task Manager

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

---

## 💡 Ways to Contribute

### 1. **Report Bugs** 🐛
- Found a bug? Open an [Issue](https://github.com/premsahu-3125/cloud-powered-task-manager/issues)
- Include:
  - Bug description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots if applicable
  - Your environment (OS, Node version, etc.)

### 2. **Suggest Features** 🚀
- Have a great idea? Open an [Issue](https://github.com/premsahu-3125/cloud-powered-task-manager/issues)
- Describe the feature
- Explain why it would be useful
- Suggest implementation approach if you have ideas

### 3. **Improve Documentation** 📚
- Fix typos
- Add clarifications
- Add examples
- Improve guides

### 4. **Write Code** 💻
- Fix bugs
- Implement features
- Optimize performance
- Add tests

---

## 🛠️ Development Setup

### 1. Fork the Repository
Click the **"Fork"** button on GitHub to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/cloud-powered-task-manager.git
cd cloud-powered-task-manager
```

### 3. Add Upstream Remote
```bash
git remote add upstream https://github.com/premsahu-3125/cloud-powered-task-manager.git
```

### 4. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/add-notifications` - New features
- `fix/task-sorting-bug` - Bug fixes
- `docs/improve-readme` - Documentation
- `refactor/optimize-api` - Code improvements

---

## 📝 Making Changes

### Backend Changes
```bash
cd backend

# Start dev server with auto-reload
npm run dev

# Run linter
npm run lint

# Follow Express best practices
```

### Frontend Changes
```bash
cd frontend

# Start dev server with hot reload
npm run dev

# Run linter
npm run lint

# Check browser console for errors
```

### Code Style Guidelines

#### JavaScript/Node.js
```javascript
// ✅ Good: Clear variable names, comments for complex logic
function calculateTaskStats(tasks) {
  // Filter completed tasks
  const completed = tasks.filter(t => t.completed).length;
  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed
  };
}

// ❌ Bad: Unclear naming, no comments
function calc(t) {
  return t.filter(x => x.c).length;
}
```

#### React Components
```jsx
// ✅ Good: Clear naming, proper structure
export function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task.id)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

// ❌ Bad: Not using destructuring, unclear purpose
export function TC(props) {
  return <div>{props.t.title}</div>;
}
```

---

## ✅ Commit Guidelines

### Commit Message Format
```
<type>: <subject>

<body>

<footer>
```

### Types
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests

### Examples
```bash
# Good commits
git commit -m "feat: add task filtering by priority"
git commit -m "fix: resolve JWT expiration issue"
git commit -m "docs: improve API documentation"
git commit -m "refactor: simplify auth middleware"

# Commit with description
git commit -m "feat: add dark mode

- Add theme toggle in settings
- Save preference in localStorage
- Update all components for dark mode"
```

---

## 🧪 Testing

### Before Submitting

1. **Manual Testing**
   - Test all features you changed
   - Try edge cases (empty inputs, large datasets, etc.)
   - Test on different browsers if possible

2. **Code Linting**
   ```bash
   npm run lint
   ```

3. **Check for Errors**
   - Backend: Check terminal for errors
   - Frontend: Check browser console (F12)

---

## 📤 Submitting a Pull Request (PR)

### 1. Push Your Changes
```bash
git push origin feature/your-feature-name
```

### 2. Create a Pull Request on GitHub

**Title:** Follow commit message format
```
feat: add task filtering by priority
```

**Description:**
```markdown
## What does this PR do?
Brief description of changes

## Why?
Why is this change needed?

## How to test?
Steps to test the changes:
1. Navigate to Tasks page
2. Click Filter button
3. Select "High Priority"
4. Verify only high-priority tasks appear

## Screenshots (if applicable)
[Add screenshots of UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] No console errors/warnings
- [ ] Tested on my machine
- [ ] Updated documentation (if needed)
- [ ] Added comments for complex logic
```

### 3. Address Review Comments
- Respond to feedback
- Make requested changes
- Push updates (PR auto-updates)

### 4. Wait for Approval
- At least one approval required
- All checks must pass
- Then your PR will be merged! 🎉

---

## 📋 PR Checklist

Before submitting, verify:
- [ ] Tested thoroughly
- [ ] No console errors
- [ ] Linter passes
- [ ] Code is clean and readable
- [ ] Comments added for complex code
- [ ] Commit messages follow guidelines
- [ ] Updated relevant documentation
- [ ] No breaking changes (or documented if necessary)

---

## 🚫 What NOT to Do

- ❌ Don't commit node_modules
- ❌ Don't hardcode sensitive data (API keys, passwords)
- ❌ Don't change unrelated code
- ❌ Don't submit large PRs (break into smaller ones)
- ❌ Don't force-push to shared branches
- ❌ Don't add dependencies without discussion

---

## 📚 Project Structure Quick Reference

```
backend/
├── controllers/   - Business logic
├── middleware/    - Validation, auth, error handling
├── routes/        - API endpoints
├── services/      - Database operations
└── utils/         - Helper functions

frontend/
├── components/    - React components
├── pages/         - Page components
├── services/      - API calls
├── context/       - State management
└── styles/        - CSS styling
```

---

## 🎯 Good First Issues

Looking to start? Look for issues labeled:
- `good-first-issue`
- `beginner-friendly`
- `help-wanted`

These are great starting points!

---

## 💬 Questions or Need Help?

- **GitHub Issues** - Ask questions in [Issues](https://github.com/premsahu-3125/cloud-powered-task-manager/issues)
- **GitHub Discussions** - Start a discussion in [Discussions](https://github.com/premsahu-3125/cloud-powered-task-manager/discussions)
- **Email** - premsahu.3125@gmail.com

---

## ✨ Thank You!

Every contribution helps make this project better. We appreciate your time and effort!

**Happy coding! 🚀**
