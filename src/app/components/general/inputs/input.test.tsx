import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Input1 from "./Input1";
import { vi, it, describe, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

describe("Input1 Component", () => {
  it("renders with default props", () => {
    render(<Input1 />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveClass(
      "w-full text-white outline-none border-none bg-transparent placeholder-white"
    );
    expect(input).toHaveAttribute("placeholder", "");
    expect(input).toHaveValue("");
  });

  it("accepts and displays a value", () => {
    render(<Input1 value="Test Value" readOnly />);
    const input = screen.getByDisplayValue("Test Value");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Test Value");
  });

  it("calls onChange handler when input changes", () => {
    const handleChange = vi.fn();
    render(<Input1 onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("merges additional class names", () => {
    render(<Input1 className="custom-class" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("custom-class");
  });

  it("accepts different input types", () => {
    render(<Input1 type="password" placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
  
    expect(input).toHaveAttribute("type", "password");
  });
});
