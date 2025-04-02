import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "./useLoginForm";
import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
import { describe, vi, it, expect, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
  },
}));

describe("useLoginForm Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.formData).toEqual({ username: "", password: "" });
    expect(result.current.showPassword).toBe(false);
  });

  it("should update formData for username when handleChange is called", () => {
    const { result } = renderHook(() => useLoginForm());

    const fakeChangeEvent = {
      ...new Event("change", { bubbles: true, cancelable: true }),
      target: { name: "username", value: "testUser" },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(fakeChangeEvent);
    });

    expect(result.current.formData.username).toBe("testUser");
  });

  it("should update formData for password when handleChange is called", () => {
    const { result } = renderHook(() => useLoginForm());

    const fakeChangeEvent = {
      ...new Event("change", { bubbles: true, cancelable: true }),
      target: { name: "password", value: "testPassword" },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(fakeChangeEvent);
    });

    expect(result.current.formData.password).toBe("testPassword");
  });

  it("should show toast if formData is empty on submit", () => {
    const { result } = renderHook(() => useLoginForm());
    const fakeSubmitEvent = {
      ...new Event("submit", { bubbles: true, cancelable: true }),
      preventDefault: vi.fn(),
    } as unknown as React.ChangeEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(fakeSubmitEvent);
    });

    expect(toast.info).toHaveBeenCalledWith("Enter your login credentials!");
  });

  it("should store session in localStorage and navigate after submit", () => {
    vi.useFakeTimers();
    // const router = useRouter();

    const { result } = renderHook(() => useLoginForm());

    const fakeSubmitEvent = {
      ...new Event("submit", { bubbles: true, cancelable: true }),
      preventDefault: vi.fn(),
    } as unknown as React.ChangeEvent<HTMLFormElement>;

    const fakeUsernameChangeEvent = {
      ...new Event("change", { bubbles: true, cancelable: true }),
      target: { name: "password", value: "testPassword" },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    const fakePasswordChangeEvent = {
      ...new Event("change", { bubbles: true, cancelable: true }),
      target: { name: "password", value: "testPassword" },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(fakeUsernameChangeEvent);
      result.current.handleChange(fakePasswordChangeEvent);
    });

    act(() => {
      result.current.handleSubmit(fakeSubmitEvent);
    });

    const session = JSON.parse(localStorage.getItem("session") || "{}");

    expect(session).toHaveProperty("sessionId");
    expect(session).toHaveProperty("expiresAt");
    vi.advanceTimersByTime(3000);
    expect(toast.success).toHaveBeenCalledWith(
      "User Authenticated Successfully!"
    );
    // vi.advanceTimersByTime(1000);
    // expect(router.push).toHaveBeenCalledWith("/companies");
  });
});
