import React, { useId } from "react";

function CommonSelect(
  { options = [], className = "", label = "", ...props },
  ref
) {
  const id = useId();

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

      <select
        id={id}
        ref={ref}
        {...props}
        className={`
          w-full
          px-3 sm:px-4
          py-2.5 sm:py-3
          min-h-[44px] sm:min-h-[48px]
          text-sm sm:text-base
          text-black
          bg-gray-50
          border border-gray-300
          rounded-lg
          outline-none
          transition-all duration-200
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          cursor-pointer
          ${className}
        `}
      >
        {options?.map((option) => (
          <option
            key={typeof option === "object" ? option.value : option}
            value={typeof option === "object" ? option.value : option}
          >
            {typeof option === "object" ? option.label : option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(CommonSelect);