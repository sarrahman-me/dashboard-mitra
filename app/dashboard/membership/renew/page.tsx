"use client";
import moment from "moment";
import React, { useState } from "react";
import { PostDataApi, formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";
import { HeaderAndBackIcon } from "@/components/molecules";
import { Confirm, Loading, Notify } from "notiflix";
import { useSelector } from "react-redux";
import { Button, ListData, Textfield } from "@/src/components";
import mixpanel from "@/config/mixpanel";

export default function Renew() {
  const router = useRouter();
  const [vocher, setVocher] = useState("");
  const [resultRedemVocher, setResultRedemVocher] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const { profile, klasifikasi_membership } = useSelector(
    (state: any) => state.profile
  );

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
            discountAmount,
          }
        );

        mixpanel.track("Renew Membership", {
          id_membership: profile.id_membership,
          klasifikasi_membership: klasifikasi_membership.nama_klasifikasi,
          discountAmount,
        });

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

  const handleRedemVocher = async () => {
    Loading.circle();
    const voucherRegex = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/;

    if (voucherRegex.test(vocher)) {
      const response = await PostDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/finance/voucher/check`,
        { code: vocher, category: "perpanjangan" }
      );

      mixpanel.track("Redeem Voucher", {
        code: vocher,
        category: "Renew Membership",
        status: response.success,
        message: response.message,
      });

      if (response.success) {
        const diskon =
          (klasifikasi_membership.harga * response.data.discount_percentage) /
          100;
        setDiscountAmount(diskon);
        setFinalPrice(klasifikasi_membership.harga - diskon);
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
              value={klasifikasi_membership.nama_klasifikasi}
            />
            <ListData
              label={"Harga"}
              value={
                finalPrice !== 0
                  ? formatCurrency(finalPrice)
                  : formatCurrency(Number(klasifikasi_membership.harga))
              }
            />
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
              {finalPrice !== 0
                ? formatCurrency(finalPrice)
                : formatCurrency(Number(klasifikasi_membership.harga))}
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
