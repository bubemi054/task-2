import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import FormInput from "./FormInput";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("FormInput Component", () => {
  it("renders the input with label and placeholder", () => {
    render(
      <FormInput
        label="Username"
        type="text"
        name="username"
        value=""
        onChange={() => {}}
        placeholder="Enter your username"
        required
      />
    );

    expect(screen.getByText(/Username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your username/)).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        label="Email"
        type="email"
        name="email"
        value=""
        onChange={handleChange}
        required
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("displays an error message when provided", () => {
    render(
      <FormInput
        label="Password"
        type="password"
        name="password"
        value=""
        onChange={() => {}}
        errorMessage="Password is required"
        required
      />
    );

    expect(screen.getByText(/Password is required/)).toBeInTheDocument();
  });

  it("renders a disabled input when disabled prop is true", () => {
    render(
      <FormInput
        label="Age"
        type="number"
        name="age"
        value=""
        onChange={() => {}}
        disabled
        required
      />
    );

    expect(screen.getByRole("spinbutton")).toBeDisabled();
  });

  it("renders file input and shows selected filename", () => {
    const extractFilename = (path: string) => (path.split("\\").pop()!);
    render(
      <FormInput
        label="Upload"
        type="file"
        name="file"
        value="C:\\fakepath\\example.png"
        onChange={() => {}}
        // @ts-error ignore.
        extractFilename={extractFilename}
        required
      />
    );

    expect(screen.getByText(/example.png/)).toBeInTheDocument();
  });
});
