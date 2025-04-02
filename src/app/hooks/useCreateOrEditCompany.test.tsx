import { render, screen, fireEvent, cleanup, renderHook } from "@testing-library/react";
import { useCreateOrEditCompany } from "./useCreateOrEditCompany";
import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { initialFormData, validate } from "./useCreateOrEditCompany";
import { UpdateCompanyInput } from "../lib/graphql-types";
import { useApolloClient } from "@apollo/client";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.mock("@apollo/client", () => ({
  useApolloClient: vi.fn(),
}));

// vi.mock("./useCompanies", () => ({
//   default: vi.fn(() => ({
//     createCompany: vi.fn(),
//     updateCompany: vi.fn(),
//     saveCompanyLocally: vi.fn(),
//     fetchCompany: vi.fn(),
//     saveFileImage: vi.fn(),
//     getFileImage: vi.fn(),
//     extractFilename: vi.fn(),
//     editCompanyLocally: vi.fn(),
//   })),
// }));

// describe("initialFormData", () => {
//   it("should match the expected initial structure", () => {
//     expect(initialFormData).toEqual({
//       legalName: "",
//       stateOfIncorporation: "",
//       industry: "",
//       totalNumberOfEmployees: undefined,
//       numberOfFullTimeEmployees: undefined,
//       numberOfPartTimeEmployees: undefined,
//       website: "",
//       linkedInCompanyPage: "",
//       facebookCompanyPage: "",
//       otherInformation: "",
//       phone: "",
//       fax: "",
//       email: "",
//       logoS3Key: "",
//       isMailingAddressDifferentFromRegisteredAddress: false,
//       registeredAddress: {
//         country: "",
//         state: "",
//         city: "",
//         street: "",
//         zipCode: "",
//       },
//       mailingAddress: {
//         country: "",
//         state: "",
//         city: "",
//         street: "",
//         zipCode: "",
//       },
//       primaryContactPerson: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//       },
//     });
//   });
// });

// describe("validate function", () => {
//   it("should return errors for missing required fields", () => {
//     const errors = validate({} as UpdateCompanyInput);

//     expect(errors.legalName).toBe("Legal name is required");
//     expect(errors.stateOfIncorporation).toBe(
//       "State of incorporation is required"
//     );
//     expect(errors.industry).toBe("Industry is required");
//     expect(errors.email).toBe("Invalid email format");
//     expect(errors.phone).toBe("Invalid phone number");
//     expect(errors.website).toBe("Invalid website URL");
//   });

//   it("should validate email format", () => {
//     const errors = validate({ ...initialFormData, email: "invalid-email" });

//     expect(errors.email).toBe("Invalid email format");
//   });

//   it("should validate phone number format", () => {
//     const errors = validate({ ...initialFormData, phone: "123" });

//     expect(errors.phone).toBe("Invalid phone number");
//   });

//   it("should validate positive employee numbers", () => {
//     const errors = validate({
//       ...initialFormData,
//       totalNumberOfEmployees: -1,
//       numberOfFullTimeEmployees: -5,
//       numberOfPartTimeEmployees: -3,
//     });

//     expect(errors.totalNumberOfEmployees).toBe(
//       "Total number of employees cannot be negative"
//     );
//     expect(errors.numberOfFullTimeEmployees).toBe(
//       "Full-time employees cannot be negative"
//     );
//     expect(errors.numberOfPartTimeEmployees).toBe(
//       "Part-time employees cannot be negative"
//     );
//   });

//   it("should validate website URLs", () => {
//     const errors = validate({ ...initialFormData, website: "invalid-url" });

//     expect(errors.website).toBe("Invalid website URL");
//   });

//   it("should return no errors for valid data", () => {
//     const validData: UpdateCompanyInput = {
//       legalName: "Tech Corp Ltd.",
//       stateOfIncorporation: "California",
//       industry: "Software Development",
//       totalNumberOfEmployees: 5,
//       numberOfFullTimeEmployees: 2,
//       numberOfPartTimeEmployees: 3,
//       website: "https://techcorpltd.com",
//       linkedInCompanyPage: "https://linkedin.com/company/techcorpltd",
//       facebookCompanyPage: "https://facebook.com/techcorpltd",
//       otherInformation: "A leading software company focused on AI solutions.",
//       phone: "(123) 456-7890",
//       fax: "+1-800-123-4568",
//       email: "contact@techcorpltd.com",
//       registeredAddress: {
//         country: "USA",
//         state: "California",
//         city: "San Francisco",
//         street: "123 Market Street",
//         zipCode: "94103",
//       },
//       mailingAddress: {
//         country: "USA",
//         state: "California",
//         city: "San Francisco",
//         street: "456 Mission Street",
//         zipCode: "94104",
//       },
//       isMailingAddressDifferentFromRegisteredAddress: true,
//       primaryContactPerson: {
//         firstName: "John",
//         lastName: "Doe",
//         email: "john.doe@techcorpltd.com",
//         phone: "+1-800-555-7890",
//       },
//       logoS3Key: "chrome_ROT0zdCbxY-E9-DRrb2Vpyus0S-l6aRS-2025-03-31T11:10:18",
//     };

