"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const useUserSessionChecker = () => {
  const router = useRouter();

  const clearSession = useCallback(() => {
    console.log("Clearing session and redirecting...");
    localStorage.removeItem("session");
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it's client-side

    let timeoutId: NodeJS.Timeout;

    const checkSession = () => {
      const sessionData = localStorage.getItem("session");

      try {
        const parsedData = sessionData ? JSON.parse(sessionData) : null;

        if (!parsedData || !parsedData.sessionId || !parsedData.expiresAt) {
          console.log("Invalid session data, redirecting...");
          clearSession();
          return;
        }

        const { sessionId, expiresAt } = parsedData;
        const now = new Date();
        const target = new Date(expiresAt);
        const diff = target.getTime() - now.getTime();

        timeoutId = setTimeout(() => {
          console.log("clearing session", sessionId);
          clearSession();
        }, diff); // Schedule next check
      } catch (error) {
        console.error("Error parsing session data:", error);
        clearSession();
      }
    };

    // Run immediately on mount
    checkSession();

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [router, clearSession]);

  return { clearSession };
};

export default useUserSessionChecker;