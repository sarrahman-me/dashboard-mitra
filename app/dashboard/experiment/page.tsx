"use client";
import { Button, Heading } from "@/components/atoms";
import { ImageInputWithPreview } from "@/components/molecules";
import { CatalogProducts, SectionLayout } from "@/components/organisms";
import { NotMembership, PaymentChecking } from "@/layouts";
import SearchByImage from "@/public/searchByImage.png";
import { PostDataApi } from "@/utils";
import Image from "next/image";
import { Loading, Notify } from "notiflix";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Experiment() {
  const { profile, transaksi } = useSelector((state: any) => state.profile);
  const [gambar, setGambar] = useState([] as any);
  const [responsePredict, setResponsePredict] = useState({
    message: "",
    predicted_class: "",
    predicted_probability: 0,
    predicted_probabilities: [],
  });

  const handleCari = async () => {
    if (!gambar) {
      Loading.remove();
      Notify.warning("Masukkan gambar");
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
      } else {
        Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
      }
    } catch (error) {
      console.error("Error:", error);
      Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
    }

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
      <SectionLayout>
        <div>
          <h2 className="font-bold">customer-centric product development</h2>
          <p>
            Saya memegang prinsip bahwa produk terbaik adalah produk yang
            dibangun bersama pelanggan. Konsep ini juga dikenal sebagai
            pengembangan produk berbasis pelanggan atau customer-centric product
            development.
          </p>
          <p>
            Kamu adalah orang yang dipilih untuk menguji coba fitur ini dan
            memberikan umpan balik terhadap fitur yang sedang kami kembangkan
          </p>
        </div>
      </SectionLayout>
      <SectionLayout>
        <div>
          <span>
            Experiment 1:{" "}
            <p className="font-semibold">Pencarian keramik dengan gambar</p>
          </span>
          <div className="flex justify-center items-center">
            <Image
              src={SearchByImage}
              alt="pencarian dari gambar"
              className="max-w-xs"
            />
          </div>
          <div className="my-4 divide-y-8 divide-transparent">
            <p>
              Apakah kamu pernah pergi ke rumah kerabat mu dan melihat keramik
              yang menarik pandangan matamu tetapi sayangnya kamu tidak tahu
              dimana kamu menemukan keramik yang sama serupa.
            </p>
            <p>
              Dari permasalahan itu kami mencoba mengembangkan fitur ini,
              berikan saran dan masukan terbaik mu dari fitur ini untuk
              pengembangan yang lebih baik.
            </p>
          </div>
        </div>
      </SectionLayout>
      <SectionLayout>
        <div>
          <ImageInputWithPreview gambar={gambar} setGambar={setGambar} />
          <Button onClick={handleCari}>Cari</Button>
        </div>
      </SectionLayout>
      {responsePredict.message === "berhasil" && (
        <SectionLayout>
          <div>
            <p className="font-semibold underline">
              Ringkasan hasil prediksi model
            </p>
            <div className="divide-y-8 divide-transparent">
              {responsePredict.predicted_probabilities
                .filter((item: any) => item.value > 0)
                .map((item: any, i: any) => (
                  <span
                    key={i}
                    className={`flex ${
                      item.value > 0.5
                        ? "text-green-500"
                        : item.value < 0.1
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    <p className="font-medium mr-1">{item.label}</p> dengan
                    keyakinan{" "}
                    <p className="font-medium ml-1">
                      {(item.value * 100).toFixed(0)}%
                    </p>
                  </span>
                ))}
            </div>
          </div>
        </SectionLayout>
      )}
      {responsePredict.message === "berhasil" && (
        <SectionLayout>
          <div>
            <p className="font-semibold underline">Hasil pencarian barang</p>
            <CatalogProducts
              persentaseHarga={0}
              atribut={`query=${responsePredict.predicted_class}`}
              path="products/search"
            />
          </div>
        </SectionLayout>
      )}
    </div>
  );
}
