"use client";
import { HeaderAndBackIcon } from "@/components/molecules";
import { useSelector } from "react-redux";
import {
  CatalogProducts,
  NotMembership,
  PaymentChecking,
  SearchBar,
} from "@/src/components";

export default function Motif({ params }: { params: { motif: string } }) {
  const motif = params.motif;

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
      <HeaderAndBackIcon title={`Motif ${motif}`} />
      <CatalogProducts atribut={`motif=${motif}`} />
    </div>
  );
}
