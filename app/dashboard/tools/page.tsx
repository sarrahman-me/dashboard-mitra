"use client";
import { Button, Input, Select } from "@/components/atoms";
import { SectionLayout } from "@/components/organisms";
import { HitungKeramik } from "@/functions";
import { GetDataApi, formatCurrency } from "@/utils";
import { useEffect, useState } from "react";

export default function Tools() {
  const [page, setPage] = useState("kalkulator");
  const [panjang, setPanjang] = useState(0);
  const [lebar, setLebar] = useState(0);
  const [daftarUkuran, setDaftarUkuran] = useState([] as any);
  const [ukuran, setUkuran] = useState("");
  const [hasil, setHasil] = useState({} as any);

  // state ongkir
  const [ongkirState, setOngkirState] = useState({
    ongkir: 0,
    origin: "",
    destination: "",
  });
  const [resultOngkir, setResultOnkir] = useState({
    asal: "",
    tujuan: "",
    jarak: "",
    waktu: "",
    status: "",
    harga: 0,
  });

  const handleHitung = (e: any) => {
    e.preventDefault();
    const hasilHitung = HitungKeramik(ukuran, panjang, lebar);
    setHasil(hasilHitung);
  };

  const handleCekOngkir = async (e: any) => {
    e.preventDefault();
    const responseOrigin = await fetch(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${ongkirState.origin}&destinations=${ongkirState.destination}&key=${process.env.NEXT_PUBLIC_DISTANCE_API_KEY}`
    );
    const data = await responseOrigin.json();

    const jarakKm = data?.rows[0]?.elements[0]?.distance?.value / 1000;

    const harga = jarakKm * ongkirState.ongkir;

    setResultOnkir({
      asal: data?.origin_addresses[0],
      tujuan: data?.destination_addresses[0],
      jarak: data?.rows[0]?.elements[0]?.distance?.text,
      waktu: data?.rows[0]?.elements[0]?.duration?.text,
      status: data.status,
      harga,
    });
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
              <div className="divide-y-8 divide-transparent">
                <p>Kebutuhan : {hasil?.kebutuhan}</p>
                <p>Diameter ruangan : {hasil?.diameter_ruang}</p>
                <p>Diameter per dus : {Math.ceil(hasil?.diameter_perdus)}</p>
              </div>
            </SectionLayout>
          )}
        </div>
      ) : (
        <div className="md:w-1/2">
          <form
            onSubmit={handleCekOngkir}
            className="divide-transparent divide-y-8"
          >
            <Input
              type="number"
              label={"Perkiraan ongkos per km"}
              placeholder="10000"
              name={"ongkir"}
              onChange={(event) =>
                setOngkirState({
                  ...ongkirState,
                  ongkir: event.target.value,
                })
              }
            />
            <Input
              label={"Alamat asal"}
              name={"origin"}
              onChange={(event) =>
                setOngkirState({
                  ...ongkirState,
                  origin: event.target.value,
                })
              }
            />
            <Input
              label={"Alamat tujuan"}
              name={"destination"}
              onChange={(event) =>
                setOngkirState({
                  ...ongkirState,
                  destination: event.target.value,
                })
              }
            />
            <Button isFullWidth={true} isSubmit={true}>
              Cek ongkir
            </Button>
          </form>
          {resultOngkir.status === "OK" && (
            <SectionLayout>
              <div className="divide-y-8 divide-transparent">
                <p>Asal : {resultOngkir.asal}</p>
                <p>Tujuan : {resultOngkir.tujuan}</p>
                <p>Jarak : {resultOngkir.jarak}</p>
                <p>Estimasi waktu : {resultOngkir.waktu}</p>
                <p>Harga : {formatCurrency(resultOngkir.harga)}</p>
              </div>
            </SectionLayout>
          )}
          <div className="bg-warning rounded-md bg-white dark:bg-slate-800 mt-5 p-4 text-center text-sm">
            <h2 className="text-xl font-semibold text-orange-500">
              Peringatan
            </h2>
            <p className="mt-2">
              fitur ini masih dalam tahap pengembangan lebih lanjut, oleh karena
              itu, mungkin terdapat kesalahan dan ketidakpastian dalam informasi
              yang diberikan.
            </p>
          </div>
        </div>
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
