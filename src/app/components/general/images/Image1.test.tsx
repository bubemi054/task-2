import { render, screen, cleanup, waitFor } from "@testing-library/react";
import Image1 from "./Image1";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Image1 Component", () => {
  it("renders nothing when no logoS3Key is provided", () => {
    const { container } = render(
      <Image1 getFileImage={vi.fn()} alt="Test Image" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("displays a loading skeleton before image loads", async () => {
    const mockGetFileImage = vi.fn().mockResolvedValue({
      url: "https://example.com/image.jpg",
      filename: "image.jpg",
    });

    render(<Image1 logoS3Key="test-key" getFileImage={mockGetFileImage} />);

    waitFor(() => {
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
    });
  });

  it("renders image once URL is retrieved", async () => {
    const mockGetFileImage = vi.fn().mockResolvedValue({
      url: "https://example.com/image.jpg",
      filename: "image.jpg",
    });

    render(<Image1 logoS3Key="test-key" getFileImage={mockGetFileImage} />);

    waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://example.com/image.jpg"
      );
    });
  });

  it("handles API failure gracefully", async () => {
    const mockGetFileImage = vi
      .fn()
      .mockRejectedValue(new Error("Failed to fetch image"));

    render(<Image1 logoS3Key="test-key" getFileImage={mockGetFileImage} />);

    waitFor(() => {
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
    });
  });
});
