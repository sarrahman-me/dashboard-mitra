"use client";
import { Heading } from "@/components/atoms";
import { CardProduct } from "@/components/molecules";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";

const Barang = () => {
  const [barang, setBarang] = useState([] as any);
  const [transaksi, setTransaksi] = useState([] as any);
  const [profile, setProfile] = useState([] as any);

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi(`/api/barang`);
      setBarang(response.barang);
      setTransaksi(response.transaksi);
      setProfile(response.profile);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Heading>Barang</Heading>
      {profile.id_membership ? (
        !transaksi.verifikasi ? (
          <div>selesaikan transaksi terlebih dahulu</div>
        ) : (
          barang.map((item: any, i: any) => (
            <div key={i} className="flex flex-wrap">
              <CardProduct product={item} />
            </div>
          ))
        )
      ) : (
        <div>pilih membership dulu</div>
      )}
    </div>
  );
};

export default Barang;
