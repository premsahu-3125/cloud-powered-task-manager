import axios from "axios";

// The backend URL comes from an environment variable so it can differ
// between local development, Docker, and a deployed environment without
// changing any code. See frontend/.env.example.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (if we have one) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized handling for expired/invalid sessions. A 401 from
// /auth/login or /auth/register just means "wrong credentials" or
// "validation failed" — that's a normal response the calling page shows
// inline, not a session expiry, so we don't redirect for those.
const AUTH_ENDPOINTS = ["/auth/login", "/auth/register"];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => error.config?.url?.includes(path));

    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      // Full redirect (not router navigate) so all app state resets cleanly.
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
