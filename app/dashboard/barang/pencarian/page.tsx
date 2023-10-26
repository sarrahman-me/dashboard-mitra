"use client";
import { HeaderAndBackIcon } from "@/components/molecules";
import { useSelector } from "react-redux";
import {
  CatalogProducts,
  NotMembership,
  PaymentChecking,
  SearchBar,
} from "@/src/components";

export default async function Pencarian(req: any) {
  const { query } = req.searchParams;
  const { profile, transaksi } = useSelector((state: any) => state.profile);

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <SearchBar />
      <HeaderAndBackIcon title={`Hasil Pencarian`} />
      <CatalogProducts atribut={`query=${query}`} path="products/search" />
    </div>
  );
}
