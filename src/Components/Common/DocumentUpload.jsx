import React, { useState } from "react";

function DocumentUpload() {
  const [documents, setDocuments] = useState([
    { name: "", file: null },
  ]);

  const handleChange = (index, field, value) => {
    const updatedDocs = [...documents];
    updatedDocs[index][field] = value;
    setDocuments(updatedDocs);
  };

  const addMore = () => {
    setDocuments([...documents, { name: "", file: null }]);
  };

  const removeField = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(documents);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Upload Documents
      </h2>

      <form onSubmit={handleSubmit}>
        {documents.map((doc, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Document Name */}
              <div className="md:col-span-5">
                <input
                  type="text"
                  placeholder="Document Name"
                  value={doc.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    text-sm sm:text-base
                    border border-gray-300
                    rounded-lg
                    focus:ring-2
                    focus:ring-blue-500
                    focus:outline-none
                  "
                />
              </div>

              {/* File Upload */}
              <div className="md:col-span-5">
                <input
                  type="file"
                  onChange={(e) =>
                    handleChange(index, "file", e.target.files[0])
                  }
                  className="
                    w-full
                    text-sm sm:text-base
                    border border-gray-300
                    rounded-lg
                    p-2
                    cursor-pointer
                  "
                />
              </div>

              {/* Remove Button */}
              <div className="md:col-span-2">
                {documents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="
                      w-full
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-3
                      rounded-lg
                      transition
                    "
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="button"
            onClick={addMore}
            className="
              w-full sm:w-auto
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-3
              rounded-lg
              transition
            "
          >
            + Add More
          </button>

          <button
            type="submit"
            className="
              w-full sm:w-auto
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-lg
              transition
            "
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
}

export default DocumentUpload;