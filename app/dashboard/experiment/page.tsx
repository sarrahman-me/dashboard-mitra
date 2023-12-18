"use client";
import { Heading } from "@/components/atoms";
import SearchByImage from "@/public/searchByImage.png";
import virtual from "@/public/virtual.png";
import {
  Button,
  CardProduct,
  Container,
  ExpiredPlan,
  FileInput,
  LoadingAnimation,
  NotMembership,
  PaymentChecking,
  Typography,
} from "@/src/components";
import { RoomvoVisualize } from "@/src/utils";
import { PostDataApi } from "@/utils";
import moment from "moment";
import Image from "next/image";
import { Notify } from "notiflix";
import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Tb3DCubeSphereOff } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Experiment() {
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );
  const [gambar, setGambar] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [responsePredict, setResponsePredict] = useState([] as any);

  const handleCari = async () => {
    setLoading(true);

    if (!gambar) {
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

      if (response?.predicted_id_product.length > 0) {
        PostDataApi(`${process.env.NEXT_PUBLIC_HOST}/products/barang/slugs`, {
          slugs: response?.predicted_id_product,
        })
          .then((productsResponse) => {
            setResponsePredict(productsResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching wishlist products:", error);
            setResponsePredict([]);
          });
      } else {
        setResponsePredict([]);
        Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
      }
    } catch (error) {
      console.error("Error:", error);
      Notify.failure("Gagal melakukan pencarian berdasarkan gambar");
    }
    setLoading(false);
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

        <div className="space-y-3">
          <FileInput setFile={setGambar} previewFile />
          <Button
            loading={loading}
            icon={<FaWandMagicSparkles />}
            onClick={handleCari}
          >
            Pencarian dengan gambar
          </Button>
        </div>
      </Container>

      <div className="p-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-y-4 gap-x-2">
          {loading ? (
            <LoadingAnimation />
          ) : responsePredict.length > 0 ? (
            responsePredict.map((item: any, i: any) => (
              <div key={i}>
                <CardProduct product={item} />
              </div>
            ))
          ) : (
            <div className="my-2">
              <div className="flex justify-center m-1">
                <Tb3DCubeSphereOff className="text-indigo-500 text-4xl md:text-5xl shadow shadow-indigo-300 p-1 border rounded-full" />
              </div>
              <Typography
                otherClass="my-2"
                color="secondary"
                variant="helper"
                align="center"
              >
                Tidak ada barang
              </Typography>
            </div>
          )}
        </div>
      </div>

      <Container otherClass="p-2 my-1">
        <div>
          <span>
            Experiment 2: <p className="font-semibold">Ruang visualisasi</p>
          </span>

          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center items-center my-1">
              <Image
                src={virtual}
                alt="pencarian dari gambar"
                className="max-w-xs"
              />
            </div>

            <div className="my-4 space-y-8 md:ml-2">
              <Typography>
                Sebelum kamu benar benar memutuskan untuk membeli sebuah produk,
                mungkin kamu berencana untuk mencocokan ruangan mu dengan
                keramik yang akan kamu beli.
              </Typography>
              <Typography>
                Dari kasus tersebut kami mencoba sebuah experiment untuk itu,
                silahkan klik tombol dibawah ini untuk mencoba ruang visualisasi
              </Typography>
              <Button
                icon={<FaWandMagicSparkles />}
                onClick={() => {
                  window.open(
                    "https://studio-prod.actumwork.pl/preview/d9a049b1bba5a1b00d81525a4e919304396beb70dbe523bdb0d178d17f98eabd3806f7031eea99908e70d22c622018150da4",
                    "_blank"
                  );
                }}
              >
                Visulaisasi
              </Button>
            </div>
          </div>
        </div>
      </Container>
      {/* <RoomvoVisualize /> */}
    </div>
  );
}
