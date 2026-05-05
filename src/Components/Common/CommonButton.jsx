import React from "react";
function CommonButton({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  text = "submit",
  textColor = "text-grey-900",
  className = "",
  ...props
}) {
  return (
    <button 
      className={`hover:bg-blue-700 hover:cursor-pointer hover:text-white rounded-md px-4 py-2.5 text-sm font-medium ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}

export default CommonButton;
