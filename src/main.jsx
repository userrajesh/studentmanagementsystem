import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PreviewStudent from "./Pages/Student/PreviewStudent.jsx";
import "./index.css";
import App from "./App.jsx";
import {
  Dashboard,
  Home,
  Register,
  AuthLayout,
  Login,
} from "./Components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import authStore from "./store/authStore.js";
import AddStudent from "./Pages/Student/AddStudent.jsx";
import ViewStudent from "./Pages/Student/ViewStudent.jsx";
import StudentAttendance from "./Pages/Student/StudentAttendance.jsx";
import ViewTeacher from "./Pages/Teacher/ViewTeacher.jsx";
import AddTeacher from "./Pages/Teacher/AddTeacher.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import VerifyEmail from "./Components/VerifyEmail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <Dashboard />
          </AuthLayout>
        ),
        children: [
          {
            path: "addStudent",
            element: (
              <AuthLayout authentication={true}>
                <AddStudent />
              </AuthLayout>
            ),
          },
          {
            path: "viewStudent",
            element: (
              <AuthLayout authentication={true}>
                <ViewStudent />
              </AuthLayout>
            ),
          },
          {
            path: "preview-student/:studentId",
            element: (
              <AuthLayout authentication={true}>
                <PreviewStudent />
              </AuthLayout>
            ),
          },
          {
            path: "student-attendance",
            element: (
              <AuthLayout authentication={true}>
                <StudentAttendance />
              </AuthLayout>
            ),
          },
          {
            path: "all-teachers",
            element: (
              <AuthLayout authentication={true}>
                <ViewTeacher />
              </AuthLayout>
            ),
          },
          {
            path: "add-teacher",
            element: (
              <AuthLayout authentication={true}>
                <AddTeacher />
              </AuthLayout>
            ),
          },
          {
            path: "edit-student/:studentId",
            element: (
              <AuthLayout authentication={true}>
                <AddStudent />
              </AuthLayout>
            ),
          },
        ],
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },

      {
        path: "/registeruser",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "/verify-email",
        element: (
          <AuthLayout authentication={false}>
            <VerifyEmail />
          </AuthLayout>
        ),
      },
      {
        path: "https://rajeshmandal.netlify.app/reset-password",
        element: (
          <AuthLayout authentication={false}>
            <ResetPassword />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={authStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
