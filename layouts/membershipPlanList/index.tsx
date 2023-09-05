"use client";
import React from "react";
import { Button, Heading } from "@/components/atoms";
import { GetDataApi, formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MembershipPlanList = () => {
  const router = useRouter();
  const [membershipList, setMembershipList] = useState([] as any);

  useEffect(() => {
    async function getData() {
      const data = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/membership/klasifikasi`
      );
      setMembershipList(data.data);
    }
    getData();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <p className="text-lg text-center font-semibold mb-8">
        Pilihan Paket Membership
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {membershipList.map((item: any, i: number) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-8">
              <h3 className="text-xl font-semibold mb-2">
                {item.nama_klasifikasi}
              </h3>
              <p className="text-gray-600 dark:text-gray-200 text-sm mb-4">{item.deskripsi}</p>
              <p className="text-lg font-semibold">
                Harga: {formatCurrency(item.harga)}
              </p>
            </div>
            <div className="px-6 pb-6">
              <Button
                className="w-full"
                onClick={() => {
                  const paymentUrl = `/dashboard/membership/payment?klasifikasi-membership=${encodeURIComponent(
                    item.slug
                  )}`;
                  router.push(paymentUrl);
                }}
              >
                Daftar Sekarang
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlanList;
