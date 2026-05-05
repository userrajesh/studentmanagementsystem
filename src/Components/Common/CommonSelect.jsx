import React, { useId } from "react";

function CommonSelect({ options, className = "", label, ...props }, ref) {
  const id = useId();
  //  console.log("common select", "Options",options,"Label",label)
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => {
          //agar option me value aayega tabhi map karega nahi to nahi karega
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default React.forwardRef(CommonSelect);
