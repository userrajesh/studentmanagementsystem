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
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
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
        path: "/preview-student/:studentId",
        element: <PreviewStudent />,
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
