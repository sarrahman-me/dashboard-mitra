"use client";
import Head from "next/head";
import { Benefits, Cta, Footer, Jumbotron, NavigationBar } from "@/layouts";
import { SectionTitle } from "@/components/molecules";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { MdOutlineInsights } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";

const benefitOne = {
  title: "Sorotan manfaat",
  desc: "Tidak hanya sekadar platform jual-beli keramik, kami juga adalah sumber wawasan berharga untuk pertumbuhan bisnis Anda. Dapatkan data pelanggan, tren produk, dan strategi pemasaran terbaik.",
  image:
    "https://ik.imagekit.io/sarrahmanme/default-image.jpg?updatedAt=1690537071869",
  bullets: [
    {
      title: "Buat toko online mu sendiri",
      desc: "Kamu dapat membuat toko online yang dirancang khusus dengan berbagai fitur untuk menjual keramik",
      icon: <BsGlobeEuropeAfrica />,
    },
    {
      title: "Temukan keramik dari suplier di sekitarmu",
      desc: "Kamu dapat mencari berbagai keramik keinginan customermu dari berbagai suplier di sekitarmu",
      icon: <LuPackageSearch />,
    },
    {
      title: "Dapatkan wawasan dari aktifitas customer",
      desc: "Kamu dapat melihat keramik yang paling sering dicari dan mana dari barang mu yang populer",
      icon: <MdOutlineInsights />,
    },
  ],
};

export default function RootPage() {
  return (
    <>
      <Head>
        <title>Toko Keramik - Jual Keramik tak pernah semudah ini</title>
        <meta name="description" content="Jual keramik dari mana saja" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <Jumbotron />
      <SectionTitle
        pretitle="Manfaat"
        title="Kenapa harus bergabung dengan tokokeramik.com ?"
      >
        Bergabunglah dengan komunitas penjual keramik kami yang aktif. Dapatkan
        dukungan dari sesama penjual, dan bagikan pengalaman serta tips untuk
        sukses dalam bisnis keramik Anda.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Cta />

      <Footer />
    </>
  );
}
