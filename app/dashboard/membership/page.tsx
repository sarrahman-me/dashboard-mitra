"use client";
import { Button } from "@/components/atoms";
import { GetDataApi, PostDataApi, formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Membership = () => {
  const router = useRouter();
  const [membershipList, setMembershipList] = useState([]);
  const [mitraData, setMitra] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const data = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/membership/klasifikasi`
      );
      setMembershipList(data?.data || []);
      const responseMitra = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
      );
      setMitra(responseMitra?.data || []);
    }
    fetchData();
  }, []);

  if (!mitraData.id_membership) {
    return listMembership(membershipList, router);
  }

  const berhentiMembership = async () => {
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/membership/berhenti`,
      { id_membership: mitraData.id_membership }
    );
    console.log(response);
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Pilihan Membership</h1>
      {JSON.stringify(mitraData.id_membership)}
      <Button onClick={berhentiMembership}>Berhenti Berlangganan</Button>
    </div>
  );
};

export default Membership;

const listMembership = (membershipPlan: any, router: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {membershipPlan.map((item: any, i: number) => (
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
  );
};
