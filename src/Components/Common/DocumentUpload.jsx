import React, { useState } from "react";

function DocumentUpload() {
  const [documents, setDocuments] = useState([
    { name: "", file: null } 
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
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(documents);
  };

  return (
    <div className="max-w-xl p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Upload Documents</h2>

      <form onSubmit={handleSubmit}>
        {documents.map((doc, index) => (
          <div key={index} className="flex gap-3 mb-4 items-center">

            {/* Document Name */}
            <input
              type="text"
              placeholder="Document Name"
              value={doc.name}
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
              className="border p-2 rounded w-1/2"
            />

            {/* File Upload */}
            <input
              type="file"
              onChange={(e) =>
                handleChange(index, "file", e.target.files[0])
              }
              className="border p-2 rounded w-1/2"
            />

            {/* Remove Button */}
            {documents.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}

        {/* Add More */}
        <button
          type="button"
          onClick={addMore}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Add More
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DocumentUpload;