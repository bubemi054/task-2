import React from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  accept?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string | undefined | boolean;
  min?: number;
  max?: number;
  loading?: boolean;
  disabled?: boolean;
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
  required,
  handleBlur,
  accept,
  min,
  max,
  loading,
  disabled,
}: FormInputProps) {
  return (
    <div
      className={twMerge(
        "space-y-2",
        `${loading && "animate-pulse"}`,
        className
      )}
    >
      {label && (
        <label className="block text-base font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type || "text"}
        name={name || ""}
        onBlur={handleBlur}
        className={`w-full p-3 border rounded-lg shadow-sm transition 
          ${
            errorMessage
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}`}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder || ""}
        min={min || 0}
        max={max || 9000000000}
        step={1}
        accept={accept || ""}
        disabled={disabled || loading || false}
      />
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}
