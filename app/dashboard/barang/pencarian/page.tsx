"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { CatalogProducts } from "@/components/organisms";
import { HeaderAndBackIcon } from "@/components/molecules";

export default function Pencarian() {
  const params = useSearchParams();
  const query = params.get("query");

  return (
    <div>
      <HeaderAndBackIcon title={`pencarian ${query}`} />
      <CatalogProducts atribut={`query=${query}`} path="products/search" />
    </div>
  );
}
