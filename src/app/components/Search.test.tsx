import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "./Search";
import { vi, describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Search Component", () => {
  it("renders the input field with the given search value", () => {
    render(<Search search="Test Company" setSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText("Search Company");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Test Company");
  });

  it("calls setSearch on input change", () => {
    const setSearchMock = vi.fn();
    render(<Search search="" setSearch={setSearchMock} />);

    const input = screen.getAllByPlaceholderText("Search Company");
    fireEvent.change(input[0], { target: { value: "New Value" } });

    waitFor(() => {
      expect(setSearchMock).toHaveBeenCalledTimes(1);
      expect(setSearchMock).toHaveBeenCalledWith("New Value");
    });
  });

  it("renders the search icon", () => {
    render(<Search search="" setSearch={vi.fn()} />);

    const searchIcon = screen.getAllByRole("search-icon");
    expect(searchIcon[0]).toBeInTheDocument();
  });
});
