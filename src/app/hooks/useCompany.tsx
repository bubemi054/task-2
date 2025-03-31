"use client";

import { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import useCompanies from "./useCompanies";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import {
  CREATE_COMPANY,
  GET_SIGNED_UPLOAD_URL,
  GET_SIGNED_DOWNLOAD_URL,
} from "../lib/graphql";
import {
  MutationCreateCompanyArgs,
  UpdateCompanyInput,
} from "../lib/graphql-types";
import isEmail from "validator/es/lib/isEmail";
import isUrl from "validator/es/lib/isURL";
import isMobilePhone from "validator/es/lib/isMobilePhone";
// import { FormData, HandleChangeEvent, HandleSubmitEvent, CreateCompanyResponse } from "../types";

export const initialFormData: UpdateCompanyInput = {
  legalName: "",
  stateOfIncorporation: "",
  industry: "",
  totalNumberOfEmployees: undefined,
  numberOfFullTimeEmployees: undefined,
  numberOfPartTimeEmployees: undefined,
  website: "",
  linkedInCompanyPage: "",
  facebookCompanyPage: "",
  otherInformation: "",
  phone: "",
  fax: "",
  email: "",
  logoS3Key: "",
  isMailingAddressDifferentFromRegisteredAddress: false,
  registeredAddress: {
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
  },
  mailingAddress: {
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
  },
  primaryContactPerson: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
};

// export const initialFormData: UpdateCompanyInput = {
//   legalName: "Tech Corp Ltd.",
//   stateOfIncorporation: "California",
//   industry: "Software Development",
//   totalNumberOfEmployees: 0,
//   numberOfFullTimeEmployees: 0,
//   numberOfPartTimeEmployees: 0,
//   website: "https://techcorpltd.com",
//   linkedInCompanyPage: "https://linkedin.com/company/techcorpltd",
//   facebookCompanyPage: "https://facebook.com/techcorpltd",
//   otherInformation: "A leading software company focused on AI solutions.",
//   phone: "+1 (866) 217-3333",
//   fax: "+1-800-555-1234",
//   email: "contact@techcorpltd.com",
//   registeredAddress: {
//     country: "USA",
//     state: "California",
//     city: "San Francisco",
//     street: "123 Market Street",
//     zipCode: "94103",
//   },
//   mailingAddress: {
//     country: "USA",
//     state: "California",
//     city: "San Francisco",
//     street: "456 Mission Street",
//     zipCode: "94104",
//   },
//   isMailingAddressDifferentFromRegisteredAddress: true,
//   primaryContactPerson: {
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@techcorpltd.com",
//     phone: "+1-800-555-7890",
//   },
//   logoS3Key: "chrome_ROT0zdCbxY-E9-DRrb2Vpyus0S-l6aRS-2025-03-31T11:10:18",
// };

export const validate = (values: UpdateCompanyInput) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: Record<string, any> = {};

  if (!values.legalName) {
    errors.legalName = "Legal name is required";
  }

  if (!values.stateOfIncorporation) {
    errors.stateOfIncorporation = "State of incorporation is required";
  }

  if (!values.industry) {
    errors.industry = "Industry is required";
  }

  if (
    values.totalNumberOfEmployees !== undefined &&
    Number(values.totalNumberOfEmployees) < 0
  ) {
    errors.totalNumberOfEmployees =
      "Total number of employees cannot be negative";
  }

  if (
    values.numberOfFullTimeEmployees !== undefined &&
    Number(values.numberOfFullTimeEmployees) < 0
  ) {
    errors.numberOfFullTimeEmployees = "Full-time employees cannot be negative";
  }

  if (
    values.numberOfPartTimeEmployees !== undefined &&
    Number(values.numberOfPartTimeEmployees) < 0
  ) {
    errors.numberOfPartTimeEmployees = "Part-time employees cannot be negative";
  }

  if (!values.email || !isEmail(values.email || "")) {
    errors.email = "Invalid email format";
  }

  if (!values.phone || !isMobilePhone(values.phone || "")) {
    errors.phone = "Invalid phone number";
  }

  if (
    !values.fax ||
    !new RegExp("^\\(?(\\+?[0-9]*)\\)?[0-9_\\- \\(\\)]*$").test(values.fax)
  ) {
    errors.fax = "Invalid fax number";
  }

  if (!values.website || !isUrl(values.website || "")) {
    errors.website = "Invalid website URL";
  }

  if (
    !values.linkedInCompanyPage ||
    !new RegExp("^https:\\/\\/(?:[a-z]{2,3}\\.)?linkedin\\.com\\/.*$").test(
      values.linkedInCompanyPage || ""
    )
  ) {
    errors.linkedInCompanyPage = "Invalid LinkedIn company page URL";
  }

  if (
    !values.facebookCompanyPage ||
    !new RegExp(
      "^(https?://)?(www.)?facebook.com/(profile.php?id=d+|[a-zA-Z0-9.]+)/?$"
    ).test(values.facebookCompanyPage || "")
  ) {
    errors.facebookCompanyPage = "Invalid Facebook company page URL";
  }

  if (!values.otherInformation) {
    errors.otherInformation = "Other information is required";
  }

  // Validate registered address
  if (!values.registeredAddress?.country) {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      country: "Country is required",
    };
  }
  if (!values.registeredAddress?.state) {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      state: "State is required",
    };
  }
  if (!values.registeredAddress?.city) {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      city: "City is required",
    };
  }
  if (!values.registeredAddress?.street) {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      street: "Street is required",
    };
  }
  if (!values.registeredAddress?.zipCode) {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      zipCode: "Zip code is required",
    };
  }

  // Validate mailing address if different from registered
  if (!values.mailingAddress?.country) {
    errors.mailingAddress = {
      ...errors.mailingAddress,
      country: "Country is required",
    };
  }
  if (!values.mailingAddress?.state) {
    errors.mailingAddress = {
      ...errors.mailingAddress,
      state: "State is required",
    };
  }
  if (!values.mailingAddress?.city) {
    errors.mailingAddress = {
      ...errors.mailingAddress,
      city: "City is required",
    };
  }
  if (!values.mailingAddress?.street) {
    errors.mailingAddress = {
      ...errors.mailingAddress,
      street: "Street is required",
    };
  }
  if (!values.mailingAddress?.zipCode) {
    errors.mailingAddress = {
      ...errors.mailingAddress,
      zipCode: "Zip code is required",
    };
  }

  // Validate primary contact person
  if (!values.primaryContactPerson?.firstName) {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      firstName: "First name is required",
    };
  }
  if (!values.primaryContactPerson?.lastName) {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      lastName: "Last name is required",
    };
  }
  if (!values.primaryContactPerson?.email) {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      email: "Email is required",
    };
  } else if (!isEmail(values.primaryContactPerson.email || "")) {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      email: "Invalid email format",
    };
  }
  if (!values.primaryContactPerson?.phone) {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      phone: "Phone number is required",
    };
  } else if (!isMobilePhone(values.primaryContactPerson.phone || "")) {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      phone: "Invalid phone number",
    };
  }

  return errors;
};

