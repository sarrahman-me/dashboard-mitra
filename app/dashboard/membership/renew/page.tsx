"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetDataApi, PostDataApi, formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";
import { HeaderAndBackIcon } from "@/components/molecules";
import { Confirm, Loading, Notify } from "notiflix";
import { useSelector } from "react-redux";
import { Button, ListData } from "@/src/components";

export default function Renew() {
  const router = useRouter();
  const [membershipPlan, setPlan] = useState({} as any);
  const { profile, membership } = useSelector((state: any) => state.profile);

  // Mengambil params dari halaman sebelumnya
  const klasifikasiMembership = membership.klasifikasi;

  useEffect(() => {
    async function fetchData() {
      const data = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/membership/klasifikasi/${klasifikasiMembership}`
      );
      setPlan(data?.data || []);
    }
    fetchData();
  }, [klasifikasiMembership, profile.id_membership, router]);

  const handlePerbaruiMembership = () => {
    Confirm.show(
      "Konfirmasi",
      "Apakah kamu yakin?",
      "Yakin",
      "Batal",
      async () => {
        Loading.circle();
        const response = await PostDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/perbarui`,
          {
            id_membership: profile.id_membership,
          }
        );

        if (response.success) {
          Loading.remove();
          router.push("/dashboard/membership");
        } else {
          Loading.remove();
          Notify.failure(response.message);
        }
      },
      () => {}
    );
  };

  return (
    <div>
      <HeaderAndBackIcon title={"Halaman pembayaran"} />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded shadow p-6">
            <p className="text-lg mb-4">Informasi Paket Membership</p>
            <ListData
              label={"Nama Klasifikasi"}
              value={membershipPlan.nama_klasifikasi}
            />
            <ListData
              label={"Harga"}
              value={formatCurrency(membershipPlan.harga || 0)}
            />
            <ListData
              label={"Tanggal berakhir"}
              value={`${moment().add(1, "month").format("LL")} (1 bulan)`}
            />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded shadow p-6">
            <p className="text-lg mb-4">Instruksi Pembayaran</p>
            <p>Silakan lakukan pembayaran ke rekening berikut:</p>
            <p className="font-semibold mt-2">
              {formatCurrency(membershipPlan.harga || 0)}
            </p>
            <div className="mt-4">
              <p className="font-semibold">Bank: Bank BCA</p>
              <p className="font-semibold">Nomor Rekening: 793 557 7110</p>
            </div>
            <p className="text-sm my-4">
              Pastikan kamu melakukan pembayaran dengan benar ke rekening di
              atas.
            </p>
            <Button size="full" onClick={handlePerbaruiMembership}>
              Saya sudah transfer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
