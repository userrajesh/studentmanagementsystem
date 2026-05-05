import React, { useId } from "react";

function CommonInput(
  {
    label = "",
    required,
    type = "text",
    className = "",
    placeholder = "",
    ...props
  },
  ref
) {
  const id = useId();

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

      {type === "textarea" ? (
        <textarea
          ref={ref}
          id={id}
          required={required}
          placeholder={placeholder}
          className={`w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black focus:border-blue-500 ${className}`}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black focus:border-blue-500 ${className}`}
          {...props}
        />
      )}
    </div>
  );
}

export default React.forwardRef(CommonInput);