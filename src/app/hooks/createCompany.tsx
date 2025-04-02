"use client";

import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { CREATE_COMPANY, GET_SIGNED_UPLOAD_URL } from "../lib/graphql";
import { FormData, HandleChangeEvent, HandleSubmitEvent, CreateCompanyResponse } from "../types";

export const useCreateCompanyForm = (
  client: ReturnType<typeof useApolloClient>
) => {
  const [createCompany] = useMutation(CREATE_COMPANY);
  
  const [formData, setFormData] = useState<FormData>({
    legalName: "",
    stateOfIncorporation: "",
    industry: "",
    totalNumberOfEmployees: "",
    numberOfPartTimeEmployees: "",
    numberOfFullTimeEmployees: "",
    linkedInCompanyPage: "",
    facebookCompanyPage: "",
    website: "",
    logoS3Key: null,
    phone: "",
    fax: "",
    email: "",
    otherInformation: "",
    primaryContactPerson: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    registeredAddress: {
      country: null,
      state: null,
      city: "",
      street: "",
      zipCode: "",
    },
    mailingAddress: {
      country: null,
      state: null,
      city: "",
      street: "",
      zipCode: "",
    },
    isMailingAddressDifferentFromRegisteredAddress: false,zz
  });

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | HandleChangeEvent
  ) => {
    setFormData((prev) => {
      if ("target" in e) {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        return updateNestedState(prev, name, newValue);
      }

      return updateNestedState(prev, e.name, e.value);
    });
  };

  const updateNestedState = (
    prevState: FormData,
    name: string,
    value: any
  ): FormData => {
    if (name.includes(".")) {
      const keys = name.split(".");
      const [parent, child] = keys as [keyof FormData, string];

      return {
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
          ...(child === "country" ? { state: "" } : {}),
        },
      };
    }

    return { ...prevState, [name]: value };
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
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
      setFormData((prev) => ({
        ...prev,
        logoS3Key: key,
      }));

      toast.success("File uploaded successfully:");
    } catch {
      toast.error("File upload failed:");
    }
  };

  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();
    
    try {
      const { data } = await createCompany({
        variables: {
          input: formData,
        },
      });

      const newCompany = (data as CreateCompanyResponse).createCompany.company;

      // Get existing companies from localStorage
      const storedCompanies = localStorage.getItem("companies");
      const companies: Record<string, any>[] = storedCompanies ? JSON.parse(storedCompanies) : [];

      // Add the new company to the array
      companies.push(newCompany);

      // Save updated companies array back to localStorage
      localStorage.setItem("companies", JSON.stringify(companies));

      toast.success("Company created successfully!");
    } catch {
      toast.error("Failed to create company.");
    }
  };

  return { formData, handleChange, handleSubmit, handleFileUpload };
};
