"use client";
import { Heading } from "@/components/atoms";
import {
  Button,
  CardProduct,
  Container,
  ExpiredPlan,
  LoadingAnimation,
  NotMembership,
  PaymentChecking,
  Typography,
} from "@/src/components";
import ImageInputWithPreview from "@/src/components/molecules/imageInputWithPreview";
import { PostDataApi } from "@/utils";
import moment from "moment";
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
  const [size, setSize] = useState("60x60");
  const [responsePredict, setResponsePredict] = useState([] as any);

  const sizeOption = ["60x60", "50x50"];

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
          size: size,
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
      <Heading>Pencarian Gambar</Heading>

      <Container otherClass="p-2 my-1">
        <div className="space-y-3">
          <ImageInputWithPreview gambar={gambar} setGambar={setGambar} />
          <div>
            <p className="my-2">Ukuran</p>
            {sizeOption.map((s) => (
              <div
                key={s}
                onClick={() => setSize(s)}
                className={`inline cursor-pointer bg-gradient-to-br ${
                  s === size
                    ? "from-indigo-300 to-indigo-500 dark:from-indigo-700 dark:to-indigo-900 text-white hover:bg-indigo-100 dark:hover:bg-indigo-900"
                    : "from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                } text-center p-2 rounded border font-semibold`}
              >
                {s}
              </div>
            ))}
          </div>
          <div className="my-2">
            <Button
              loading={loading}
              icon={<FaWandMagicSparkles />}
              onClick={handleCari}
            >
              Pencarian dengan gambar
            </Button>
          </div>
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
    </div>
  );
}
