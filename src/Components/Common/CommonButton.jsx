import React from "react";

function CommonButton({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  text = "Submit",
  textColor = "text-white",
  fullWidth = true,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        ${fullWidth ? "w-full" : ""}
        ${bgColor}
        ${textColor}
        px-4 sm:px-5
        py-2.5 sm:py-3
        min-h-[44px] sm:min-h-[48px]
        rounded-lg
        text-sm sm:text-base
        font-medium
        transition-all
        duration-300
        hover:opacity-90
        hover:cursor-pointer
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children || text}
    </button>
  );
}

export default CommonButton;