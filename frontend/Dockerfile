# --- Stage 1: build the static React app ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite bakes VITE_* variables into the JS bundle AT BUILD TIME — unlike the
# backend, this can't be changed by an environment variable at container
# start. Pass the real value as a build arg instead (see docker-compose.yml).
# Defaults to the value a browser on the host machine needs when running
# the whole stack locally via docker-compose.
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# --- Stage 2: serve the built files with a tiny production web server ---
# The final image only contains nginx + the static build output — none of
# the ~100+ npm packages needed to build it. Much smaller and more secure
# than shipping node_modules into production.
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