//     const errors = validate(validData);
//     expect(errors).toEqual({});
//   });
// });

describe("useCreateOrEditCompany", () => {
  let mockClient: ReturnType<typeof useApolloClient>;
  let mockUseCompanies: any;

  beforeEach(() => {
    mockClient = { query: vi.fn(), mutate: vi.fn() } as any;
    (useApolloClient as vi.Mock).mockReturnValue(mockClient);

    mockUseCompanies = {
      createCompany: vi.fn(),
      updateCompany: vi.fn(),
      saveCompanyLocally: vi.fn(),
      fetchCompany: vi.fn(),
      saveFileImage: vi.fn().mockResolvedValue({ key: "mock-key" }),
      getFileImage: vi.fn(),
      extractFilename: vi.fn(),
      editCompanyLocally: vi.fn(),
    };

    require("./useCompanies").default.mockReturnValue(mockUseCompanies);
  });

  // it("should initialize with correct default values", () => {
  //   const { result } = renderHook(() => useCreateOrEditCompany(mockClient));

  //   expect(result.current.formData).toEqual(
  //     expect.objectContaining({ legalName: "" })
  //   );
  //   expect(result.current.formMode).toBe("create");
  //   expect(result.current.fileIsSaving).toBe(false);
  //   expect(result.current.fetchingCompany).toBe(false);
  // });

  // it("should change mode to 'edit' when a valid companyId is provided", async () => {
  //   mockUseCompanies.fetchCompany.mockResolvedValue({
  //     legalName: "Test Company",
  //   });

  //   const { result, rerender } = renderHook(
  //     ({ companyId }) => useCreateOrEditCompany(mockClient, companyId),
  //     { initialProps: { companyId: "123" } }
  //   );

  //   expect(result.current.fetchingCompany).toBe(true);

  //   await act(async () => {
  //     rerender({ companyId: "123" });
  //   });

  //   expect(result.current.fetchingCompany).toBe(false);
  //   expect(result.current.formMode).toBe("edit");
  //   expect(result.current.formData.legalName).toBe("Test Company");
  // });

  // it("should handle file upload correctly", async () => {
  //   const { result } = renderHook(() => useCreateOrEditCompany(mockClient));
  //   const setFieldValue = vi.fn();

  //   const file = new File(["mock"], "logo.png", { type: "image/png" });

  //   await act(async () => {
  //     await result.current.handleFileUpload(
  //       { target: { files: [file] } } as any,
  //       setFieldValue
  //     );
  //   });

  //   expect(setFieldValue).toHaveBeenCalledWith("logoS3Key", "mock-key");
  //   expect(mockUseCompanies.saveFileImage).toHaveBeenCalledWith(file);
  // });

  // it("should handle company creation correctly", async () => {
  //   mockUseCompanies.createCompany.mockResolvedValue({ id: "123" });

  //   const { result } = renderHook(() => useCreateOrEditCompany(mockClient));
  //   const resetForm = vi.fn();
  //   const setSubmitting = vi.fn();

  //   await act(async () => {
  //     await result.current.handleCreate(
  //       { legalName: "New Company" } as UpdateCompanyInput,
  //       { setSubmitting, resetForm } as any
  //     );
  //   });

  //   expect(mockUseCompanies.createCompany).toHaveBeenCalled();
  //   expect(mockUseCompanies.saveCompanyLocally).toHaveBeenCalled();
  //   expect(resetForm).toHaveBeenCalled();
  //   expect(setSubmitting).toHaveBeenCalledWith(false);
  // });

  // it("should handle company update correctly", async () => {
  //   mockUseCompanies.updateCompany.mockResolvedValue({
  //     id: "123",
  //     legalName: "Updated Company",
  //   });

  //   const { result } = renderHook(() =>
  //     useCreateOrEditCompany(mockClient, "123")
  //   );
  //   const setValues = vi.fn();
  //   const setSubmitting = vi.fn();

  //   await act(async () => {
  //     await result.current.handleUpdate(
  //       { legalName: "Updated Company" } as UpdateCompanyInput,
  //       { setSubmitting, setValues } as any
  //     );
  //   });

  //   expect(mockUseCompanies.updateCompany).toHaveBeenCalled();
  //   expect(mockUseCompanies.editCompanyLocally).toHaveBeenCalled();
  //   expect(setValues).toHaveBeenCalledWith(
  //     expect.objectContaining({ legalName: "Updated Company" })
  //   );
  //   expect(setSubmitting).toHaveBeenCalledWith(false);
  // });
});
