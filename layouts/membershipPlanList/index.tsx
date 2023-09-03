"use client";
import React from "react";
import { Button, Heading } from "@/components/atoms";
import { GetDataApi, formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MembershipPlanList() {
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
    <div className="my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membershipList.map((item: any, i: number) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 p-4 py-6 rounded text-center shadow transition duration-300 transform hover:scale-105"
          >
            <p className="font-bold text-lg">{item.nama_klasifikasi}</p>
            <p className="text-sm mt-2">{item.deskripsi}</p>
            <p className="text-base font-bold mt-2">
              Harga: {formatCurrency(item.harga)}
            </p>
            <Button
              className="mt-4 w-full"
              onClick={() => {
                const paymentUrl = `/dashboard/membership/payment?klasifikasi-membership=${encodeURIComponent(
                  item.slug
                )}`;
                router.push(paymentUrl);
              }}
            >
              Daftar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
