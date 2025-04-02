"use client";

import { useEffect, useState } from "react";
import { useUserSessionChecker } from "../hooks/useUserSessionChecker";
import NavBar from "./Navbar";
import { useCompanies } from "../hooks/useCompanies";
import Image from "next/image";
import { useApolloClient } from "@apollo/client";
import imgSample from "../../../public/next.svg"

const CompanyCard = ({ company }: { company: Company }) => {
  // const client = useApolloClient();
  // const { getFileImage } = useCompanies({client});
  // const [url, setUrl] = useState("");

  // useEffect(() => {
  //   const getImgUrl = async () => {
  //     const {url} = await getFileImage(company.logoS3Key)
  //     setUrl(url)
  //   }

  //   getImgUrl()
  // }, [])

  return (
    <div className="w-[250px] h-[250px] bg-[#F0F0F0] rounded-[20px] p-[20px] flex flex-col justify-center items-center gap-2 cursor-pointer">
      <Image className="w-[100px] h-[70px]" src={imgSample} alt="Company Image" width={1000} height={1000} />
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
