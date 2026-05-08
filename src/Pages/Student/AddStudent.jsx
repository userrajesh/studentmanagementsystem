import React, { useState } from "react";
import student from "../../../appwrite/Student/StudentAdd";
import { useForm } from "react-hook-form";
import {
  CommonButton,
  CommonSelect,
  CommonInput,
} from "../../Components/Common/index";

function AddStudent() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState([{ name: "", file: null }]);

  const handleChange = (index, field, value) => {
    const updatedDocs = [...documents];
    updatedDocs[index][field] = value;
    setDocuments(updatedDocs);
  };

  const addMore = () => {
    setDocuments([...documents, { name: "", file: null }]);
  };

 const createstudent = async (data) => {
  setError("");

  try {
    // Upload student photo
    let imageId = null;
    if (data.image && data.image[0]) {
      const uploadedImage = await student.uploadFile(data.image[0]);
      imageId = uploadedImage.$id;
    }

    //  Create student
    const newStudent = await student.addStudentDetails({
      ...data,
      image: imageId,
    });

    const studentId = newStudent?.studentId; // we will fix this below

    // Upload documents + save
    await Promise.all(
      documents.map(async (doc) => {
        if (!doc.file) return;

        // upload file first
        const uploadedFile = await student.uploadFile(doc.file);

        // save in DB
        await student.addStudentDocument({
          studentId: studentId,
          name: doc.name,
          fileId: uploadedFile.$id,
        });
      })
    );

  } catch (error) {
    setError(error.message);
  }
};
  return (
    
      <div className="min-h-screen bg-gray-100 p-1 ">
          <h3 className="text-2xl bg-gray-800 text-gray-50 border-b pb-2">
        Student Admission
      </h3>

        {/* <!-- Academic Details --> */}
        <form onSubmit={handleSubmit(createstudent)} className="mt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              Academic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CommonInput
                required={true}
                label="Admission No"
                {...register("admissionNumber", {
                  required: true,
                })}
              />
              <CommonInput
                required={true}
                label="Roll No"
                {...register("rollNumber", {
                  required: true,
                })}
              />
              <CommonInput
                type="date"
                required={true}
                label="Admission Date"
                {...register("admissionDate", {
                  required: true,
                })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CommonSelect
                label="Select Class"
                options={[
                  "First",
                  "Second",
                  "Third",
                  "Fourth",
                  "Fifth",
                  "Sixth",
                  "Seventh",
                  "Eighth",
                  "Ninth",
                  "Tenth",
                ]}
                {...register("studentclass", {
                  required: true,
                })}
              />
              <CommonSelect
                label="Select Section"
                options={["A", "B", "C", "D"]}
                {...register("section", {
                  required: true,
                })}
              />
              <CommonInput
                type="text"
                required={true}
                label="Biomatric Id"
                {...register("biometricId", {
                  required: true,
                })}
              />
            </div>
          </div>

          {/* <!-- Student Details --> */}
          <div className="mb-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-green-600">
              Student Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CommonInput
                required={true}
                label="Full Name"
                {...register("fullName", {
                  required: true,
                })}
              />
              <CommonSelect
                label="Select Gender"
                options={["Male", "Female", "Other"]}
                {...register("gender", {
                  required: true,
                })}
              />

              <CommonInput
                type="date"
                required={true}
                label="Date of Birth"
                {...register("dateOfBirth", {
                  required: true,
                })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CommonSelect
                label="Select Category"
                options={["General", "OBC", "SC", "ST", "EBC", "Other"]}
                {...register("category", {
                  required: true,
                })}
              />
              <CommonSelect
                label="Religion"
                options={["Hindu", "Muslim", "Sikh", "Other"]}
                {...register("religion", {
                  required: true,
                })}
              />

              <CommonInput
                type="text"
                required={true}
                label="Aadhar Nummber/ID Number"
                {...register("idNumber", {
                  required: true,
                })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CommonInput
                type="email"
                required={false}
                label="Student Email"
                {...register("studentEmail", {
                  required: true,
                })}
              />
              <CommonInput
                type="text"
                required={false}
                label="Student Phone"
                {...register("studentPhone", {
                  required: true,
                })}
              />

              <CommonInput
                type="text"
                required={true}
                label="Blood Group"
                {...register("bloodGroup", {
                  required: true,
                })}
              />

              <CommonInput
                type="textarea"
                required={true}
                label="Address"
                placeholder="Enter your address"
                {...register("address", {
                  required: true,
                })}
              />

              <CommonInput
                label="Student Photo:"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: true })} //yaha theek karna hai
              />
            </div>
          </div>

          {/* <!-- Parent Details --> */}
          <div className="mb-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-red-500">
              Parent / Guardian Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CommonInput
                type="text"
                required={false}
                label="Father Name"
                {...register("parentName", {
                  required: true,
                })}
              />
              <CommonInput
                type="email"
                required={false}
                label="Father/Mother Email"
                {...register("parentEmail", {
                  required: true,
                })}
              />
              <CommonInput
                type="text"
                required={false}
                label="Father Phone"
                {...register("fatherPhone", {
                  required: true,
                })}
              />
              <CommonInput
                type="text"
                required={false}
                label="Father Occupation"
                {...register("fatherOccupation", {
                  required: true,
                })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CommonInput
                type="text"
                required={false}
                label="Mother Name"
                {...register("motherName", {
                  required: true,
                })}
              />

              <CommonInput
                type="text"
                required={false}
                label="Mother Phone"
                {...register("motherPhone", {
                  required: true,
                })}
              />
              <CommonInput
                type="text"
                required={false}
                label="Mother Occupation"
                {...register("motherOccupation", {
                  required: true,
                })}
              />
            </div>
          </div>

          {/* <!-- Health Details --> */}
          <div className="mb-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-600">
              Health & Medical Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonInput
                type="text"
                required={false}
                label="Height(Cm)"
                {...register("studentHeight", {
                  required: true,
                })}
              />
              <CommonInput
                type="text"
                required={false}
                label="Weight(Kg.)"
                {...register("studentWeight", {
                  required: true,
                })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonInput
                type="textarea"
                required={false}
                label="Medical History /Allergies"
                {...register("medicalHistory", {
                  required: true,
                })}
              />
            </div>
          </div>

          {/* <!-- Bank Details --> */}
          <div className="mb-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-orange-500">
              Bank Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CommonInput
                type="text"
                required={false}
                label="Bank Name"
                {...register("bankName", {
                  required: false,
                })}
              />

              <CommonInput
                type="text"
                required={false}
                label="Account Number"
                {...register("accountNumber", {
                  required: false,
                })}
              />
              <CommonInput
                type="text"
                required={false}
                label="IFSC Code"
                {...register("ifscCode", {
                  required: false,
                })}
              />
            </div>
          </div>
          {/* Upload Documents */}
          <div className="mb-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Upload Documents
            </h3>

            {documents.map((doc, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-3"
              >
                <CommonInput
                  type="text"
                  label="Document Name"
                  value={doc.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />

                <CommonInput
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif,image/pdf"
                  label="Choose Document"
                  onChange={(e) =>
                    handleChange(index, "file", e.target.files[0])
                  }
                />

                {/* Add Button */}
                <button
                  type="button"
                  onClick={addMore}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>

                {/* Remove Button */}
                {documents.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDocuments(documents.filter((_, i) => i !== index))
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* <!-- Submit --> */}
          <div class="flex justify-end">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
              Admit Student
            </button>
          </div>
        </form>
      </div>
    
  );
}

export default AddStudent;
