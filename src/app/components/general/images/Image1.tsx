import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface Image1Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  getFileUrl: (key: string) => Promise<string>;
  logoS3Key?: string;
}

export default function Image1({
  src,
  alt,
  className,
  logoS3Key,
  getFileUrl,
}: Image1Props) {
  // const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  // if(!logoS3Key) return null

  // const {} = getFileUrl(logoS3Key || "");

  useEffect(() => {
    const handleDownload = async () => {
      if (logoS3Key) {
        console.log("logoS3Key", logoS3Key);
        const url = await getFileUrl(logoS3Key);
        console.log({ url });
        setUrl(url);
        // setLoading(loading);
      }
    };

    const id = setTimeout(() => {
      console.log("cyviu");
      handleDownload();
    }, 500);

    return () => clearTimeout(id);
  }, [logoS3Key, getFileUrl]);

  if (!url) return null;

  return (
    <Image
      className={twMerge("h-auto max-w-lg rounded-lg", className)}
      src={url || ""}
      alt={alt || ""}
      width={500}
      height={500}
    />
  );
}
