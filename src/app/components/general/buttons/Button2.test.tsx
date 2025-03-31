import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Button2 from "./Button2";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Button2 Component", () => {
  it("renders the button with correct text", () => {
    render(<Button2>Click Me</Button2>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Button2>Styled Button</Button2>);
    const button = screen.getByText("Styled Button");

    expect(button).toHaveClass("w-full"); // Full width on small screens
    expect(button).toHaveClass("lg:w-[300px]"); // Fixed width on large screens
    expect(button).toHaveClass("bg-black text-white px-6 py-2 rounded-md");
  });

  it("merges additional classNames", () => {
    render(<Button2 className="bg-red-500">Custom Button</Button2>);
    expect(screen.getByText("Custom Button")).toHaveClass("bg-red-500");
  });

  it("triggers onClick event", () => {
    const handleClick = vi.fn();
    render(<Button2 onClick={handleClick}>Click Me</Button2>);
    
    fireEvent.click(screen.getByText("Click Me"));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled state", () => {
    render(<Button2 disabled>Disabled Button</Button2>);
    const button = screen.getByText("Disabled Button");

    expect(button).toBeDisabled();
  });
});