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

  const commonClasses = `
    w-full
    px-3 sm:px-4
    py-2.5 sm:py-3
    text-sm sm:text-base
    border border-gray-300
    rounded-lg
    bg-gray-50
    text-black
    transition-all duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    placeholder:text-gray-400
    ${className}
  `;

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm sm:text-base font-medium text-gray-700"
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
          rows={4}
          className={`${commonClasses} min-h-[120px] resize-y`}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className={commonClasses}
          {...props}
        />
      )}
    </div>
  );
}

export default React.forwardRef(CommonInput);