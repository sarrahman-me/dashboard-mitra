/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Container, Typography } from "@/src/components";
import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import mixpanel from "@/config/mixpanel";

const generateQrCodeUrl = (webstore: any, barang: any) => {
  return `https://api.qrserver.com/v1/create-qr-code/?data=${webstore?.url}/barang/${barang.kode_barang}&size=100x100`;
};

export default function QrSampleProducts(props: {
  webstore: any;
  barang: any;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleDownload = async () => {
    try {
      const qrcodeElement = document.getElementById("qrcode");

      if (qrcodeElement) {
        const dataUrl = await toPng(qrcodeElement);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `qrcode-${props.barang.kode_barang}.png`;

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

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          generateQrCodeUrl(props.webstore, props.barang)
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        setImageLoaded(true);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };
    fetchImage();
  }, [props.webstore, props.barang]);

  return (
    <Container otherClass="flex flex-col sm:p-2 sm:flex-row justify-center items-center my-2">
      <div className="w-full px-4 md:px-0  md:w-2/3 max-w-xl md:mx-auto my-2 space-y-1">
        <Typography variant="subtitle">
          Yuk, Tempel pada sample fisik di tokomu!
        </Typography>
        <Typography>
          {" "}
          Qr code ini akan mengarahkan pelangganmu langsung ke barang ini pada
          situs webstore milikmu
        </Typography>
      </div>

      <div className="w-full md:w-1/3">
        {imageUrl && (
          <div className="flex flex-col">
            <div
              id="qrcode"
              className="flex space-x-1 items-center rounded bg-white text-black w-full"
            >
              <img
                src={imageUrl}
                className="border m-2 w-28 h-w-28"
                alt={`${props.webstore?.url}/barang/${props.barang.kode_barang}`}
                title={`${props.webstore?.url}/barang/${props.barang.kode_barang}`}
              />
              <div className="space-y-1">
                <p className="font-mono font-bold whitespace-nowrap">
                  {props.barang.nama_barang}
                </p>
                <p className="font-mono">
                  {props.barang.warna?.replace(/\([^)]*\)/g, "").trim()}
                </p>
                <p className="font-mono">({props.barang.ukuran})</p>
                <p className="font-mono">{props.barang.brand}</p>
              </div>
            </div>
            <div className="my-2">
              <Button
                onClick={() => {
                  // tracker code
                  mixpanel.track("Download Qr Code", {
                    nama: props.barang.nama_barang,
                    brand: props.barang.brand,
                    ukuran: props.barang.ukuran,
                    id_product: props.barang.kode_barang,
                  });
                  handleDownload();
                }}
              >
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
