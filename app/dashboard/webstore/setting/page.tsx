"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  CreatingWebsite,
  ExpiredPlan,
  FormWebstore,
  NotMembership,
  PaymentChecking,
  SwitchToggle,
  Textfield,
  Typography,
} from "@/src/components";
import { GetDataApi, PatchDataApi } from "@/src/utils";
import { Notify } from "notiflix";
import { useRouter } from "next/navigation";
import { HeaderAndBackIcon } from "@/components/molecules";

export default function Setting() {
  const router = useRouter();
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );
  const [profitPersentase, setPersentase] = useState("" as any);
  const [showPrice, setShowPrice] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (profile?.id_webstore) {
        const responseWebstore = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile.id_webstore}`
        );
        setPersentase(responseWebstore?.data?.profit_percentage);
        setShowPrice(responseWebstore?.data?.show_price);
      }
    }
    fetchData();
  }, [profile.id_webstore]);

  if (!profile.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan />;
  }

  if (!transaksi.verifikasi) {
    return <PaymentChecking />;
  }

  if (!profile.id_webstore) {
    return <FormWebstore />;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await PatchDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile.id_webstore}`,
      {
        show_price: showPrice,
        profit_percentage: profitPersentase,
      }
    );
    if (response.success) {
      Notify.success(response.message);
      router.push("/dashboard/webstore");
    } else {
      Notify.failure(response.message);
    }
  };

  return (
    <div className="mt-2">
      <HeaderAndBackIcon title={"Setting Webstore"} />
      <form className="my-3 space-y-4" onSubmit={handleSubmit}>
        <Textfield
          name={"profit"}
          value={profitPersentase}
          type="number"
          label="Persentase Keuntungan"
          onChange={(value) => setPersentase(Number(value))}
        />
        <SwitchToggle
          label={showPrice ? "tampilkan harga" : "tidak tampilkan harga"}
          setValue={setShowPrice}
          value={showPrice}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
