"use client";
import { ExpiredPlan, NotMembership, PaymentChecking } from "@/src/components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import mixpanel from "@/config/mixpanel";
import { useParams } from "next/navigation";

export default function VisualisasiByProduct() {
  const params = useParams();
  const slug = params.slug;
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );
  const [idProduct, setIdProduct] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const responseFloori = await fetch(
        `https://api.server.floori.io/new-floori/v3/studio/explore?sku=${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer d9a049b1bba5a1b00d81525a4e919304396beb70dbe523bdb0d178d17f98eabd3806f7031eea99908e70d22c622018150da4`,
          },
        }
      );

      const productFloori = await responseFloori.json();
      setIdProduct(productFloori[0].id);
    };

    fetchData();
  }, [slug]);

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
        src={`https://tokokeramik.floori.io/?product=${idProduct}`}
        style={iframeStyle}
        title="Visualisasi"
        onLoad={() => {
          mixpanel.track("Visualisasi Keramik");
        }}
      ></iframe>
    </div>
  );
}
