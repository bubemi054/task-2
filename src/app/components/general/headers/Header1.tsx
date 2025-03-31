import React from "react";
import { twMerge } from "tailwind-merge";

export default function Header1({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={twMerge(
        "text-3xl sm:text-4xl md:text-5xl font-bold text-left",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
