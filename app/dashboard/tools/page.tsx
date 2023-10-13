"use client";
import { Button, Input, Select } from "@/components/atoms";
import { SectionLayout } from "@/components/organisms";
import { HitungKeramik } from "@/functions";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";

export default function Tools() {
  const [page, setPage] = useState("kalkulator");
  const [panjang, setPanjang] = useState(0);
  const [lebar, setLebar] = useState(0);
  const [daftarUkuran, setDaftarUkuran] = useState([] as any);
  const [ukuran, setUkuran] = useState("");
  const [hasil, setHasil] = useState({} as any);

  const handleHitung = (e: any) => {
    e.preventDefault();
    const hasilHitung = HitungKeramik(ukuran, panjang, lebar);
    setHasil(hasilHitung);
  };

  useEffect(() => {
    const fetchData = async () => {
      const ukuranResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/ukuran`
      );
      const listUkuran = ukuranResponse.data.map((a: any) => a.nama_ukuran);
      setDaftarUkuran(listUkuran);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul className="my-5 flex overflow-scroll justify-center text-sm font-medium text-center text-slate-500 dark:text-slate-400">
        <Tab
          label="Kalkulator"
          isActive={page === "kalkulator"}
          onClick={() => setPage("kalkulator")}
        />
        <Tab
          label="Cek Ongkir"
          isActive={page === "cek-ongkir"}
          onClick={() => setPage("cek-ongkir")}
        />
      </ul>
      {page === "kalkulator" ? (
        <div className="md:w-1/2">
          <form
            onSubmit={handleHitung}
            className="divide-transparent divide-y-8"
          >
            <Select
              value={ukuran}
              setValue={setUkuran}
              options={daftarUkuran}
            />
            <Input
              type="number"
              label={"Panjang Ruangan"}
              name={"panjang"}
              onChange={(event) => setPanjang(event.target.value)}
            />
            <Input
              type="number"
              label={"Lebar Ruangan"}
              name={"lebar"}
              onChange={(event) => setLebar(event.target.value)}
            />
            <Button isFullWidth={true} isSubmit={true}>
              Hitung
            </Button>
          </form>
          {hasil.kebutuhan && (
            <SectionLayout>
              <div>
                <p>Kebutuhan : {hasil?.kebutuhan}</p>
                <p>Diameter ruangan : {hasil?.diameter_ruang}</p>
                <p>Diameter per dus : {Math.ceil(hasil?.diameter_perdus)}</p>
              </div>
            </SectionLayout>
          )}
        </div>
      ) : (
        <p>Halaman cek ongkir</p>
      )}
    </div>
  );
}

function Tab(props: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <li
      onClick={props.onClick}
      className={`mr-2 cursor-pointer whitespace-nowrap inline-block p-4 rounded ${
        props.isActive
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-500"
      }`}
    >
      {props.label}
    </li>
  );
}
