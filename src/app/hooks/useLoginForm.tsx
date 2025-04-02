"use client";

import { ChangeEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Id } from "react-toastify";

const STORAGE_KEY = "session";

export const useLoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username && !formData.password)
      return toast.info("Enter your login credentials!");

    // Generate UUID
    const sessionId = crypto.randomUUID();

    // Set expiration time (1 hour from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Store session details in an object
    const sessionData = {
      sessionId,
      expiresAt: expiresAt.toISOString(),
    };

    // Save to localStorage as JSON string
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));

    let toastId: Id

    setTimeout(() => {
      toastId = toast.success("User Authenticated Successfully!");
    }, 1000);

    setTimeout(() => {
      router.push("/companies");
      toast.dismiss(toastId);
    }, 3000);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
  };
};
