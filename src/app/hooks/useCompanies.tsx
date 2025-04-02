import { useEffect, useState } from "react";
import {
  Company,
  UpdateCompanyInput,
  // GetSignedDownloadUrlQuery,
  // GetSignedDownloadUrlQueryVariables,
  // GetSignedUploadUrlQuery,
  // GetSignedUploadUrlQueryVariables,
  // CreateCompanyMutation,
  // CreateCompanyMutationVariables,
  // UpdateCompanyMutation,
  // UpdateCompanyMutationVariables,
} from "../lib/graphql-types";
import { useApolloClient } from "@apollo/client";
import {
  GET_COMPANY,
  GET_SIGNED_UPLOAD_URL,
  GET_SIGNED_DOWNLOAD_URL,
  CREATE_COMPANY,
  UPDATE_COMPANY,
} from "../lib/graphql";

const STORAGE_KEY = "companies";

interface useCompaniesProps {
  client: ReturnType<typeof useApolloClient>;
}

export default function useCompanies({ client }: useCompaniesProps) {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const storedCompanies = localStorage.getItem(STORAGE_KEY);
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  const saveCompanyLocally = (company: Company) => {
    const updatedCompanies = [...companies, company];
    setCompanies(updatedCompanies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
  };

  const editCompanyLocally = (company: Company) => {
    const updatedCompanies = companies.map((c) =>
      c.id === company.id ? company : c
    );
    setCompanies(updatedCompanies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
  };

  const deleteCompanyLocally = (id: string) => {
    const updatedCompanies = companies.filter((c) => c.id !== id);
    setCompanies(updatedCompanies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
  };

  const getCompanyLocally = (id: string) =>
    companies.find((c) => {
      return c.id === id;
    });

  const fetchCompany = async (id: string): Promise<Company> => {
    try {
      const { data } = await client.query({
        query: GET_COMPANY,
        variables: { id },
      });
      return data.getCompany;
    } catch (error) {
      console.error("Error fetching company details:", error);
      throw error;
    }
  };

  const createCompany = async (
    company: UpdateCompanyInput
  ): Promise<Company> => {
    const { data } = await client.mutate({
      mutation: CREATE_COMPANY,
      variables: { input: company },
    });

    const createdCompany = data?.createCompany?.company;

    if (!createdCompany) {
      throw new Error("Failed to create company.");
    }

    return createdCompany;
  };

  const updateCompany = async (
    companyId: string,
    company: UpdateCompanyInput
  ): Promise<Company> => {
    console.log({ company });
    const companyClone = structuredClone(company);

    if ("id" in companyClone) {
      delete companyClone.id;
    }

    if ("__typename" in companyClone) {
      delete companyClone.__typename;
    }

    if (
      companyClone?.registeredAddress &&
      "__typename" in companyClone.registeredAddress
    ) {
      delete companyClone.registeredAddress.__typename;
    }

    if (
      companyClone?.mailingAddress &&
      "__typename" in companyClone.mailingAddress
    ) {
      delete companyClone.mailingAddress.__typename;
    }

    if (
      companyClone?.primaryContactPerson &&
      "__typename" in companyClone.primaryContactPerson
    ) {
      delete companyClone.primaryContactPerson.__typename;
    }

    if (
      companyClone?.registeredAddress &&
      "isMailingAddressDifferentFromRegisteredAddress" in
        companyClone.registeredAddress
    ) {
      delete companyClone.registeredAddress
        .isMailingAddressDifferentFromRegisteredAddress;
    }

    if (
      companyClone?.mailingAddress &&
      "isMailingAddressDifferentFromRegisteredAddress" in
        companyClone.mailingAddress
    ) {
      delete companyClone.mailingAddress
        .isMailingAddressDifferentFromRegisteredAddress;
    }

    const { data } = await client.mutate({
      mutation: UPDATE_COMPANY,
      variables: {
        companyId,
        input: companyClone,
      },
    });

    const updatedCompany = data?.updateCompany?.company;

    if (!updatedCompany) {
      throw new Error("Failed to update company.");
    }

    return updatedCompany;
  };

  const extractFilename = (key: string) => {
    const parts = key.split("-", 2);
    return parts.length > 1 ? parts[0] : key;
  };

  const saveFileImage = async (
    file: File | undefined
  ): Promise<{ url: string; key: string }> => {
    if (!file) {
      throw new Error("No file selected.");
    }

    // ✅ Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG and PNG files are allowed.");
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File size must be less than 2MB.");
    }

    // ✅ Type-safe GraphQL query
    const { data } = await client.query({
      query: GET_SIGNED_UPLOAD_URL,
      variables: {
        input: {
          fileName: file.name,
          contentType: file.type,
        },
      },
    });

    if (!data?.getSignedUploadUrl) {
      throw new Error("Failed to retrieve the signed upload URL.");
    }

    const { url, key } = data.getSignedUploadUrl;

    // ✅ Upload the file
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    return { url, key };
  };

  const getFileImage = async (key: string) => {
    const { data } = await client.query({
      query: GET_SIGNED_DOWNLOAD_URL,
      variables: {
        s3Key: key,
      },
    });

    if (!data?.getSignedDownloadUrl) {
      throw new Error("Failed to retrieve the signed URL");
    }

    return {
      url: data.getSignedDownloadUrl.url,
      filename: extractFilename(key),
    };
  };

  return {
    createCompany,
    updateCompany,
    companies,
    saveCompanyLocally,
    editCompanyLocally,
    deleteCompanyLocally,
    getCompanyLocally,
    fetchCompany,
    saveFileImage,
    getFileImage,
    extractFilename,
  };
}
