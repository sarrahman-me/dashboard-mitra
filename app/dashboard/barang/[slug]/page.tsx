/* eslint-disable @next/next/no-img-element */
import { HeaderAndBackIcon } from "@/components/molecules";
import { GetDataApi, formatCurrency } from "@/utils";

const DetailBarang = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const responseBarang = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
  );

  const barang = responseBarang.data;

  return (
    <div>
      <HeaderAndBackIcon title="Detail Barang" />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 flex justify-center items-center w-full">
          <img src={barang.images[0]} alt={barang.slug} className="w-52 h-52" />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 my-2 w-full shadow">
          <div className="divide-y-8 divide-transparent">
            <p className="text-sm md:text-base text-indigo-500">
              {barang.kategori}
            </p>
            <p className="md:text-lg font-semibold">{barang.nama_barang}</p>
            <p className="text-sm md:text-base">{barang.brand}</p>
            <p className="text-sm md:text-base">{barang.stok} dus</p>
            <p className="md:text-lg font-semibold">
              {formatCurrency(Number(barang.harga))}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 my-2 w-full shadow">
        <div>
          <p className="underline font-semibold">Detail Produk</p>
          <div className="divide-y-8 divide-transparent my-2">
            <p>Ukuran : {barang.ukuran}</p>
            <p>Kualitas : {barang.kualitas}</p>
            <p>Motif : {barang.motif}</p>
            <p>Tekstur : {barang.tekstur}</p>
            <p>Warna : {barang.warna}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBarang;
