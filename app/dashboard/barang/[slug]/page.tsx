"use client";
import { HeaderAndBackIcon, SearchBar } from "@/components/molecules";
import {
  CardProductDetail,
  CatalogProducts,
  DeskripsiProduk,
  LoadingAnimation,
  NotMembership,
  PaymentChecking,
  SwiperProduct,
} from "@/src/components";
import KalkulatorKeramik from "@/layouts/kalkulatorBarang";
import QrSampleProducts from "@/layouts/qrSampleProducts";
import { GetDataApi, upPriceWithPercen } from "@/src/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DetailBarang = () => {
  const params = useParams();
  const slug = params.slug;
  const [barangSejenis, setBarangSejenis] = useState([] as any);
  const [barangSerupa, setBarangSerupa] = useState([] as any);
  const [barang, setBarang] = useState({} as any);
  const { profile, transaksi, persentaseHarga, webstore } = useSelector(
    (state: any) => state.profile
  );

  useEffect(() => {
    const fetchData = async () => {
      const responseBarang = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`,
        3600
      );

      const barang = responseBarang.data;

      const responseBarangSerupa = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`,
        3600
      );

      const responseBarangSejenis = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?nama=${barang.nama_barang}&brand=${barang.brand}`,
        3600
      );
      setBarang(barang);
      setBarangSerupa(responseBarangSerupa.data);
      setBarangSejenis(responseBarangSejenis.data);
    };
    fetchData();
  }, [slug]);

  // menghitung harga
  const harga = upPriceWithPercen(barang?.harga, persentaseHarga);
  const hargaPromo = upPriceWithPercen(barang?.harga_promo, persentaseHarga);

  if (!profile?.id_membership) {
    return <NotMembership />;
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

      {/* barang sejenis */}

      {barangSejenis.length > 1 ? (
        <div>
          <SwiperProduct products={barangSejenis} title={"Motif Lainnya"} />
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
