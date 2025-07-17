import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import AppSpinner from "../component/AppSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();


 console.log({ user, role, loading, roleLoading });

  if (loading || roleLoading) return <AppSpinner></AppSpinner>

  if (user && role === "admin"){
    console.log('Admin access granted!');
return children;
  } 


  console.log('Redirecting to forbidden:', { user, role });
  return <Navigate to="/forbidden" />;
};

export default AdminRoute;
