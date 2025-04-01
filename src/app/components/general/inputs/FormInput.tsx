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
  extractFilename?: (key: string) => string;
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
  extractFilename,
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

      {type === "file" ? (
        <div>
          {/* Label triggers hidden input */}
          <label
            htmlFor={name}
            className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-md inline-block"
          >
            Choose File
          </label>
          <span className="ml-2 text-gray-600">
            {value && extractFilename
              ? extractFilename(value)
              : "No file chosen"}
          </span>

          <input
            id={name}
            type="file"
            name={name}
            onBlur={handleBlur}
            className="hidden"
            onChange={onChange}
            accept={accept}
            disabled={disabled || loading}
          />
        </div>
      ) : (
        <input
          type={type || "text"}
          name={name}
          onBlur={handleBlur}
          className={twMerge(
            "w-full p-3 border rounded-lg shadow-sm transition h-10",
            `${
              errorMessage
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`,
            `${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}`
          )}
          onChange={onChange}
          value={value}
          placeholder={placeholder || ""}
          min={min}
          max={max}
          step={1}
          accept={accept}
          disabled={disabled || loading}
        />
      )}

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}
