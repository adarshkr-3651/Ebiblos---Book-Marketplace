import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-green-500", // Mint green background
    textColor = "text-white",
    className = "",
    shadow = "shadow-md", // Default shadow
    hoverEffect = "hover:bg-green-600", // Hover effect for mint green
    ...props
}) {
    return (
        <button 
            type={type}
            className={` 
                px-5 py-2.5 rounded-lg font-medium transition-all duration-200
                ${bgColor} ${textColor} ${shadow} ${hoverEffect} active:scale-95 
                focus:outline-none focus:ring-2 focus:ring-green-300 ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}
