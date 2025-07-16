import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";


//public pages
import Home from "../Pages/Home";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import AllPolicies from "../Pages/AllPolicies";
import Blogs from "../Pages/Blogs";
import Forbidden from "../Pages/Forbidden";

// Role-protected dashboard pages (placeholders for now)
import MyPolicies from "../Pages/Dashboard/Customer/MyPolicies";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AgentApplications from "../Pages/Dashboard/Agent/AgentApplications";


// Routes
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import CustomerRoute from "./CustomerRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/all-policies",
        element: <AllPolicies></AllPolicies>
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>
      },
      {
  path: '/forbidden',
  element: <Forbidden></Forbidden>
}
    ]
  },
 {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // CUSTOMER ROUTE
      {
        path: "my-policies",
        element: (
          <CustomerRoute>
            <MyPolicies />
          </CustomerRoute>
        ),
      },

      // ADMIN ROUTE
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },

      // AGENT ROUTE
      {
        path: "agent-applications",
        element: (
          <AgentRoute>
            <AgentApplications />
          </AgentRoute>
        ),
      },

    
    ],
  },


]);