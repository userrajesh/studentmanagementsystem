import React, { useState } from "react";
import editStudent from "../../../appwrite/Student/editStudent";
import studentAttendence from "../../../appwrite/Student/attendance";
import { EyeIcon } from "@heroicons/react/24/outline";
import MonthlyAttendanceModal from "./MonthlyAttendanceModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StudentAttendance() {
  const [showModal, setShowModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [monthlyAttendance, setMonthlyAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [studentSession, setStudentSession] = useState("2025-2026");

  const [studentClass, setStudentClass] = useState("");

  const [section, setSection] = useState("");

  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState({});

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  //school id from store
  const schoolData = useSelector(
    (state) => state.user_authentication.schoolData,
  );

  //Monthly report open
  const openMonthlyReport = async (student) => {
    try {
      // FETCH MONTHLY ATTENDANCE FROM DB

      const res = await studentAttendence.getMonthlyAttendance(
        studentSession,
        studentClass,
        section,
        date,
      );

      const rows = res.rows || [];
      const status = [];
      const attendanceObj = {};

      rows.forEach((row) => {
        const attendance = JSON.parse(row.Attendance);
        console.log(attendance);
        const status = attendance[student.$id];

        if (status) {
          attendanceObj[row.Date] = status;
        }
      });

      setMonthlyAttendance(attendanceObj);

      setSelectedStudent(student);

      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  // =========================================
  // ATTENDANCE COLOR FUNCTION
  // =========================================

  const getAttendanceColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700 border-green-400";

      case "Absent":
        return "bg-red-100 text-red-700 border-red-400";

      case "Leave":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";

      case "Half Day":
        return "bg-blue-100 text-blue-700 border-blue-400";

      default:
        return "bg-white text-gray-700 border-gray-300";
    }
  };

  // =========================================
  // FETCH STUDENTS + ATTENDANCE
  // =========================================

  const fetchStudents = async () => {
    try {
      setLoading(true);

      // FETCH ATTENDANCE
      if (!studentClass || !section || !studentSession || !date) {
        alert("Please select all filters");
        return;
      }
      const attendanceRes = await studentAttendence.getAttendance({
        studentSession,
        date,
        studentClass,
        section,
        schoolId: schoolData?.$id,
      });

      // FETCH STUDENTS
      const res = await editStudent.getStudentByClass({
        studentClass,
        section,
        schoolId: schoolData?.$id,
      });

      const rows = res?.rows || [];

      setStudents(rows);

      // =====================================
      // GET SAVED ATTENDANCE
      // =====================================

      let attendanceData = {};

      if (attendanceRes.rows.length > 0) {
        attendanceData = JSON.parse(attendanceRes.rows[0].Attendance);
      }

      // =====================================
      // CREATE FINAL ATTENDANCE OBJECT
      // =====================================

      const finalAttendance = {};

      rows.forEach((student) => {
        finalAttendance[student.$id] = attendanceData[student.$id] || " ";
      });

      setAttendance(finalAttendance);
    } catch (error) {
      console.log("Error fetching students", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // HANDLE ATTENDANCE CHANGE
  // =========================================

  const handleAttendanceChange = (studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  // =========================================
  // SAVE ATTENDANCE
  // =========================================

  const saveAttendance = async () => {
    try {
      setSaving(true);

      const attendanceData = JSON.stringify(attendance);
      const schoolId = schoolData.$id;
      await studentAttendence.mark_attandance({
        schoolId,
        studentSession,
        date,
        studentClass,
        section,
        attendance: attendanceData,
      });

      alert("Attendance Saved Successfully");
    } catch (error) {
      console.log("Error saving attendance", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* ========================================= */}
      {/* HEADING */}
      {/* ========================================= */}

      <div className="bg-gray-800 text-white p-3 rounded mb-4">
        <h2 className="text-2xl font-semibold">
          Student Attendance Management
        </h2>
      </div>

      {/* ========================================= */}
      {/* FILTERS */}
      {/* ========================================= */}

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* SESSION */}

          <div>
            <label className="block mb-1 font-medium">Academic Session</label>

            <select
              value={studentSession}
              onChange={(e) => setStudentSession(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Session</option>

              <option value="2025-2026">2025-2026</option>

              <option value="2026-2027">2026-2027</option>
            </select>
          </div>

          {/* DATE */}

          <div>
            <label className="block mb-1 font-medium">Select Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* CLASS */}

          <div>
            <label className="block mb-1 font-medium">Select Class</label>

            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Class</option>

              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
              <option value="Fifth">Fifth</option>
              <option value="Sixth">Sixth</option>
              <option value="Seventh">Seventh</option>
              <option value="Eighth">Eighth</option>
              <option value="Ninth">Ninth</option>
              <option value="Tenth">Tenth</option>
            </select>
          </div>

          {/* SECTION */}

          <div>
            <label className="block mb-1 font-medium">Select Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Section</option>

              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          {/* SEARCH BUTTON */}

          <div className="flex items-end">
            <button
              onClick={fetchStudents}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Search Students
            </button>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* STUDENT TABLE */}
      {/* ========================================= */}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Roll</th>

              <th className="p-3 text-left">Student Name</th>

              <th className="p-3 text-left">Attendance Status</th>
              <th className="p-3 text-left">View Monthly report</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading Students...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Students Found
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.$id} className="border-b hover:bg-gray-50">
                  {/* ROLL */}

                  <td className="p-3">{student.rollNumber || index + 1}</td>

                  {/* NAME */}

                  <td className="p-3 font-medium">{student.fullName}</td>

                  {/* ATTENDANCE */}

                  <td className="p-3">
                    <select
                      value={attendance[student.$id] || ""}
                      onChange={(e) =>
                        handleAttendanceChange(student.$id, e.target.value)
                      }
                      className={`border p-2 rounded font-medium outline-none transition-all duration-200 ${getAttendanceColor(
                        attendance[student.$id],
                      )}`}
                    >
                      <option value="">Select</option>

                      <option value="Present">Present</option>

                      <option value="Absent">Absent</option>

                      <option value="Leave">Leave</option>

                      <option value="Half Day">Half Day</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <EyeIcon
                      onClick={() => openMonthlyReport(student)}
                      className="size-5 cursor-pointer text-blue-500 hover:scale-110 transition"
                    />{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ========================================= */}
      {/* SAVE BUTTON */}
      {/* ========================================= */}

      {students.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={saveAttendance}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      )}
      {showModal && (
        <MonthlyAttendanceModal
          student={selectedStudent}
          attendanceData={monthlyAttendance}
          selectedMonth={date}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default StudentAttendance;
