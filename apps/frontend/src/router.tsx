import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import User from "./pages/admin/User";

import AdminLayout from "./pages/admin/layout/AdminLayout";
import Profile from "./pages/admin/Profile";
import Course from "./pages/admin/Course";
import AddCourse from "./pages/admin/layout/AddCourse";
import UpdateCourse from "./pages/admin/layout/UpdateCourse";


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
        element: <Profile />,
      },
      {
        path: '/admin/Course',
        element: <Course />,
      },
      {
        path: '/admin/AddCourse',
        element: <AddCourse />,
      },
      {
        path: '/admin/UpdateCourse/:id',
        element: <UpdateCourse />,
      },
    ],
  },

]);

export default router;