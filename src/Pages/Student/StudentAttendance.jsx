import React, { useState } from "react";
import { Query, ID } from "appwrite";
import editStudent from "../../../appwrite/Student/editStudent";
import conf from "../../../conf/conf";
import studentAttendence from "../../../appwrite/Student/attendance"

function StudentAttendance() {
  
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [studentSession, setStudentSession] = useState("2025-2026");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // =========================================
  // FETCH STUDENTS
  // =========================================
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await editStudent.getStudentByClass(studentClass, section);

      const rows = res?.rows || [];

      setStudents(rows);

      // Default attendance => Present
      const defaultAttendance = {};

      rows.forEach((student) => {
        defaultAttendance[student.$id] = "Present";
      });

      setAttendance(defaultAttendance);
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
      console.log("attendance details");
     const attendanceData = JSON.stringify(attendance)
      console.log(studentSession, date, attendance, studentClass, section);
      await studentAttendence.mark_attandance(
        studentSession,
        date,
        studentClass,
        section,
        attendanceData,
      );
      alert("Attendance Saved Successfully");
    } catch (error) {
      console.log("Error saving attendance", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Heading */}
      <div className="bg-gray-800 text-white p-3 rounded mb-4">
        <h2 className="text-2xl font-semibold">
          Student Attendance Management
        </h2>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* academic-session */}
          <div>
            <label className="block mb-1 font-medium">Academic Session</label>

            <select
              value={studentSession}
              onChange={(e) => setStudentSession(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Session </option>

              <option value="2025-2026" selected>
                2025-2026
              </option>
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>
          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">Select Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Class */}
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

          {/* Section */}
          <div>
            <label className="block mb-1 font-medium">Select Section</label>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Section</option>

              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          {/* Search Button */}
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

      {/* Student Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Roll</th>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Section</th>
              <th className="p-3 text-left">Attendance Status</th>
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
                  <td className="p-3">{student.rollNumber || index + 1}</td>

                  <td className="p-3 font-medium">{student.fullName}</td>

                  <td className="p-3">{student.Class}</td>

                  <td className="p-3">{student.section}</td>

                  <td className="p-3">
                    <select
                      value={attendance[student.$id] || "Present"}
                      onChange={(e) =>
                        handleAttendanceChange(student.$id, e.target.value)
                      }
                      className="border p-2 rounded"
                    >
                      <option value="Present">Present</option>

                      <option value="Absent">Absent</option>

                      <option value="Leave">Leave</option>

                      <option value="Half Day">Half Day</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
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
    </div>
  );
}

export default StudentAttendance;
