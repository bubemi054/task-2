import { render, screen, cleanup } from "@testing-library/react";
import Header1 from "./Header1";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Header Component", () => {
  it("renders the correct text", () => {
    render(<Header1>Test Header</Header1>);
    expect(screen.getByText("Test Header")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Header1>Styled Header</Header1>);
    const header = screen.getByText("Styled Header");

    expect(header).toHaveClass("text-3xl");
    expect(header).toHaveClass("font-bold");
  });

  it("merges additional classNames", () => {
    render(<Header1 className="text-red-500">Custom Header</Header1>);
    expect(screen.getByText("Custom Header")).toHaveClass("text-red-500");
  });
});
