import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { vi, describe, it, expect, afterEach } from "vitest";
import LoginForm from "./LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";
import "@testing-library/jest-dom/vitest";

vi.mock("../hooks/useLoginForm", () => ({
  useLoginForm: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("LoginForm Component", () => {
  it("renders login form with input fields and button", () => {
    vi.mocked(useLoginForm).mockReturnValue({
      showPassword: false,
      setShowPassword: vi.fn(),
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
      formData: { username: "", password: "" },
    });

    render(<LoginForm />);

    // Check if input fields and button exist
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows typing in username and password fields", () => {
    const handleChangeMock = vi.fn();

    vi.mocked(useLoginForm).mockReturnValue({
      showPassword: false,
      setShowPassword: vi.fn(),
      handleChange: handleChangeMock,
      handleSubmit: vi.fn(),
      formData: { username: "", password: "" },
    });

    render(<LoginForm />);

    // Type into inputs
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testPass" },
    });

    // Ensure `handleChange` is called
    expect(handleChangeMock).toHaveBeenCalledTimes(2);
  });

  it("toggles password visibility", () => {
    const setShowPasswordMock = vi.fn();

    vi.mocked(useLoginForm).mockReturnValue({
      showPassword: false,
      setShowPassword: setShowPasswordMock,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
      formData: { username: "", password: "" },
    });

    render(<LoginForm />);

    const eyeClosedIcon = screen.getByRole("eye-closed");

    // Click to toggle password visibility
    fireEvent.click(eyeClosedIcon);
    expect(setShowPasswordMock).toHaveBeenCalledWith(true);

    vi.mocked(useLoginForm).mockReturnValue({
      showPassword: true,
      setShowPassword: setShowPasswordMock,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
      formData: { username: "", password: "" },
    });

    render(<LoginForm />); // Re-render component with updated mock

    const eyeOpenIcon = screen.getByRole("eye-open");

    // Click to toggle password visibility
    fireEvent.click(eyeOpenIcon);
    expect(setShowPasswordMock).toHaveBeenCalledWith(false);
  });

  it("submits the form", () => {
    const handleSubmitMock = vi.fn();

    vi.mocked(useLoginForm).mockReturnValue({
      showPassword: false,
      setShowPassword: vi.fn(),
      handleChange: vi.fn(),
      handleSubmit: handleSubmitMock,
      formData: { username: "testUser", password: "testPass" },
    });

    render(<LoginForm />);

    // Click the submit button
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    // Ensure `handleSubmit` is called
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });
});
