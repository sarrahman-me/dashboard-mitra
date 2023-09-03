/* eslint-disable @next/next/no-img-element */
"use client";
import { formatCurrency } from "@/utils";
import { useRouter } from "next/navigation";

const CardProduct = (props: { product: any }) => {
  const router = useRouter();

  // Cek apakah stok berada di bawah atau sama dengan 100
  const isOutOfStock = props.product?.stok <= 100;

  // Fungsi untuk memeriksa apakah barang baru
  const isNewProduct = () => {
    const createdAt = new Date(props.product?.createdAt);
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7); // Kurangi 7 hari dari tanggal saat ini

    return createdAt >= oneWeekAgo;
  };

  return (
    <div
      onClick={() => {
        router.push(`/dashboard/barang/${props.product.slug}`);
      }}
      className={`bg-white dark:bg-slate-900 rounded shadow m-2 cursor-pointer relative hover:shadow-md`} // Tambahkan class relative
    >
      {/* Tambahkan label "Baru" menggunakan class absolute */}
      {isNewProduct() && (
        <div className="bg-indigo-500 text-white text-xs md:text-base px-2 py-1 rounded-br absolute top-0 left-0">
          Baru
        </div>
      )}

      <div className="flex justify-center">
        <img
          className="md:w-44 md:h-44 w-32 h-32 object-cover"
          src={props.product?.images[0]}
          alt={props.product?.nama_barang}
        />
      </div>
      <div className="p-1">
        <p className="text-xs md:text-sm text-indigo-500">
          {props.product?.kategori}
        </p>
        <p className="text-xs md:text-sm">
          {(props.product?.nama_barang as string).toUpperCase()}
        </p>
        <p className="text-sm md:text-base font-semibold">
          {formatCurrency(Number(props.product?.harga))}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
