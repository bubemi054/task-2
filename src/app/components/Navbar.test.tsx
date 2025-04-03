import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavBar from "./NavBar";
import { vi, describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("NavBar Component", () => {
  it("renders Home link", () => {
    render(<NavBar clearSession={vi.fn()} search="" setSearch={vi.fn()} />);

    const homeLink = screen.getByTestId("home-icon");
    expect(homeLink).toBeInTheDocument();
  });

  it("renders Create Company link", () => {
    render(<NavBar clearSession={vi.fn()} search="" setSearch={vi.fn()} />);

    const createCompanyLink = screen.getAllByTestId("create-company-link");
    expect(createCompanyLink[0]).toBeInTheDocument();
  });

  it("renders Search component", () => {
    render(<NavBar clearSession={vi.fn()} search="Test" setSearch={vi.fn()} />);

    const searchInput = screen.getAllByPlaceholderText("Search Company");
    expect(searchInput[0]).toBeInTheDocument();
    // expect(searchInput[0]).toHaveValue("Test");
  });

  it("calls clearSession when logout icon is clicked", () => {
    const clearSessionMock = vi.fn();
    render(
      <NavBar clearSession={clearSessionMock} search="" setSearch={vi.fn()} />
    );

    const logoutIcon = screen.getAllByTestId("logout-icon");
    fireEvent.click(logoutIcon[0]);

    waitFor(() => {
      expect(clearSessionMock).toHaveBeenCalledTimes(1);
    });
  });

  it("renders all icons correctly", () => {
    render(<NavBar clearSession={vi.fn()} search="" setSearch={vi.fn()} />);

    expect(screen.getAllByTestId("home-icon")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("create-company-icon")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("logout-icon")[0]).toBeInTheDocument();
  });
});
