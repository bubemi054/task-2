import { cleanup, renderHook, act } from "@testing-library/react";
import useCompanies from "./useCompanies";
import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { Company } from "../lib/graphql-types";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
});

const companyInp = {
  legalName: "Tech Corp Ltd.",
  stateOfIncorporation: "California",
  industry: "Software Development",
  totalNumberOfEmployees: 0,
  numberOfFullTimeEmployees: 0,
  numberOfPartTimeEmployees: 0,
  website: "https://techcorpltd.com",
  linkedInCompanyPage: "https://linkedin.com/company/techcorpltd",
  facebookCompanyPage: "https://facebook.com/techcorpltd",
  otherInformation: "A leading software company focused on AI solutions.",
  phone: "+1-800-123-4567",
  fax: "+1-800-123-4568",
  email: "contact@techcorpltd.com",
  registeredAddress: {
    country: "USA",
    state: "California",
    city: "San Francisco",
    street: "123 Market Street",
    zipCode: "94103",
  },
  mailingAddress: {
    country: "USA",
    state: "California",
    city: "San Francisco",
    street: "456 Mission Street",
    zipCode: "94104",
  },
  isMailingAddressDifferentFromRegisteredAddress: true,
  primaryContactPerson: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@techcorpltd.com",
    phone: "+1-800-555-7890",
  },
  logoS3Key: "chrome_ROT0zdCbxY-E9-DRrb2Vpyus0S-l6aRS-2025-03-31T11:10:18",
};

const mockCompanies: Company[] = [
  {
    id: "6b406ef9-0292-4096-86ff-c81341742b66",
    legalName: "Tech Corp Ltd.",
    stateOfIncorporation: "California",
    industry: "Software Development",
    totalNumberOfEmployees: 0,
    numberOfFullTimeEmployees: 0,
    numberOfPartTimeEmployees: 0,
    website: "https://techcorpltd.com",
    linkedInCompanyPage: "https://linkedin.com/company/techcorpltd",
    facebookCompanyPage: "https://facebook.com/techcorpltd",
    otherInformation: "A leading software company focused on AI solutions.",
    phone: "+1-800-123-4567",
    fax: "+1-800-123-4568",
    email: "contact@techcorpltd.com",
    registeredAddress: {
      country: "USA",
      state: "California",
      city: "San Francisco",
      street: "123 Market Street",
      zipCode: "94103",
    },
    mailingAddress: {
      country: "USA",
      state: "California",
      city: "San Francisco",
      street: "456 Mission Street",
      zipCode: "94104",
    },
    primaryContactPerson: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@techcorpltd.com",
      phone: "+1-800-555-7890",
    },
    logoS3Key: "chrome_ROT0zdCbxY-E9-DRrb2Vpyus0S-l6aRS-2025-03-31T11:10:18",
  },
];

describe("useCompanies Hook", () => {
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      query: vi.fn(),
      mutate: vi.fn(),
    };
  });

  it("loads companies from localStorage on mount", () => {
    // const mockCompanies = [{ id: "1", name: "Test Co" }];
    localStorage.setItem("companies", JSON.stringify(mockCompanies));

    const { result } = renderHook(() => useCompanies({ client: mockClient }));
    expect(result.current.companies).toEqual(mockCompanies);
  });

  it("saves a company locally", () => {
    const { result } = renderHook(() => useCompanies({ client: mockClient }));
    const newCompany = mockCompanies[0];

    act(() => {
      result.current.saveCompanyLocally(newCompany);
    });

    expect(result.current.companies).toContainEqual(newCompany);
    expect(localStorage.getItem("companies")).toEqual(
      JSON.stringify([newCompany])
    );
  });

  it("edits a company locally", () => {
    const initialCompany = mockCompanies[0];
    localStorage.setItem("companies", JSON.stringify([initialCompany]));
    const { result } = renderHook(() => useCompanies({ client: mockClient }));

    act(() => {
      result.current.editCompanyLocally({
        ...initialCompany,
        legalName: "Updated Name",
      });
    });

    expect(result.current.companies).toContainEqual({
      ...initialCompany,
      legalName: "Updated Name",
    });
  });

  it("fetches a company from API", async () => {
    const mockCompany = mockCompanies[0];
    mockClient.query.mockResolvedValue({ data: { getCompany: mockCompany } });

    const { result } = renderHook(() => useCompanies({ client: mockClient }));
    const fetchedCompany = await result.current.fetchCompany(
      "6b406ef9-0292-4096-86ff-c81341742b66"
    );
    expect(fetchedCompany).toEqual(mockCompany);
  });

  it("handles API failure on fetchCompany", async () => {
    mockClient.query.mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useCompanies({ client: mockClient }));
    await expect(
      result.current.fetchCompany("6b406ef9-0292-4096-86ff-c81341742b66")
    ).rejects.toThrow("API Error");
  });

  it("deletes a company locally", () => {
    const initialCompanies = mockCompanies;
    localStorage.setItem("companies", JSON.stringify(initialCompanies));
    const { result } = renderHook(() => useCompanies({ client: mockClient }));

    act(() => {
      result.current.deleteCompanyLocally(
        "6b406ef9-0292-4096-86ff-c81341742b66"
      );
    });

    expect(result.current.companies).toEqual([]);
  });

  it("gets a company locally", () => {
    const company = mockCompanies[0];
    localStorage.setItem("companies", JSON.stringify([company]));
    const { result } = renderHook(() => useCompanies({ client: mockClient }));

    expect(
      result.current.getCompanyLocally("6b406ef9-0292-4096-86ff-c81341742b66")
    ).toEqual(company);
  });

  it("creates a company via API", async () => {
    mockClient.mutate.mockResolvedValue({
      data: { createCompany: { company: mockCompanies[0] } },
    });
    const { result } = renderHook(() => useCompanies({ client: mockClient }));

    const createdCompany = await result.current.createCompany(companyInp);
    expect(createdCompany).toEqual(mockCompanies[0]);
  });

  it("updates a company via API", async () => {
    const updatedCompany = { ...mockCompanies[0], legalName: "Updated Co" };
    mockClient.mutate.mockResolvedValue({ data: { updateCompany: { company: updatedCompany } } });
    const { result } = renderHook(() => useCompanies({ client: mockClient }));

    const response = await result.current.updateCompany("1", {...companyInp, legalName: "Updated Co" });
    expect(response).toEqual(updatedCompany);
  });

  it("extracts filename from key", () => {
    const { result } = renderHook(() => useCompanies({ client: mockClient }));
    expect(result.current.extractFilename("testfile-123"))
      .toEqual("testfile");
  });

  it("saves file image via API", async () => {
    const mockFile = new File(["content"], "image.png", { type: "image/png" });
    const mockResponse = { url: "https://example.com/upload", key: "image-123" };
    mockClient.query.mockResolvedValue({ data: { getSignedUploadUrl: mockResponse } });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    );
    
    const { result } = renderHook(() => useCompanies({ client: mockClient }));
    const response = await result.current.saveFileImage(mockFile);
    expect(response).toEqual(mockResponse);
  });

  it("gets file image via API", async () => {
    const mockResponse = { url: "https://example.com/download", filename: "image" };
    mockClient.query.mockResolvedValue({ data: { getSignedDownloadUrl: { url: mockResponse.url } } });

    const { result } = renderHook(() => useCompanies({ client: mockClient }));
    const response = await result.current.getFileImage("image-123");
    expect(response).toEqual(mockResponse);
  });
});
