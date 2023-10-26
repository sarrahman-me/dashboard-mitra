"use client";
import { HeaderAndBackIcon } from "@/components/molecules";
import {
  CatalogProducts,
  NotMembership,
  PaymentChecking,
  SearchBar,
} from "@/src/components";
import { useSelector } from "react-redux";

const BarangPromo = async () => {
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
      <HeaderAndBackIcon title="Promo" />
      <CatalogProducts atribut={`promo=true`} />
    </div>
  );
};

export default BarangPromo;
