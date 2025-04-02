import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, afterEach } from "vitest";
import CompanyCard from "./CompanyCard";
import { Company } from "../lib/graphql-types";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("CompanyCard", () => {
  const mockCompany: Company = {
    id: "ae5333dd-5fd0-498a-a1c3-22b2b5f0cc6e",
    legalName: "Tech Corp Ltd One",
    stateOfIncorporation: "California",
    industry: "Software Development",
    totalNumberOfEmployees: 0,
    numberOfFullTimeEmployees: 0,
    numberOfPartTimeEmployees: 0,
    website: "https://techcorpltd.com",
    linkedInCompanyPage: "https://linkedin.com/company/techcorpltd",
    facebookCompanyPage: "https://facebook.com/techcorpltd",
    otherInformation: "A leading software company focused on AI solutions.",
    primaryContactPerson: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@techcorpltd.com",
      phone: "+1-800-555-7890",
      __typename: "Contact",
    },
    logoS3Key: "chrome_ROT0zdCbxY-E9-DRrb2Vpyus0S-l6aRS-2025-03-31T11:10:18",
    phone: "+1 (866) 217-3333",
    fax: "+1-800-555-1234",
    email: "contact@techcorpltd.com",
    registeredAddress: {
      country: "USA",
      state: "California",
      city: "San Francisco",
      street: "123 Market Street",
      zipCode: "94103",
      __typename: "BasicAddress",
    },
    mailingAddress: {
      country: "USA",
      state: "California",
      city: "San Francisco",
      street: "456 Mission Street",
      zipCode: "94104",
      __typename: "BasicAddress",
    },
    __typename: "Company",
  };

  it("renders the company name, industry, and phone", () => {
    const mockGetFileImage = vi
      .fn()
      .mockResolvedValue({ url: "https://example.com/logo.png" });

    render(
      <CompanyCard company={mockCompany} getFileImage={mockGetFileImage} />
    );

    expect(screen.getByText(mockCompany.legalName!)).toBeInTheDocument();
    expect(screen.getByText(mockCompany.industry!)).toBeInTheDocument();
    expect(screen.getByText(`📞 ${mockCompany.phone!}`)).toBeInTheDocument();
  });

  it("calls getFileImage and sets the image URL", async () => {
    const mockGetFileImage = vi
      .fn()
      .mockResolvedValue({ url: "https://example.com/logo.png" });

    render(
      <CompanyCard company={mockCompany} getFileImage={mockGetFileImage} />
    );

    // Wait for the async image loading to finish
    waitFor(() => {
      expect(mockGetFileImage).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/_next/image?url=https%3A%2F%2Fexample.com%2Flogo.png&w=256&q=75"
      );
    });
  });

});
