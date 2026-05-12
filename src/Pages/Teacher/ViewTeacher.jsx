import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import teacherService from "../../../appwrite/Teacher/teacherConfig";

function ViewTeacher() {
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const offset = (page - 1) * limit;

      const res = await teacherService.getAllTeachers({
        limit,
        offset,
        search,
        departmentFilter,
        subjectFilter,
      });

      setTeacherData(res.rows);
      setTotal(res.total);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Refetch on page/filter change
  useEffect(() => {
    fetchTeachers();
  }, [page, departmentFilter, subjectFilter]);

  // 🔍 Debounced Search
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchTeachers();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg mb-4">
        <h2 className="text-2xl font-semibold">
          All Teachers ({total})
        </h2>

        <button
          onClick={() => navigate("/dashboard/add-teacher")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Add Teacher
        </button>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by teacher name..."
          className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Science">Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Computer">Computer</option>
        </select>

        <select
          className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Computer">Computer</option>
        </select>

        <button
          onClick={fetchTeachers}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Teacher Name</th>
              <th className="text-left">Department</th>
              <th className="text-left">Subject</th>
              <th className="text-left">Phone</th>
              <th className="text-left">Salary</th>
              <th className="text-left">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-600"
                >
                  Loading...
                </td>
              </tr>
            ) : teacherData.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-600"
                >
                  No Teachers Found
                </td>
              </tr>
            ) : (
              teacherData.map((item) => (
                <tr
                  key={item.$id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {item.fullName}
                  </td>

                  <td>{item.department}</td>

                  <td>{item.subjects}</td>

                  <td>{item.phone}</td>

                  <td>₹ {item.salary}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status || "Active"}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      {/* VIEW */}
                      <EyeIcon
                        className="size-5 text-green-600 cursor-pointer hover:scale-110 transition"
                        onClick={() =>
                          navigate(
                            `/dashboard/preview-teacher/${item.$id}`
                          )
                        }
                      />

                      {/* EDIT */}
                      <PencilSquareIcon
                        className="size-5 text-blue-600 cursor-pointer hover:scale-110 transition"
                        onClick={() =>
                          navigate(
                            `/dashboard/edit-teacher/${item.$id}`
                          )
                        }
                      />

                      {/* DELETE */}
                      <TrashIcon className="size-5 text-red-600 cursor-pointer hover:scale-110 transition" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}

      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewTeacher;