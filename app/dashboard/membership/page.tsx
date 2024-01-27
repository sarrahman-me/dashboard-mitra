"use client";
import moment from "moment";
import { formatCurrency } from "@/utils";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  ExpiredPlan,
  ListData,
  MembershipPlanList,
  PaymentChecking,
  Table,
  Typography,
} from "@/src/components";
import { Report } from "notiflix";
import { GetDataApi, formatKeteranganWaktu } from "@/src/utils";
import { useEffect, useState } from "react";

const Membership = () => {
  const { profile, transaksi, membership, klasifikasi_membership } =
    useSelector((state: any) => state.profile);
  const [historyTransaksi, setHistoryTransaksi] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      if (profile.id_membership) {
        const transaksiResponse = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/membership/${profile.id_membership}`
        );

        setHistoryTransaksi(transaksiResponse.data);
      }
    };
    fetchData();
  }, [profile.id_membership]);

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  const threeDaysBeforeExpiration = moment().add(3, "days").startOf("day"); // Tanggal saat ini ditambah 3 hari dan diatur ke awal hari

  const isThreeDaysBeforeExpiration = endDate.isSameOrBefore(
    threeDaysBeforeExpiration,
    "day"
  );

  if (!profile.id_membership) {
    return <MembershipPlanList />;
  }

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi.verifikasi) {
    return <PaymentChecking />;
  }

  const canUpgrade = membership.klasifikasi !== "premium";

  const handleUpgrade = () => {
    Report.info(
      "Info",
      "Fitur ini sedang dalam pengembangan. <br/><br/> Mohon maaf ketidaknyamanan ini",
      "Okay"
    );
  };

  return (
    <div className="mt-2">
      <Typography variant="subtitle">Membership</Typography>
      {isThreeDaysBeforeExpiration && !isMembershipExpired && (
        <div className="text-center bg-indigo-600 dark:bg-indigo-800 rounded text-white my-2">
          <p>Pemberitahuan !</p>
          <p className="text-white text-xs sm:text-sm">
            Membership Anda akan berakhir. Perpanjangan dan pemberhentian dapat
            dilakukan saat membership telah berakhir.
          </p>
        </div>
      )}
      <Container otherClass="p-3">
        <div>
          <ListData label="Id membership" value={membership.id_membership} />
          <ListData label="Paket" value={membership.klasifikasi} />
          <ListData
            label="Biaya bulanan"
            value={formatCurrency(Number(klasifikasi_membership.harga))}
          />
          <ListData
            label="Tanggal berakhir"
            value={formatKeteranganWaktu(Number(membership.endDate))}
          />
        </div>
      </Container>
      {canUpgrade && (
        <div onClick={handleUpgrade} className="mt-3">
          <Button variant="text">Upgrade ke Premium</Button>
        </div>
      )}
      <div className="my-2">
        <Typography variant="subtitle">History Transaksi</Typography>
        <Table
          columns={[
            {
              label: "Tanggal",
              renderCell: async (item: any) => (
                <p>{formatKeteranganWaktu(item.createdAt)}</p>
              ),
            },
            {
              label: "Nominal",
              renderCell: async (item: any) => (
                <p>{formatCurrency(Number(item.nominal))}</p>
              ),
            },
          ]}
          datas={historyTransaksi}
        />
      </div>
    </div>
  );
};

export default Membership;
