import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public pages
import Home from "../Pages/Home";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import AllPolicies from "../Pages/AllPolicies";
import Blogs from "../Pages/Blogs";
import Forbidden from "../Pages/Forbidden";

// Customer Dashboard pages
import MyPolicies from "../Pages/Dashboard/Customer/MyPolicies";
import PaymentStatus from "../Pages/Dashboard/Customer/PaymentStatus";
import PaymentPage from "../Pages/Dashboard/Customer/PaymentPage";
import ClaimRequest from "../Pages/Dashboard/Customer/ClaimRequest";

// Admin Dashboard pages
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageApplications from "../Pages/Dashboard/Admin/ManageApplications";
import ManagePolicies from "../Pages/Dashboard/Admin/ManagePolicies";
import ManageTransactions from "../Pages/Dashboard/Admin/ManageTransactions";
import AddPolicy from "../Pages/Dashboard/Admin/AddPolicy";

// Agent Dashboard pages
import AssignedCustomers from "../Pages/Dashboard/Agent/AssignedCustomers";
import ManageBlogs from "../Pages/Dashboard/Agent/ManageBlogs";
import PolicyClearance from "../Pages/Dashboard/Agent/PolicyClearance";

// Shared
import Profile from "../Pages/Dashboard/Shared/Profile";

// Route protection
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import CustomerRoute from "./CustomerRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/all-policies", element: <AllPolicies /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/forbidden", element: <Forbidden /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Shared
      { path: "profile", element: <Profile /> },

      // Customer
      {
        path: "my-policies",
        element: (
          <CustomerRoute>
            <MyPolicies />
          </CustomerRoute>
        ),
      },
      {
        path: "payment-status",
        element: (
          <CustomerRoute>
            <PaymentStatus />
          </CustomerRoute>
        ),
      },
      {
        path: "payment/:applicationId",
        element: (
          <CustomerRoute>
            <PaymentPage />
          </CustomerRoute>
        ),
      },
      {
        path: "claim-request",
        element: (
          <CustomerRoute>
            <ClaimRequest />
          </CustomerRoute>
        ),
      },

      // Admin
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-applications",
        element: (
          <AdminRoute>
            <ManageApplications />
          </AdminRoute>
        ),
      },
      {
  path: 'add-policy',
  element: <AdminRoute>
    <AddPolicy></AddPolicy>
  </AdminRoute>
},
      {
        path: "manage-policies",
        element: (
          <AdminRoute>
            <ManagePolicies />
          </AdminRoute>
        ),
      },
      {
        path: "manage-transactions",
        element: (
          <AdminRoute>
            <ManageTransactions />
          </AdminRoute>
        ),
      },

      // Agent
      {
        path: "assigned-customers",
        element: (
          <AgentRoute>
            <AssignedCustomers />
          </AgentRoute>
        ),
      },
      {
        path: "manage-blogs",
        element: (
          <AgentRoute>
            <ManageBlogs />
          </AgentRoute>
        ),
      },
      {
        path: "policy-clearance",
        element: (
          <AgentRoute>
            <PolicyClearance />
          </AgentRoute>
        ),
      },
    ],
  },
]);
