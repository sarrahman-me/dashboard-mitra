"use client";
import { useState } from "react";
import { Button, Container, Textfield } from "../../atoms";
import Image from "next/image";
import map from "@/public/map-and-location.png";
import { formatCurrency } from "@/src/utils";

const OngkirCalculator = () => {
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

  return (
    <div className="flex flex-col md:flex-row">
      <div className=" flex-1 ">
        <form onSubmit={handleCekOngkir} className="space-y-3 ">
          <Textfield
            fullWidth
            type="number"
            label={"Perkiraan ongkos per km"}
            placeholder="10000"
            name={"ongkir"}
            onChange={(value) =>
              setOngkirState({
                ...ongkirState,
                ongkir: value,
              })
            }
          />
          <Textfield
            fullWidth
            label={"Alamat asal"}
            name={"origin"}
            onChange={(value) =>
              setOngkirState({
                ...ongkirState,
                origin: value,
              })
            }
          />
          <Textfield
            fullWidth
            label={"Alamat tujuan"}
            name={"destination"}
            onChange={(value) =>
              setOngkirState({
                ...ongkirState,
                destination: value,
              })
            }
          />
          <Button type={"submit"} size="full">
            Cek ongkir
          </Button>
        </form>
        {resultOngkir.status === "OK" && (
          <Container>
            <div className="divide-y-8 divide-transparent">
              <p>Asal : {resultOngkir.asal}</p>
              <p>Tujuan : {resultOngkir.tujuan}</p>
              <p>Jarak : {resultOngkir.jarak}</p>
              <p>Estimasi waktu : {resultOngkir.waktu}</p>
              <p>Harga : {formatCurrency(resultOngkir.harga)}</p>
            </div>
          </Container>
        )}
        <div className="bg-warning rounded-md bg-white dark:bg-slate-800 mt-5 p-4 text-center text-sm">
          <h2 className="text-xl font-semibold text-orange-500">Peringatan</h2>
          <p className="mt-2">
            fitur ini masih dalam tahap pengembangan lebih lanjut, oleh karena
            itu, mungkin terdapat kesalahan dan ketidakpastian dalam informasi
            yang diberikan.
          </p>
        </div>
      </div>

      <div className="hidden flex-1 md:flex justify-center items-center">
        <Image src={map} alt={"map"} className="max-w-xs m-2" />
      </div>
    </div>
  );
};

export default OngkirCalculator;
