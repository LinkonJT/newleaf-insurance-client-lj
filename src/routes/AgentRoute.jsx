import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import AppSpinner from "../component/AppSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) return <AppSpinner></AppSpinner>

  if (user && role === "agent") return children;

  return <Navigate to="/forbidden" />;
};

export default AdminRoute;
