import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps any element that should only be reachable while logged in.
// Usage: <Route element={<ProtectedRoute />}> <Route .../> </Route>
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  // Wait until we've checked whether a stored token is still valid before
  // deciding to redirect — otherwise a refresh would flash the login page
  // even for an already-logged-in user.
  if (initializing) {
    return <div className="route-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
