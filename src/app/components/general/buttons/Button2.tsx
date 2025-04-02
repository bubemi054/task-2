import React from "react";
import { twMerge } from "tailwind-merge";

export default function Button2({
  className,
  type,
  children,
  onClick,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
    className={twMerge(
      "w-full lg:w-[300px] px-6 py-2 rounded-md disabled:opacity-80 cursor-pointer disabled:cursor-not-allowed",
      type === "button"
        ? "bg-gray-500 text-white hover:bg-gray-600"
        : "bg-black text-white hover:bg-gray-800", // Default style for other types
      className
    )}
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
