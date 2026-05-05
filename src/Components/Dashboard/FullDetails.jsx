import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);
function FullDetails() {
  const stats = [
    { title: "Students", value: "1245", color: "bg-blue-500" },
    { title: "Teachers", value: "86", color: "bg-green-500" },
    { title: "Staff", value: "42", color: "bg-purple-500" },
    { title: "Pending Fees", value: "₹3,40,000", color: "bg-red-500" },
  ];

  const attendanceChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance %",
        data: [90, 92, 91, 95, 93],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
      },
    ],
  };

  const feeChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Fees Collected",
        data: [20000, 45000, 30000, 60000, 75000, 90000],
        backgroundColor: "#10b981",
      },
    ],
  };

  const genderChart = {
    labels: ["Boys", "Girls"],
    datasets: [
      {
        data: [640, 605],
        backgroundColor: ["#3b82f6", "#ec4899"],
      },
    ],
  };

  const fees = [
    { student: "Aarav Sharma", class: "10A", amount: "₹5000", status: "Paid" },
    { student: "Priya Singh", class: "9B", amount: "₹5000", status: "Pending" },
  ];

  return (
    <div>
      {" "}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <span className="text-gray-500">{item.title}</span>
              <div className="text-2xl font-bold dark:text-white">
                {item.value}
              </div>
            </div>

            <div className={`w-12 h-12 rounded-full ${item.color}`} />
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 dark:text-white">
            Weekly Attendance
          </h2>
          <Line data={attendanceChart} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 dark:text-white">
            Fees Collection
          </h2>
          <Bar data={feeChart} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 dark:text-white">
            Students Gender
          </h2>
          <Doughnut data={genderChart} />
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6">
        <h2 className="font-semibold mb-4 dark:text-white">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Student
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Assign Fees
          </button>

          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Add Staff
          </button>

          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            Create Notice
          </button>
        </div>
      </div>
      {/* Fees Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6">
        <h2 className="font-semibold mb-4 dark:text-white">Fees Management</h2>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-2">Student</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((f, i) => (
              <tr key={i} className="border-b dark:border-gray-700">
                <td className="py-2">{f.student}</td>
                <td>{f.class}</td>
                <td>{f.amount}</td>

                <td
                  className={
                    f.status === "Paid" ? "text-green-600" : "text-red-600"
                  }
                >
                  {f.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FullDetails;
