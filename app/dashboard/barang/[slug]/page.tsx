/* eslint-disable @next/next/no-img-element */
import {
  CardProduct,
  HeaderAndBackIcon,
  IconSelect,
} from "@/components/molecules";
import { SectionLayout } from "@/components/organisms";
import { formatCurrency } from "@/utils";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

const DetailBarang = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const responseBarang = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
  );

  const barang = responseBarang.data;

  const responseBarangSerupa = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`
  );

  const barangSerupa = responseBarangSerupa.data;

  return (
    <div>
      <HeaderAndBackIcon title="Detail Barang" />
      <div className="flex flex-col md:flex-row my-2">
        <div className="md:w-1/3 flex justify-center items-center w-full m-2 md:m-0">
          <img
            src={barang.images[0]}
            alt={barang.slug}
            className="w-52 h-52 object-contain border"
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 w-full shadow">
          <div className="divide-y-4 md:divide-y-8 divide-transparent ml-2">
            <p className="text-sm md:text-base text-indigo-500">
              {barang.kategori}
            </p>
            <p className="md:text-lg font-semibold">
              {barang.nama_barang} - {barang.warna}
            </p>
            <p className="text-sm md:text-base">{barang.brand}</p>
            <p className="text-sm md:text-base">
              {barang.promo ? (
                <span className="text-gray-500 line-through">
                  {formatCurrency(Number(barang.harga))}
                </span>
              ) : (
                formatCurrency(Number(barang.harga))
              )}
            </p>
            {barang.promo && (
              <p className="text-red-500 text-md font-semibold">
                {formatCurrency(Number(barang.harga_promo))}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="underline font-semibold m-2">Detail Produk</p>
      <SectionLayout>
        <div className="flex flex-col md:flex-row ml-2">
          <div className="divide-y-8 divide-transparent my-2 w-1/2">
            <p>Ukuran : {barang.ukuran}</p>
            <p>Kualitas : {barang.kualitas}</p>
            <p>Motif : {barang.motif}</p>
            <p>Tekstur : {barang.tekstur}</p>
          </div>
          <div className="w-1/2">
            <div className="my-2">
              <div className="my-2">
                <IconSelect options={barang.penggunaan_umum} />
              </div>
            </div>
            <div className="my-2">
              <div className="my-2">
                <IconSelect options={barang.area_penggunaan} />
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>
      {barangSerupa.length > 1 ? (
        <div>
          <p className="underline font-semibold m-2">Rekomendasi</p>
          <SectionLayout>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {barangSerupa.map((item: any, i: any) => (
                <div key={i}>
                  <CardProduct product={item} />
                </div>
              ))}
            </div>
          </SectionLayout>
        </div>
      ) : null}
    </div>
  );
};

export default DetailBarang;
