import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

/**
 * Holds the logged-in user's info and JWT for the whole app.
 *
 * On mount, if a token is already in localStorage (from a previous
 * session), we call GET /auth/me to both validate it and fetch the user's
 * info — so a refresh doesn't lose the logged-in state, and a token that
 * expired while the tab was closed gets cleared instead of pretending to
 * still be valid.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setInitializing(false);
        return;
      }
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch {
        // Token is invalid/expired — clear it rather than staying "logged in"
        // with no way to actually call the API.
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setInitializing(false);
      }
    }
    restoreSession();
  }, []);

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    localStorage.setItem("token", result.token);
    setToken(result.token);
    setUser(result.user);
    return result.user;
  };

  const register = async (details) => {
    const result = await authService.register(details);
    localStorage.setItem("token", result.token);
    setToken(result.token);
    setUser(result.user);
    return result.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    initializing,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
