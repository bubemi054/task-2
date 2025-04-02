"use client";

import { useState, useEffect } from "react";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    
  }, [searchTerm]);

  return { searchTerm, setSearchTerm };
};
