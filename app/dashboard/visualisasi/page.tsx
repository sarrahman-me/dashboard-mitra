"use client";
import { ExpiredPlan, NotMembership, PaymentChecking } from "@/src/components";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export default function Visualisasi() {
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );
  const iframeStyle = {
    width: "100%",
    height: "100vh",
    border: "none",
  };

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <iframe
        src="https://studio-prod.actumwork.pl/preview/d9a049b1bba5a1b00d81525a4e919304396beb70dbe523bdb0d178d17f98eabd3806f7031eea99908e70d22c622018150da4"
        style={iframeStyle}
        title="Visualisasi"
      ></iframe>
    </div>
  );
}
