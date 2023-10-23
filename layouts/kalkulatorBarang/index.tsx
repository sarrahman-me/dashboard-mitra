"use client";
import { useState } from "react";
import { formatCurrency } from "@/utils";
import { HitungKeramik } from "@/functions";
import { calculateDiscountPercentage } from "@/src/utils";
import { Button, Container, Textfield, Typography } from "@/src/components";

interface KalkulatorKeramikProps {
  ukuran: string;
  harga: number;
  isPromo: boolean;
  hargaPromo: number;
  penggunaan_umum: string[];
}

const KalkulatorKeramik = ({
  ukuran,
  harga,
  isPromo,
  hargaPromo,
  penggunaan_umum,
}: KalkulatorKeramikProps) => {
  const bisaDinding = penggunaan_umum.includes("Dinding");

  const [panjang, setPanjang] = useState(0);
  const [lebar, setLebar] = useState(0);
  const [tinggi, setTinggi] = useState(0);
  const [hasil, setHasil] = useState({} as any);

  const persentaseDiskon = calculateDiscountPercentage(harga, hargaPromo);

  const handleHitung = (e: any) => {
    e.preventDefault();
    const hasilHitung = HitungKeramik(ukuran, panjang, lebar);
    setHasil(hasilHitung);
  };

  return (
    <div>
      <form onSubmit={handleHitung} className="space-y-2 my-2">
        <Textfield
          fullWidth
          type="number"
          label={"Panjang Ruangan"}
          name={"panjang"}
          onChange={(value) => setPanjang(value)}
        />
        <Textfield
          fullWidth
          type="number"
          label={"Lebar Ruangan"}
          name={"lebar"}
          onChange={(value) => setLebar(value)}
        />
        {bisaDinding && (
          <Textfield
            fullWidth
            type="number"
            label={"Tinggi Ruangan"}
            name={"tinggi"}
            onChange={(value) => setTinggi(value)}
          />
        )}
        <div className="mb-2">
          <Button variant="outlined" type={"submit"}>
            Hitung
          </Button>
        </div>
      </form>

      {hasil?.kebutuhan && (
        <Container otherClass="space-y-2 p-2">
          <Typography> Kebutuhan: {hasil?.kebutuhan} dus</Typography>

          {isPromo && (
            <p className="text-base divide-y-4 divide-transparent">
              Estimasi Biaya:
              {formatCurrency(Number(hargaPromo) * hasil?.kebutuhan)}*
              <p className="text-xs text-green-500">
                Kamu hemat{" "}
                {formatCurrency(
                  Number(harga) * hasil?.kebutuhan -
                    Number(hargaPromo) * hasil?.kebutuhan
                )}
              </p>
            </p>
          )}

          <div className="text-sm md:text-base">
            {isPromo ? (
              <span className="flex items-center text-xs">
                <p className="bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${persentaseDiskon}%`}</p>
                <p className="text-gray-500 line-through">
                  {formatCurrency(Number(harga) * hasil?.kebutuhan)}
                </p>
              </span>
            ) : (
              <span className="text-base divide-y-4 divide-transparent">
                Estimasi Biaya:
                {formatCurrency(Number(harga) * hasil?.kebutuhan)}
                <p className="text-xs">
                  (*berdasarkan hasil kebutuhan dan harga barang)
                </p>
              </span>
            )}
          </div>
          <p className="text-sm md:text-base">
            Diameter Ruangan: {hasil?.diameter_ruang} m<sup>2</sup>
          </p>
          <p className="text-sm md:text-base">
            Diameter Perdus: {(hasil?.diameter_perdus as number).toFixed(2)} m
            <sup>2</sup>
          </p>
          <p className="text-xs">
            (*berdasarkan hasil kebutuhan dan harga barang)
          </p>
        </Container>
      )}
    </div>
  );
};

export default KalkulatorKeramik;
