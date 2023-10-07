import { Outlet, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import User from "./pages/admin/User";
import Profile from "./pages/admin/Profile";
import Course from "./pages/admin/Course";

import AdminLayout from "./pages/admin/layout/AdminLayout";
import CourseForm from "./pages/admin/CourseForm";
import UserForm from "./pages/admin/UserForm";
import Settings from "./pages/admin/Settings";




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
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <User />,
          },
          {
            path: 'new',
            element: <UserForm />,
          },
          {
            path: ':id',
            element: <UserForm />,
          },
        ],
      },
      
      {
        path: '/admin/Course',
        element: <Outlet />,
        children: [
          { 
            path: '',
            element: <Course />
             
          },
          {
            path: 'new',
            element: <CourseForm />,
          },
          {
            path: ':id',
            element: <CourseForm />
          },
        ],
      },
      {
        path: '/admin/profile',
        element: <Profile />,
      },
      {
        path: '/admin/settings',
        element: <Settings />,
      },
    ],
  },
]);

export default router;