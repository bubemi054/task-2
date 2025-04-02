import { renderHook, act } from "@testing-library/react";
import useUserSessionChecker from "./useUserSessionChecker";
import { describe, vi, it, expect, afterEach, beforeEach, Mock } from "vitest";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("useUserSessionChecker", () => {
  let pushMock: Mock;  

  beforeEach(() => {
    pushMock = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any); // Use `as any` to bypass strict type checking

    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("clears session and redirects if session is missing", () => {
    renderHook(() => useUserSessionChecker());

    expect(pushMock).toHaveBeenCalledWith("/");
    expect(localStorage.getItem("session")).toBeNull();
  });

  it("clears session and redirects if session is invalid", () => {
    localStorage.setItem("session", JSON.stringify({}));
    renderHook(() => useUserSessionChecker());

    expect(pushMock).toHaveBeenCalledWith("/");
    expect(localStorage.getItem("session")).toBeNull();
  });

  it("sets a timeout to clear session on expiry", () => {
    const expiresAt = new Date(Date.now() + 5000).toISOString();
    localStorage.setItem("session", JSON.stringify({ sessionId: "123", expiresAt }));
    
    vi.useFakeTimers();
    renderHook(() => useUserSessionChecker());

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(pushMock).toHaveBeenCalledWith("/");
    expect(localStorage.getItem("session")).toBeNull();
    vi.useRealTimers();
  });

  it("cleans up timeout on unmount", () => {
    const expiresAt = new Date(Date.now() + 10000).toISOString();
    localStorage.setItem("session", JSON.stringify({ sessionId: "123", expiresAt }));
    
    vi.useFakeTimers();
    const { unmount } = renderHook(() => useUserSessionChecker());

    unmount();
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(pushMock).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
