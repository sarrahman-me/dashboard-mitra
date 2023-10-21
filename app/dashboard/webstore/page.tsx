"use client";
import React, { useEffect, useState } from "react";
import { Heading, ListData } from "@/components/atoms";
import { SectionLayout } from "@/components/organisms";
import {
  CreatingWebsite,
  FormWebstore,
  NotMembership,
  PaymentChecking,
} from "@/layouts";
import { GetDataApi } from "@/src/utils";
import moment from "moment";
import { useSelector } from "react-redux";

export default function Webstore() {
  const { profile, transaksi } = useSelector((state: any) => state.profile);
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
    <div className="py-6">
      <Heading>Webstore</Heading>
      <SectionLayout>
        <div>
          <ListData label="Id Webstore" value={webstore?.id_webstore} />
          <ListData label="Nama Webstore" value={webstore?.nama_webstore} />
          <ListData label="URL" value={webstore?.url} />
          <ListData
            label="Dibuat tanggal"
            value={moment(webstore?.createdAt).format("LL")}
          />
        </div>
      </SectionLayout>
    </div>
  );
}
