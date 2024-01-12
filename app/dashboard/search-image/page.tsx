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
} from "@/src/components";
import ImageInputWithPreview from "@/src/components/molecules/imageInputWithPreview";
import { PostDataApi } from "@/utils";
import moment from "moment";
import { Notify } from "notiflix";
import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
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

      <Container otherClass="flex flex-col md:flex-row p-2">
        <div className="flex-1">
          <ImageInputWithPreview gambar={gambar} setGambar={setGambar} />
        </div>
        <div className="flex-1">
          <p className="my-2">Ukuran</p>
          {sizeOption.map((s) => (
            <div
              key={s}
              onClick={() => setSize(s)}
              className={`inline cursor-pointer m-1 border-2 ${
                s === size ? "border-indigo-500" : "border-gray-500"
              } text-center p-2 rounded border font-semibold`}
            >
              {s}
            </div>
          ))}
          <div className="space-y-1 mt-5 md:text-sm text-xs">
            <p className="text-gray-500">
              Catatan : Saat ini pencarian gambar baru di uji untuk sebagian
              dari data kami sehingga mungkin belum menampilkan gambar yang
              sesuai, Kami akan terus berkomitmen untuk memperbaruinya setiap
              saat.
            </p>
          </div>
        </div>
      </Container>
      <p className="text-gray-500 text-center text-xs my-3">
        12 januari 2024 dengan 451 sampel data
      </p>
      <Button
        size="full"
        loading={loading}
        icon={<FaWandMagicSparkles />}
        disabled={!gambar[0] || !size}
        onClick={handleCari}
      >
        Pencarian dengan gambar
      </Button>

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
          ) : null}
        </div>
      </div>
    </div>
  );
}
