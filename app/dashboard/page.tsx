"use client";
import {
  Button,
  ExpiredPlan,
  NotMembership,
  PaymentChecking,
  SwiperProduct,
  Typography,
} from "@/src/components";
import { CiWarning } from "react-icons/ci";
import { GetDataApi } from "@/src/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );
  const [barangTerbaru, setBarangBaru] = useState([] as any);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const responseBarangPromo = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?terbaru=true&limit=15`,
        3600
      );
      setBarangBaru(responseBarangPromo.data);
    };
    fetchData();
  }, []);

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
      <Typography variant="subtitle">Selamat datang {profile.nama}</Typography>
      {/* products terbaru */}

      {!profile.kota && (
        <div className="my-3 p-2 flex items-center bg-orange-100 dark:bg-orange-900 border dark:border-none rounded shadow shadow-orange-300 dark:shadow-orange-700">
          <CiWarning className="" />
          <div className="ml-2 flex items-center space-x-1">
            <Typography>Lengkapi profile</Typography>
            <Button onClick={() => router.push('/dashboard/account')} size="small" variant="text">
              Disini
            </Button>
          </div>
        </div>
      )}

      <div className="my-2">
        <SwiperProduct title="Barang Terbaru" products={barangTerbaru} />
      </div>
    </div>
  );
}
