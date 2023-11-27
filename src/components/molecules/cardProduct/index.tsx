/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import {
  calculateDiscountPercentage,
  isNewProduct,
  upPriceWithPercen,
  formatCurrency,
} from "@/src/utils";
import { useSelector } from "react-redux";
import { Container } from "../../atoms";
import { IoMdBonfire } from "react-icons/io";
import { FaThumbsUp } from "react-icons/fa6";

interface CardProductProps {
  product: any;
}

const CardProduct = ({ product }: CardProductProps) => {
  const router = useRouter();
  const { persentaseHarga } = useSelector((state: any) => state.profile);

  // menghitung harga
  const harga = upPriceWithPercen(product?.harga, persentaseHarga);
  const hargaPromo = upPriceWithPercen(product?.harga_promo, persentaseHarga);

  // cek apakah barang baru
  const isNew = isNewProduct(product.createdAt);

  // hitung persentase diskon
  const persentaseDiskon = calculateDiscountPercentage(harga, hargaPromo);

  // menghilangkan fungsi klik kanan pada gambar
  const handleKlikKanan = (e: any) => {
    e.preventDefault();

    return false;
  };

  return (
    <Container
      otherClass="relative hover:shadow cursor-pointer dark:hover:shadow-gray-500"
      onClick={() => {
        router.push(`/dashboard/barang/${product.slug}`);
      }}
    >
      {/* label jika barang baru */}

      {isNew && (
        <div className="bg-indigo-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0">
          Baru
        </div>
      )}

      {product.promo && product.stok > 500 && (
        <div className="bg-green-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0 flex items-center">
          <FaThumbsUp className="text-white mr-1" />
          Terbaik
        </div>
      )}

      {product.promo && product.stok < 500 && (
        <div className="bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0 flex items-center">
          {Number(persentaseDiskon) >= 15 ? (
            <IoMdBonfire className="text-white mr-1" />
          ) : null}
          {Number(persentaseDiskon) >= 15 ? "Hot" : "Promo"}
        </div>
      )}

      {isNew && !product.promo && (
        <div className="bg-blue-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0">
          Baru
        </div>
      )}

      {/* gambar barang */}

      <div onContextMenu={handleKlikKanan} className="flex justify-center">
        <img
          className="object-contain max-h-28 md:max-h-32 border"
          src={product?.images[0]}
          alt={product?.nama_barang}
        />
      </div>

      <div className="p-1 divide-y-2 md:divide-y-4 divide-transparent">
        <p className="text-xs text-indigo-500">
          {product?.kategori} {product.tekstur}
        </p>
        <p className="text-xs md:text-sm">{product?.nama_barang}</p>

        {/* harga */}

        {product.promo ? (
          <p className="text-xs md:text-sm font-semibold">
            {formatCurrency(hargaPromo)}
          </p>
        ) : (
          <p className="text-xs md:text-sm font-semibold">
            {formatCurrency(harga)}
          </p>
        )}

        {/* harga tercoret jika promo */}

        {product.promo && (
          <span className="flex items-center text-xs">
            <p className="text-xs md:bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${persentaseDiskon}%`}</p>
            <p className="text-xs text-gray-400 line-through">
              {formatCurrency(harga)}
            </p>
          </span>
        )}

        <div>
          <p className="text-xs md:text-sm">Stok: {product.stok}</p>
          {product.stok > 500 ? (
            <p
              className={`my-1 p-0.5 text-xs rounded-full bg-green-300 dark:bg-green-700 inline px-2`}
            >
              Banyak
            </p>
          ) : product.stok < 50 ? (
            <p
              className={`my-1 p-0.5 text-xs rounded-full bg-orange-300 dark:bg-orange-700 inline px-2`}
            >
              Terbatas
            </p>
          ) : null}
        </div>

        {/* detail tambahan */}

        <div className="text-xs flex justify-between items-center">
          <p>{product?.tekstur}</p>
          <p>{product?.ukuran}</p>
        </div>
      </div>
    </Container>
  );
};

export default CardProduct;
