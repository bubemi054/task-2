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
        "w-full lg:w-[300px] bg-black text-white px-6 py-2 rounded-md",
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
