/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading } from "@/components/atoms";
import {
  Button,
  Container,
  ExpiredPlan,
  NotMembership,
  PaymentChecking,
  Textfield,
  Typography,
} from "@/src/components";
import { GetDataApi } from "@/src/utils";
import { toPng } from "html-to-image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoCloudDownloadOutline } from "react-icons/io5";
import moment from "moment";
import { useRouter } from "next/navigation";
import mixpanel from "@/config/mixpanel";

export default function Feedback() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [barang, setBarang] = useState([] as any);
  const { webstore, profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );

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

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  if (!webstore?.isLive) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Container otherClass="p-8">
          <Typography align="center">
            Untuk mengakses halaman ini, Kamu perlu membuat toko online terlebih
            dahulu.
          </Typography>
          <div className="flex justify-center mt-5">
            <Button onClick={() => router.push("/dashboard/webstore")}>
              Buat Webstore
            </Button>
          </div>
        </Container>
      </div>
    );
  }

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
              onClick={() => {
                // tracker code
                mixpanel.track("Download Qr Code", {
                  nama: item.nama_barang,
                  brand: item.brand,
                  ukuran: item.ukuran,
                  id_product: item.kode_barang,
                  searched_item_query: search,
                });
                handleDownload(item);
              }}
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
