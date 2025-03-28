"use client"

import CompanyForm from "../components/create-company-form";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo-client";

const CompanyPage = () => {
  return (
    <ApolloProvider client={client}>
      <CompanyForm />
    </ApolloProvider>
  );
};

export default CompanyPage;
