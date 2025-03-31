import { render, screen, cleanup } from "@testing-library/react";
import Heading2 from "./Heading2";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Heading2 Component", () => {
  it("renders the correct text", () => {
    render(<Heading2>Test Heading</Heading2>);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Heading2>Styled Heading</Heading2>);
    const paragraph = screen.getByText("Styled Heading");

    expect(paragraph).toHaveClass("text-base"); // Default size
    expect(paragraph).toHaveClass("font-semibold"); // Ensures semibold font weight
  });

  it("merges additional classNames", () => {
    render(<Heading2 className="text-blue-500">Custom Heading</Heading2>);
    expect(screen.getByText("Custom Paragraph")).toHaveClass("text-blue-500");
  });
});
