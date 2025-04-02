import React from "react";
import { twMerge } from "tailwind-merge";

export default function Button1({
  className,
  type,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        "bg-white text-gray-900 font-medium rounded-md py-2 cursor-pointer hover:bg-gray-200 transition",
        className
      )}
      type={type || "button"}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
