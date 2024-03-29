"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetDataApi } from "@/src/utils";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  CreatingWebsite,
  ExpiredPlan,
  FormWebstore,
  ListData,
  NotMembership,
  PaymentChecking,
  Typography,
} from "@/src/components";
import { AiOutlineSetting } from "react-icons/ai";
import { useRouter } from "next/navigation";
import mixpanel from "@/config/mixpanel";

export default function Webstore() {
  const router = useRouter();
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );
  const [webstore, setWebstore] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      if (profile?.id_webstore) {
        const responseWebstore = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile.id_webstore}`
        );
        if (responseWebstore?.data) {
          setWebstore(responseWebstore?.data);
        }
      }
    };
    fetchData();
  }, [profile.id_webstore, setWebstore]);

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

  if (!profile.id_webstore) {
    return <FormWebstore />;
  }

  if (!webstore.isLive) {
    return <CreatingWebsite />;
  }

  return (
    <div className="mt-2">
      <Typography variant="subtitle">Webstore</Typography>
      <Container otherClass="p-3">
        <div>
          <ListData label="Id Webstore" value={webstore?.id_webstore} />
          <ListData label="Nama Webstore" value={webstore?.nama_webstore} />
          <ListData label="URL" value={webstore?.url} />
          <ListData
            label="Dibuat tanggal"
            value={moment(webstore?.createdAt).format("LL")}
          />
        </div>
      </Container>
      <div className="mt-2">
        <Button
          onClick={() => {
            router.push("/dashboard/webstore/setting");
            // mixpanel tracker
            mixpanel.track("Button Clicked", {
              "Button Name": "Setting Webstore",
              "Button Type": "Contain",
            });
          }}
          icon={<AiOutlineSetting />}
          variant="text"
        >
          Setting
        </Button>
      </div>
    </div>
  );
}
