"use client";
import { HeaderAndBackIcon, SearchBar } from "@/components/molecules";
import { CatalogProducts } from "@/components/organisms";
import { NotMembership, PaymentChecking } from "@/src/components";
import { useSelector } from "react-redux";

const BarangPromo = async () => {
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
      <HeaderAndBackIcon title="Promo" />
      <CatalogProducts
        persentaseHarga={persentaseHarga}
        atribut={`promo=true`}
      />
    </div>
  );
};

export default BarangPromo;
