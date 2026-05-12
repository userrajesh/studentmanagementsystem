import React, { useState } from "react";
import FullDetails from "../Components/Dashboard/FullDetails";
import AddStudent from "../Pages/Student/AddStudent";
import ViewStudent from "../Pages/Student/ViewStudent";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  const [teacherMenuOpen, setTeacherMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const renderPage = () => {
    switch (activePage) {
      case "addStudent":
        return <AddStudent />;
      case "viewStudent":
        return <ViewStudent />;
      default:
        return <FullDetails />;
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-45 bg-white dark:bg-gray-800 shadow-lg relative">
            <div className="p-6 font-bold text-xl border-b dark:border-gray-700">
              School ERP
            </div>

            <nav className="p-4 space-y-2 text-sm">
              <button
                onClick={() => navigate("/")}
                className="block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </button>

              {/* Students Dropdown */}
              <div>
                <button
                  onClick={() => setStudentMenuOpen(!studentMenuOpen)}
                  className="w-full flex justify-between items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Students
                  <span>{studentMenuOpen ? "▲" : "▼"}</span>
                </button>

                {studentMenuOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    <button
                      onClick={() => navigate("addStudent")}
                      className="block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Student Admission
                    </button>

                    <button
                      onClick={() => navigate("viewStudent")}
                      className="block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Student List
                    </button>

                    <button
                      className="block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => navigate("student-attendance")}
                    >
                      Student Attendance
                    </button>
                  </div>
                )}
              </div>

              {/* Teacher Dropdown */}
              <div>
                <button
                  onClick={() => setTeacherMenuOpen(!teacherMenuOpen)}
                  className="w-full flex justify-between items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Teachers 
                  <span>{teacherMenuOpen ? "▲" : "▼"}</span>
                </button>

                {teacherMenuOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    <button
                      onClick={() => navigate("add-teacher")}
                      className="block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Add Teacher
                    </button>

                    

                    <button
                      className="block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => navigate("all-teachers")}
                    >
                      
                  All Teachers
                    </button>
                  </div>
                )}
              </div>

              <button className="block w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                Staff Management
              </button>
            </nav>
          </aside>
        )}

        {/* Toggle Sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-6 left 62.5 z-10 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        <main className="flex-1 p-4">
          {location.pathname === "/dashboard" ? <FullDetails /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}
