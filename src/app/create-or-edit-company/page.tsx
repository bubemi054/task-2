"use client";

import ViewCreateOrEditCompany from "../components/ViewCreateOrEditCompany";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo-client";

const CompanyPage = () => {
  return (
    <ApolloProvider client={client}>
      <ViewCreateOrEditCompany />
    </ApolloProvider>
  );
};

export default CompanyPage;
