import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import editStudent from "../../../appwrite/Student/editStudent";
import { Link } from "react-router-dom";
import PreviewStudent from "./PreviewStudent";

function ViewStudent() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await editStudent.getAllStudent();
        setStudentData(res.rows || []); // Appwrite returns documents
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-gray-100">
      <h3 className="text-2xl bg-gray-800 text-gray-50 border-b pb-2">
        All Students
      </h3>

      <table className="w-full text-sm text-left text-body">
        <thead className="text-sm bg-gray-200 text-gray-600">
          <tr>
            <th className="px-6 py-3">Student Name</th>
            <th className="px-6 py-3">Class</th>
            <th className="px-6 py-3">Section</th>
            <th className="px-6 py-3">Contact Number</th>
            <th className="px-6 py-3">Pending Fees</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {studentData.map((item, index) => (
            <tr
              key={index}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-600"
            >
              <td className="px-6 py-4">{item.fullName}</td>
              <td className="px-6 py-4">{item.Class}</td>
              <td className="px-6 py-4">{item.section}</td>
              <td className="px-6 py-4">{item.studentPhone}</td>
              <td className="px-6 py-4">{item.pendingFees || "0"}</td>

              <td className="px-6 py-4 flex gap-2">
                <Link
                  to={`/preview-student/${item.$id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EyeIcon className="size-5 cursor-pointer" />
                </Link>
                <PencilSquareIcon className="size-5 cursor-pointer" />
                <TrashIcon className="size-5 cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewStudent;
