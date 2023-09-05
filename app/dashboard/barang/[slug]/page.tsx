/* eslint-disable @next/next/no-img-element */
import {
  CardProduct,
  HeaderAndBackIcon,
  IconSelect,
} from "@/components/molecules";
import {
  CatalogProducts,
  SectionLayout,
  SwiperProduct,
} from "@/components/organisms";
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

  const responseBarangSejenis = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?nama=${barang.nama_barang}&brand=${barang.brand}`
  );

  const barangSejenis = responseBarangSejenis.data;
  const barangSerupa = responseBarangSerupa.data;

  return (
    <div>
      <HeaderAndBackIcon title={`Detail ${barang.kategori}`} />
      <div className="flex flex-col md:flex-row my-2">
        <div className="md:w-1/3 flex justify-center items-center w-full m-2 md:m-0">
          <img
            src={barang.images[0]}
            alt={barang.slug}
            className="object-contain max-h-44 border"
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
                <span className="font-semibold">
                  {formatCurrency(Number(barang.harga))}
                </span>
              )}
            </p>
            {barang.promo && (
              <p className="text-red-500 font-semibold">
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
      {barangSejenis.length > 1 ? (
        <div>
          <SwiperProduct
            products={barangSejenis}
            title={"Barang yang sama"}
            url={""}
          />
        </div>
      ) : null}
      {barangSerupa.length > 1 ? (
        <div>
          <CatalogProducts
            title={"Rekomendasi"}
            atribut={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DetailBarang;
