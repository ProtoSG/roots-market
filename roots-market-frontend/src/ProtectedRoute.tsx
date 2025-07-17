import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (isAuthenticated && location.pathname === "/artisan") {
    console.log("PASA?", isAuthenticated)
    return <Navigate to="/artisan" replace />;
  }

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};