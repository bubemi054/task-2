"use client";

import { useEffect, useState, useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import useCompanies from "./useCompanies";
import { FormikHelpers } from "formik";
import { toast, Id } from "react-toastify";
import { UpdateCompanyInput } from "../lib/graphql-types";
import isEmail from "validator/es/lib/isEmail";
import isUrl from "validator/es/lib/isURL";
import isInt from "validator/es/lib/isInt";
import { isValidPhoneNumber } from "libphonenumber-js";

export const initialFormData: UpdateCompanyInput = {
  legalName: "",
  stateOfIncorporation: "",
  industry: "",
  totalNumberOfEmployees: 0,
  numberOfFullTimeEmployees: 0,
  numberOfPartTimeEmployees: 0,
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

  if (values.legalName.trim() === "") {
    errors.legalName = "Legal name is required";
  }

  if (values.stateOfIncorporation.trim() === "") {
    errors.stateOfIncorporation = "State of incorporation is required";
  }

  if (values.industry.trim() === "") {
    errors.industry = "Industry is required";
  }

  if (
    values.totalNumberOfEmployees !== undefined &&
    Number(values.totalNumberOfEmployees) < 0
  ) {
    errors.totalNumberOfEmployees =
      "Total number of employees cannot be negative";
  } else if (
    !values.totalNumberOfEmployees &&
    !isInt(String(values.totalNumberOfEmployees || 0))
  ) {
    errors.totalNumberOfEmployees =
      "Total number of employees must be an integer";
  }

  if (
    Number(values.totalNumberOfEmployees) >= 0 &&
    Number(values.numberOfFullTimeEmployees) >= 0 &&
    Number(values.numberOfPartTimeEmployees) >= 0
  ) {
    const sum =
      Number(values.numberOfFullTimeEmployees) +
      Number(values.numberOfPartTimeEmployees);
    const bothAreNotZero =
      Number(values.numberOfFullTimeEmployees) !== 0 ||
      Number(values.numberOfPartTimeEmployees) !== 0;
    if (bothAreNotZero && Number(values.totalNumberOfEmployees) !== sum) {
      errors.totalNumberOfEmployees =
        "Total number of employees must be equal to the sum of full-time and part-time employees";
    }
  }

  if (
    values.numberOfFullTimeEmployees !== undefined &&
    Number(values.numberOfFullTimeEmployees) <= 0
  ) {
    errors.numberOfFullTimeEmployees =
      "Full-time employees cannot be less than or equal to zero";
  } else if (
    !values.numberOfFullTimeEmployees &&
    !isInt(String(values.numberOfFullTimeEmployees || 0))
  ) {
    errors.numberOfFullTimeEmployees = "Full-time employees must be an integer";
  }

  if (
    Number(values.numberOfFullTimeEmployees) >= 0 &&
    Number(values.totalNumberOfEmployees) >= 0 &&
    Number(values.numberOfFullTimeEmployees) >
      Number(values.totalNumberOfEmployees)
  ) {
    errors.numberOfFullTimeEmployees =
      "Full-time employees cannot be greater than total number of employees";
  }

  if (
    values.numberOfPartTimeEmployees !== undefined &&
    Number(values.numberOfPartTimeEmployees) < 0
  ) {
    errors.numberOfPartTimeEmployees = "Part-time employees cannot be negative";
  } else if (
    !values.numberOfPartTimeEmployees &&
    !isInt(String(values.numberOfPartTimeEmployees || 0))
  ) {
    errors.numberOfPartTimeEmployees = "Part-time employees must be an integer";
  }

  if (
    Number(values.numberOfFullTimeEmployees) >= 0 &&
    Number(values.totalNumberOfEmployees) >= 0 &&
    Number(values.numberOfPartTimeEmployees) >
      Number(values.totalNumberOfEmployees)
  ) {
    errors.numberOfPartTimeEmployees =
      "Part-time employees cannot be greater than total number of employees";
  }

  if (!values.email || !isEmail(values.email || "")) {
    errors.email = "Invalid email format";
  }

  if (!values.phone || !isValidPhoneNumber(values.phone)) {
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

  if (values.otherInformation.trim() === "") {
    errors.otherInformation = "Other information is required";
  }

  // if (values.logoS3Key?.trim() === "") {
  //   console.log("values.logoS3Key:", values.logoS3Key);
  //   errors.logoS3Key = "Logo is required";
  // }

  // Validate registered address
  if (values.registeredAddress?.country.trim() === "") {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      country: "Country is required",
    };
  }
  if (values.registeredAddress?.state.trim() === "") {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      state: "State is required",
    };
  }
  if (values.registeredAddress?.city.trim() === "") {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      city: "City is required",
    };
  }
  if (values.registeredAddress?.street.trim() === "") {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      street: "Street is required",
    };
  }
  if (values.registeredAddress?.zipCode.trim() === "") {
    errors.registeredAddress = {
      ...errors.registeredAddress,
      zipCode: "Zip code is required",
    };
  }

  if (!values.isMailingAddressDifferentFromRegisteredAddress) {
    // Validate mailing address if different from registered
    if (values.mailingAddress?.country.trim() === "") {
      errors.mailingAddress = {
        ...errors.mailingAddress,
        country: "Country is required",
      };
    }
    if (values.mailingAddress?.state.trim() === "") {
      errors.mailingAddress = {
        ...errors.mailingAddress,
        state: "State is required",
      };
    }
    if (values.mailingAddress?.city.trim() === "") {
      errors.mailingAddress = {
        ...errors.mailingAddress,
        city: "City is required",
      };
    }
    if (values.mailingAddress?.street.trim() === "") {
      errors.mailingAddress = {
        ...errors.mailingAddress,
        street: "Street is required",
      };
    }
    if (values.mailingAddress?.zipCode.trim() === "") {
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
  if (values.primaryContactPerson?.lastName.trim() === "") {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      lastName: "Last name is required",
    };
  }
  if (values.primaryContactPerson?.email.trim() === "") {
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
  if (values.primaryContactPerson?.phone.trim() === "") {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      phone: "Phone number is required",
    };
  } else if (!isValidPhoneNumber(values.phone)) {
    errors.primaryContactPerson = {
      ...errors.primaryContactPerson,
      phone: "Invalid phone number",
    };
  }

  return errors;
};

