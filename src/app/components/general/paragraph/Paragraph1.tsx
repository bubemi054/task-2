import React from "react";
import { twMerge } from "tailwind-merge";

export default function Paragraph1({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={twMerge(
        "text-base sm:text-lg md:text-xl font-light",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
