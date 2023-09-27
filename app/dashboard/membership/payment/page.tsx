"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, ListData } from "@/components/atoms";
import { GetDataApi, PostDataApi, formatCurrency } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { HeaderAndBackIcon } from "@/components/molecules";
import { Confirm, Loading } from "notiflix";

export default function Payment() {
  const router = useRouter();
  const params = useSearchParams();
  const [membershipPlan, setPlan] = useState({} as any);

  // Mengambil params dari halaman sebelumnya
  const klasifikasiMembership = params.get("klasifikasi-membership");

  useEffect(() => {
    async function fetchData() {
      const data = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/membership/klasifikasi/${klasifikasiMembership}`
      );
      setPlan(data?.data || []);
    }
    fetchData();
  }, [klasifikasiMembership]);

  const daftarMembership = async () => {
    Confirm.show(
      "Konfirmasi",
      "Sudah melakukan transfer?",
      "Sudah",
      "Batal",
      async () => {
        Loading.circle();
        const response = await PostDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/daftar`,
          { klasifikasi: membershipPlan.slug }
        );
        if (response.success) {
          router.push("/dashboard/membership");
          Loading.remove();
        }
      }
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
            <ListData label={"Deskripsi"} value={membershipPlan.deskripsi} />
            <ListData
              label={"Tanggal berakhir"}
              value={`${moment(membershipPlan.createdAt)
                .add(1, "month")
                .calendar()} (1 bulan)`}
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
              <p className="font-semibold">
                Nomor Rekening: 1234-5678-9012
              </p>
            </div>
            <p className="text-sm mt-4">
              Pastikan kamu melakukan pembayaran dengan benar ke rekening di
              atas.
            </p>
            <Button className="mt-6 w-full" onClick={daftarMembership}>
              Saya sudah transfer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
