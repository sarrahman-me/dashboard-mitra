"use client";
import { HeaderAndBackIcon } from "@/components/molecules";
import {
  CardProductDetail,
  CatalogProducts,
  DeskripsiProduk,
  LoadingAnimation,
  NotMembership,
  PaymentChecking,
  QrSampleProducts,
  SwiperProduct,
  SearchBar,
  ExpiredPlan,
  Table,
} from "@/src/components";
import KalkulatorKeramik from "@/layouts/kalkulatorBarang";
import { GetDataApi, upPriceWithPercen } from "@/src/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const DetailBarang = () => {
  const params = useParams();
  const slug = params.slug;
  const [barangSejenis, setBarangSejenis] = useState([] as any);
  const [barangSerupa, setBarangSerupa] = useState([] as any);
  const [history, setHistory] = useState([] as any);
  const [barang, setBarang] = useState({} as any);

  const { profile, transaksi, persentaseHarga, webstore, membership } =
    useSelector((state: any) => state.profile);

  useEffect(() => {
    const fetchData = async () => {
      const responseBarang = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}?track=true&source=tokokeramik.com`,
        3600
      );

      const barang = responseBarang.data;

      const responseBarangSerupa = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?kategori=${barang?.kategori}&ukuran=${barang?.ukuran}&motif=${barang?.motif}&tekstur=${barang?.tekstur}`,
        3600
      );

      const responseBarangSejenis = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?nama=${barang?.nama_barang}&brand=${barang?.brand}&ukuran=${barang?.ukuran}`,
        3600
      );

      const responseHistoryBarang = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/history/${slug}`
      );

      setBarang(barang);
      setBarangSerupa(responseBarangSerupa.data);
      setBarangSejenis(responseBarangSejenis.data);
      setHistory(responseHistoryBarang.data);
    };
    fetchData();
  }, [slug]);

  // menghitung harga
  const harga = upPriceWithPercen(barang?.harga, persentaseHarga);
  const hargaPromo = upPriceWithPercen(barang?.harga_promo, persentaseHarga);

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

  if (!barang.nama_barang) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <SearchBar />

      <HeaderAndBackIcon title={`Detail ${barang.kategori}`} />

      <CardProductDetail
        barang={barang}
        harga={harga}
        hargaPromo={hargaPromo}
      />

      {/* detail produk */}

      <p className="underline font-semibold my-2">Detail Produk</p>
      <DeskripsiProduk barang={barang} />

      {/* simulasi keramik */}

      {/* <div>
        <p className="underline font-semibold m-2">{`Design Patern`}</p>
          <SimulasiKeramik ukuran={barang.ukuran} imageUrl={barang.images[0]} />
      </div> */}

      {/* kalkulator keramik */}

      <div>
        <p className="underline font-semibold my-2">{`Kalkulator`}</p>
        <KalkulatorKeramik
          penggunaan_umum={barang.penggunaan_umum}
          ukuran={barang.ukuran}
          harga={harga}
          isPromo={barang.promo}
          hargaPromo={hargaPromo}
        />
      </div>

      {/* qrcode sample product */}

      {profile?.id_webstore && (
        <div>
          <QrSampleProducts webstore={webstore} barang={barang} />
        </div>
      )}

      {/* history stok */}

      {history && history.length > 0 ? (
        <div className="mt-5">
          <p className="underline font-semibold">Riwayat Stok</p>
          <Table
            columns={[
              {
                label: "Tanggal",
                renderCell: async (item: any) => (
                  <p>{moment(item.timestamp).format("lll")}</p>
                ),
              },
              {
                label: "Stok Lama",
                renderCell: (item: any) => item.stok_lama,
              },
              {
                label: "Stok Baru",
                renderCell: (item: any) => item.stok_baru,
              },
            ]}
            datas={history}
          />
        </div>
      ) : null}

      {/* barang sejenis */}

      {barangSejenis.length > 1 ? (
        <div>
          <SwiperProduct products={barangSejenis} title={"Warna Lainnya"} />
        </div>
      ) : null}

      {/* barang serupa */}

      {barangSerupa.length > 1 ? (
        <div>
          <p className="underline font-semibold m-2">{`Rekomendasi`}</p>
          <CatalogProducts
            atribut={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DetailBarang;
