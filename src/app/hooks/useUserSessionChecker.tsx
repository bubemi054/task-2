"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useUserSessionChecker = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it's client-side

    const checkSession = () => {
      const sessionData = localStorage.getItem("session");

      if (sessionData) {
        const { sessionId, expiresAt } = JSON.parse(sessionData);
        const now = new Date();

        if (new Date(expiresAt) < now) {
          console.log("Session expired, clearing...");
          localStorage.removeItem("session");
          router.push("/"); // Redirect to login page
        } else {
          console.log("Session is still valid:", sessionId);
        }
      } else {
        console.log("No active session.");
        router.push("/"); // Redirect to login page
      }
    };

    // Run immediately on mount
    checkSession();

    // Set interval to run every 5 minutes (300,000 ms)
    const intervalId = setInterval(checkSession, 300000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [router]);

  return null;
};
