"use client";
import {
  KalkulatorKeramik,
  NotMembership,
  OngkirCalculator,
  PaymentChecking,
  Tabs,
  Typography,
} from "@/src/components";
import { useSelector } from "react-redux";

export default function Tools() {
  const { profile, transaksi } = useSelector((state: any) => state.profile);

  if (!profile.id_membership) {
    return <NotMembership />;
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
