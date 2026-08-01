import React, { useEffect, useState } from "react";
import attendanceimage from "../assets/attendance.jpg";
import onlinetest from "../assets/onlinetest.jpg";
import student from "../assets/student.jpg";
const slides = [
  {
    image: student,
    title: "Student Management",
    description:
      "Manage student records, admissions, attendance, and academic performance with ease.",
  },
  {
    image: attendanceimage,
    title: "Attendance Tracking",
    description:
      "Track daily attendance and generate detailed attendance reports instantly.",
  },
  {
    image: onlinetest,
    title: "Exam & Result Management",
    description:
      "Create exams, publish results, and monitor student progress efficiently.",
  },
];

function SchoolSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-4 ">
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="w-full h-full object-cover overflow-hidden"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-white text-3xl font-bold mb-3">
            {slides[current].title}
          </h2>

          <p className="text-gray-200 text-base">
            {slides[current].description}
          </p>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                current === index ? "bg-white w-8" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SchoolSlider;
