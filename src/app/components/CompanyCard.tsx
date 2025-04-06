"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import imgSample from "../../../public/next.svg";
import { Company } from "../lib/graphql-types";
import Link from "next/link";

interface CompanyCardProps {
  company: Company;
  getFileImage: (key: string) => Promise<{ url: string }>;
}

const CompanyCard = ({ company, getFileImage }: CompanyCardProps) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getImgUrl = async () => {
      try {
        const { url } = await getFileImage(company.logoS3Key!);
        setUrl(url);
      } catch (error) {
        console.error("Failed to fetch image URL:", error);
      } finally {
        setLoading(false);
      }
    };

    getImgUrl();
  }, [company.logoS3Key, getFileImage]);

  return (
    <Link
      href={`/create-or-edit-company?companyID=${company.id}`}
      className="bg-gray-100 hover:bg-gray-200 rounded-2xl px-2 py-5 flex flex-col items-center space-y-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
    >
      <div
        className={`w-full h-24 bg-white rounded-lg flex justify-center items-center overflow-hidden shadow ${
          loading && "animate-pulse"
        }`}
      >
        <Image
          role="presentation"
          className="object-contain"
          src={url || imgSample}
          alt={`${company.legalName} Logo`}
          width={150}
          height={90}
        />
      </div>

      {/* Company Info */}
      <div className="text-center space-y-1">
        <h3 className="font-semibold text-lg text-gray-900 break-words w-40">
          {company.legalName}
        </h3>
        <p className="text-sm text-gray-600 truncate w-40">
          {company.industry}
        </p>
        {company.phone && (
          <p className="text-xs text-gray-500 truncate w-40">
            📞 {company.phone}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CompanyCard;
