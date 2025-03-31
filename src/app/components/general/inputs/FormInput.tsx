import React from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  optional?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  min?: number;
  max?: number;
}

export default function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  errorMessage,
  optional,
  min,
  max,
}: FormInputProps) {
  return (
    <div className={twMerge("space-y-2", className)}>
      {label && (
        <label className="block text-base font-semibold text-gray-700">
          {label} {!optional && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type || "text"}
        name={name || ""}
        className={`w-full p-3 border rounded-lg shadow-sm transition ${
          errorMessage
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        }`}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder || ""}
        min={min || 0}
        max={max || 9000000000}
      />
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}
