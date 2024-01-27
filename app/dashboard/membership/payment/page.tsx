"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetDataApi, PostDataApi, formatCurrency } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { HeaderAndBackIcon } from "@/components/molecules";
import { Confirm, Loading } from "notiflix";
import { useSelector } from "react-redux";
import { Button, ListData, Textfield } from "@/src/components";

export default function Payment() {
  const router = useRouter();
  const params = useSearchParams();
  const [membershipPlan, setPlan] = useState({} as any);
  const [vocher, setVocher] = useState("");
  const [resultRedemVocher, setResultRedemVocher] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const { profile } = useSelector((state: any) => state.profile);

  // Mengambil params dari halaman sebelumnya
  const klasifikasiMembership = params.get("klasifikasi-membership");

  useEffect(() => {
    async function fetchData() {
      if (!profile.id_membership) {
        const data = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/klasifikasi/${klasifikasiMembership}`
        );
        setFinalPrice(data?.data.harga);
        setPlan(data?.data || []);
      } else {
        router.push("/dashboard/membership");
      }
    }
    fetchData();
  }, [klasifikasiMembership, profile.id_membership, router]);

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
          { klasifikasi: membershipPlan.slug, discountAmount }
        );
        if (response.success) {
          window.location.reload();
          Loading.remove();
        }
      }
    );
  };

  const handleRedemVocher = async () => {
    Loading.circle();
    const voucherRegex = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/;

    if (voucherRegex.test(vocher)) {
      const response = await PostDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/finance/voucher/check`,
        { code: vocher, category: "membership" }
      );
      if (response.success) {
        const diskon =
          (membershipPlan.harga * response.data.discount_percentage) / 100;
        setDiscountAmount(diskon);
        setFinalPrice(membershipPlan.harga - diskon);
        setResultRedemVocher(response.message);
      } else {
        setResultRedemVocher(response.message);
      }
      Loading.remove();
    } else {
      setResultRedemVocher("Format voucer tidak valid");
      Loading.remove();
    }
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
            <ListData label={"Harga"} value={formatCurrency(finalPrice)} />
            {discountAmount > 0 && (
              <ListData
                label={"kamu menghemat"}
                value={formatCurrency(discountAmount)}
              />
            )}
            <ListData
              label={"Tanggal berakhir"}
              value={`${moment().add(1, "month").format("LL")} (1 bulan)`}
            />
            <p className=" my-2">Vocher (jika ada)</p>
            <div className="flex items-center">
              <Textfield
                placeholder="###-###-###"
                name={"vocher"}
                onChange={(value) => setVocher(value)}
              />
              <Button
                disabled={!vocher}
                onClick={handleRedemVocher}
                size="large"
                variant="text"
              >
                Gunakan
              </Button>
            </div>
            <p className="text-xs text-indigo-500 md:text-sm">
              {resultRedemVocher}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded shadow p-6">
            <p className="text-lg mb-4">Instruksi Pembayaran</p>
            <p>Silakan lakukan pembayaran ke rekening berikut:</p>
            <p className="font-semibold mt-2">
              {formatCurrency(finalPrice || 0)}
            </p>
            <div className="mt-4">
              <p className="font-semibold">Bank: Bank BCA</p>
              <p className="font-semibold">Nomor Rekening: 793 557 7110</p>
            </div>
            <p className="text-sm my-4">
              Pastikan kamu melakukan pembayaran dengan benar ke rekening di
              atas.
            </p>
            <Button size="full" onClick={daftarMembership}>
              Saya sudah transfer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
