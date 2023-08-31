"use client";
import moment from "moment";
import { Button, ListData } from "@/components/atoms";
import { GetDataApi, PostDataApi, formatCurrency } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderAndBackIcon } from "@/components/molecules";

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
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/membership/daftar`,
      { id_klasifikasi: membershipPlan.id, nominal: membershipPlan.harga }
    );
    if (response.success) {
      router.push("/dashboard/membership");
    }
  };

  return (
    <div>
      <HeaderAndBackIcon title={"Halaman pembayaran"} />
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-4 m-1 bg-white dark:bg-slate-800 rounded shadow">
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
            value={`${moment(membershipPlan.createdAt).add(1, "month")
              .calendar()} (1 bulan)`}
          />
        </div>
        <div className="w-full md:w-1/3 p-4 m-1 bg-white dark:bg-slate-800 rounded shadow">
          <p className="mb-4">
            Silakan lakukan pembayaran ke rekening berikut:
          </p>
          <p className="my-4">{formatCurrency(membershipPlan.harga || 0)}</p>
          <div className="my-4">
            <p>Bank: Bank BCA</p>
            <p>Nomor Rekening: 1234-5678-9012</p>
          </div>
          <p className="text-sm my-4">
            Pastikan kamu melakukan pembayaran dengan benar ke rekening di atas.
          </p>
          <Button onClick={daftarMembership}>Saya sudah transfer</Button>
        </div>
      </div>
    </div>
  );
}
