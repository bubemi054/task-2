import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { FaRegImage } from "react-icons/fa";

interface Image1Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  getFileImage: (key: string) => Promise<{ url: string; filename: string }>;
  logoS3Key?: string;
}

export default function Image1({
  alt,
  logoS3Key,
  getFileImage,
}: Image1Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleDownload = async () => {
      if (logoS3Key) {
        try {
          const { url } = await getFileImage(logoS3Key);
          setUrl(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    handleDownload();
  }, [logoS3Key, getFileImage]);

  if (!logoS3Key) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "w-[90%] h-[90%] aspect-square relative rounded-lg border"
      )}
    >
      {loading || !url ? (
        <div className="h-full w-full animate-pulse bg-gray-300 rounded-lg flex items-center justify-center">
          <FaRegImage size={50} />
        </div>
      ) : (
        <Image className="w-full h-full object-cover rounded-lg" src={url} alt={alt || ""} width={1000} height={1000} />
      )}
    </div>
  );
}
