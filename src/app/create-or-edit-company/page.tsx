"use client";

import ViewOrEditCompany from "../components/ViewOrEditCompany";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo-client";

const CompanyPage = () => {
  return (
    <ApolloProvider client={client}>
      <ViewOrEditCompany />
    </ApolloProvider>
  );
};

export default CompanyPage;
