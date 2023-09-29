import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import User from "./pages/admin/User";
import Profile from "./pages/admin/Profile";
import Course from "./pages/admin/Course";

import AdminLayout from "./pages/admin/layout/AdminLayout";
import AddCourse from "./pages/admin/layout/AddCourse";
import UpdateCourse from "./pages/admin/layout/UpdateCourse";
import AddUser from "./pages/admin/layout/AddUser";
import UpdateUser from "./pages/admin/layout/UpdateUser";


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
      {
        path: '/admin/AddUser',
        element: <AddUser />,
      },
      {
        path: '/admin/UpdateUser/:id',
        element: <UpdateUser />,
      },
    ],
  },

]);

export default router;