"use client";

import ViewCreateOrEditCompany from "../components/ViewCreateOrEditCompany";
import { ApolloProvider } from "@apollo/client";
import NavBar from "../components/Navbar";
import { client } from "../lib/apollo-client";

const CompanyPage = () => {
  return (
    <ApolloProvider client={client}>
      <NavBar />
      <ViewCreateOrEditCompany />
    </ApolloProvider>
  );
};

export default CompanyPage;
