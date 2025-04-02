import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Checkbox1 from "./Checkbox1";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Checkbox1 Component", () => {
  it("renders correctly with provided props", () => {
    render(
      <Checkbox1 name="Test Checkbox" checked={false} onChange={() => {}} />
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("handles onChange event", async () => {
    const handleChange = vi.fn();
    render(
      <Checkbox1 name="Test Checkbox" checked={false} onChange={handleChange} />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1));
  });

  it("respects the checked prop", async () => {
    render(<Checkbox1 name="Test Checkbox" checked onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    await waitFor(() => expect(checkbox).toBeChecked());
  });

  it("applies additional className", async () => {
    render(
      <Checkbox1
        name="Test Checkbox"
        checked={false}
        onChange={() => {}}
        className="custom-class"
      />
    );
    const container = screen.getByRole("checkbox").parentElement;
    await waitFor(() => expect(container).toHaveClass("custom-class"));
  });

  it("renders label when provided", async () => {
    render(
      <Checkbox1
        name="Test Checkbox"
        label="Custom Label"
        checked={false}
        onChange={() => {}}
      />
    );
    await waitFor(() =>
      expect(screen.getByText("Custom Label")).toBeInTheDocument()
    );
  });
});