type FormMode = "create" | "edit";

export const useCompany = (
  client: ReturnType<typeof useApolloClient>,
  companyId?: string | null
) => {
  // const [createCompany] = useMutation(CREATE_COMPANY);

  const [formData, setFormData] = useState<UpdateCompanyInput>(initialFormData);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [fileIsSaving, setFileIsSaving] = useState(false);
  const [fetchingCompany, setFetchingCompany] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const { saveCompany, fetchCompanyDetail } = useCompanies({
    client,
  });
  const allowedFileTypes = ["image/jpeg", "image/png"];
  const accept = `${allowedFileTypes.join(",")}`;

  useEffect(() => {
    if (!companyId || fetchFailed) {
      setFormMode("create");
      return;
    }

    const setModeHandler = async () => {
      try {
        setFetchingCompany(true);

        const companyToEdit = await fetchCompanyDetail(companyId!);

        if (!companyToEdit) {
          toast.error("Company not found");
          setFetchFailed(true); // Prevent retrying on bad ID
          setFormMode("create");
          return;
        }

        setFormData((prev) => ({
          ...prev,
          ...(companyToEdit as Partial<UpdateCompanyInput>),
        }));
        setFormMode("edit");
      } catch (err) {
        let errorMessage = "Failed to fetch company details.";

        if (err instanceof Error) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
        setFetchFailed(true); // Prevent retrying on failure
        setFormMode("create");
      } finally {
        setFetchingCompany(false);
      }
    };

    const id = setTimeout(setModeHandler, 1000);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, fetchFailed]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue?: FormikHelpers<UpdateCompanyInput>["setFieldValue"]
  ) => {
    try {
      setFileIsSaving(true);
      const file = e.target.files?.[0];
      if (!file) return;
      toast.info("Uploading image!");

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        toast.info("Only JPEG and PNG files are allowed.");
        return;
      }

      // Validate file size (Max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast.info("File size must be less than 2MB.");
        return;
      }

      // Step 1: Get Signed URL from GraphQL
      const { data } = await client.query({
        query: GET_SIGNED_UPLOAD_URL,
        variables: {
          input: {
            fileName: file.name,
            contentType: file.type,
          },
        },
      });

      const { url, key } = data.getSignedUploadUrl;

      // Step 2: Upload File to S3
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      // Step 3: Save file key in formData
      setFieldValue?.("logoS3Key", key);

      toast.success("File uploaded successfully:");
    } catch {
      toast.error("File upload failed:");
    } finally {
      setFileIsSaving(false);
    }
  };

  const getFileUrl = async (key: string) => {
    try {
      const { data } = await client.query({
        query: GET_SIGNED_DOWNLOAD_URL,
        variables: {
          s3Key: key,
        },
      });

      return data.getSignedDownloadUrl.url;
    } catch {
      return "https://www.google.com/imgres?q=placeholder%20image&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20210604%2Fourmid%2Fpngtree-gray-network-placeholder-png-image_3416659.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fplaceholders&docid=29HGEZtc8xV0iM&tbnid=FDbea6Z_zJGhsM&vet=12ahUKEwia5uzbtrWMAxVjfjABHVQzNIsQM3oECGQQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwia5uzbtrWMAxVjfjABHVQzNIsQM3oECGQQAA"
    }
  };

  const handleCreate = async (
    values: UpdateCompanyInput,
    { setSubmitting, resetForm }: FormikHelpers<UpdateCompanyInput>
  ) => {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_COMPANY,
        variables: { input: values },
      });

      const company = data?.createCompany?.company;

      if (!company) {
        throw new Error("Failed to create company.");
      }

      saveCompany(company);
      resetForm();
      toast.success("Company created successfully.");
    } catch (err) {
      let errorMessage = "Failed to create company.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      if (typeof err === "object" && err !== null) {
        const apolloError = err as {
          graphQLErrors?: { message: string }[];
          networkError?: Error;
        };

        if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
          errorMessage = apolloError.graphQLErrors[0].message;
        } else if (apolloError.networkError instanceof Error) {
          errorMessage = apolloError.networkError.message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (
    values: UpdateCompanyInput,
    { setSubmitting, resetForm }: FormikHelpers<UpdateCompanyInput>
  ) => {
    // try {
    //   setSubmitting(true);
    //   const { data } = await client.mutate<
    //     UpdateCompanyResponse,
    //     UpdateCompanyVariables
    //   >({
    //     mutation: CREATE_COMPANY,
    //     variables: { input: values },
    //   });
    // } catch (err) {
    //   toast.error("Failed to create company.");
    // } finally {
    //   resetForm();
    //   setSubmitting(false);
    // }
  };

  return {
    formData,
    handleCreate,
    handleEdit,
    handleFileUpload,
    initialFormData,
    validate,
    formMode,
    allowedFileTypes,
    accept,
    fileIsSaving,
    fetchingCompany,
    getFileUrl,
  };
};
