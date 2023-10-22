"use client";
import { CatalogProducts } from "@/components/organisms";
import { HeaderAndBackIcon, SearchBar } from "@/components/molecules";
import { PaymentChecking } from "@/layouts";
import { useSelector } from "react-redux";
import { NotMembership } from "@/src/components/template";

export default async function Motif({ params }: { params: { motif: string } }) {
  const motif = params.motif;

  const { profile, transaksi, persentaseHarga } = useSelector(
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
      <CatalogProducts
        persentaseHarga={persentaseHarga}
        atribut={`motif=${motif}`}
      />
    </div>
  );
}
