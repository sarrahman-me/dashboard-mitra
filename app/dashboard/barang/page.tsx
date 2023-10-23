"use client";
import { SearchBar } from "@/components/molecules";
import { SwiperProduct } from "@/components/organisms";
import { MotifList } from "@/layouts";
import {
  CatalogProducts,
  NotMembership,
  PaymentChecking,
} from "@/src/components";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Barang = () => {
  const { profile, transaksi, persentaseHarga } = useSelector(
    (state: any) => state.profile
  );
  const [barangPromo, setPromo] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const responseBarangPromo = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?promo=true`,
        3600
      );

      setPromo(responseBarangPromo.data);
    };
    fetchData();
  }, []);

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <SearchBar />
      <MotifList />
      <p className="underline font-semibold m-2">{"Semua Barang"}</p>
      <CatalogProducts />
      <SwiperProduct
        persentaseHarga={persentaseHarga}
        url="/dashboard/barang/promo"
        title="Promo"
        products={barangPromo}
      />
    </div>
  );
};

export default Barang;
