import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import User from "./pages/admin/User";

import AdminLayout from "./pages/admin/layout/AdminLayout";
import Profile from "./pages/admin/Profile";
import Course from "./pages/admin/Course";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: '/admin/user',
        element: <User />,
      },
      {
        path: '/admin/profile',
        element: <Profile />
      },
      {
        path: '/admin/Course',
        element: <Course />
      },
    ],
  },

]);

export default router;