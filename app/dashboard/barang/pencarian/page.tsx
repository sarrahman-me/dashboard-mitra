"use client";
import { CatalogProducts } from "@/components/organisms";
import { HeaderAndBackIcon } from "@/components/molecules";
import { PaymentChecking } from "@/layouts";
import { useSelector } from "react-redux";
import { NotMembership } from "@/src/components/template";

export default async function Pencarian(req: any) {
  const { query } = req.searchParams;
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
      <HeaderAndBackIcon title={`Hasil Pencarian`} />
      <CatalogProducts
        persentaseHarga={persentaseHarga}
        atribut={`query=${query}`}
        path="products/search"
      />
    </div>
  );
}
