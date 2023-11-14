"use client";
import { HeaderAndBackIcon } from "@/components/molecules";
import { useSelector } from "react-redux";
import {
  CatalogProducts,
  ExpiredPlan,
  NotMembership,
  PaymentChecking,
  SearchBar,
} from "@/src/components";
import moment from "moment";

export default async function Pencarian(req: any) {
  const { query } = req.searchParams;
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan />;
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
