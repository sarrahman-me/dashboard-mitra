/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading } from "@/components/atoms";
import { Button, Textfield } from "@/src/components";
import { GetDataApi } from "@/src/utils";
import { toPng } from "html-to-image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoCloudDownloadOutline } from "react-icons/io5";

export default function Feedback() {
  const [search, setSearch] = useState("");
  const [barang, setBarang] = useState([] as any);
  const { webstore } = useSelector((state: any) => state.profile);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?limit=9&search=${search}`
      );

      setBarang(response?.data || []);
    };

    fetchData();
  }, [search]);

  const handleDownload = async (item: any) => {
    try {
      const qrcodeElement = document.getElementById(item.kode_barang);

      if (qrcodeElement) {
        const dataUrl = await toPng(qrcodeElement);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `qrcode-${item.kode_barang}.png`;

        // Append the link to the document body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  return (
    <div>
      <Heading>QR Code</Heading>
      <div className="flex justify-center items-center">
        <Textfield
          placeholder="Cari nama barang"
          name={"Search"}
          onChange={(value) => setSearch(value)}
          fullWidth
        />
      </div>
      <div className="my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {barang.map((item: any, i: any) => (
          <div key={i}>
            <div
              id={item.kode_barang}
              className="flex space-x-1 items-center rounded bg-white text-black w-full"
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${webstore?.url}/barang/${item.kode_barang}&size=100x100`}
                className="border m-2 w-28 h-w-28"
                alt={`${webstore?.url}/barang/${item.kode_barang}`}
                title={`${webstore?.url}/barang/${item.kode_barang}`}
              />
              <div className="space-y-1">
                <p className="font-mono font-bold whitespace-nowrap">
                  {item.nama_barang}
                </p>
                <p className="font-mono">
                  {item.warna?.replace(/\([^)]*\)/g, "").trim()}
                </p>
                <p className="font-mono">({item.ukuran})</p>
                <p className="font-mono">{item.brand}</p>
              </div>
            </div>
            <Button
              onClick={() => handleDownload(item)}
              size="full"
              icon={<IoCloudDownloadOutline />}
            >
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
