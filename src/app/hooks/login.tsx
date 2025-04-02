"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HandleSubmitEvent, HandleChangeEvent } from "../types";
import { toast } from "react-toastify";

export const useLoginForm = () => {
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: HandleChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: HandleSubmitEvent) => {
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
    localStorage.setItem("session", JSON.stringify(sessionData));

    setTimeout(() => {
      toast.success("User Authenticated Successfully!");
    }, 1000);

    setTimeout(() => {
      navigate.push("/companies");
    }, 4000);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
  };
};
