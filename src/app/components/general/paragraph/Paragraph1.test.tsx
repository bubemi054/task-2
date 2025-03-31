import { render, screen, cleanup } from "@testing-library/react";
import Paragraph1 from "./Paragraph1";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Paragraph1 Component", () => {
  it("renders the correct text", () => {
    render(<Paragraph1>Test Paragraph</Paragraph1>);
    expect(screen.getByText("Test Paragraph")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Paragraph1>Styled Paragraph</Paragraph1>);
    const paragraph = screen.getByText("Styled Paragraph");

    expect(paragraph).toHaveClass("text-base"); // Default size
    expect(paragraph).toHaveClass("font-light"); // Ensures light font weight
  });

  it("merges additional classNames", () => {
    render(<Paragraph1 className="text-red-500">Custom Paragraph</Paragraph1>);
    expect(screen.getByText("Custom Paragraph")).toHaveClass("text-red-500");
  });
});
