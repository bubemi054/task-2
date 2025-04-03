"use client";

import useUserSessionChecker from "../hooks/useUserSessionChecker";
import NavBar from "../components/NavBar";
import CompanyCard from "./CompanyCard";
import { client } from "../lib/apollo-client";
import useCompanies from "../hooks/useCompanies";

const Companies = () => {
  const { clearSession } = useUserSessionChecker();
  const { setSearch, search, filteredCompanies, companies, getFileImage } =
    useCompanies({
      client,
    });

  return (
    <>
      <NavBar
        clearSession={clearSession}
        search={search}
        setSearch={setSearch}
      />
      {filteredCompanies.length > 0 && (
        <div className="w-[95%] mt-[50px] mx-auto flex flex-wrap gap-[20px]">
          {filteredCompanies.map((company, index) => (
            <CompanyCard
              key={index}
              company={company}
              getFileImage={getFileImage}
            />
          ))}
        </div>
      )}

      {companies.length === 0 && (
        <div className="mt-[50px] text-center h-[100px]">
          No companies available.
        </div>
      )}
      {companies.length != 0 && filteredCompanies.length === 0 && (
        <div className="mt-[50px] text-center h-[100px]">
          No companies match your search.
        </div>
      )}
    </>
  );
};

export default Companies;
