import { useEffect, useState } from "react";
import { Company } from "../lib/graphql-types";
import { useApolloClient } from "@apollo/client";
import { GET_COMPANY } from "../lib/graphql";

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

  const saveCompany = (company: Company) => {
    const updatedCompanies = [...companies, company];
    setCompanies(updatedCompanies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
  };

  const editCompany = (company: Company) => {
    const updatedCompanies = companies.map((c) =>
      c.id === company.id ? company : c
    );
    setCompanies(updatedCompanies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
  };

  const deleteCompany = (id: string) => {
    const updatedCompanies = companies.filter((c) => c.id !== id);
    setCompanies(updatedCompanies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
  };

  const getCompany = (id: string) =>
    companies.find((c) => {
      return c.id === id;
    });

  const fetchCompanyDetail = async (id: string): Promise<Company> => {
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

  return {
    companies,
    saveCompany,
    editCompany,
    deleteCompany,
    getCompany,
    fetchCompanyDetail,
  };
}
