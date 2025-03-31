import React from "react";
import { twMerge } from "tailwind-merge";

export default function Input1({
  type,
  placeholder,
  onChange,
  value,
  name,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type || "text"}
      className={twMerge(
        "w-full text-white outline-none border-none bg-transparent placeholder-white",
        className
      )}
      placeholder={placeholder || ""}
      onChange={onChange || (() => {})}
      value={value || ""}
      name={name || ""}
      {...props}
    />
  );
}
