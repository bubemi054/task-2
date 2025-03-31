import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Button1 from "./Button1";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Button1 Component", () => {
  it("renders with default props", () => {
    render(<Button1 />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "bg-white text-gray-900 font-medium rounded-md py-2 hover:bg-gray-200 transition"
    );
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies additional class names", () => {
    render(<Button1 className="custom-class" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button1 onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with different button types", () => {
    render(<Button1 type="submit" />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button1 onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders children inside button", () => {
    render(<Button1>Click Me</Button1>);
    screen.debug();
    const button = screen.getByRole("button", { name: /Click Me/i });

    expect(button).toBeInTheDocument();
  });
});
