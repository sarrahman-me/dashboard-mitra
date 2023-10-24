"use client";
import {
  Button,
  Container,
  TextfieldGroup,
  Typography,
} from "@/src/components";
import kalkulator from "@/public/kalkulator.png";
import { kalkulatorForm } from "@/src/data/forms";
import Image from "next/image";
import { useState } from "react";
import { RumusPenghitungKeramik } from "@/src/utils";

const KalkulatorKeramik = () => {
  const [data, setData] = useState({
    isi: "",
    lebar: "",
    panjang: "",
    tinggi: "",
    tipe: "",
    ukuran: "",
  });
  const [hasil, setHasil] = useState({
    diameter_ruang: 0,
    kebutuhan: 0,
    diameter_perdus: 0,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      isi: Number(data.isi),
      tipe: data.tipe,
      ukuran: data.ukuran,
      panjang: Number(data.panjang),
      lebar: Number(data.lebar),
      tinggi: Number(data.tinggi) || 0,
    };

    const hasilPerhitungan = RumusPenghitungKeramik(payload);
    setHasil({
      diameter_perdus: hasilPerhitungan.diameter_perdus,
      kebutuhan: hasilPerhitungan.kebutuhan,
      diameter_ruang: hasilPerhitungan.diameter_ruang,
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="space-y-4 flex-1">
          <form onSubmit={handleSubmit} className="my-2 space-y-4">
            <TextfieldGroup
              forms={kalkulatorForm}
              data={data}
              setData={setData}
            />
            <Button size="full" type="submit">
              Hitung
            </Button>
          </form>
          <Container otherClass="space-y-2 p-2">
            <Typography>Kebutuhan: {hasil.kebutuhan}</Typography>
            <Typography>Diameter ruangan: {hasil.diameter_ruang}</Typography>
            <Typography>Diameter per dus: {hasil.diameter_perdus}</Typography>
          </Container>
        </div>

        <div className="hidden flex-1 md:flex justify-center items-center">
          <Image src={kalkulator} alt={"kalkulator"} className="max-w-xs m-2" />
        </div>
      </div>
    </div>
  );
};

export default KalkulatorKeramik;
