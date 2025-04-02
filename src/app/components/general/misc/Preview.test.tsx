import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Preview from "./Preview";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Preview Component", () => {
  it("renders children correctly", () => {
    render(<Preview onClose={vi.fn()}>Test Content</Preview>);

    // Check if the children (Test Content) is rendered
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClose when close icon is clicked", () => {
    const mockOnClose = vi.fn();
    render(<Preview onClose={mockOnClose}>Test Content</Preview>);

    // Find the close icon (IoMdClose)
    const closeButton = screen.getByTestId("close-icon");

    // Simulate a click event on the close icon
    fireEvent.click(closeButton);

    // Ensure onClose is called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("has correct CSS classes for centering", () => {
    render(<Preview onClose={vi.fn()}>Test Content</Preview>);

    // Ensure the preview container has the correct centering CSS classes
    const previewContainer = screen.getByText("Test Content").closest("div");
    expect(previewContainer).toHaveClass(
      "w-full h-[100vh] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-5 bg-black flex justify-center items-center"
    );
  });
});
