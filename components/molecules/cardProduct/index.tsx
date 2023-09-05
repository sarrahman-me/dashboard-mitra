/* eslint-disable @next/next/no-img-element */
"use client";
import { formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";

const CardProduct = (props: { product: any }) => {
  const router = useRouter();

  // Fungsi untuk memeriksa apakah barang baru
  const isNewProduct = () => {
    const createdAt = new Date(props.product?.createdAt);
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7); // Kurangi 7 hari dari tanggal saat ini

    return createdAt >= oneWeekAgo;
  };

  // Fungsi untuk menghitung berapa persen potongannya
  const calculateDiscountPercentage = () => {
    if (props.product?.promo) {
      const harga = Number(props.product?.harga);
      const hargaPromo = Number(props.product?.harga_promo);
      const potongan = harga - hargaPromo;
      const persentasePotongan = (potongan / harga) * 100;
      return persentasePotongan.toFixed(0);
    }
    return "";
  };

  return (
    <div
      onClick={() => {
        router.push(`/dashboard/barang/${props.product.slug}`);
      }}
      className={`bg-white dark:bg-slate-800 rounded shadow cursor-pointer relative hover:shadow-md`}
    >
      {props.product.promo && (
        <div className="bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0">
          {calculateDiscountPercentage()}%
        </div>
      )}
      {isNewProduct() && !props.product.promo && (
        <div className="bg-indigo-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0">
          Baru
        </div>
      )}

      <div className="flex justify-center">
        <img
          className="object-cover border"
          src={props.product?.images[0]}
          alt={props.product?.nama_barang}
        />
      </div>
      <div className="p-1 divide-y-2 divide-transparent">
        <p className="text-xs md:text-sm text-indigo-500">
          {props.product?.kategori}
        </p>
        <p className="text-xs md:text-sm font-semibold">
          {(props.product?.nama_barang as string).toUpperCase()}
        </p>
        {props.product.promo ? (
          <p className="text-sm md:text-base text-red-500">
            {formatCurrency(Number(props.product?.harga_promo))}
          </p>
        ) : (
          <p className="text-sm md:text-base">
            {formatCurrency(Number(props.product?.harga))}
          </p>
        )}
        {props.product.promo && (
          <p className="text-sm md:text-base font-normal text-gray-400 line-through">
            {formatCurrency(Number(props.product?.harga))}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
