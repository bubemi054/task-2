"use client";

import { useEffect, useState } from "react";
import { useUserSessionChecker } from "../hooks/useUserSessionChecker";
import { Company } from "../types";
import NavBar from "./Navbar";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="w-[304px] h-[304px] bg-[#F0F0F0] rounded-[20px] p-[20px] flex flex-col justify-center items-center">
      <span className="font-bold">{company.legalName}</span>
      <span>{company.industry}</span>
      <span>{company.email}</span>
    </div>
  );
};

const Companies = () => {
  useUserSessionChecker();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const storedCompanies = localStorage.getItem("companies");
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-[85%] mt-[50px] mx-auto flex flex-wrap gap-[20px]">
        {companies.length > 0 ? (
          companies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))
        ) : (
          <p>No companies available.</p>
        )}
      </div>
    </>
  );
};

export default Companies;