type FormMode = "create" | "edit";

export const useCreateOrEditCompany = (
  client: ReturnType<typeof useApolloClient>,
  companyId?: string | null
) => {
  // const [createCompany] = useMutation(CREATE_COMPANY);

  const router = useRouter();

  const [formData, setFormData] = useState<UpdateCompanyInput>(initialFormData);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [fileIsSaving, setFileIsSaving] = useState(false);
  const [viewImg, setViewImg] = useState(false);
  const [fetchingCompany, setFetchingCompany] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const {
    createCompany,
    updateCompany,
    saveCompanyLocally,
    fetchCompany,
    saveFileImage,
    getFileImage,
    extractFilename,
    editCompanyLocally,
    deleteCompanyLocally,
  } = useCompanies({
    client,
  });
  const allowedFileTypes = ["image/jpeg", "image/png"];
  const accept = `${allowedFileTypes.join(",")}`;

  useEffect(() => {
    if (!companyId || fetchFailed) {
      setFormMode("create");
      setFormData(initialFormData);
      return;
    }
    setFetchingCompany(true);

    const setModeHandler = async () => {
      try {
        const companyToEdit = await fetchCompany(companyId!);

        if (!companyToEdit) {
          toast.error("Company not found");
          setFetchFailed(true);
          setFormMode("create");
          return;
        }

        console.log({
          companyToEdit,
        });

        setFormData((prev) => ({
          ...prev,
          ...(companyToEdit as Partial<UpdateCompanyInput>),
          isMailingAddressDifferentFromRegisteredAddress: true
        }));
        saveCompanyLocally(companyToEdit);
        setFormMode("edit");
      } catch (err) {
        let errorMessage = "Failed to fetch company details.";

        if (err instanceof Error) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
        setFetchFailed(true);
        setFormMode("create");
        setFormData(initialFormData);
      } finally {
        setFetchingCompany(false); // ✅ This ensures it turns false after fetching (even if there's an error)
      }
    };

    const id = setTimeout(setModeHandler, 500);

    return () => clearTimeout(id);
  }, [companyId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue?: FormikHelpers<UpdateCompanyInput>["setFieldValue"],
    setFieldTouched?: FormikHelpers<UpdateCompanyInput>["setFieldTouched"],
    setFieldError?: FormikHelpers<UpdateCompanyInput>["setFieldError"]
    // handleBlur?: React.FocusEventHandler<HTMLInputElement>
  ) => {
    let toastId: Id;

    try {
      setFileIsSaving(true);
      toastId = toast.info("Uploading image!");

      const file = e.target.files?.[0];
      const { key } = await saveFileImage(file);

      setFieldValue?.("logoS3Key", key);
      setFieldError?.("logoS3Key", undefined);

      toast.success("File uploaded successfully:");
    } catch (err) {
      let errorMessage = "Failed to upload file.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setFieldValue?.("logoS3Key", "");
      setFieldError?.("logoS3Key", errorMessage);

      toast.error(errorMessage);
    } finally {
      if (toastId !== undefined) {
        toast.dismiss(toastId);
      }
      setFileIsSaving(false);
      setFieldTouched?.("logoS3Key");
      // handleBlur?.({
      //   target: {
      //     name: "logoS3Key",
      //   },
      // } as unknown as React.FocusEvent<HTMLInputElement>);
    }
  };

  const handleCreate = async (
    values: UpdateCompanyInput,
    { setSubmitting, resetForm }: FormikHelpers<UpdateCompanyInput>
  ) => {
    try {
      setSubmitting(true);
      const company = await createCompany(values);
      saveCompanyLocally(company);
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

  const handleUpdate = async (
    values: UpdateCompanyInput,
    { setSubmitting, setValues }: FormikHelpers<UpdateCompanyInput>
  ) => {
    try {
      setSubmitting(true);
      const company = await updateCompany(companyId!, values);
      console.log({ company });
      editCompanyLocally(company);
      setValues(company as Partial<UpdateCompanyInput>);
      toast.success("Company updated successfully.");
    } catch (err) {
      let errorMessage = "Failed to update company.";

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

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this company?")) {
      deleteCompanyLocally(companyId!);
      toast.success("Company deleted successfully.");
      router.push("/companies");
    }
  };

  const isCreate = formMode === "create";
  const isEdit = formMode === "edit";

  const initialErrors = useMemo(() => {
    return isCreate ? {} : validate(formData);
  }, [isCreate, formData]);
  
  const initialTouched = useMemo(() => {
    return Object.keys(formData).reduce((acc, key) => {
      if(isCreate) {
        acc[key] = false;
      }else {
        acc[key] = true;
      }

      return acc;
    }, {});
  }, [isCreate, formData]);

  return {
    formData,
    setFormData,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleFileUpload,
    initialFormData,
    validate,
    formMode,
    allowedFileTypes,
    accept,
    fileIsSaving,
    fetchingCompany,
    getFileImage,
    extractFilename,
    viewImg,
    setViewImg,
    initialErrors,
    initialTouched,
    isCreate,
    isEdit
  };
};
