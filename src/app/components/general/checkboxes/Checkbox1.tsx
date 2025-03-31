import React from "react";
import { twMerge } from "tailwind-merge";

interface Checkbox1Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className?: string;
  name: string;
  label?: string;
}

export default function Checkbox1({
  onChange,
  checked,
  className,
  label,
  name,
}: Checkbox1Props) {
  return (
    <div className={twMerge("flex items-center space-x-2 cursor-pointer", className)}>
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        name={name}
        role="checkbox"
      />
      {label && (
        <label role="aria-checkbox" className="text-sm">
          {label}
        </label>
      )}
    </div>
  );
}
