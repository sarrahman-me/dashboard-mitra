"use client";
import React from "react";
import { Button, Heading } from "@/components/atoms";
import { GetDataApi, formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { BsHandThumbsUpFill } from "react-icons/bs";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {membershipList.reverse().map((item: any, i: number) => (
          <div
            key={i}
            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
          >
            <div className="flex justify-center items-center mb-3">
              <h3 className="text-2xl font-semibold">
                {item?.nama_klasifikasi}
              </h3>
              {item?.slug === "premium" ? (
                <BsHandThumbsUpFill className="text-indigo-600" />
              ) : null}
            </div>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              {item?.deskripsi}
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-1 text-3xl font-semibold">
                {formatCurrency(item?.harga)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/bln</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <ListIcon title="Buat Toko Online dengan Banyak Fitur" />
              <ListIcon title="Temukan keramik dari suplier di sekitar" />
              <ListIcon title="Dukungan dan suport setiap hari" />
              <ListIcon title="Gunakan berbagai alat yang dapat membantu berjualan" />
              <ListIcon
                notInclude={item?.slug !== "premium"}
                title="Dapatkan wawasan dari aktifitas customer"
              />
              <ListIcon
                notInclude={item?.slug !== "premium"}
                title="Uji coba fitur baru lebih awal"
              />
            </ul>
            <button
              onClick={() => {
                const paymentUrl = `/dashboard/membership/payment?klasifikasi-membership=${encodeURIComponent(
                  item.slug
                )}`;
                router.push(paymentUrl);
              }}
              className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-indigo-900"
            >
              Daftar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlanList;

const ListIcon = (props: { title: string; notInclude?: boolean }) => {
  return (
    <li className="flex items-center space-x-3">
      {props.notInclude ? (
        <RxCross2 className="text-red-500" />
      ) : (
        <TiTick className="text-green-500" />
      )}
      <span>
        {props.notInclude ? <p className="line-through">{props.title}</p> : <p>{props.title}</p>}
      </span>
    </li>
  );
};
