"use client";
import { HeaderAndBackIcon, SearchBar } from "@/components/molecules";
import {
  CatalogProducts,
  NotMembership,
  PaymentChecking,
} from "@/src/components";
import { useSelector } from "react-redux";

const BarangPromo = async () => {
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
      <HeaderAndBackIcon title="Promo" />
      <CatalogProducts atribut={`promo=true`} />
    </div>
  );
};

export default BarangPromo;
