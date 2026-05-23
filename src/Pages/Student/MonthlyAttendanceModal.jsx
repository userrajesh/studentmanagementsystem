import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MonthlyAttendanceModal({
  student,
  attendanceData,
  selectedMonth,
  onClose,
}) {

  // ==============================
  // GET STATUS FOR A DATE
  // ==============================

const getStatus = (date) => {

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return attendanceData[formattedDate];
};

  // ==============================
  // RETURN COLOR
  // ==============================

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-500";

      case "Absent":
        return "bg-red-500";

      case "Leave":
        return "bg-yellow-400";

      case "Half Day":
        return "bg-blue-500";

      default:
        return "";
    }
  };

  // ==============================
  // COUNT SUMMARY
  // ==============================

  const summary = {
    Present: 0,
    Absent: 0,
    Leave: 0,
    "Half Day": 0,
  };

  let data = Object.values(attendanceData);

  data.forEach((item) => {
    if (summary[item] !== undefined) {
      summary[item]++;
    }
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[850px]">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-5">

          <div>
            <h3 className="text-2xl font-bold text-gray-950">
              {student.fullName}
            </h3>

            <p className="text-gray-500 text-sm">
              Monthly Attendance Report
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

        {/* SUMMARY */}

        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-green-100 p-4 rounded-xl text-center">
            <h3 className="text-green-700 font-semibold">Present</h3>
            <p className="text-2xl font-bold">
              {summary.Present}
            </p>
          </div>

          <div className="bg-red-100 p-4 rounded-xl text-center">
            <h3 className="text-red-700 font-semibold">Absent</h3>
            <p className="text-2xl font-bold">
              {summary.Absent}
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl text-center">
            <h3 className="text-yellow-700 font-semibold">Leave</h3>
            <p className="text-2xl font-bold">
              {summary.Leave}
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded-xl text-center">
            <h3 className="text-blue-700 font-semibold">Half Day</h3>
            <p className="text-2xl font-bold">
              {summary["Half Day"]}
            </p>
          </div>

        </div>

        {/* LEGEND */}

        <div className="flex gap-6 mb-5 text-sm font-medium">

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            Present
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            Absent
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            Leave
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            Half Day
          </div>

        </div>

        {/* CALENDAR */}

        <Calendar
          value={selectedMonth}

          tileContent={({ date, view }) => {

            if (view !== "month") return null;

            const status = getStatus(date);

            if (!status) return null;

            return (
              <div className="flex justify-center mt-1">
                <div
                  title={status}
                  className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}
                ></div>
              </div>
            );
          }}
        />

      </div>
    </div>
  );
}

export default MonthlyAttendanceModal;