import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import AllPolicies from "../Pages/AllPolicies";
import Blogs from "../Pages/Blogs";
import Forbidden from "../Pages/Forbidden";

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
]);