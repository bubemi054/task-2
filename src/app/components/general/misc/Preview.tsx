import React from "react";
import { IoMdClose } from "react-icons/io";

interface PreviewProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Preview({ children, onClose }: PreviewProps) {
  return (
    <div className="w-full h-[100vh] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-5 bg-black flex justify-center items-center">
      <IoMdClose
        data-testid="close-icon"
        className="text-[30px] text-white absolute top-4 right-4 z-5 cursor-pointer"
        onClick={onClose}
      />
      {children}
    </div>
  );
}
