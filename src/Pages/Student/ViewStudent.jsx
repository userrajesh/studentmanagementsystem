import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import editStudent from "../../../appwrite/Student/editStudent";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewStudent() {
  const schoolData = useSelector(
    (state) => state.user_authentication.schoolData,
  );
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const offset = (page - 1) * limit;

      const res = await editStudent.getAllStudent({
        limit,
        offset,
        search,
        classFilter,
        sectionFilter,
        schoolId: schoolData.$id,
      });

      setStudentData(res.rows);
      setTotal(res.total);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Refetch on change
  useEffect(() => {
    fetchStudents();
  }, [page, classFilter, sectionFilter]);

  // 🔍 Debounced Search
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchStudents();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-gray-100 p-4">
      <h3 className="text-2xl bg-gray-800 text-white p-2 mb-4">
        All Students ({total})
      </h3>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="">All Classes</option>
          <option value="first">Class 1</option>
          <option value="second">Class 2</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setSectionFilter(e.target.value)}
        >
          <option value="">All Sections</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <button
          onClick={fetchStudents}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      {/* 📊 Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Phone</th>
            <th>Fees</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : studentData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No students found
              </td>
            </tr>
          ) : (
            studentData.map((item) => (
              <tr key={item.$id} className="bg-gray-100 hover:bg-gray-200">
                <td className="px-4 py-2">{item.fullName}</td>
                <td>{item.Class}</td>
                <td>{item.section}</td>
                <td>{item.studentPhone}</td>
                <td>{item.pendingFees || "0"}</td>

                <td className="flex gap-2">
                  <EyeIcon
                    className="size-5 cursor-pointer text-green-500"
                    onClick={() =>
                      navigate(`/dashboard/preview-student/${item.$id}`)
                    }
                  />
                  <PencilSquareIcon
                    onClick={() =>
                      navigate(`/dashboard/edit-student/${item.$id}`)
                    }
                    className="size-5 cursor-pointer text-blue-500"
                  />
                  <TrashIcon className="size-5 text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white disabled:bg-gray-400"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 text-white disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewStudent;
