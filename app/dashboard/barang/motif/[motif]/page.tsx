"use client";
import { HeaderAndBackIcon, SearchBar } from "@/components/molecules";
import { useSelector } from "react-redux";
import {
  CatalogProducts,
  NotMembership,
  PaymentChecking,
} from "@/src/components";

export default async function Motif({ params }: { params: { motif: string } }) {
  const motif = params.motif;

  const { profile, transaksi } = useSelector(
    (state: any) => state.profile
  );

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <SearchBar />
      <HeaderAndBackIcon title={`Motif ${motif}`} />
      <CatalogProducts atribut={`motif=${motif}`} />
    </div>
  );
}
