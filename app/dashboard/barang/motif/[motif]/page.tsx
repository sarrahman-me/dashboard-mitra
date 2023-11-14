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

export default function Motif({ params }: { params: { motif: string } }) {
  const motif = params.motif;

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
      <HeaderAndBackIcon title={`Motif ${motif}`} />
      <CatalogProducts atribut={`motif=${motif}`} />
    </div>
  );
}
