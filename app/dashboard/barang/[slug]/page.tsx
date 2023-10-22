import {
  HeaderAndBackIcon,
  IconSelect,
  SearchBar,
} from "@/components/molecules";
import {
  CatalogProducts,
  SectionLayout,
  SwiperProduct,
} from "@/components/organisms";
import {
  DetailProductsComp,
  PaymentChecking,
  SimulasiKeramik,
} from "@/layouts";
import KalkulatorKeramik from "@/layouts/kalkulatorBarang";
import QrSampleProducts from "@/layouts/qrSampleProducts";
import { NotMembership } from "@/src/components/template";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

const DetailBarang = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const responseProfile = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
  );

  const profile = responseProfile.data;
  let membership = null;
  let transaksi = null;
  let persentaseHarga = null;
  let webstore = null;

  if (profile?.id_membership) {
    const responseMembership = await SSRGetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/membership/member/${profile?.id_membership}`
    );

    membership = responseMembership.data.membership;
    persentaseHarga = responseMembership?.data?.harga?.persentase;

    if (membership?.id_transaksi) {
      const responseTransaksi = await SSRGetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${membership.id_transaksi}`
      );

      transaksi = responseTransaksi.data;
    }
  }

  if (profile?.id_webstore) {
    const responseWebstore = await SSRGetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile?.id_webstore}`
    );

    webstore = responseWebstore.data;
  }

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

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

  const harga =
    Number(barang?.harga) + Number((barang?.harga * persentaseHarga) / 100);
  const hargaPromo =
    Number(barang?.harga_promo) +
    Number((barang?.harga_promo * persentaseHarga) / 100);

  const barangSejenis = responseBarangSejenis.data;
  const barangSerupa = responseBarangSerupa.data;

  return (
    <div>
      <SearchBar />
      <HeaderAndBackIcon title={`Detail ${barang.kategori}`} />
      <DetailProductsComp
        barang={barang}
        harga={harga}
        hargaPromo={hargaPromo}
      />
      <p className="underline font-semibold m-2">Detail Produk</p>
      <SectionLayout>
        <div className="flex flex-col md:flex-row ml-2">
          <div className="text-sm md:text-base divide-y-8 divide-transparent my-2 w-1/2">
            <span className="flex items-center">
              <p className="font-medium mr-2">Ukuran:</p> {barang.ukuran}
            </span>
            <span className="flex items-center">
              <p className="font-medium mr-2">Kualitas:</p> {barang.kualitas}
            </span>
            <span className="flex items-center">
              <p className="font-medium mr-2">Motif:</p> {barang.motif}
            </span>
            <span className="flex items-center">
              <p className="font-medium mr-2">Tekstur:</p> {barang.tekstur}
            </span>
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
      <div>
        <p className="underline font-semibold m-2">{`Design Patern`}</p>
        <SectionLayout>
          <SimulasiKeramik ukuran={barang.ukuran} imageUrl={barang.images[0]} />
        </SectionLayout>
      </div>
      <div>
        <p className="underline font-semibold m-2">{`Kalkulator`}</p>
        <SectionLayout>
          <KalkulatorKeramik
            ukuranBarang={barang.ukuran}
            hargaBarang={harga}
            isPromo={barang.promo}
            hargaPromo={hargaPromo}
          />
        </SectionLayout>
      </div>
      {profile?.id_webstore && (
        <div>
          <QrSampleProducts webstore={webstore} barang={barang} />
        </div>
      )}
      {barangSejenis.length > 1 ? (
        <div>
          <SwiperProduct
            persentaseHarga={persentaseHarga}
            products={barangSejenis}
            title={"Motif Lainnya"}
            url={""}
          />
        </div>
      ) : null}
      {barangSerupa.length > 1 ? (
        <div>
          <p className="underline font-semibold m-2">{`Rekomendasi`}</p>
          <CatalogProducts
            persentaseHarga={persentaseHarga}
            atribut={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DetailBarang;
