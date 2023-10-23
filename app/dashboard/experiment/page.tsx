"use client";
import { Heading } from "@/components/atoms";
import SearchByImage from "@/public/searchByImage.png";
import {
  Button,
  CatalogProducts,
  Container,
  FileInput,
  NotMembership,
  PaymentChecking,
  Typography,
} from "@/src/components";
import { PostDataApi } from "@/utils";
import Image from "next/image";
import { Loading, Notify } from "notiflix";
import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Experiment() {
  const { profile, transaksi } = useSelector((state: any) => state.profile);
  const [gambar, setGambar] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [responsePredict, setResponsePredict] = useState({
    message: "",
    predicted_class: "",
    predicted_probability: 0,
    predicted_probabilities: [],
  });

  const handleCari = async () => {
    setLoading(true);

    if (!gambar) {
      Loading.remove();
      Notify.warning("Masukkan gambar");
      setLoading(false);
      return;
    }

    try {
      const response = await PostDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/ai/predict`,
        {
          image: gambar[0],
        }
      );

      if (response?.predicted_class) {
        setResponsePredict({
          predicted_class: response?.predicted_class,
          predicted_probability: response?.predicted_probability,
          predicted_probabilities: response?.predicted_probabilities,
          message: response?.message,
        });
        setLoading(false);
      } else {
        Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
      }
    } catch (error) {
      console.error("Error:", error);
      Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
    }
    setLoading(false);
    Loading.remove();
  };

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <Heading>Experiment</Heading>

      {/* pengantar */}
      <Container otherClass="p-2 my-1">
        <div className="space-y-2">
          <Typography variant="subtitle">
            customer-centric product development
          </Typography>
          <Typography>
            Saya memegang prinsip bahwa produk terbaik adalah produk yang
            dibangun bersama pelanggan. Konsep ini juga dikenal sebagai
            pengembangan produk berbasis pelanggan atau customer-centric product
            development.
          </Typography>
          <Typography>
            Kamu adalah orang yang dipilih untuk menguji coba fitur ini dan
            memberikan umpan balik terhadap fitur yang sedang kami kembangkan
          </Typography>
        </div>
      </Container>

      <Container otherClass="p-2 my-1">
        <div>
          <span>
            Experiment 1:{" "}
            <p className="font-semibold">Pencarian keramik dengan gambar</p>
          </span>

          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center items-center my-1">
              <Image
                src={SearchByImage}
                alt="pencarian dari gambar"
                className="max-w-xs"
              />
            </div>

            <div className="my-4 space-y-8 md:ml-2">
              <Typography>
                Apakah kamu pernah pergi ke rumah kerabat mu dan melihat keramik
                yang menarik pandangan matamu tetapi sayangnya kamu tidak tahu
                dimana kamu menemukan keramik yang sama serupa.
              </Typography>
              <Typography>
                Dari permasalahan itu kami mencoba mengembangkan fitur ini,
                berikan saran dan masukan terbaik mu dari fitur ini untuk
                pengembangan yang lebih baik.
              </Typography>
            </div>
          </div>
        </div>
      </Container>

      <Container otherClass="p-2 my-1">
        <div className="space-y-3">
          <FileInput setFile={setGambar} previewFile />
          <Button
            disabled={loading}
            icon={<FaWandMagicSparkles />}
            onClick={handleCari}
          >
            Pencarian dengan gambar
          </Button>
        </div>
      </Container>

      {responsePredict.message === "berhasil" && (
        <Container otherClass="p-2 my-1">
          <div>
            <Typography>Ringkasan hasil prediksi model</Typography>
            <div className="divide-y-8 divide-transparent">
              {responsePredict.predicted_probabilities
                .filter((item: any) => item.value > 0)
                .map((item: any, i: any) => (
                  <Typography
                    variant="helper"
                    color={
                      item.value > 0.5
                        ? "success"
                        : item.value < 0.1
                        ? "danger"
                        : "primary"
                    }
                    key={i}
                  >
                    {item.label} dengan keyakinan{" "}
                    {(item.value * 100).toFixed(0)}%
                  </Typography>
                ))}
            </div>
          </div>
        </Container>
      )}

      {responsePredict.message === "berhasil" && (
        <Container otherClass="p-2 my-1">
          <div>
            <p className="font-semibold underline">Hasil pencarian barang</p>
            <CatalogProducts
              atribut={`query=${responsePredict.predicted_class}`}
              path="products/search"
            />
          </div>
        </Container>
      )}
    </div>
  );
}
