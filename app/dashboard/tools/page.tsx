"use client";
import {
  ExpiredPlan,
  KalkulatorKeramik,
  NotMembership,
  OngkirCalculator,
  PaymentChecking,
  Tabs,
  Typography,
} from "@/src/components";
import moment from "moment";
import { useSelector } from "react-redux";

export default function Tools() {
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );

  if (!profile.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <Typography variant="subtitle">Tools</Typography>
      <Tabs
        lists={["Kalkulator", "Ongkir"]}
        panels={[
          <KalkulatorKeramik key="kalkulator" />,
          <OngkirCalculator key="ongkir" />,
        ]}
      />
    </div>
  );
}
