"use client";

import { Suspense } from "react";
import useUserSessionChecker from "../hooks/useUserSessionChecker";
import ViewCreateOrEditCompany from "../components/ViewCreateOrEditCompany";
import { ApolloProvider } from "@apollo/client";
import Navbar from "@app/components/Navbar";
import { client } from "../lib/apollo-client";
import useCompanies from "../hooks/useCompanies";

const CompanyPage = () => {
  const { clearSession } = useUserSessionChecker();
  const { setSearch, search } = useCompanies({
    client,
  });

  return (
    <ApolloProvider client={client}>
      <Navbar
        clearSession={clearSession}
        search={search}
        setSearch={setSearch}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ViewCreateOrEditCompany client={client} />
      </Suspense>
    </ApolloProvider>
  );
};

export default CompanyPage;
