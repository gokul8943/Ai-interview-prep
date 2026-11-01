import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/AuthStrore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.authState.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
