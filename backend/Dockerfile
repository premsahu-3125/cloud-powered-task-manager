# Simple single-stage image — the backend has no build step, it's just
# Node.js source that runs directly.
FROM node:20-alpine

WORKDIR /app

# Copy only the manifest files first so Docker can cache the npm install
# layer and skip re-running it on every code change — only package.json or
# package-lock.json changing invalidates this layer.
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

# Lets `docker ps` / `docker compose ps` show whether the API is actually
# responding, not just whether the process is alive.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
