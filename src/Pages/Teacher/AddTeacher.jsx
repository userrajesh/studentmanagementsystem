import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddTeacher() {
  const { register, handleSubmit, reset } = useForm();

  const [profileImage, setProfileImage] = useState(null);
  const [documents, setDocuments] = useState([{ name: "", file: null }]);

  const handleDocumentChange = (index, field, value) => {
    const updatedDocs = [...documents];
    updatedDocs[index][field] = value;
    setDocuments(updatedDocs);
  };

  const addDocumentField = () => {
    setDocuments([...documents, { name: "", file: null }]);
  };

  const removeDocumentField = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };

  const onSubmit = async (data) => {
    try {
      const teacherData = {
        ...data,
        profileImage,
        documents,
      };

      console.log("Teacher Data:", teacherData);

      // ==========================
      // APPWRITE API CALL HERE
      // ==========================

      reset();
      setProfileImage(null);
      setDocuments([{ name: "", file: null }]);

      alert("Teacher Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add teacher");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Add Teacher
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ================= BASIC DETAILS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                {...register("fullName")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="number"
                {...register("phone")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Gender</label>
              <select
                {...register("gender")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Date of Birth</label>
              <input
                type="date"
                {...register("dob")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Joining Date
              </label>
              <input
                type="date"
                {...register("joiningDate")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Qualification
              </label>
              <input
                type="text"
                {...register("qualification")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Experience</label>
              <input
                type="text"
                placeholder="e.g 5 Years"
                {...register("experience")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Department</label>
              <input
                type="text"
                {...register("department")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Subject</label>
              <input
                type="text"
                placeholder="Math, Science"
                {...register("subjects")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Assigned Class
              </label>
              <input
                type="text"
                placeholder="10-A"
                {...register("assignedClass")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Salary</label>
              <input
                type="number"
                {...register("salary")}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* ================= ADDRESS ================= */}

          <div className="mt-6">
            <label className="block mb-2 font-medium">Address</label>
            <textarea
              rows="4"
              {...register("address")}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* ================= PROFILE IMAGE ================= */}

          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Upload Profile Image
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* ================= DOCUMENTS ================= */}

          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Upload Documents
              </h2>

              <button
                type="button"
                onClick={addDocumentField}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Document
              </button>
            </div>

            {documents.map((doc, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
              >
                <div>
                  <label className="block mb-2 font-medium">
                    Document Name
                  </label>

                  <input
                    type="text"
                    value={doc.name}
                    onChange={(e) =>
                      handleDocumentChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Upload File
                  </label>

                  <input
                    type="file"
                    onChange={(e) =>
                      handleDocumentChange(
                        index,
                        "file",
                        e.target.files[0]
                      )
                    }
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => removeDocumentField(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= SUBMIT BUTTON ================= */}

          <div className="mt-10">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition duration-300"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;