"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import { Heading, ListData } from "@/components/atoms";
import {
  ButtonStopMembership,
  MembershipPlanList,
  PaymentChecking,
} from "@/layouts";
import { GetDataApi, formatCurrency } from "@/utils";

export default function Membership() {
  const [profile, setProfile] = useState({} as any);
  const [membershsip, setMembership] = useState({} as any);
  const [transaksi, setTransaksi] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const responseProfile = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
      );
      setProfile(responseProfile.data);
      if (responseProfile.data?.id_membership) {
        const responseMembership = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/member/${responseProfile.data?.id_membership}`
        );
        setMembership(responseMembership.data);
        if (responseMembership.data.id_transaksi) {
          const responseTransaksi = await GetDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${responseMembership.data.id_transaksi}`
          );
          setTransaksi(responseTransaksi.data);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {!profile?.id_membership ? (
        <MembershipPlanList />
      ) : transaksi.verifikasi ? (
        <div className="py-8">
          <Heading>Membership</Heading>
          <div className="bg-white rounded p-2 my-2 border">
            <p>Detail Membership</p>
            <ListData label="Id membership" value={membershsip.id_membership} />
            <ListData
              label="Biaya bulanan"
              value={formatCurrency(Number(transaksi.nominal))}
            />
            <ListData
              label="Tanggal mulai"
              value={moment(Number(membershsip.startDate)).format("LL")}
            />
            <ListData
              label="Tanggal berakhir"
              value={moment(Number(membershsip.endDate)).format("LL")}
            />
          </div>
          <ButtonStopMembership id_membership={profile?.id_membership} />
        </div>
      ) : (
        <PaymentChecking />
      )}
    </div>
  );
}
