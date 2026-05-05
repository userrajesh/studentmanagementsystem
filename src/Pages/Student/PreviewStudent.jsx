import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import editStudent from "../../../appwrite/Student/editStudent";

function PreviewStudent() {
  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [parent, setParent] = useState(null);
  const [admission, setAdmission] = useState(null);
  const [filedetails, setFileDetails] = useState(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [studentRes, parentRes, admissionRes, fileRes] =
          await Promise.all([
            editStudent.getSingleStudent(studentId),
            editStudent.getParentDetails(studentId),
            editStudent.getAdmissionDetails(studentId),
            editStudent.getFileDetails(studentId),
          ]);
        console.log([studentRes, parentRes, admissionRes, fileRes]);
        setStudent(studentRes || null);
        setParent(parentRes || null);
        setAdmission(admissionRes || null);
        setFileDetails(fileRes || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [studentId]);

  const imageUrl = student?.studentPhoto
    ? editStudent.getStudentPicture(student.studentPhoto)
    : null;

  const handlePrint = () => window.print();
  console.log(imageUrl);
  if (loading) return <p className="p-6">Loading...</p>;
  if (!student) return <p className="p-6">Student not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Print
        </button>
      </div>

      {/* Student Card */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 flex gap-6 items-center">
        <div className="w-20 h-20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={student.fullName}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl">
              {student.fullName?.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold">{student.fullName}</h3>
          <p className="text-gray-600">
            Class {student.Class} - Section {student.section}
          </p>
          <p className="text-sm text-gray-500">ID: {student.$id}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow">
        {/* Tab Buttons */}
        <div className="flex border-b">
          {["profile", "parent", "admission"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-medium">{student.fullName}</p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{student.studentPhone}</p>
              </div>

              <div>
                <p className="text-gray-500">Class</p>
                <p className="font-medium">{student.Class}</p>
              </div>

              <div>
                <p className="text-gray-500">Section</p>
                <p className="font-medium">{student.section}</p>
              </div>
            </div>
          )}

          {/* PARENT */}
          {activeTab === "parent" && (
            <div>
              <h4 className="font-semibold mb-4">Parent Details</h4>

              {!parent ? (
                <p className="text-gray-500">No parent data found</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500">Father Name</p>
                    <p className="font-medium">{parent.fatherName}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Mother Name</p>
                    <p className="font-medium">{parent.motherName}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Contact</p>
                    <p className="font-medium">{parent.phone}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ADMISSION */}
          {activeTab === "admission" && (
            <div>
              <h4 className="font-semibold mb-4">Admission Details</h4>

              {!admission ? (
                <p className="text-gray-500">No admission data found</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500">Admission Date</p>
                    <p className="font-medium">{admission.date || "N/A"}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Admission Number</p>
                    <p className="font-medium">
                      {admission.admissionNumber || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Previous School</p>
                    <p className="font-medium">
                      {admission.previousSchool || "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewStudent;
