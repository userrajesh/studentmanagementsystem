import React, { useEffect, useState } from "react";
import addStudent from "../../../appwrite/Student/StudentAdd";
import editStudent from "../../../appwrite/Student/editStudent";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CommonSelect, CommonInput } from "../../Components/Common/index";
import { useSelector } from "react-redux";
useSelector;
function AddStudent() {
  const { register, handleSubmit, setValue } = useForm();
  const { studentId } = useParams();
  const schoolData = useSelector(
    (state) => state.user_authentication.schoolData,
  );
  const isEdit = !!studentId;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([{ name: "", file: null }]);

  const [student, setStudent] = useState(null);
  const [parent, setParent] = useState(null);
  const [admission, setAdmission] = useState(null);
  const [filedetails, setFileDetails] = useState(null);

  // =============================
  // FETCH STUDENT DATA (EDIT MODE)
  // =============================
  useEffect(() => {
    if (isEdit) {
      fetchStudent();
    }
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      const [studentRes, parentRes, admissionRes, fileRes] = await Promise.all([
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

      //Manually set values
      setValue("admissionNumber", admissionRes.admissionNo);
      setValue("rollNo", admissionRes.rollNumber);
      setValue("admissionDate", admissionRes.admissionDate);

      setValue("studentclass", studentRes.Class);
      setValue("section", studentRes.section);
      setValue("biometricId", studentRes.biometricID);

      setValue("fullName", studentRes.fullName);
      setValue("gender", studentRes.gender);
      setValue("dateOfBirth", studentRes.dateOfBirth);

      setValue("category", studentRes.category);
      setValue("religion", studentRes.religion);
      setValue("idNumber", studentRes.idNumber);

      setValue("studentEmail", studentRes.studentEmail);
      setValue("studentPhone", studentRes.studentPhone);
      setValue("bloodGroup", studentRes.bloodGroup);
      setValue("address", studentRes.address);

      setValue("parentName", parentRes.fatherName);
      setValue("parentEmail", parentRes.fatherEmail);
      setValue("fatherPhone", parentRes.fatherPhno);
      setValue("fatherOccupation", studentRes.fatherOccupation);

      setValue("motherName", studentRes.motherName);
      setValue("motherPhone", studentRes.motherPhone);
      setValue("motherOccupation", studentRes.motherOccupation);

      setValue("studentHeight", studentRes.studentHeight);
      setValue("studentWeight", studentRes.studentWeight);
      setValue("medicalHistory", studentRes.medicalHistory);

      setValue("bankName", studentRes.bankName);
      setValue("accountNumber", studentRes.accountNumber);
      setValue("ifscCode", studentRes.ifscCode);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  // =============================
  // DOCUMENT HANDLING
  // =============================
  const handleChange = (index, field, value) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  const addMore = () => {
    setDocuments([...documents, { name: "", file: null }]);
  };

  // =============================
  // SUBMIT (ADD + EDIT)
  // =============================
const handleStudent = async (data) => {
  setError("");
  setLoading(true);

  try {
    let imageId = student?.image || null;
    let currentStudentId = studentId;

    // ==========================
    // Upload image if selected
    // ==========================
    if (data.image?.[0]) {
      const uploadedFile =
        await addStudent.uploadFile(data.image[0]);

      imageId = uploadedFile.$id;
    }

    // ==========================
    // UPDATE STUDENT
    // ==========================
    if (isEdit) {
      await addStudent.updateStudent(studentId, {
        ...data,
        image: imageId,
      });
    }

    // ==========================
    // ADD NEW STUDENT
    // ==========================
    else {
      const newStudent =
        await addStudent.addStudentDetails({
          ...data,
          image: imageId,

          // send only school id
          schoolId: schoolData?.$id,
        });

      currentStudentId = newStudent.$id;
    }

    // ==========================
    // Upload documents
    // ==========================
    await Promise.all(
      documents.map(async (doc) => {
        if (!doc.file) return;

        const uploadedDocument =
          await addStudent.uploadFile(doc.file);

        await addStudent.addStudentDocument({
          studentId: currentStudentId,
          name: doc.name,
          fileId: uploadedDocument.$id,
        });
      })
    );

    alert(
      isEdit
        ? "Student Updated Successfully"
        : "Student Added Successfully"
    );
  } catch (error) {
    console.error(error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-1 ">
      <h2 className="text-2xl bg-gray-800 text-white p-2 mb-4">
        {isEdit ? "Edit Student" : "Student Admission"}
      </h2>

      {/* <!-- Academic Details --> */}
      <form onSubmit={handleSubmit(handleStudent)} className="mt-6">
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
                onChange={(e) => handleChange(index, "file", e.target.files[0])}
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
          <button
            disabled={loading}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded"
          >
            {loading
              ? "Processing..."
              : isEdit
                ? "Update Student"
                : "Admit Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
