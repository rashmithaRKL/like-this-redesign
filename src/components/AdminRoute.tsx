
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
