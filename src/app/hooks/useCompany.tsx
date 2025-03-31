"use client";

import { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import {
  CREATE_COMPANY,
  GET_SIGNED_UPLOAD_URL,
  GetSignedUploadUrlResponse,
  GetSignedUploadUrlVariables,
} from "../lib/graphql";
import { UpdateCompanyInput } from "../lib/graphql-types";
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

  if (!values.fax || !isMobilePhone(values.fax || "")) {
    errors.fax = "Invalid fax number";
  }

  if (!values.website || !isUrl(values.website || "")) {
    errors.website = "Invalid website URL";
  }

  if (
    !values.linkedInCompanyPage ||
    !new RegExp("^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$").test(
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
  if (values.isMailingAddressDifferentFromRegisteredAddress) {
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
  const allowedFileTypes = ["image/jpeg", "image/png"];
  const accept = `${allowedFileTypes.join(",")}`;

  useEffect(() => {
    if (companyId) {
      setFormMode("edit");
    } else {
      setFormMode("create");
    }
  }, [companyId]);

  const handleChange = () => {};

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
      const { data } = await client.query<
        GetSignedUploadUrlResponse,
        GetSignedUploadUrlVariables
      >({
        query: GET_SIGNED_UPLOAD_URL,
        variables: {
          input: {
            fileName: file.name,
            contentType: file.type,
          },
        },
      });

      const { url, key } = data.getSignedUploadUrl;

      console.log({ url, key });

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

  const handleSubmit = async (
    values: UpdateCompanyInput,
    { setSubmitting, resetForm }: FormikHelpers<UpdateCompanyInput>
  ) => {
    try {
      // const { data } = await createCompany({
      //   variables: { input: values },
      // });
      // console.log("Company created:", data);
      // alert("Company created successfully!");
      // resetForm();
    } catch (err) {
      // console.error("Error creating company:", err);
      // alert("Failed to create company. Check console for details.");
    }
    // setSubmitting(false);
  };

  // const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // try {
  //   //   const { data } = await createCompany({
  //   //     variables: {
  //   //       input: formData,
  //   //     },
  //   //   });

  //   //   const newCompany = (data as CreateCompanyResponse).createCompany.company;

  //   //   // Get existing companies from localStorage
  //   //   const storedCompanies = localStorage.getItem("companies");
  //   //   const companies: Record<string, any>[] = storedCompanies ? JSON.parse(storedCompanies) : [];

  //   //   // Add the new company to the array
  //   //   companies.push(newCompany);

  //   //   // Save updated companies array back to localStorage
  //   //   localStorage.setItem("companies", JSON.stringify(companies));

  //   //   toast.success("Company created successfully!");
  //   // } catch {
  //   //   toast.error("Failed to create company.");
  //   // }
  // };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleFileUpload,
    initialFormData,
    validate,
    formMode,
    allowedFileTypes,
    accept,
    fileIsSaving,
  };
};
