"use client";
import { HeaderAndBackIcon } from "@/components/molecules";
import {
  CatalogProducts,
  ExpiredPlan,
  NotMembership,
  PaymentChecking,
  SearchBar,
} from "@/src/components";
import moment from "moment";
import { useSelector } from "react-redux";

const BarangPromo = async () => {
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
      <HeaderAndBackIcon title="Promo" />
      <CatalogProducts atribut={`promo=true`} />
    </div>
  );
};

export default BarangPromo;
