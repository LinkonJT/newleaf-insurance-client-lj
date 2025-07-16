import { Outlet } from "react-router";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";
import AppSpinner from "../component/AppSpinner";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <AppSpinner></AppSpinner>
  }

  if (!role) {
    return <Navigate to="/forbidden" />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        {/* TODO: Add navigation based on role */}
        <nav>
          <ul className="space-y-2">
            {role === "Admin" && <li>Admin Menu</li>}
            {role === "Agent" && <li>Agent Menu</li>}
            {role === "Customer" && <li>Customer Menu</li>}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
